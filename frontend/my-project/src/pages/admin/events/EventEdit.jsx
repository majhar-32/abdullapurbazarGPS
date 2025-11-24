import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import RichTextEditor from '../../../components/admin/RichTextEditor';
import ImageUpload from '../../../components/admin/ImageUpload';
import { eventService } from '../../../services/eventService';

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const data = await eventService.getById(id);
      setValue('title', data.title);
      setValue('eventDate', data.eventDate);
      setValue('videoUrl', data.videoUrl);
      setDescription(data.description);
      
      if (data.thumbnailUrl) {
        const url = data.thumbnailUrl.startsWith('http') ? data.thumbnailUrl : `http://localhost:8080/uploads/${data.thumbnailUrl}`;
        setThumbnail([{ preview: url, name: 'Thumbnail' }]);
      }
      if (data.imageUrls && data.imageUrls.length > 0) {
        setGalleryImages(data.imageUrls.map(url => ({ 
          preview: url.startsWith('http') ? url : `http://localhost:8080/uploads/${url}`, 
          name: 'Image' 
        })));
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to fetch event details');
      navigate('/admin/events');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('File upload failed');
      }
      
      const data = await response.json();
      return data.fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      let uploadedThumbnailUrl = thumbnail[0]?.preview || '';
      if (thumbnail.length > 0 && thumbnail[0].file) {
        uploadedThumbnailUrl = await uploadFile(thumbnail[0].file);
      }

      const uploadedGalleryUrls = [];
      if (galleryImages.length > 0) {
        for (const img of galleryImages) {
          if (img.file) {
            const url = await uploadFile(img.file);
            uploadedGalleryUrls.push(url);
          } else if (img.preview) {
            uploadedGalleryUrls.push(img.preview);
          }
        }
      }

      const eventData = {
        ...data,
        description,
        thumbnailUrl: uploadedThumbnailUrl,
        imageUrls: uploadedGalleryUrls,
        videoUrl: data.videoUrl || '',
      };
      
      await eventService.update(id, eventData);
      alert('Event updated successfully!');
      navigate('/admin/events');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/events')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Event</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <RichTextEditor value={description} onChange={setDescription} />
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register('eventDate', { required: 'Event date is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate.message}</p>}
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail Image <span className="text-red-500">*</span>
            </label>
            <ImageUpload
              images={thumbnail}
              onChange={setThumbnail}
              multiple={false}
            />
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gallery Images (Optional)
            </label>
            <ImageUpload
              images={galleryImages}
              onChange={setGalleryImages}
              multiple={true}
              maxFiles={10}
            />
            <p className="text-sm text-gray-500 mt-2">Upload up to 10 images for the event gallery</p>
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video URL (Optional)
            </label>
            <input
              type="url"
              {...register('videoUrl')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://youtube.com/watch?v=..."
            />
            <p className="text-sm text-gray-500 mt-1">YouTube or other video platform URL</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/admin/events')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              <span>Update Event</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventEdit;
