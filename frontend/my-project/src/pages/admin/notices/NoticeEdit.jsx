import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import RichTextEditor from '../../../components/admin/RichTextEditor';
import FileUpload from '../../../components/admin/FileUpload';
import { noticeService } from '../../../services/noticeService';

const NoticeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotice();
  }, [id]);

  const fetchNotice = async () => {
    try {
      const data = await noticeService.getById(id);
      setValue('title', data.title);
      setValue('category', data.category);
      setValue('publishDate', data.publishDate);
      setValue('isUrgent', data.isUrgent);
      setDescription(data.description);
      
      if (data.attachmentUrl) {
        setAttachment({ 
          preview: data.attachmentUrl.startsWith('http') ? data.attachmentUrl : `http://localhost:5002/uploads/${data.attachmentUrl}`, 
          name: data.attachmentUrl 
        });
      }
    } catch (error) {
      console.error('Error fetching notice:', error);
      alert('Failed to fetch notice details');
      navigate('/secure-panel/notices');
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5002/api/upload', {
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
      return data.fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    try {
      let attachmentUrl = attachment?.name || '';
      if (attachment && attachment.file) {
        attachmentUrl = await uploadFile(attachment.file);
      }

      const noticeData = {
        ...data,
        description,
        attachmentUrl
      };
      await noticeService.update(id, noticeData);
      alert('Notice updated successfully!');
      navigate('/secure-panel/notices');
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Failed to update notice');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/notices')}
          className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Notice</h1>
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
              onClick={() => navigate('/admin/notices')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              <span>Update Notice</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoticeEdit;
