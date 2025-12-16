import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, MapPin, Image as ImageIcon } from 'lucide-react';
import { eventService } from '../../services/eventService';

const EventGallery = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        // Sort by date descending and take top 3
        const sortedEvents = data.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
        setEvents(sortedEvents.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (events.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
              Campus Life & Events
            </h2>
            <p className="text-gray-500 mt-2 ml-5">Highlights from our recent activities and celebrations</p>
          </div>
          <Link 
            to="/gallery" 
            className="hidden md:flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group mt-4 md:mt-0"
          >
            View All Gallery <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Link 
              to={`/gallery/${event.id}`} 
              key={event.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-gray-100" />
                <img 
                  src={event.thumbnailUrl?.startsWith('http') ? event.thumbnailUrl : `http://localhost:5002/uploads/${event.thumbnailUrl}`}
                  alt={event.title}
                  className="relative z-10 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    const fallback = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=";
                    if (e.target.src !== fallback) {
                      e.target.onerror = null;
                      e.target.src = fallback;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                
                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md flex flex-col items-center text-gray-800">
                  <span className="text-xs font-bold uppercase text-blue-600">
                    {event.eventDate ? new Date(event.eventDate).toLocaleString('default', { month: 'short' }) : ''}
                  </span>
                  <span className="text-xl font-bold leading-none">
                    {event.eventDate ? new Date(event.eventDate).getDate() : '--'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <Calendar size={14} className="mr-2" />
                  <span>{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : 'Date TBD'}</span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {event.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-medium">
                  <span className="text-blue-600 flex items-center group-hover:underline">
                    View Details <ArrowRight size={14} className="ml-1" />
                  </span>
                  <span className="text-gray-400 flex items-center">
                    <ImageIcon size={14} className="mr-1" /> Gallery
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors"
          >
            View All Gallery <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
