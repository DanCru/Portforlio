import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  vi: {
    // Navigation
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.experience': 'Kinh nghiệm',
    'nav.skills': 'Kỹ năng',
    'nav.education': 'Học vấn',
    'nav.projects': 'Dự án',
    'nav.contact': 'Liên hệ',
    
    // Hero Section
    'hero.title': 'Web Developer',
    'hero.subtitle': 'Sinh viên năm 3 ngành Công nghệ thông tin, đam mê phát triển phần mềm và xây dựng sản phẩm thực tế. Vừa học vừa làm, không ngừng trau dồi kỹ năng qua các dự án thực chiến.',
    'hero.cta1': 'Khám phá thêm',
    'hero.cta2': 'Liên hệ ngay',
    
    // About Section
    'about.title': 'Giới thiệu bản thân',
    'about.name': 'Nguyễn Anh Đức',
    'about.description1': 'Tôi là sinh viên năm 3 ngành Công nghệ thông tin với niềm đam mê mãnh liệt về lập trình và phát triển sản phẩm. Mặc dù còn trẻ nhưng tôi đã tích lũy được kinh nghiệm thực tế thông qua vừa học vừa làm.',
    'about.description2': 'Chuyên môn của tôi tập trung vào phát triển web với React, Node.js và các công nghệ hiện đại. Tôi luôn học hỏi và áp dụng những kiến thức mới vào các dự án thực tế.',
    'about.goal.title': 'Mục tiêu nghề nghiệp',
    'about.goal.description': 'Trở thành Full Stack Developer chuyên nghiệp, đóng góp vào các dự án có ý nghĩa và không ngừng phát triển bản thân trong lĩnh vực công nghệ.',
    
    // Experience
    'experience.title': 'Kinh nghiệm làm việc',
    
    // Skills
    'skills.title': 'Kỹ năng chuyên môn',
    'skills.subtitle': 'Tôi có kinh nghiệm sâu rộng với nhiều công nghệ và framework hiện đại, từ frontend đến backend, từ mobile đến cloud.',
    
    // Education
    'education.title': 'Học vấn & Chứng chỉ',
    'education.degrees': 'Bằng cấp',
    'education.certifications': 'Chứng chỉ chuyên môn',
    'education.achievements': 'Thành tựu nổi bật',
    'education.philosophy': 'Triết lý học tập',
    'education.philosophy.text': 'Công nghệ không ngừng thay đổi, vì vậy việc học hỏi liên tục là chìa khóa để duy trì sự cạnh tranh và sáng tạo trong lĩnh vực IT. Tôi luôn cập nhật kiến thức mới và chia sẻ những gì mình học được với cộng đồng.',
    
    // Projects
    'projects.title': 'Dự án nổi bật',
    'projects.subtitle': 'Tổng hợp các dự án tiêu biểu mà tôi đã tham gia phát triển, từ ứng dụng web quy mô lớn đến giải pháp mobile sáng tạo.',
    
    // Contact
    'contact.title': 'Liên hệ với tôi',
    'contact.subtitle': 'Sẵn sàng thảo luận về dự án của bạn hoặc cơ hội hợp tác mới. Hãy liên hệ để chúng ta có thể tạo ra điều gì đó tuyệt vời cùng nhau.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.experience': 'Experience',
    'nav.skills': 'Skills',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Web Developer',
    'hero.subtitle': '3rd year IT student passionate about software development and building real products. Learning while working, constantly improving skills through hands-on projects.',
    'hero.cta1': 'Explore More',
    'hero.cta2': 'Contact Now',
    
    // About Section
    'about.title': 'About Me',
    'about.name': 'Nguyen Anh Duc',
    'about.description1': 'I am a 3rd year IT student with a strong passion for programming and product development. Although young, I have gained practical experience through working while studying.',
    'about.description2': 'My expertise focuses on web development with React, Node.js and modern technologies. I am always learning and applying new knowledge to real projects.',
    'about.goal.title': 'Career Goals',
    'about.goal.description': 'To become a professional Full Stack Developer, contribute to meaningful projects and continuously grow in the technology field.',
    
    // Experience
    'experience.title': 'Work Experience',
    
    // Skills
    'skills.title': 'Professional Skills',
    'skills.subtitle': 'I have extensive experience with many modern technologies and frameworks, from frontend to backend, from mobile to cloud.',
    
    // Education
    'education.title': 'Education & Certifications',
    'education.degrees': 'Degrees',
    'education.certifications': 'Professional Certifications',
    'education.achievements': 'Notable Achievements',
    'education.philosophy': 'Learning Philosophy',
    'education.philosophy.text': 'Technology is constantly changing, so continuous learning is the key to maintaining competitiveness and innovation in the IT field. I always update new knowledge and share what I learn with the community.',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A compilation of representative projects I have participated in developing, from large-scale web applications to innovative mobile solutions.',
    
    // Contact
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Ready to discuss your project or new collaboration opportunities. Contact me so we can create something great together.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'vi' ? 'en' : 'vi');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};