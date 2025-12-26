import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1B3C53] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: School Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="h-18 w-18 rounded-full overflow-hidden">
                <img src="/logo.png" alt="Logo" className="h-full w-full object-cover scale-110" />
              </div>
              <div className="block">
                <h3 className="text-xl font-bold leading-tight">Abdullapur Bazar GPS</h3>
                <p className="text-xs text-blue-200">Austagram, Kishoreganj</p>
                <p className="text-xs text-blue-200">Est. 1977</p>
              </div>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Est. 1977. We are dedicated to providing quality primary education to nurture the future leaders of our nation. Our focus is on holistic development and moral values.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100063690812490&mibextid=ZbWKwL" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/channel/UCN9UZVVYZxvgp8iUJ-aAayg" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-blue-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Home
                </Link>
              </li>
              <li>     
                <Link to="/history" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Our Teachers
                </Link>
              </li>
              <li>
                <Link to="/routine" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Class Routine
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Notice Board
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-blue-700 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-blue-200 text-sm">
                  Abdullapur, Austagram<br />
                  Kishoreganj
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">01716849460</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-blue-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">rafiqulht77@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8 mt-8 flex flex-col md:flex-row justify-center items-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Abdullapur Bazar Government Primary School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
