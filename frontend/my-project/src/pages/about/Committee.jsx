import React from 'react';
import { User, Phone, Mail } from 'lucide-react';

import SEO from '../../components/common/SEO';

const Committee = () => {
  // Hardcoded committee data as requested
  const members = [
    { id: 1, name: "Member 1", role: "President", phone: "01700000001", email: "member1@school.com", imageUrl: null },
    { id: 2, name: "Member 2", role: "Vice President", phone: "01700000002", email: "member2@school.com", imageUrl: null },
    { id: 3, name: "Member 3", role: "Member", phone: "01700000003", email: "member3@school.com", imageUrl: null },
    { id: 4, name: "Member 4", role: "Member", phone: "01700000004", email: "member4@school.com", imageUrl: null },
    { id: 5, name: "Member 5", role: "Member", phone: "01700000005", email: "member5@school.com", imageUrl: null },
    { id: 6, name: "Member 6", role: "Member", phone: "01700000006", email: "member6@school.com", imageUrl: null },
    { id: 7, name: "Member 7", role: "Member", phone: "01700000007", email: "member7@school.com", imageUrl: null },
    { id: 8, name: "Member 8", role: "Member", phone: "01700000008", email: "member8@school.com", imageUrl: null },
    { id: 9, name: "Member 9", role: "Member", phone: "01700000009", email: "member9@school.com", imageUrl: null },
    { id: 10, name: "Member 10", role: "Member", phone: "01700000010", email: "member10@school.com", imageUrl: null },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <SEO 
        title="Managing Committee" 
        description="Meet the School Managing Committee (SMC) of Abdullapur Bazar Government Primary School."
      />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Managing Committee</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our School Managing Committee (SMC) plays a vital role in the development and governance of the school. 
            They are dedicated to ensuring the best educational environment for our students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {members.map((member) => (
            <div key={member.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200 flex items-center justify-center">
                {member.imageUrl ? (
                  <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 font-medium text-sm">{member.role}</p>
                <div className="mt-2 space-y-1">
                  {member.phone && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Phone size={12} />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.email && (
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <Mail size={12} />
                      <span>{member.email}</span>
                    </div>
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

export default Committee;
