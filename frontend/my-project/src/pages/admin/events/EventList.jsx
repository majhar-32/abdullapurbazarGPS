import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { eventService } from '../../../services/eventService';

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await eventService.getAll();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.delete(id);
        setEvents(events.filter(e => e.id !== id));
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Events</h1>
        <Link
          to="/admin/events/create"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>Create Event</span>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
            {/* Thumbnail */}
            <div className="h-48 bg-gray-200 relative">
              <img
                src={event.thumbnailUrl?.startsWith('http') ? event.thumbnailUrl : `http://localhost:8080/uploads/${event.thumbnailUrl}`}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=No+Image";
                }}
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {event.title}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar size={16} className="mr-2" />
                {event.eventDate}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <Link
                  to={`/gallery/${event.id}`}
                  target="_blank"
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="View"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  to={`/admin/events/edit/${event.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </Link>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No events found.
        </div>
      )}
    </div>
  );
};

export default EventList;
