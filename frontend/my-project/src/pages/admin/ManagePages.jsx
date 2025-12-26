import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, Eye, EyeOff, Trash2, FileText, Loader2, 
  ChevronDown, ChevronRight, Folder, FolderOpen, X,
  GraduationCap, Users, BookOpen, Calendar, Image as ImageIcon,
  Settings, FileCheck, Library, Layout, Award, ClipboardList,
  Languages
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useTranslation } from '../../hooks/useTranslation';
import api from '../../services/api';
import { getApiUrl } from '../../utils/apiUtils';

// Set up the worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Suppress PDF warnings
const originalConsoleWarn = console.warn;
console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('getHexString')) return;
  originalConsoleWarn.apply(console, args);
};

// Helper to generate consistent page keys from paths
const getPageKey = (path) => {
  if (!path) return '';
  return path.replace(/^\//, '').replace(/[\/\-]/g, '_');
};

const ManagePages = () => {
  const { t, language, toggleLanguage } = useTranslation();
  const [pagesData, setPagesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null);
  const [expanded, setExpanded] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState('');

  // Resize observer to make PDF responsive
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    const container = document.getElementById('pdf-preview-container');
    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container);
      }
    };
  }, [previewUrl]);
  // Enhanced Nav Structure with Icons and Colors - Moved inside component for translations
  const navStructure = [
    {
      name: t('studentAffairs'),
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
      borderColor: 'border-blue-100',
      dropdown: [
        { name: t('admissionInfo'), path: '/admission-info' },
        { name: t('bookDistribution'), path: '/book-distribution' },
        { name: t('childSurveyInfo'), path: '/child-survey' },
        { name: t('dropoutInfo'), path: '/dropout-info' },
        { name: t('specialNeedsStudent'), path: '/special-needs' },
        { name: t('stipendInfo'), path: '/stipend-info' },
        { name: t('schoolFeeding'), path: '/school-feeding' },
      ]
    },
    {
      name: t('teacherAffairs'),
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-600',
      borderColor: 'border-emerald-100',
      dropdown: [
        { name: t('teacherInfo'), path: '/teacher-info' },
        { name: t('homeVisit'), path: '/home-visit' },
        { name: t('casualLeave'), path: '/casual-leave' },
        { name: t('classObservation'), path: '/class-observation' },
        { name: t('trainingInfo'), path: '/training-info' },
        { name: t('dutyDistribution'), path: '/duty-distribution' },
      ]
    },
    {
      name: t('evaluation'),
      icon: Award,
      color: 'bg-purple-50 text-purple-600',
      borderColor: 'border-purple-100',
      dropdown: [
        { name: t('examSchedule'), path: '/exam-schedule' },
        { name: t('pakkhikPorikkha'), path: '/pakkhik-porikkha' },
        {
          name: t('terminalEvaluationInfo'),
          dropdown: [
            { name: t('first'), path: '/terminal-evaluation/first' },
            { name: t('second'), path: '/terminal-evaluation/second' },
            { name: t('third'), path: '/terminal-evaluation/third' },
            { name: t('fourth'), path: '/terminal-evaluation/fourth' },
            { name: t('fifth'), path: '/terminal-evaluation/fifth' },
          ]
        },
        {
          name: t('continuousEvaluationInfo'),
          dropdown: [
            { name: t('first'), path: '/continuous-evaluation/first' },
            { name: t('second'), path: '/continuous-evaluation/second' },
            { name: t('third'), path: '/continuous-evaluation/third' },
            { name: t('fourth'), path: '/continuous-evaluation/fourth' },
            { name: t('fifth'), path: '/continuous-evaluation/fifth' },
          ]
        },
        { name: t('completionExamInfo'), path: '/completion-exam-info' },
        { name: t('scholarshipExamInfo'), path: '/scholarship-exam-info' },
      ]
    },
    { 
      name: t('aboutUs'), 
      icon: Layout,
      color: 'bg-orange-50 text-orange-600',
      borderColor: 'border-orange-100',
      dropdown: [
        { name: t('history'), path: '/history' },
        {
          name: t('achievements'),
          dropdown: [
            { name: t('national'), path: '/achievements/national' },
            { name: t('international'), path: '/achievements/international' },
            { name: t('local'), path: '/achievements/local' },
          ]
        },
        { name: t('monitoringBoard'), path: '/monitoring-board' },
        { name: t('libraryInfo'), path: '/library-info' },
        { name: t('ictEquipment'), path: '/ict-equipment' },
        {
          name: t('inspection'),
          dropdown: [
            { name: t('offlineInspection'), path: '/inspection/offline' },
            { name: t('onlineInspection'), path: '/inspection/online' },
            { name: t('websiteInspection'), path: '/inspection/website' },
          ]
        },
        { name: t('landInfo'), path: '/land-info' },
      ]
    },
    { 
      name: t('academic'), 
      icon: BookOpen,
      color: 'bg-indigo-50 text-indigo-600',
      borderColor: 'border-indigo-100',
      dropdown: [
        { name: t('schoolInfo'), path: '/school-info' },
        { name: t('headTeachersList'), path: '/head-teachers-list' },
        {
          name: t('register'),
          dropdown: [
            { name: t('inspection'), path: '/register/inspection' },
            { name: t('stockRegister'), path: '/register/stock' },
            { name: t('slip'), path: '/register/slip' },
            { name: t('minorRepair'), path: '/register/minor-repair' },
            { name: t('incomeExpense'), path: '/register/income-expense' },
            { name: t('materials'), path: '/register/materials' },
            { name: t('eventRegister'), path: '/register/event' },
          ]
        },
        {
          name: t('mr'),
          dropdown: [
            { name: 'January-February', path: '/mr/jan-feb' },
            { name: 'February-March', path: '/mr/feb-mar' },
            { name: 'March-April', path: '/mr/mar-apr' },
            { name: 'April-May', path: '/mr/apr-may' },
            { name: 'May-June', path: '/mr/may-jun' },
            { name: 'June-July', path: '/mr/jun-jul' },
            { name: 'July-August', path: '/mr/jul-aug' },
            { name: 'August-September', path: '/mr/aug-sep' },
            { name: 'September-October', path: '/mr/sep-oct' },
            { name: 'October-November', path: '/mr/oct-nov' },
            { name: 'November-December', path: '/mr/nov-dec' },
            { name: 'December-January', path: '/mr/dec-jan' },
          ]
        },
        {
          name: t('apa'),
          dropdown: [
            { name: t('apa2025'), path: '/apa/2025' },
            { name: t('apa2026'), path: '/apa/2026' },
          ]
        },
        { name: t('annualWorkPlan'), path: '/annual-work-plan' },
        { name: t('classRoutine'), path: '/routine' },
        { name: t('interSports'), path: '/inter-sports' },
        { name: t('holidayList'), path: '/holiday-list-2026' },
        { name: t('miscForms'), path: '/misc-forms' },
        { name: t('innovationActivity'), path: '/innovation-activity' },
        { name: t('electricityBill'), path: '/electricity-bill' },
        { name: t('urcRelated'), path: '/urc-related' },
      ]
    },
    {
      name: t('committee'),
      icon: Users,
      color: 'bg-teal-50 text-teal-600',
      borderColor: 'border-teal-100',
      dropdown: [
        { name: t('managingCommittee'), path: '/managing-committee' },
        { name: t('adhokCommittee'), path: '/adhok-committee' },
        { name: t('ptaCommittee'), path: '/pta' },
        { name: t('slipCommittee'), path: '/slip-committee' },
        { name: t('sacCommittee'), path: '/sac-committee' },
        { name: t('studentCouncil'), path: '/student-council' },
        { name: t('minorDoctorTeam'), path: '/minor-doctor-team' },
        { name: t('kabdol'), path: '/kabdol' },
      ]
    },
    {
      name: t('registration'),
      icon: FileCheck,
      color: 'bg-cyan-50 text-cyan-600',
      borderColor: 'border-cyan-100',
      dropdown: [
        { name: t('smcResolution'), path: '/smc-resolution' },
        { name: t('ptaResolution'), path: '/pta-resolution' },
        { name: t('slipResolution'), path: '/slip-resolution' },
        { name: t('sacResolution'), path: '/sac-resolution' },
        { name: t('mothersAssembly'), path: '/mothers-assembly' },
        { name: t('guardiansAssembly'), path: '/guardians-assembly' },
        { name: t('courtyardMeeting'), path: '/courtyard-meeting' },
        { name: t('staffMeeting'), path: '/staff-meeting' },
        { name: t('minorDoctorResolution'), path: '/minor-doctor-resolution' },
      ]
    },
    {
      name: t('libraryAssistance'),
      icon: Library,
      color: 'bg-rose-50 text-rose-600',
      borderColor: 'border-rose-100',
      dropdown: [
        {
          name: t('textbook'),
          dropdown: [
            { name: t('prePrimary4Plus'), path: '/textbook/pre-primary-4plus' },
            { name: t('prePrimary5Plus'), path: '/textbook/pre-primary-5plus' },
            { name: t('class1'), path: '/textbook/class-1' },
            { name: t('class2'), path: '/textbook/class-2' },
            { name: t('class3'), path: '/textbook/class-3' },
            { name: t('class4'), path: '/textbook/class-4' },
            { name: t('class5'), path: '/textbook/class-5' },
          ]
        },
        { name: t('teachersEdition'), path: '/teachers-edition' },
        { name: t('teachersGuide'), path: '/teachers-guide' },
        { name: t('teachersAid'), path: '/teachers-aid' },
      ]
    },
    {
      name: t('prePrimary'),
      icon: GraduationCap,
      color: 'bg-pink-50 text-pink-600',
      borderColor: 'border-pink-100',
      dropdown: [
        {
          name: t('prePrimary4Plus'),
          dropdown: [
            { name: t('annualLessonPlan'), path: '/pre-primary/4plus/annual-plan' },
            { name: t('classRoutine'), path: '/pre-primary/4plus/routine' },
            { name: t('annualEvaluationForm'), path: '/pre-primary/4plus/evaluation' },
            { name: t('teachersGuide'), path: '/pre-primary/4plus/guide' },
            { name: t('inspectionInfo'), path: '/pre-primary/4plus/inspection' },
          ]
        },
        {
          name: t('prePrimary5Plus'),
          dropdown: [
            { name: t('annualLessonPlan'), path: '/pre-primary/5plus/annual-plan' },
            { name: t('classRoutine'), path: '/pre-primary/5plus/routine' },
            { name: t('annualEvaluationForm'), path: '/pre-primary/5plus/evaluation' },
            { name: t('teachersGuide'), path: '/pre-primary/5plus/guide' },
            { name: t('inspectionInfo'), path: '/pre-primary/5plus/inspection' },
          ]
        },
      ]
    },
    {
      name: t('curriculumLesson'),
      icon: ClipboardList,
      color: 'bg-amber-50 text-amber-600',
      borderColor: 'border-amber-100',
      dropdown: [
        { name: t('first'), path: '/curriculum/first' },
        { name: t('second'), path: '/curriculum/second' },
        { name: t('third'), path: '/curriculum/third' },
        { name: t('fourth'), path: '/curriculum/fourth' },
        { name: t('fifth'), path: '/curriculum/fifth' },
        { name: t('primaryScience'), path: '/curriculum/primary-science' },
      ]
    },
  ];

  const fetchPages = async () => {
    try {
      const response = await api.get('/pages/all', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      const data = response.data;
        const dataMap = {};
        data.forEach(page => {
          // Map backend snake_case to frontend camelCase
          const mappedPage = {
            ...page,
            pageKey: page.page_key || page.pageKey,
            pdfUrl: page.pdf_url || page.pdfUrl,
            visible: page.is_visible !== undefined ? page.is_visible : page.visible,
          };
          if (mappedPage.pageKey) {
            dataMap[mappedPage.pageKey] = mappedPage;
          }
        });
        setPagesData(dataMap);

    } catch (error) {
      console.error('Error fetching pages:', error);
      toast.error(t('loadFailed'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleFileUpload = async (pageKey, title, file) => {
    if (!file) return;

    setUploading(pageKey);
    setProgress(0);
    setCurrentAction(t('uploading') || 'Uploading...');

    try {
      console.log('Starting upload for:', pageKey);
      
      // 1. Get Signature from Backend
      setCurrentAction('Preparing upload...');
      const { data: signData } = await api.get('/upload/signature');
      
      // 2. Upload directly to Cloudinary
      setCurrentAction('Uploading to Cloud...');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signData.apiKey);
      formData.append('timestamp', signData.timestamp);
      formData.append('signature', signData.signature);
      formData.append('folder', 'school-website');
      
      // Determine resource type: 'raw' for PDF to avoid 401, 'auto' for others
      const isPdf = file.type === 'application/pdf';
      const resourceType = isPdf ? 'raw' : 'auto';
      
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`, 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        }
      );

      const uploadData = uploadResponse.data;
      console.log('Upload successful:', uploadData);
      const pdfUrl = uploadData.secure_url;

      setCurrentAction(t('saving') || 'Saving...');

      // 3. Update Page Content
      const currentPage = pagesData[pageKey] || {};
      const pageData = {
        pageKey,
        title,
        pdfUrl,
        isVisible: currentPage.visible !== undefined ? currentPage.visible : true
      };

      console.log('Saving page data:', pageData);

      const saveResponse = await api.post('/pages', pageData);
      
      const savedPage = saveResponse.data;
      console.log('Page saved:', savedPage);

      toast.success(t('uploadSuccess'));
      await fetchPages(); // Ensure we wait for fetch to complete
    } catch (error) {
      console.error('Error in handleFileUpload:', error);
      toast.error(t('uploadFailed') + ': ' + (error.response?.data?.error?.message || error.message));
    } finally {
      setUploading(null);
      setProgress(0);
      setCurrentAction('');
    }
  };

  const toggleVisibility = async (pageKey, currentData) => {
    if (!currentData) return;

    try {
      const updatedPage = { 
        pageKey,
        title: currentData.title,
        pdfUrl: currentData.pdfUrl,
        isVisible: !currentData.visible 
      };
      await api.post('/pages', updatedPage);

      toast.success(`${t('visibilityUpdated')} ${updatedPage.visible ? t('live') : t('hidden')}`);
      fetchPages();
    } catch (error) {
      toast.error(t('visibilityFailed'));
    }
  };

  const handleDelete = async (pageKey, id) => {
    if (!window.confirm(t('deleteConfirm'))) return;

    try {
      await api.delete(`/pages/${id}`);
      toast.success(t('deleteSuccess'));
      fetchPages();
    } catch (error) {
      toast.error(t('deleteFailed'));
    }
  };

  const toggleExpand = (name) => {
    setExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Helper to count active files in a category
  const countActiveFiles = (items) => {
    let count = 0;
    const traverse = (list) => {
      list.forEach(item => {
        if (item.dropdown) {
          traverse(item.dropdown);
        } else {
          const key = getPageKey(item.path);
          if (pagesData[key]) count++;
        }
      });
    };
    traverse(items);
    return count;
  };

  const renderItem = (item, depth = 0) => {
    const hasChildren = item.dropdown && item.dropdown.length > 0;
    const paddingLeft = `${depth * 1.5}rem`;
    
    // If it's a leaf node (page)
    if (!hasChildren) {
      const pageKey = getPageKey(item.path);
      const currentData = pagesData[pageKey];
      const hasContent = !!currentData;
      const isVisible = currentData?.visible;

      return (
        <div key={item.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors group">
          <div className="flex items-center justify-between py-2.5 pr-4" style={{ paddingLeft }}>
            <div className="flex items-center space-x-3">
              <div className={`p-1.5 rounded-lg ${hasContent ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-400'}`}>
                <FileText size={16} />
              </div>
              <span className={`text-sm font-medium ${hasContent ? 'text-gray-900' : 'text-gray-500'}`}>
                {item.name}
              </span>
            </div>
            
            <div className="flex items-center space-x-3 opacity-60 group-hover:opacity-100 transition-opacity">
              {/* Status Badge */}
              {hasContent && (
                <span className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full ${
                  isVisible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {isVisible ? t('live') : t('hidden')}
                </span>
              )}

              {/* View Link */}
              {hasContent && (
                <button 
                  onClick={() => setPreviewUrl(currentData.pdfUrl)}
                  className="text-[#71C9CE] hover:text-[#5FB8BE] text-xs font-medium"
                >
                  {t('view')}
                </button>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-1">
                <label className="cursor-pointer text-gray-500 hover:text-[#71C9CE] p-1.5 rounded-md hover:bg-[#E0F7FA] transition-colors" title={t('uploadPdf')}>
                  {uploading === pageKey ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Upload size={16} />
                  )}
                  <input 
                    type="file" 
                    accept="application/pdf" 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(pageKey, item.name, e.target.files[0])}
                    disabled={uploading === pageKey}
                  />
                </label>

                {hasContent && (
                  <>
                    <button 
                      onClick={() => toggleVisibility(pageKey, currentData)}
                      className={`p-1.5 rounded-md hover:bg-gray-100 transition-colors ${isVisible ? 'text-green-600' : 'text-gray-400'}`}
                      title={isVisible ? t('hidePage') : t('showPage')}
                    >
                      {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(pageKey, currentData.id)}
                      className="p-1.5 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                      title={t('deleteContent')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // If it's a nested folder (Sub-category)
    const isExpanded = expanded[item.name];
    
    return (
      <div key={item.name} className="border-b border-gray-50 last:border-0">
        <div 
          className="flex items-center justify-between py-2.5 pr-4 cursor-pointer hover:bg-gray-50 transition-colors select-none group"
          style={{ paddingLeft }}
          onClick={() => toggleExpand(item.name)}
        >
          <div className="flex items-center space-x-2 text-gray-700 group-hover:text-gray-900">
            {isExpanded ? <FolderOpen size={16} className="text-[#71C9CE]" /> : <Folder size={16} className="text-gray-400 group-hover:text-[#71C9CE]" />}
            <span className="font-medium text-sm">{item.name}</span>
          </div>
          <ChevronRight size={14} className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`} />
        </div>
        
        {isExpanded && (
          <div className="bg-gray-50/50 border-t border-gray-100 animate-in slide-in-from-top-1 duration-200">
            {item.dropdown.map(subItem => renderItem(subItem, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-[#71C9CE]" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-8 relative pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">{t('manageContent')}</h2>
          <p className="text-gray-500 mt-1">{t('manageContentDesc')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
          >
            <Languages size={16} className="text-blue-600" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <FileCheck size={16} className="text-green-500" />
            <span>{Object.keys(pagesData).length} {t('activeDocuments')}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
        {navStructure.map((category) => {
          const activeCount = countActiveFiles(category.dropdown);
          const Icon = category.icon || Folder;
          
          return (
            <div key={category.name} className={`bg-white rounded-2xl shadow-sm border ${category.borderColor} overflow-hidden hover:shadow-md transition-shadow duration-300`}>
              {/* Card Header */}
              <div 
                className={`px-5 py-4 flex items-center justify-between cursor-pointer ${category.color} bg-opacity-10`}
                onClick={() => toggleExpand(category.name)}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${category.color} bg-white bg-opacity-60`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{category.name}</h3>
                    <p className="text-xs opacity-70 font-medium">{activeCount} {t('activeFiles')}</p>
                  </div>
                </div>
                <div className={`p-1 rounded-full hover:bg-black/5 transition-colors`}>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform duration-300 ${expanded[category.name] ? 'rotate-180' : ''}`} 
                  />
                </div>
              </div>

              {/* Card Body (Accordion Content) */}
              {expanded[category.name] && (
                <div className="border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                  {category.dropdown.map(item => renderItem(item, 1))}
                </div>
              )}
            </div>
          );
        })}
      </div>



  // PDF Preview Modal
  {previewUrl && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setPreviewUrl(null)}>
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <h3 className="font-bold text-gray-800">{t('documentPreview')}</h3>
          </div>
          <button 
            onClick={() => setPreviewUrl(null)} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div id="pdf-preview-container" className="flex-1 bg-gray-100/50 p-6 overflow-y-auto flex flex-col items-center">
          <Document
            file={previewUrl.startsWith('http') ? previewUrl : `${getApiUrl()}${previewUrl}`}
            onLoadSuccess={onDocumentLoadSuccess}
            options={{ withCredentials: false }}
            loading={
              <div className="flex flex-col items-center gap-3 mt-20">
                <Loader2 className="animate-spin text-[#71C9CE]" size={40} />
                <p className="text-gray-500 font-medium">{t('loadingDocument')}</p>
              </div>
            }
            error={
              <div className="flex flex-col items-center gap-3 mt-20 text-red-500">
                <X size={40} />
                <p className="font-medium text-center">
                  {t('failedToLoadPdf')}<br/>
                  <span className="text-sm text-gray-500">The file may be corrupted or incompatible.</span>
                </p>
                <a 
                  href={previewUrl ? (previewUrl.startsWith('http') ? previewUrl : `${getApiUrl()}${previewUrl}`) : '#'}  
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-2 px-4 py-2 bg-[#71C9CE] text-white rounded-lg hover:bg-[#5FB8BE] transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FolderOpen size={16} />
                  {t('openInNewTab') || 'Open in New Tab'}
                </a>
              </div>
            }
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`} 
                pageNumber={index + 1} 
                width={containerWidth ? Math.min(containerWidth - 48, 800) : undefined}
                className="mb-4 shadow-md"
                renderAnnotationLayer={true}
                renderTextLayer={true}
              />
            ))}
          </Document>
        </div>
      </div>
    </div>
  )}
  
  {/* Loading Overlay */}
  {uploading && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
          <div className="bg-blue-50 p-4 rounded-full relative">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-2">{currentAction}</h3>
        <p className="text-gray-500 text-sm mb-6">Please wait while we process your file.</p>
        
        <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between w-full text-xs text-gray-500 font-medium">
          <span>{progress}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  )}
    </div>
  );
};

export default ManagePages;
