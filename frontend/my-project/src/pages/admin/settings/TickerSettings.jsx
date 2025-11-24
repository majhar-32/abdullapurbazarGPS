import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Save, Settings as SettingsIcon } from 'lucide-react';
import { noticeService } from '../../../services/noticeService';

const TickerSettings = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await noticeService.getTickerSettings();
        reset(settings);
      } catch (error) {
        console.error('Failed to fetch ticker settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, [reset]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await noticeService.updateTickerSettings(data);
      alert('Ticker settings updated successfully!');
    } catch (error) {
      console.error('Error updating ticker settings:', error);
      alert('Failed to update ticker settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-6">
        <SettingsIcon className="mr-3 text-blue-600" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">News Ticker Settings</h1>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="text-sm text-blue-800">
          Configure the news ticker that appears on the homepage. Only notices marked as "Pin to Ticker" will be displayed.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
          {/* Enable/Disable Ticker */}
          <div className="flex items-center p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              {...register('enabled')}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-3 text-sm font-medium text-gray-700">
              Enable News Ticker on Homepage
            </label>
          </div>

          {/* Scroll Speed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scroll Speed
            </label>
            <select
              {...register('scrollSpeed', { required: 'Scroll speed is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="SLOW">Slow</option>
              <option value="MEDIUM">Medium</option>
              <option value="FAST">Fast</option>
            </select>
            {errors.scrollSpeed && <p className="text-red-500 text-sm mt-1">{errors.scrollSpeed.message}</p>}
          </div>

          {/* Max Items */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Notices to Display
            </label>
            <select
              {...register('maxItems', { required: 'Max items is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5 notices</option>
              <option value={10}>10 notices</option>
              <option value={15}>15 notices</option>
            </select>
            {errors.maxItems && <p className="text-red-500 text-sm mt-1">{errors.maxItems.message}</p>}
            <p className="text-sm text-gray-500 mt-2">
              Only the most recent notices (by publish date) will be shown
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TickerSettings;
