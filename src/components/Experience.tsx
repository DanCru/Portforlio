import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight, Briefcase } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      title: 'Junior Full Stack Developer',
      company: 'Công ty ABC',
      location: 'Thanh Hóa',
      period: '2025 - PRESENT',
      description: 'Phát triển và bảo trì các ứng dụng web cho khách hàng doanh nghiệp.',
      achievements: [
        'Tham gia phát triển các tính năng mới cho hệ thống quản lý',
        'Tối ưu hóa performance và fix bugs',
        'Học hỏi và áp dụng best practices từ senior developers'
      ],
      technologies: ['React', 'Node.js', 'MySQL', 'Git'],
      rank: 'DIAMOND 1'
    },
    {
      title: 'Intern Developer',
      company: 'Công ty XYZ',
      location: 'Thanh Hóa',
      period: '2024 - 2025',
      description: 'Thực tập và học hỏi quy trình phát triển phần mềm thực tế.',
      achievements: [
        'Hoàn thành các task được giao đúng deadline',
        'Xây dựng các component UI theo design',
        'Viết unit tests và documentation'
      ],
      technologies: ['JavaScript', 'React', 'CSS', 'Git'],
      rank: 'GOLD 3'
    },
    {
      title: 'Freelancer',
      company: 'Dự án cá nhân',
      location: 'Remote',
      period: '2023 - 2024',
      description: 'Nhận và hoàn thành các dự án nhỏ cho khách hàng cá nhân.',
      achievements: [
        'Xây dựng landing pages và website giới thiệu',
        'Tạo các ứng dụng web đơn giản theo yêu cầu',
        'Học cách giao tiếp và làm việc với khách hàng'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'React'],
      rank: 'SILVER 2'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-valorant-black relative overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-valorant-red/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
            <span className="font-mono text-valorant-red uppercase tracking-widest text-sm mb-2">// Career Progression</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
             Mission <span className="text-stroke text-transparent">Kevin</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Center Timeline Line - Desktop */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-white/10" />
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-20 md:mb-24 group">
              
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-valorant-black border border-valorant-red rotate-45 z-10 group-hover:bg-valorant-red transition-colors duration-300 mt-6 hidden md:block" />
              
              <div className={`md:w-5/12 w-full pl-8 md:pl-0 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
              }`}>
                {/* Content Card */}
                <div className="relative bg-white/5 border border-white/10 p-6 clip-path-slant-left hover:bg-white/10 transition-colors duration-300 group-hover:border-valorant-red/50">
                    
                    {/* Rank Badge */}
                   <div className={`absolute -top-3 ${index % 2 === 0 ? 'md:right-4 left-4 md:left-auto' : 'left-4'} bg-valorant-red text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest`}>
                       {exp.rank}
                   </div>

                    <h3 className="text-2xl font-display font-bold text-white uppercase mb-1 mt-2">{exp.title}</h3>
                    <h4 className="text-lg font-mono text-valorant-red mb-4">{exp.company}</h4>
                    
                    <div className={`flex flex-col gap-2 mb-4 text-gray-400 text-sm font-mono ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                         <div className="flex items-center gap-2">
                             <Calendar size={14} /> {exp.period}
                         </div>
                         <div className="flex items-center gap-2">
                             <MapPin size={14} /> {exp.location}
                         </div>
                    </div>

                    <p className="text-gray-300 mb-6 font-sans leading-relaxed text-sm">
                        {exp.description}
                    </p>

                    <div className={`mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h5 className="font-bold text-white uppercase text-xs tracking-widest mb-3">// Objectives Completed</h5>
                        <ul className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className={`flex items-start text-sm text-gray-400 ${index % 2 === 0 ? 'md:justify-end md:text-right' : ''}`}>
                                <span className="mr-2 text-valorant-red">{`>`}</span>
                                {achievement}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;