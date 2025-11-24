import React from 'react';
import HeadmasterMessage from '../../components/ui/HeadmasterMessage';
import { Mail, Phone, Calendar, Award } from 'lucide-react';

const Headmaster = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Reuse the existing message component for the intro */}
      <HeadmasterMessage />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Professional Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Contact Information</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <Mail size={18} className="mr-2 text-gray-400" />
                  <span>headTeacher@villagegps.edu.bd</span>
                </li>
                <li className="flex items-center">
                  <Phone size={18} className="mr-2 text-gray-400" />
                  <span>+880 1711-XXXXXX</span>
                </li>
                <li className="flex items-center">
                  <Calendar size={18} className="mr-2 text-gray-400" />
                  <span>Office Hours: 9:00 AM - 4:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Education</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>M.Ed (Master of Education)</strong> - University of Dhaka</li>
                <li><strong>B.Ed (Bachelor of Education)</strong> - Teachers Training College</li>
                <li><strong>M.A. in Bengali Literature</strong> - National University</li>
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Experience</h3>
            <p className="text-gray-600 leading-relaxed">
              MD.Rafiqul Islam has over 20 years of experience in primary education. He started his career as an Assistant Teacher in 2005 and was promoted to Head Teacher in 2015. He has received multiple awards for his contribution to increasing student enrollment and reducing dropout rates in rural areas.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">Awards & Achievements</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <Award size={18} className="mr-2 text-yellow-500 mt-1" />
                <span>Best Primary School Teacher Award (Upazila Level) - 2012</span>
              </li>
              <li className="flex items-start">
                <Award size={18} className="mr-2 text-yellow-500 mt-1" />
                <span>Innovative Education Leadership Award - 2018</span>
              </li>
              <li className="flex items-start">
                <Award size={18} className="mr-2 text-yellow-500 mt-1" />
                <span>Certificate of Excellence from Ministry of Primary Education - 2022</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Headmaster;
