import React from 'react';
import { User, Phone, Mail } from 'lucide-react';

const Teachers = () => {
  // Hardcoded teacher data as requested
  const teachers = [
    { id: 1, name: "Teacher 1", designation: "Head Teacher", phone: "01700000001", email: "teacher1@school.com", imageUrl: null },
    { id: 2, name: "Teacher 2", designation: "Assistant Teacher", phone: "01700000002", email: "teacher2@school.com", imageUrl: null },
    { id: 3, name: "Teacher 3", designation: "Assistant Teacher", phone: "01700000003", email: "teacher3@school.com", imageUrl: null },
    { id: 4, name: "Teacher 4", designation: "Assistant Teacher", phone: "01700000004", email: "teacher4@school.com", imageUrl: null },
    { id: 5, name: "Teacher 5", designation: "Assistant Teacher", phone: "01700000005", email: "teacher5@school.com", imageUrl: null },
    { id: 6, name: "Teacher 6", designation: "Assistant Teacher", phone: "01700000006", email: "teacher6@school.com", imageUrl: null },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
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
                  {teacher.email && (
                    <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                      <Mail size={16} />
                      <span>{teacher.email}</span>
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
