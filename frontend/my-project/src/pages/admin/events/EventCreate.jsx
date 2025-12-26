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
  const [loading, setLoading] = useState(false);
  
  // Progress State
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('');

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // We'll update the local file progress here if needed, 
          // but for overall progress we handle it in the loop
        },
      });
      return response.data.fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setProgress(0);
    setCurrentAction('Starting...');

    try {
      // Calculate total operations (Thumbnail + Gallery Images + Create Request)
      const totalOperations = (thumbnail.length > 0 ? 1 : 0) + galleryImages.length + 1;
      let completedOperations = 0;

      const updateProgress = () => {
        completedOperations++;
        const newProgress = Math.round((completedOperations / totalOperations) * 100);
        setProgress(newProgress);
      };

      // 1. Upload Thumbnail
      let uploadedThumbnailUrl = '';
      if (thumbnail.length > 0 && thumbnail[0].file) {
        setCurrentAction('Uploading Thumbnail...');
        uploadedThumbnailUrl = await uploadFile(thumbnail[0].file);
        updateProgress();
      }

      // 2. Upload Gallery Images
      const finalMediaList = [];
      if (galleryImages.length > 0) {
        let imgIndex = 1;
        for (const img of galleryImages) {
          if (img.file) {
            setCurrentAction(`Uploading Gallery Image ${imgIndex} of ${galleryImages.length}...`);
            const url = await uploadFile(img.file);
            const isVideo = img.file.type.startsWith('video/') || img.file.name.match(/\.(mp4|webm|ogg)$/i);
            finalMediaList.push({
              mediaUrl: url,
              mediaType: isVideo ? 'VIDEO' : 'IMAGE'
            });
            updateProgress();
            imgIndex++;
          }
        }
      }

      // 3. Create Event
      setCurrentAction('Finalizing Event...');
      const eventData = {
        ...data,
        description,
        thumbnailUrl: uploadedThumbnailUrl,
        mediaList: finalMediaList,
        videoUrl: data.videoUrl || '', 
      };
      
      await eventService.create(eventData);
      updateProgress(); // 100%
      
      alert('Event created successfully!');
      navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

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

          {/* YouTube Video URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              YouTube Video URL (Optional)
            </label>
            <input
              type="url"
              {...register('videoUrl')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://www.youtube.com/watch?v=..."
            />
            <p className="text-sm text-gray-500 mt-1">Add a YouTube video link for larger videos (recommended for videos &gt; 5MB)</p>
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
              disabled={!description || thumbnail.length === 0 || loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px] justify-center"
            >
              {loading ? (
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span className="text-sm">{progress}%</span>
                  </div>
                  <div className="w-full bg-blue-800 rounded-full h-1.5 mt-1 overflow-hidden">
                    <div 
                      className="bg-white h-1.5 rounded-full transition-all duration-300" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs mt-0.5 opacity-90">{currentAction}</span>
                </div>
              ) : (
                <>
                  <Save size={18} />
                  <span>Create Event</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EventCreate;
