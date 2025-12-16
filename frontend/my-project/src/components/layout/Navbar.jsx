import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight, Home, Info, GraduationCap, Megaphone, Image, Phone, Users, Globe } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t, language, toggleLanguage } = useTranslation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  // Mobile menu toggles
  const toggleDropdown = (name) => {
    setDropdownOpen(dropdownOpen === name ? null : name);
    setNestedDropdownOpen(null); // Reset nested when main toggles
  };

  const toggleNestedDropdown = (name) => {
    setNestedDropdownOpen(nestedDropdownOpen === name ? null : name);
  };
  
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: t('home'), path: '/', icon: <Home size={18} /> },
    {
      name: t('studentAffairs'),
      path: '#',
      icon: <Users size={18} />,
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
      path: '#',
      icon: <GraduationCap size={18} />,
      dropdown: [
        { name: t('teacherInfo'), path: '/teachers' },
        { name: t('homeVisit'), path: '/home-visit' },
        { name: t('casualLeave'), path: '/casual-leave' },
        { name: t('classObservation'), path: '/class-observation' },
        { name: t('trainingInfo'), path: '/training-info' },
        { name: t('dutyDistribution'), path: '/duty-distribution' },
      ]
    },
    {
      name: t('evaluation'),
      path: '#',
      icon: <GraduationCap size={18} />,
      dropdown: [
        { name: t('examSchedule'), path: '/exam-schedule' },
        { name: t('pakkhikPorikkha'), path: '/pakkhik-porikkha' },
        {

          name: t('terminalEvaluationInfo'),
          path: '#',
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
          path: '#',
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
      path: '#', 
      icon: <Info size={18} />,
      dropdown: [
        { name: t('history'), path: '/history' },
        {
          name: t('achievements'),
          path: '#',
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
          path: '#',
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
      path: '#', 
      icon: <GraduationCap size={18} />,
      dropdown: [
        { name: t('schoolInfo'), path: '/school-info' },

        { name: t('headTeachersList'), path: '/head-teachers-list' },
        {
          name: t('register'),
          path: '#',
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
          path: '#',
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
          path: '#',
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
      path: '#',
      icon: <Users size={18} />,
      dropdown: [
        { name: t('managingCommittee'), path: '/committee' },
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
      path: '#',
      icon: <Info size={18} />,
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
      path: '#',
      icon: <GraduationCap size={18} />,
      dropdown: [
        {
          name: t('textbook'),
          path: '#',
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
      path: '#',
      icon: <GraduationCap size={18} />,
      dropdown: [
        {
          name: t('prePrimary4Plus'),
          path: '#',
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
          path: '#',
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
      path: '#',
      icon: <GraduationCap size={18} />,
      dropdown: [
        { name: t('first'), path: '/curriculum/first' },
        { name: t('second'), path: '/curriculum/second' },
        { name: t('third'), path: '/curriculum/third' },
        { name: t('fourth'), path: '/curriculum/fourth' },
        { name: t('fifth'), path: '/curriculum/fifth' },
        { name: t('primaryScience'), path: '/curriculum/primary-science' },


      ]
    },
    { name: t('noticeBoard'), path: '/notices', icon: <Megaphone size={18} /> },
    { name: t('gallery'), path: '/gallery', icon: <Image size={18} /> },
    { name: t('contact'), path: '/contact', icon: <Phone size={18} /> },

  ];

  // Split nav items: first 6 in main navbar, rest in sidebar
  const mainNavItems = navItems.slice(0, 6); // Home, Student Affairs, Teacher Affairs, Evaluation, Academic, About Us
  const sidebarNavItems = navItems.slice(6); // Committee, Registration, Library/Assistance, Pre-Primary, Curriculum/Lesson, Notice Board, Gallery, Contact, Tools

  // Recursive component for Desktop Dropdown
  const DesktopDropdown = ({ items, parentPath }) => {
    return (
      <div className="absolute left-0 mt-0 w-52 bg-white text-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left z-50">
        <div className="py-1">
          {items.map((subItem, subIndex) => (
            <div key={subIndex} className="relative group/nested">
              {subItem.dropdown ? (
                <div className="flex items-center justify-between px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                  <span className="text-lg">{subItem.name}</span>
                  <ChevronRight size={12} />
                  {/* Nested Dropdown (Recursive) */}
                  <div className="absolute left-full top-0 w-52 bg-white text-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover/nested:opacity-100 group-hover/nested:visible transition-all duration-300 transform origin-top-left">
                     <div className="py-1">
                        {subItem.dropdown.map((nestedItem, nestedIndex) => (
                          <div key={nestedIndex} className="relative group/deep-nested">
                             {nestedItem.dropdown ? (
                                <div className="flex items-center justify-between px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer">
                                  <span className="text-base">{nestedItem.name}</span>
                                  <ChevronRight size={12} />
                                   {/* Deep Nested Dropdown */}
                                   <div className="absolute left-full top-0 w-52 bg-white text-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover/deep-nested:opacity-100 group-hover/deep-nested:visible transition-all duration-300 transform origin-top-left">
                                      <div className="py-1">
                                         {nestedItem.dropdown.map((deepItem, deepIndex) => (
                                            <Link
                                              key={deepIndex}
                                              to={deepItem.path}
                                              className="block px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors text-lg"
                                            >
                                              {deepItem.name}
                                            </Link>
                                         ))}
                                      </div>
                                   </div>
                                </div>
                             ) : (
                                <Link
                                  to={nestedItem.path}
                                  className="block px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors text-lg"
                                >
                                  {nestedItem.name}
                                </Link>
                             )}
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              ) : (
                <Link 
                  to={subItem.path} 
                  className="block px-3 py-1.5 hover:bg-blue-50 hover:text-blue-600 transition-colors text-lg"
                >
                  {subItem.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and School Name */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0 mr-6 -ml-4">
            <div className="h-18 w-18 rounded-full overflow-hidden">
              <img src="/logo.png" alt="Logo" className="h-full w-full object-cover scale-110" />
            </div>
            <div className="block">
              <h1 className="text-xl font-bold leading-tight">Abdullapur Bazar GPS</h1>
              <p className="text-xs text-blue-200">Est. 1977</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 items-center flex-1 justify-end">
            {mainNavItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div 
                    className="flex items-center space-x-1 cursor-pointer hover:text-blue-200 transition-colors py-2 whitespace-nowrap"
                  >
                    <span className="font-medium text-lg">{item.name}</span>
                    <ChevronDown size={14} />
                  </div>
                ) : (
                  <Link 
                    to={item.path}
                    className="flex items-center space-x-1 cursor-pointer hover:text-blue-200 transition-colors py-2 whitespace-nowrap"
                    onClick={item.name === 'Home' ? handleHomeClick : undefined}
                  >
                    <span className="font-medium text-lg">{item.name}</span>
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && (
                  <DesktopDropdown items={item.dropdown} />
                )}
              </div>
            ))}
            
            {/* More Button for Sidebar */}
            <button
              onClick={toggleSidebar}
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-200 transition-colors py-2 whitespace-nowrap"
            >
              <Menu size={18} />
              <span className="font-medium text-lg">{t('more')}</span>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center justify-center space-x-1 cursor-pointer hover:text-blue-200 transition-colors py-2 whitespace-nowrap ml-2 border border-blue-400 rounded w-16"
            >
              <Globe size={16} />
              <span className="font-medium text-base">{language === 'bn' ? 'EN' : 'BN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {!isOpen && (
              <button onClick={toggleMenu} className="focus:outline-none">
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </div>


      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-blue-800 bg-opacity-95 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-blue-700">
          <h2 className="text-lg font-bold">{t('menu')}</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 cursor-pointer text-white border border-blue-400 rounded px-2 py-1"
            >
              <Globe size={16} />
              <span className="font-medium text-xs">{language === 'bn' ? 'EN' : 'BN'}</span>
            </button>
            <button onClick={() => setIsOpen(false)} className="focus:outline-none">
              <X size={24} />
            </button>
          </div>
        </div>
        
        <div className="overflow-y-auto h-full pb-20">
          {navItems.map((item, index) => (
            <div key={index}>
              {item.dropdown ? (
                <div 
                  className="px-4 py-3 border-b border-blue-700 flex justify-between items-center cursor-pointer"
                  onClick={() => toggleDropdown(item.name)}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  <ChevronDown size={16} className={`transform transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`} />
                </div>
              ) : (
                <Link 
                  to={item.path}
                  className="px-4 py-3 border-b border-blue-700 flex items-center space-x-2 cursor-pointer hover:bg-blue-700"
                  onClick={() => {
                    if (item.name === 'Home') handleHomeClick();
                    setIsOpen(false);
                  }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              )}
              
              {/* Mobile Dropdown */}
              {item.dropdown && dropdownOpen === item.name && (
                <div className="bg-blue-900">
                  {item.dropdown.map((subItem, subIndex) => (
                    <div key={subIndex}>
                      {subItem.dropdown ? (
                         <div 
                           className="px-8 py-2 text-xl text-blue-200 hover:text-white border-b border-blue-800 flex justify-between items-center cursor-pointer"
                           onClick={(e) => {
                             e.stopPropagation();
                             toggleNestedDropdown(subItem.name);
                           }}
                         >
                           <span>{subItem.name}</span>
                           <ChevronDown size={14} className={`transform transition-transform ${nestedDropdownOpen === subItem.name ? 'rotate-180' : ''}`} />
                         </div>
                      ) : (
                        <Link 
                          to={subItem.path} 
                          className="block px-8 py-2 text-xl text-blue-200 hover:text-white border-b border-blue-800"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      )}

                      {/* Nested Mobile Dropdown */}
                      {subItem.dropdown && nestedDropdownOpen === subItem.name && (
                         <div className="bg-blue-950">
                            {subItem.dropdown.map((nestedItem, nestedIndex) => (
                               <div key={nestedIndex}>
                                  {nestedItem.dropdown ? (
                                    // Deep nested not fully implemented for mobile click-to-expand to avoid infinite complexity, 
                                    // but rendering links if simple. For deep nesting, usually a different UI pattern is better.
                                    // For now, flattening the deep nest or just showing links.
                                    // Let's just render them as links for simplicity or add another level if needed.
                                    // Given the requirement, Demand Report has children.
                                    <div className="pl-12">
                                       <div className="py-2 text-xs text-blue-300 uppercase font-semibold">{nestedItem.name}</div>
                                       {nestedItem.dropdown.map((deepItem, deepIndex) => (
                                          <Link
                                            key={deepIndex}
                                            to={deepItem.path}
                                            className="block py-2 text-xl text-blue-200 hover:text-white border-b border-blue-900"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {deepItem.name}
                                          </Link>
                                       ))}
                                    </div>
                                  ) : (
                                    <Link
                                      to={nestedItem.path}
                                      className="block px-12 py-2 text-xl text-blue-200 hover:text-white border-b border-blue-900"
                                      onClick={() => setIsOpen(false)}
                                    >
                                      {nestedItem.name}
                                    </Link>
                                  )}
                               </div>
                            ))}
                         </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Sidebar for More Items */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center p-4 bg-blue-700 text-white">
            <h2 className="text-lg font-bold">{t('more')}</h2>
            <button onClick={toggleSidebar} className="p-1 hover:bg-blue-600 rounded">
              <X size={24} />
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {sidebarNavItems.map((item, index) => (
              <div key={index} className="mb-2">
                {item.dropdown ? (
                  <div>
                    <div
                      className="flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg cursor-pointer transition-colors border border-blue-100 shadow-sm"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold">{item.name}</span>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`transform transition-transform ${
                          dropdownOpen === item.name ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                    {dropdownOpen === item.name && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            {subItem.dropdown ? (
                              <div>
                                <div
                                  className="flex items-center justify-between p-2.5 text-xl font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-800 rounded-md transition-colors cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleNestedDropdown(subItem.name);
                                  }}
                                >
                                  <span>{subItem.name}</span>
                                  <ChevronDown
                                    size={16}
                                    className={`transform transition-transform ${
                                      nestedDropdownOpen === subItem.name ? 'rotate-180' : ''
                                    }`}
                                  />
                                </div>
                                {nestedDropdownOpen === subItem.name && (
                                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-200 pl-2">
                                    {subItem.dropdown.map((nestedItem, nestedIndex) => (
                                      <Link
                                        key={nestedIndex}
                                        to={nestedItem.path}
                                        className="block p-2 text-lg text-gray-600 hover:text-blue-800 transition-colors"
                                        onClick={() => {
                                          setSidebarOpen(false);
                                          setDropdownOpen(null);
                                          setNestedDropdownOpen(null);
                                        }}
                                      >
                                        {nestedItem.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link
                                to={subItem.path}
                                className="block p-2.5 text-xl font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-800 rounded-md transition-colors"
                                onClick={() => {
                                  setSidebarOpen(false);
                                  setDropdownOpen(null);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="flex items-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg transition-colors border border-blue-100 shadow-sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="font-semibold">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={toggleSidebar}
        />
      )}
    </nav>
  );
};

export default Navbar;
