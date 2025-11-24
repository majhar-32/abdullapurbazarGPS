import React from 'react';
import { Quote } from 'lucide-react';

const HeadmasterMessage = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg transform translate-x-3 translate-y-3"></div>
              <img 
                src="/headmaster.png" 
                alt="Headmaster" 
                className="relative rounded-lg shadow-xl w-64 md:w-80 h-auto object-cover border-4 border-white"
              />
            </div>
          </div>

          {/* Text Section */}
          <div className="w-full md:w-2/3">
            <div className="flex items-center mb-4">
              <div className="h-1 w-12 bg-blue-600 mr-3"></div>
              <h2 className="text-blue-600 font-bold uppercase tracking-wide text-sm">Head Teacher's Message</h2>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Welcome to Our School
            </h3>

            <div className="relative">
              <Quote className="absolute -top-4 -left-2 text-blue-100 w-16 h-16 -z-10" />
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                "Education is the most powerful weapon which you can use to change the world. 
                At Village Government Primary School, we are committed to providing a nurturing 
                and inclusive environment where every child can thrive. Our dedicated teachers 
                work tirelessly to ensure that our students not only excel academically but also 
                grow into responsible and compassionate citizens. We believe in the holistic 
                development of our students, fostering their creativity, critical thinking, 
                and moral values."
              </p>
            </div>

            <div className="mt-8">
              <h4 className="text-xl font-bold text-gray-800">Md. Abdul Karim</h4>
              <p className="text-blue-600 font-medium">Head Teacher</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeadmasterMessage;
