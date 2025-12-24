import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import RichTextEditor from '../../../components/admin/RichTextEditor';
import FileUpload from '../../../components/admin/FileUpload';
import { noticeService } from '../../../services/noticeService';
import api from '../../../services/api';

const NoticeCreate = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      let attachmentUrl = '';
      if (attachment && attachment.file) {
        attachmentUrl = await uploadFile(attachment.file);
      }

      const noticeData = {
        ...data,
        description,
        attachmentUrl
      };
      await noticeService.create(noticeData);
      alert('Notice created successfully!');
      navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/notices');
    } catch (error) {
      console.error('Error creating notice:', error);
      alert('Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/notices')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Create Notice</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter notice title"
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

          {/* Category & Date Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
              >
                <option value="">Select category</option>
                <option value="EVENT">Event</option>
                <option value="EXAM">Exam</option>
                <option value="HOLIDAY">Holiday</option>
                <option value="MEETING">Meeting</option>
                <option value="ADMISSION">Admission</option>
                <option value="GENERAL">General</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>

            {/* Publish Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Publish Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                {...register('publishDate', { required: 'Publish date is required' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.publishDate && <p className="text-red-500 text-sm mt-1">{errors.publishDate.message}</p>}
            </div>
          </div>

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachment (PDF or Image)
            </label>
            <FileUpload
              file={attachment}
              onChange={setAttachment}
              accept={{
                'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
                'application/pdf': ['.pdf']
              }}
            />
            <p className="text-sm text-gray-500 mt-2">Optional. Upload a PDF or image file.</p>
          </div>

          {/* Is Urgent */}
          <div className="flex items-center">
            <input
              type="checkbox"
              {...register('isUrgent')}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              Mark as urgent notice
            </label>
          </div>

          {/* Pin to Ticker */}
          <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <input
              type="checkbox"
              {...register('showInTicker')}
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              📌 <strong>Pin to News Ticker</strong> - Show this notice in the scrolling ticker on homepage
            </label>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/abgps-admin-portal-20@_25-s@cure-12-31_/notices')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!description || loading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>Create Notice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoticeCreate;
