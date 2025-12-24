import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Settings, 
  LogOut,
  FileText,
  Users,
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const { t } = useTranslation();

  const menuItems = [
    { name: t('notices'), path: '/abgps-admin-portal-20@_25-s@cure-12-31_/notices', icon: Bell },
    { name: t('events'), path: '/abgps-admin-portal-20@_25-s@cure-12-31_/events', icon: Calendar },
    { name: t('managePages'), path: '/abgps-admin-portal-20@_25-s@cure-12-31_/pages', icon: FileText },
    { name: t('tickerSettings'), path: '/abgps-admin-portal-20@_25-s@cure-12-31_/settings/ticker', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-slate-800 text-white h-full transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">{t('adminPanel')}</h1>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-slate-700'
            }`}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700 text-sm text-gray-400">
          <p>© 2024 School Admin</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
