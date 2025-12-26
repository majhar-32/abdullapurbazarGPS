import React from 'react';

const MapSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Location</h2>
          <div className="h-1 w-16 bg-blue-500 mx-auto"></div>
        </div>
        <div className="w-full h-[400px] rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.1175993764627!2d91.16263037524321!3d24.39012357823937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756b3a54240c88b%3A0xc6693233ad90ea79!2sAbdullahpur%20Bazar%20Government%20Primary%20School!5e1!3m2!1sen!2sbd!4v1764010844688!5m2!1sen!2sbd" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="School Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
