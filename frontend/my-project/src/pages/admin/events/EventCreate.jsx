import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import RichTextEditor from '../../../components/admin/RichTextEditor';
import ImageUpload from '../../../components/admin/ImageUpload';
import { eventService } from '../../../services/eventService';
import api from '../../../services/api';

const EventCreate = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

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
      let uploadedThumbnailUrl = '';
      if (thumbnail.length > 0 && thumbnail[0].file) {
        uploadedThumbnailUrl = await uploadFile(thumbnail[0].file);
      }

      const mediaList = [];
      if (galleryImages.length > 0) {
        for (let i = 0; i < galleryImages.length; i++) {
          const img = galleryImages[i];
          // Use the uploaded URL if available (from the loop above)
          // Wait, the loop above pushes to uploadedGalleryUrls but doesn't map back to the file type easily
          // Let's refactor the loop to handle both
        }
      }

      // Refactored loop
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
          }
        }
      }

      const eventData = {
        ...data,
        description,
        thumbnailUrl: uploadedThumbnailUrl,
        mediaList: finalMediaList,
        videoUrl: '', // Deprecated, using mediaList for videos
      };
      
      await eventService.create(eventData);
      alert('Event created successfully!');
      navigate('/secure-panel/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/secure-panel/events')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Create Event</h1>
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
            {!description && <p className="text-red-500 text-sm mt-1">Description is required</p>}
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
            {thumbnail.length === 0 && <p className="text-red-500 text-sm mt-1">Thumbnail is required</p>}
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
              onClick={() => navigate('/secure-panel/events')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!description || thumbnail.length === 0}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;
