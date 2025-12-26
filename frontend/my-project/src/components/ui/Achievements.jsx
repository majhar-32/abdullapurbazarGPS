import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Trophy, Medal, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';



const AwardCard = ({ title, year, description, icon: Icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />
    <div className="relative z-10">
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-3 inline-block">
        {year}
      </span>
      <h4 className="text-xl font-bold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  </motion.div>
);

const Achievements = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with Gradient */}
      <div className="absolute inset-0 bg-[#FCF8F8] z-0" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl mix-blend-screen animate-blob" />
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute -bottom-10 left-1/2 w-64 h-64 bg-pink-500 rounded-full blur-3xl mix-blend-screen animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-blue-300 font-bold tracking-widest uppercase text-sm"
          >
            Our Pride & Glory
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4"
          >
            School Achievements
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1 bg-blue-400 mx-auto rounded-full"
          />
        </div>

        {/* Stats Grid */}


        {/* Recent Awards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AwardCard 
            icon={Trophy}
            year="2024"
            title="Best Primary School"
            description="Awarded by the Ministry of Education for excellence in academic performance and infrastructure."
          />
          <AwardCard 
            icon={Medal}
            year="2023"
            title="National Sports Champion"
            description="Our students secured 1st place in the National Inter-School Sports Competition."
          />
          <AwardCard 
            icon={Award}
            year="2023"
            title="Digital Innovation Award"
            description="Recognized for implementing smart classrooms and digital attendance systems."
          />
        </div>
      </div>
    </section>
  );
};

export default Achievements;
