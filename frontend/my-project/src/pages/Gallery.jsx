import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';
import FadeInSection from '../components/ui/FadeInSection';
import { eventService } from '../services/eventService';

const Gallery = () => {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventService.getAll();
        setEvents(data);
      } catch (err) {
        console.error('Failed to load events', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Photo & Video Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Relive the memorable moments of our school events and activities.
          </p>
        </div>


        <FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <FadeInSection key={event.id} delay={index * 0.1}>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                  {/* Thumbnail */}
                  <div className="h-48 bg-gray-200 relative overflow-hidden group">
                    <img 
                      src={event.thumbnailUrl ? (event.thumbnailUrl.startsWith('http') ? event.thumbnailUrl : `http://localhost:8080/uploads/${event.thumbnailUrl}`) : "https://via.placeholder.com/300?text=No+Image"} 
                      alt={event.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        console.error("Gallery Image Load Error:", e.target.src);
                        e.target.src = "https://via.placeholder.com/300?text=Image+Not+Found";
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center text-sm text-blue-600 mb-2">
                      <Calendar size={14} className="mr-2" />
                      {event.eventDate}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {event.description?.replace(/<[^>]+>/g, '')}
                    </p>
                    
                    <Link 
                      to={`/gallery/${event.id}`} 
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors mt-auto"
                    >
                      View Details <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};

export default Gallery;
