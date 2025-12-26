import React from 'react';
import { Users, BookOpen, Trophy, Star, GraduationCap, MonitorPlay, Banknote, ShieldCheck, Library } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatCard = ({ icon: Icon, label, value, suffix = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div
      ref={ref}
      className="bg-[#CBF1F5] p-8 rounded-2xl text-center text-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
    >
      <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <Icon size={32} className="text-red-500" />
      </div>
      <h3 className="text-4xl font-bold mb-2 text-gray-800">
        {inView ? <CountUp end={value} duration={2.5} separator="," /> : '0'}
        {suffix}
      </h3>
      <p className="text-gray-600 font-medium uppercase tracking-wider text-sm">{label}</p>
    </div>
  );
};

const SchoolFeatures = () => {
  const stats = [
    {
      id: 1,
      label: "Total Students",
      value: 329,
      suffix: "",
      icon: Users
    },
    {
      id: 2,
      label: "Teachers",
      value: 6,
      suffix: "",
      icon: BookOpen
    },
    {
      id: 4,
      label: "Years of Excellence",
      value: 48,
      suffix: "",
      icon: Star
    }
  ];

  const features = [
    {
      id: 1,
      title: "Experienced Teachers",
      description: "Highly qualified and dedicated faculty members ensuring quality education.",
      icon: <GraduationCap size={40} />,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Digital Classrooms",
      description: "Modern multimedia-enabled classrooms for interactive learning.",
      icon: <MonitorPlay size={40} />,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200"
    },
    {
      id: 5,
      title: "Safe Environment",
      description: "Secure, child-friendly, and green campus environment.",
      icon: <ShieldCheck size={40} />,
      color: "bg-red-100 text-red-600",
      borderColor: "border-red-200"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-blue-600">Abdullapur Bazar GPS?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a nurturing environment where every child can grow, learn, and excel.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`bg-white p-8 rounded-xl border ${feature.borderColor} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 group`}
            >
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard 
              key={stat.id}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolFeatures;
