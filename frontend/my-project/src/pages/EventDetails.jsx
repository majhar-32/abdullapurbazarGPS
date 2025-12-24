import React from 'react';
import { getFileUrl } from '../utils/apiUtils';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, PlayCircle, Image as ImageIcon } from 'lucide-react';
import { eventService } from '../services/eventService';

const EventDetails = () => {
  const { id } = useParams();

  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await eventService.getById(id);
        setEvent(data);
      } catch (err) {
        console.error('Failed to load event details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Event not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        
        {/* Back Button */}
        <Link to="/gallery" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" /> Back to Gallery
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <div className="flex items-center text-blue-600 mb-3">
            <Calendar size={18} className="mr-2" />
            <span className="font-medium">{event.eventDate ? new Date(event.eventDate).toLocaleDateString() : ''}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{event.title}</h1>
          <div 
            className="text-gray-600 leading-relaxed text-lg prose max-w-none"
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        </div>

        {/* Image Gallery Section */}
        {event.imageUrls && event.imageUrls.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <ImageIcon className="mr-3 text-blue-600" /> Event Photos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {event.imageUrls.map((img, index) => (
                <div key={index} className="aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group relative">
                  <img 
                    src={getFileUrl(img)} 
                    alt={`Event ${index + 1}`} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    onError={(e) => {
                      console.error("Failed to load image:", e.target.src);
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMTUwIDE1MCI+PHJlY3Qgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmM2Y0ZjYiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOWNhM2FmIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Section */}
        {event.videoUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <PlayCircle className="mr-3 text-red-600" /> Event Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-md">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={event.videoUrl} 
                  title="Event Video" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EventDetails;
