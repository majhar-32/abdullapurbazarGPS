import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import NoticeTicker from './NoticeTicker';
import { noticeService } from '../../services/noticeService';

const NoticeBoard = () => {
  const [notices, setNotices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeService.getAll();
        // Sort by date descending and take top 5
        const sorted = data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 5);
        setNotices(sorted);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <section className="bg-gray-50 pb-12">
      {/* Ticker Section */}
      <NoticeTicker />

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Notice List */}
          <div className="w-full md:w-2/3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3">
                Latest Notices
              </h2>
              <button className="text-blue-600 font-medium hover:text-blue-800 flex items-center transition-colors">
                View All <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="space-y-4">
              {loading ? (
                 <div className="flex justify-center items-center h-40">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                 </div>
              ) : (
                <>
              {notices.map((notice) => (
                <div key={notice.id} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg p-3 w-full sm:w-20 text-center">
                    <Calendar size={20} className="mb-1" />
                    <span className="text-xs font-bold uppercase">{new Date(notice.publishDate).toLocaleString('default', { month: 'short' })}</span>
                    <span className="text-lg font-bold">{new Date(notice.publishDate).getDate()}</span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer transition-colors">
                      {notice.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {notice.description}
                    </p>
                    <button className="text-sm text-blue-500 font-medium hover:underline">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
                </>
              )}
            </div>
          </div>

          {/* Sidebar / Important Links */}
          <div className="w-full md:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Important Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/routine" className="block p-3 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex justify-between items-center group">
                    <span>Class Routine</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/result" className="block p-3 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex justify-between items-center group">
                    <span>Exam Results</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/admission" className="block p-3 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex justify-between items-center group">
                    <span>Admission Info</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/syllabus" className="block p-3 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex justify-between items-center group">
                    <span>Syllabus</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="block p-3 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors flex justify-between items-center group">
                    <span>Photo Gallery</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mt-6 bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-blue-100 mb-4 text-sm">Contact our administration office for any queries.</p>
              <Link to="/contact" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
