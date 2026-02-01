import React from 'react';
import { GraduationCap, Award, BookOpen, Star } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Education = () => {
  const { t } = useLanguage();

  const education = [
    {
      degree: 'Cử nhân Công nghệ thông tin',
      school: 'Đại học [Tên trường]',
      year: '2024 - Hiện tại (Năm 3)',
      gpa: '_/4.0',
      description: 'Đang theo học chương trình Đại học, song song với công việc thực tế',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      degree: 'Cao đẳng Công nghệ thông tin',
      school: 'FPT Polytechnic',
      year: '2021 - 2024',
      gpa: '_/4.0',
      description: 'Tốt nghiệp với kiến thức nền tảng vững chắc về lập trình',
      image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const certifications = [
    {
      name: 'JavaScript Algorithms & Data Structures',
      issuer: 'freeCodeCamp',
      year: '2024',
      level: 'Certified',
      icon: '📜',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      year: '2023',
      level: 'Certified',
      icon: '🎨',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'React - The Complete Guide',
      issuer: 'Udemy',
      year: '2024',
      level: 'Completed',
      icon: '⚛️',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Git & GitHub Bootcamp',
      issuer: 'Udemy',
      year: '2023',
      level: 'Completed',
      icon: '🔀',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const achievements = [
    {
      title: 'Hoàn thành dự án thực tế đầu tiên',
      year: '2024',
      description: 'Xây dựng website cho khách hàng thật',
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Tốt nghiệp FPT Polytechnic',
      year: '2024',
      description: 'Hoàn thành chương trình Cao đẳng CNTT',
      image: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      title: 'Bắt đầu làm việc thực tế',
      year: '2024',
      description: 'Vừa học vừa làm, tích lũy kinh nghiệm',
      image: 'https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('education.title')}
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto"></div>
        </div>

        {/* Education */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            <GraduationCap className="inline-block mr-3" size={32} />
            {t('education.degrees')}
          </h3>
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-36 md:h-48 overflow-hidden">
                  <img 
                    src={edu.image} 
                    alt={edu.school}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <div className="flex items-start mb-3 md:mb-4">
                    <div className="bg-sky-500 p-2 rounded-lg mr-3 md:mr-4">
                      <GraduationCap className="text-white" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1">{edu.degree}</h4>
                      <p className="text-sky-600 font-semibold text-sm md:text-base">{edu.school}</p>
                    </div>
                  </div>
                  <div className="ml-11 md:ml-14">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">{edu.year}</span>
                      <span className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 px-3 py-1 rounded-full text-xs md:text-sm font-medium w-fit">
                        GPA: {edu.gpa}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">{edu.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            <Award className="inline-block mr-3" size={32} />
            {t('education.certifications')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                onClick={() => window.open(cert.image, '_blank')}
              >
                <div className="h-32 overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">{cert.icon}</div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{cert.name}</h4>
                    <p className="text-sky-600 dark:text-sky-400 font-medium text-sm">{cert.issuer}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{cert.year}</span>
                    <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {cert.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            <Star className="inline-block mr-3" size={32} />
            {t('education.achievements')}
          </h3>
          <div className="grid lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="bg-sky-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-white" size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{achievement.title}</h4>
                  <p className="text-sky-600 dark:text-sky-400 font-semibold mb-2">{achievement.year}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Philosophy */}
        <div 
          className="mt-16 rounded-lg p-8 text-center text-white relative overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-slate-900/80 dark:bg-black/80"></div>
          <div className="relative z-10">
            <BookOpen className="mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold mb-4">{t('education.philosophy')}</h3>
            <p className="text-lg max-w-2xl mx-auto">
              "{t('education.philosophy.text')}"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;