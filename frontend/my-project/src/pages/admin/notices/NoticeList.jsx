import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { noticeService } from '../../../services/noticeService';

const NoticeList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await noticeService.getAll();
      setNotices(data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'event', 'exam', 'holiday', 'meeting', 'admission', 'general'];

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || notice.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticeService.delete(id);
        setNotices(notices.filter(n => n.id !== id));
      } catch (error) {
        console.error('Error deleting notice:', error);
        alert('Failed to delete notice');
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Notices</h1>
        <Link
          to="/admin/notices/create"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Notice</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent capitalize"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="capitalize">{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publish Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attachment
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredNotices.map((notice) => (
              <tr key={notice.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {notice.isUrgent && (
                      <span className="mr-2 px-2 py-1 text-xs bg-red-100 text-red-600 rounded-full">
                        Urgent
                      </span>
                    )}
                    <span className="font-medium text-gray-900">{notice.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full capitalize">
                    {notice.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {notice.publishDate}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded-full">
                    Published
                  </span>
                </td>
                <td className="px-6 py-4">
                  {notice.attachmentUrl ? (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs bg-gray-50 text-gray-400 rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <Link
                      to={`/notices`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/admin/notices/edit/${notice.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No notices found.
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
