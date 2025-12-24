import React from 'react';
import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube } from 'lucide-react';

import SEO from '../components/common/SEO';

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEO 
        title="Contact Us" 
        description="Contact Abdullapur Bazar Government Primary School. Find our location, phone number, and email address."
      />
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">Our Location</h1>
          <div className="h-1 w-16 bg-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500">Visit us at our campus</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Left Column: Map */}
          <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm p-2 border border-gray-100 h-[400px] lg:h-auto min-h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.1175993764627!2d91.16263037524321!3d24.39012357823937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756b3a54240c88b%3A0xc6693233ad90ea79!2sAbdullahpur%20Bazar%20Government%20Primary%20School!5e1!3m2!1sen!2sbd!4v1764010844688!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '0.75rem' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
            
          </div>

          {/* Right Column: Contact Info */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            
            {/* Contact Information Card */}
            <div className="bg-white rounded-xl shadow-sm border-t-4 border-blue-500 p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-12 -mt-12 z-0"></div>
              
              <h2 className="text-2xl font-bold text-blue-800 mb-8 relative z-10">Contact Information</h2>
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4 flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Address</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Abdullapur<br />
                      Austagram, Kishoreganj - 2371
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4 flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">01711-XXXXXX</p>
                    <p className="text-gray-600 text-sm">01819-XXXXXX</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600 mr-4 flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 mb-1">Email</h3>
                    <p className="text-gray-600 text-sm">info@abgps.edu.bd</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us Card */}
            <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Follow Us</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://www.facebook.com/profile.php?id=100015057793581" className="bg-blue-50 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Facebook size={20} />
                </a>
                <a href="#" className="bg-blue-50 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Youtube size={20} />
                </a>
                <a href="#" className="bg-blue-50 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
