import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bell, 
  Calendar, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Notices', path: '/admin/notices', icon: Bell },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Teachers', path: '/admin/teachers', icon: Users },
    { name: 'Ticker Settings', path: '/admin/settings/ticker', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`bg-slate-800 text-white h-screen fixed left-0 top-0 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
      {/* Logo */}
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Admin Panel</h1>}
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
