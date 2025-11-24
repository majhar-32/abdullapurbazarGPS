import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Home, Info, GraduationCap, Megaphone, Image, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = (name) => setDropdownOpen(dropdownOpen === name ? null : name);
  
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { 
      name: 'About Us', 
      path: '#', 
      icon: <Info size={18} />,
      dropdown: [
        { name: 'History', path: '/history' },
        { name: 'Committee', path: '/committee' },
        { name: 'Head Teacher', path: '/headmaster' },
        { name: 'Teachers', path: '/teachers' }
      ]
    },
    { 
      name: 'Academic', 
      path: '#', 
      icon: <GraduationCap size={18} />,
      dropdown: [
        { name: 'Class Routine', path: '/routine' },
        { name: 'Syllabus', path: '/syllabus' },
        { name: 'Result', path: '/result' }
      ]
    },
    { name: 'Notice Board', path: '/notices', icon: <Megaphone size={18} /> },
    { name: 'Gallery', path: '/gallery', icon: <Image size={18} /> },
    { name: 'Contact', path: '/contact', icon: <Phone size={18} /> },
  ];

  return (
    <nav className="bg-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo and School Name */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-13 w-13 rounded-full p-1" />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold leading-tight">Abdullaput Bazar GPS</h1>
              <p className="text-xs text-blue-200">Est. 1977</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {item.dropdown ? (
                  <div 
                    className="flex items-center space-x-1 cursor-pointer hover:text-blue-200 transition-colors py-2"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                    <ChevronDown size={14} />
                  </div>
                ) : (
                  <Link 
                    to={item.path}
                    className="flex items-center space-x-1 cursor-pointer hover:text-blue-200 transition-colors py-2"
                    onClick={item.name === 'Home' ? handleHomeClick : undefined}
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )}

                {/* Dropdown */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-48 bg-white text-gray-800 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left">
                    <div className="py-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link 
                          key={subIndex} 
                          to={subItem.path} 
                          className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
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
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsOpen(false)} className="focus:outline-none">
            <X size={24} />
          </button>
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
                    <Link 
                      key={subIndex} 
                      to={subItem.path} 
                      className="block px-8 py-2 text-sm text-blue-200 hover:text-white border-b border-blue-800"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
