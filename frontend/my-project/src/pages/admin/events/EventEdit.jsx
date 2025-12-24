import React, { useState, useEffect } from 'react';
import { getFileUrl } from '../../../utils/apiUtils';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import RichTextEditor from '../../../components/admin/RichTextEditor';
import ImageUpload from '../../../components/admin/ImageUpload';
import { eventService } from '../../../services/eventService';
import api from '../../../services/api';

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
        setThumbnail([{ preview: getFileUrl(data.thumbnailUrl), name: 'Thumbnail' }]);
      }
      if (data.mediaList && data.mediaList.length > 0) {
        setGalleryImages(data.mediaList.map(media => ({ 
          preview: getFileUrl(media.mediaUrl), 
          name: media.mediaUrl.split('/').pop(),
          type: media.mediaType === 'VIDEO' ? 'video/mp4' : 'image/jpeg',
          originalType: media.mediaType
        })));
      }
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Failed to fetch event details');
      navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/events');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.fileUrl;
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

      const finalMediaList = [];
      if (galleryImages.length > 0) {
        for (const img of galleryImages) {
          if (img.file) {
            const url = await uploadFile(img.file);
            const isVideo = img.file.type.startsWith('video/') || img.file.name.match(/\.(mp4|webm|ogg)$/i);
            finalMediaList.push({
              mediaUrl: url,
              mediaType: isVideo ? 'VIDEO' : 'IMAGE'
            });
          } else if (img.preview) {
            // Existing file
            // Extract relative path if it's a full URL (though backend expects relative usually, let's check)
            // The backend stores relative paths usually. getFileUrl adds the domain.
            // If we send back the full URL, backend might save it as is.
            // But wait, getFileUrl returns full URL. 
            // We should probably extract the path or just send what we have if backend handles it.
            // Actually, the backend create/update logic just saves the string.
            // If we send full URL, it saves full URL.
            // We should try to strip the domain if possible, or just rely on what we have.
            // Ideally we should store what was originally there.
            // But we only have the preview URL which is full.
            // Let's assume we can send the preview URL, or better, try to extract the relative path if it matches our domain.
            // However, for simplicity and safety, let's just use the preview URL but strip the base URL if it's local.
            // Or better, we can just use the `name` if it contains the path? No.
            // Let's just use the preview URL. If it's an absolute URL, fine.
            
            // Determine type for existing file
            const isVideo = img.type?.startsWith('video/') || img.name?.match(/\.(mp4|webm|ogg)$/i) || img.originalType === 'VIDEO';
            
            // We need to send the relative path if possible to keep DB clean, but full URL is also fine if handled.
            // Let's try to parse it.
            let url = img.preview;
            try {
                const urlObj = new URL(url);
                if (urlObj.origin === window.location.origin || urlObj.origin.includes('localhost') || urlObj.origin.includes('vercel')) {
                    // It's likely our own file, try to get pathname
                    // But getFileUrl might point to a different backend.
                    // Let's just send the url.
                }
            } catch (e) {
                // Not a URL, maybe relative path
            }

            finalMediaList.push({
              mediaUrl: url,
              mediaType: isVideo ? 'VIDEO' : 'IMAGE'
            });
          }
        }
      }

      const eventData = {
        ...data,
        description,
        thumbnailUrl: uploadedThumbnailUrl,
        mediaList: finalMediaList,
        videoUrl: '', // Deprecated
      };
      
      await eventService.update(id, eventData);
      alert('Event updated successfully!');
      navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/events');
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
          onClick={() => navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/events')}
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
              Gallery Media (Images & Videos)
            </label>
            <ImageUpload
              images={galleryImages}
              onChange={setGalleryImages}
              multiple={true}
              maxFiles={100}
              allowVideo={true}
            />
            <p className="text-sm text-gray-500 mt-2">Upload up to 100 images or videos for the event gallery</p>
          </div>



          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/events')}
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
