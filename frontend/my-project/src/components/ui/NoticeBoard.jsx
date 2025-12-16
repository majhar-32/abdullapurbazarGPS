import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, FileText, Image as ImageIcon, X, Bell, Eye, Download } from 'lucide-react';
import NoticeTicker from './NoticeTicker';
import { noticeService } from '../../services/noticeService';
import PdfPreviewModal from './PdfPreviewModal';

const NoticeBoard = () => {
  const [notices, setNotices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewType, setPreviewType] = useState(null); // 'image' or 'pdf'
  const [previewTitle, setPreviewTitle] = useState('');

  React.useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await noticeService.getAll();
        // Take top 4 for a balanced grid layout
        const latestNotices = data.slice(0, 4);
        setNotices(latestNotices);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const openPreview = (notice) => {
    if (!notice.attachmentUrl) {
        // If no attachment, maybe just show text in a modal? 
        // For now, let's assume read more is primarily for the full content + attachment.
        // If we want to show full text even without attachment, we can adapt.
        // Let's treat "Read More" as "View Details".
    }
    
    // For this implementation, let's handle attachments if present, 
    // otherwise just show the description in a cleaner way if needed.
    // But the requirement implies "functionable" view details.
    
    const attachmentUrl = notice.attachmentUrl;
    if (attachmentUrl) {
        // Fix: Check if URL already contains /uploads or starts with http
        let fullUrl = attachmentUrl;
        if (!attachmentUrl.startsWith('http')) {
            // If it starts with /, just prepend base URL, otherwise prepend /uploads/
            if (attachmentUrl.startsWith('/')) {
                fullUrl = `http://localhost:5002${attachmentUrl}`;
            } else {
                fullUrl = `http://localhost:5002/uploads/${attachmentUrl}`;
            }
        }
        
        setPreviewTitle(notice.title);
        
        if (isPDF(attachmentUrl)) {
          setPreviewType('pdf');
          setPreviewFile(fullUrl);
        } else {
          setPreviewType('image');
          setPreviewFile(fullUrl);
        }
    } else {
        // If no attachment, we might want to show a text-only modal or just expand.
        // For consistency with Notices.jsx, let's just show the content in a modal if requested,
        // or maybe just alert for now if no attachment? 
        // Better: Show a modal with just the text if no attachment.
        setPreviewTitle(notice.title);
        setPreviewType('text'); // New type for text-only
        setPreviewFile(notice.description); // Pass description as "file" content
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
    <section className="bg-gray-50 pb-16">
      {/* Ticker Section */}
      <NoticeTicker />

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Notice List */}
          <div className="w-full lg:w-2/3">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
                  Latest Notices
                </h2>
                <p className="text-gray-500 mt-2 ml-5">Stay updated with school announcements</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 font-bold">SL NO.</th>
                                <th className="py-3 px-6 font-bold w-1/2">Topic</th>
                                <th className="py-3 px-6 font-bold">Date</th>
                                <th className="py-3 px-6 font-bold text-center">View</th>
                                <th className="py-3 px-6 font-bold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                notices.map((notice, index) => (
                                    <tr key={notice.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6 font-medium whitespace-nowrap">{index + 1}</td>
                                        <td className="py-4 px-6">
                                            <span className="font-medium text-gray-800 line-clamp-1" title={notice.title}>
                                                {notice.title}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 whitespace-nowrap">
                                            {new Date(notice.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button 
                                                onClick={() => openPreview(notice)}
                                                className="text-blue-500 hover:text-blue-700 transform hover:scale-110 transition-transform flex flex-col items-center"
                                                title="View Notice"
                                            >
                                                <Eye size={20} />
                                                <span className="text-[10px] mt-1">View</span>
                                            </button>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            {notice.attachmentUrl ? (
                                                <button 
                                                    onClick={() => openPreview(notice)}
                                                    className="text-green-500 hover:text-green-700 font-medium flex items-center justify-center gap-1 transform hover:scale-105 transition-transform"
                                                    title="View Attachment"
                                                >
                                                    <span className="hidden sm:inline">View</span>
                                                    <Eye size={16} />
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">No File</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View All Button */}
            <div className="mt-6 flex justify-center">
                <Link 
                    to="/notices" 
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    View All Notice <ArrowRight size={18} />
                </Link>
            </div>
          </div>

          {/* Sidebar / Important Links */}
          <div className="w-full lg:w-1/3 space-y-8">
            {/* Important Links Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-[#669900] to-[#558000] p-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Link size={20} className="text-white/80" />
                    Important Links
                </h3>
              </div>
              <ul className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto custom-scrollbar">
                {[
                  { name: 'CRVS', url: 'http://crvs.gov.bd' },
                  { name: 'IPEMIS', url: 'http://ipemis.dpe.gov.bd' },
                  { name: 'PESP MIS', url: 'http://pespmis.dpe.gov.bd' },
                  { name: 'NCTB', url: 'http://www.nctb.gov.bd' },
                  { name: 'DPE', url: 'http://www.dpe.gov.bd' },
                  { name: 'MOPME', url: 'https://mopme.gov.bd' },
                  { name: 'NAPE', url: 'http://nape.gov.bd' },
                  { name: 'GPF Info', url: 'http://www.cafopfm.gov.bd' },
                  { name: 'Pay Fixation', url: 'http://www.payfixation.gov.bd' },
                  { name: 'E-Return', url: 'https://etaxnbr.gov.bd' },
                  { name: 'Muktopaath', url: 'https://muktopaath.gov.bd' },
                  { name: 'BKKB', url: 'http://www.bkkb.gov.bd' },
                  { name: 'BD Scout', url: 'http://www.scouts.gov.bd' },
                  { name: 'Scratch', url: 'https://scratch.mit.edu' },
                  { name: 'Teachers Portal', url: 'https://www.teachers.gov.bd' },
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 mr-4 text-[#669900] bg-[#669900]/10 p-2 rounded-full group-hover:bg-[#669900] group-hover:text-white transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium group-hover:text-[#669900] transition-colors">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            

          </div>

        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <>
          {previewType === 'pdf' ? (
            <PdfPreviewModal 
              pdfUrl={previewFile} 
              title={previewTitle} 
              onClose={closePreview} 
            />
          ) : previewType === 'text' ? (
             <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closePreview}>
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 line-clamp-1 pr-4">{previewTitle}</h3>
                  <button onClick={closePreview} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <div className="p-8 max-h-[70vh] overflow-y-auto">
                    <div 
                        className="prose prose-blue max-w-none text-gray-600"
                        dangerouslySetInnerHTML={{ __html: previewFile }}
                    />
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                    <button 
                        onClick={closePreview}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closePreview}>
              <div className="relative max-w-5xl max-h-[90vh] w-full bg-white rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={closePreview}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 rounded-full shadow-lg hover:bg-white text-gray-800 transition-all"
                >
                  <X size={24} />
                </button>
                
                <div className="w-full h-full overflow-auto flex justify-center bg-gray-100 p-4">
                  <img 
                    src={previewFile} 
                    alt="Preview" 
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-md"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 text-center">{previewTitle}</h3>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default NoticeBoard;
