import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Experience = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      title: 'Junior Full Stack Developer',
      company: 'Công ty ABC',
      location: 'Thanh Hóa',
      period: '2025 - Hiện tại',
      description: 'Phát triển và bảo trì các ứng dụng web cho khách hàng doanh nghiệp.',
      achievements: [
        'Tham gia phát triển các tính năng mới cho hệ thống quản lý',
        'Tối ưu hóa performance và fix bugs',
        'Học hỏi và áp dụng best practices từ senior developers'
      ],
      technologies: ['React', 'Node.js', 'MySQL', 'Git']
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
      technologies: ['JavaScript', 'React', 'CSS', 'Git']
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
      technologies: ['HTML', 'CSS', 'JavaScript', 'React']
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('experience.title')}
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto"></div>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Center Timeline Line - Desktop */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-sky-200 dark:bg-sky-800 hidden lg:block"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-16 lg:mb-20">
              {/* Mobile Timeline Line */}
              <div className="absolute left-6 top-20 w-0.5 h-full bg-sky-200 dark:bg-sky-800 lg:hidden"></div>
              
              {/* Timeline Dot - Mobile */}
              <div className="absolute left-4 top-6 w-4 h-4 bg-sky-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg lg:hidden"></div>
              
              {/* Timeline Dot - Desktop */}
              <div className="absolute left-1/2 top-6 transform -translate-x-1/2 w-6 h-6 bg-sky-500 rounded-full border-4 border-white dark:border-gray-900 shadow-lg hidden lg:block z-10"></div>
              
              <div className={`lg:w-5.4/12 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                index % 2 === 0 ? 'lg:ml-0 lg:mr-[51%]' : 'lg:ml-[51%] lg:mr-0'
              } ml-14 md:ml-16 lg:ml-0`}>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3 md:mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">{exp.title}</h3>
                    <h4 className="text-lg md:text-xl text-sky-600 font-semibold">{exp.company}</h4>
                  </div>
                  <div className="flex flex-col lg:items-end mt-2 lg:mt-0">
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
                      <Calendar size={16} className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin size={16} className="mr-2" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                <div className="mb-4">
                  <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Thành tựu chính:</h5>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="flex items-start">
                        <ChevronRight size={16} className="text-sky-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
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