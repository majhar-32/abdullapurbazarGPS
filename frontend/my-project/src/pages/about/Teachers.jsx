import React from 'react';
import { User, Phone } from 'lucide-react';

import SEO from '../../components/common/SEO';

const Teachers = () => {
  // Hardcoded teacher data as requested
  const teachers = [
    { id: 1, name: "রফিকুল ইসলাম", designation: "Head Teacher", phone: "01716849460", imageUrl: "/teacher1.png" },
    { id: 2, name: "রায়হান আহম্মেদ", designation: "Assistant Teacher", phone: "01912225377", imageUrl: "/teacher2.png" },
    { id: 3, name: "সফিকুল ইসলাম", designation: "Assistant Teacher", phone: "01710196063", imageUrl: "/teacher3.png" },
    { id: 4, name: "মোস্তফা কামাল", designation: "Assistant Teacher", phone: "01622210023", imageUrl: "/teacher4.png" },
    { id: 5, name: "হারুন অর রশিদ", designation: "Assistant Teacher", phone: "01608790817", imageUrl: "/teacher5.png" },
    { id: 6, name: "হেপি আক্তার", designation: "Assistant Teacher", phone: "01936325456", imageUrl: "/teacher6.png" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEO 
        title="Our Teachers" 
        description="Meet the dedicated teachers of Abdullapur Bazar Government Primary School."
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Teachers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of educators who are committed to nurturing the next generation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group">
              {/* Image Section */}
              <div className="bg-blue-50 h-64 flex items-center justify-center relative overflow-hidden">
                {teacher.imageUrl ? (
                  <img 
                    src={teacher.imageUrl} 
                    alt={teacher.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                ) : (
                  <User size={64} className="text-blue-300 group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>

              <div className="p-6 text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{teacher.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-4">{teacher.designation}</p>
                
                <div className="flex flex-col items-center gap-2 text-gray-500 text-sm">
                  {teacher.phone && (
                    <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <Phone size={16} />
                      <span>{teacher.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
