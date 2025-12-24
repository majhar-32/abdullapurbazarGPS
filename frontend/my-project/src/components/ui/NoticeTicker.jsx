import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { noticeService } from '../../services/noticeService';

const NoticeTicker = () => {
  const [notices, setNotices] = useState([]);
  const [settings, setSettings] = useState({
    scrollSpeed: 'MEDIUM',
    maxItems: 10,
    enabled: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesData, settingsData] = await Promise.all([
          noticeService.getTickerNotices(),
          noticeService.getTickerSettings()
        ]);
        
        setNotices(noticesData);
        setSettings(settingsData);
      } catch (error) {
        console.error('Failed to fetch ticker data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Don't show ticker if disabled or no notices
  if (!settings.enabled || notices.length === 0 || loading) {
    return null;
  }

  // Map scroll speed to duration
  const getDuration = () => {
    switch (settings.scrollSpeed) {
      case 'SLOW': return 30;
      case 'FAST': return 15;
      default: return 20; // MEDIUM
    }
  };

  return (
    <div className="bg-blue-900 text-white py-2 overflow-hidden flex items-center">
      <div className="container mx-auto flex items-center px-4">
        <div className="flex items-center bg-red-600 px-2 md:px-3 py-1 rounded mr-2 md:mr-4 z-10 shadow-md whitespace-nowrap">
          <Bell size={16} className="md:mr-2 animate-pulse" />
          <span className="font-bold text-sm hidden md:inline">Notice</span>
        </div>
        
        <div className="flex-grow overflow-hidden relative h-6">
          <motion.div 
            className="whitespace-nowrap absolute"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: getDuration(), ease: "linear" }}
          >
            {notices.map((notice, index) => (
              <span key={notice.id || index} className="mr-12 text-sm md:text-base">
                {notice.title} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NoticeTicker;
