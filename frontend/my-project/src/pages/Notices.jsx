import React, { useState } from 'react';
import { getFileUrl } from '../utils/apiUtils';
import { Calendar, ArrowRight, Bell, X, FileText, Image as ImageIcon } from 'lucide-react';
import NoticeTicker from '../components/ui/NoticeTicker';
import FadeInSection from '../components/ui/FadeInSection';
import PdfPreviewModal from '../components/ui/PdfPreviewModal';
import { noticeService } from '../services/noticeService';

const Notices = () => {
  const [filter, setFilter] = useState('all');
  const [allNotices, setAllNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState(null); // 'image' or 'pdf'
  const [previewTitle, setPreviewTitle] = useState('');

  React.useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeService.getAll();
        setAllNotices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = filter === 'all' 
    ? allNotices 
    : allNotices.filter(notice => notice.category === filter);

  const categories = [
    { value: 'all', label: 'All Notices' },
    { value: 'event', label: 'Events' },
    { value: 'exam', label: 'Exams' },
    { value: 'holiday', label: 'Holidays' },
    { value: 'meeting', label: 'Meetings' },
    { value: 'admission', label: 'Admission' },
    { value: 'general', label: 'General' }
  ];

  const openPreview = (attachmentUrl, title) => {
    const fullUrl = getFileUrl(attachmentUrl);

    setPreviewTitle(title);
    
    if (isPDF(attachmentUrl)) {
      setPreviewType('pdf');
      setPreviewFile(fullUrl);
    } else {
      setPreviewType('image');
      setPreviewFile(fullUrl);
    }
  };

  const closePreview = () => {
    setPreviewFile(null);
    setPreviewType(null);
    setPreviewTitle('');
  };

  const isImage = (url) => {
    return url?.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  };

  const isPDF = (url) => {
    return url?.match(/\.pdf$/i);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <NoticeTicker />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <Bell className="mr-3 text-blue-600" size={36} />
            All Notices
          </h1>
          <p className="text-gray-600">Stay updated with the latest announcements and news</p>
        </div>

        {/* Filter Buttons */}
        <FadeInSection>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filter === cat.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-blue-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeInSection>

        {/* Notices List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredNotices.map((notice, index) => (
            <FadeInSection key={notice.id} delay={index * 0.05}>
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg p-4 w-full sm:w-24 text-center">
                  <Calendar size={24} className="mb-1" />
                  <span className="text-xs font-bold uppercase">{new Date(notice.publishDate).toLocaleString('default', { month: 'short' })}</span>
                  <span className="text-2xl font-bold">{new Date(notice.publishDate).getDate()}</span>
                  <span className="text-xs">{new Date(notice.publishDate).getFullYear()}</span>
                </div>
                
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer transition-colors">
                      {notice.title}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize ml-2 flex-shrink-0">
                      {notice.category || 'General'}
                    </span>
                  </div>
                  <div 
                    className="text-gray-600 text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: notice.description }}
                  />
                  
                  {notice.attachmentUrl && (
                    <button
                      onClick={() => openPreview(notice.attachmentUrl, notice.title)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {isImage(notice.attachmentUrl) ? (
                        <><ImageIcon size={16} className="mr-2" /> View Image</>
                      ) : isPDF(notice.attachmentUrl) ? (
                        <><FileText size={16} className="mr-2" /> Open PDF</>
                      ) : (
                        <><FileText size={16} className="mr-2" /> Open File</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>

        {filteredNotices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No notices found in this category.</p>
          </div>
        )}
      </div>
      )}

      {/* Preview Modal */}
      {previewFile && (
        <>
          {previewType === 'pdf' ? (
            <PdfPreviewModal 
              pdfUrl={previewFile} 
              title={previewTitle} 
              onClose={closePreview} 
            />
          ) : (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closePreview}>
              <div className="relative max-w-6xl max-h-[90vh] w-full bg-white rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={closePreview}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={24} />
                </button>
                
                <div className="w-full h-full overflow-auto flex justify-center bg-gray-100">
                  <img 
                    src={previewFile} 
                    alt="Preview" 
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Notices;
