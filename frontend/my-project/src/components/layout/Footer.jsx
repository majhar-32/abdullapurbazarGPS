import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Linkedin, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: School Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full bg-white p-1" />
              <div>
                <h3 className="text-xl font-bold leading-tight">Abdullapur Bazar Government<br/>Primary School</h3>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Est. 1990. We are dedicated to providing quality primary education to nurture the future leaders of our nation. Our focus is on holistic development and moral values.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=100015057793581" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Youtube size={18} />
              </a>
              <a href="#" className="bg-blue-800 p-2 rounded-full hover:bg-blue-600 transition-colors">
                <Linkedin size={18} />
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

          {/* Column 3: Academic */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-blue-700 pb-2 inline-block">Academic</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/routine" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Class Routine
                </Link>
              </li>
              <li>
                <Link to="/syllabus" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Syllabus
                </Link>
              </li>
              <li>
                <Link to="/result" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Exam Results
                </Link>
              </li>
              <li>
                <Link to="/admission" className="text-blue-200 hover:text-white hover:pl-2 transition-all flex items-center">
                  <ArrowRight size={14} className="mr-2" /> Admission Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-blue-700 pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-blue-200 text-sm">
                  Village Name, Post Office,<br />
                  Upazila Name, District - 1234
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">01711-XXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-blue-400 flex-shrink-0" />
                <span className="text-blue-200 text-sm">info@abgps.edu.bd</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-blue-300">
          <p>&copy; {new Date().getFullYear()} Abdullapur Bazar Government Primary School. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Developed by <span className="text-white font-medium">Your Name/Company</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
