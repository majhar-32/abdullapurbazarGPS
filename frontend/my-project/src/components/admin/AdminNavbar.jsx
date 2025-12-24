import React from 'react';
import { LogOut, User, Menu, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../context/AuthContext';

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { t, language, toggleLanguage } = useTranslation();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/abgps-admin-portal-20@#25-s@cure-12-31#/login');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1" />

      {/* User Menu */}
      <div className="flex items-center space-x-4">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center justify-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700 w-28"
        >
          <Languages size={16} className="text-blue-600" />
          <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-gray-800">{user?.username || 'Admin User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'admin@school.com'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden md:inline">{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
