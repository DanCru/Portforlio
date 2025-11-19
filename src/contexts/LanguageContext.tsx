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
    'hero.title': 'Chuyên gia Công nghệ thông tin',
    'hero.subtitle': 'Chuyên về phát triển phần mềm, kiến trúc hệ thống và công nghệ cloud. Với hơn 8 năm kinh nghiệm, tôi đã giúp nhiều doanh nghiệp chuyển đổi số thành công.',
    'hero.cta1': 'Khám phá thêm',
    'hero.cta2': 'Liên hệ ngay',
    
    // About Section
    'about.title': 'Giới thiệu bản thân',
    'about.name': 'Nguyễn Anh Đức',
    'about.description1': 'Tôi là một chuyên gia công nghệ thông tin với niềm đam mê sáng tạo và giải quyết các thách thức phức tạp thông qua công nghệ. Với hơn 8 năm kinh nghiệm trong ngành, tôi đã tham gia phát triển nhiều hệ thống quy mô lớn và giúp các doanh nghiệp chuyển đổi số thành công.',
    'about.description2': 'Chuyên môn của tôi tập trung vào phát triển ứng dụng web, kiến trúc microservices, và triển khai trên cloud. Tôi luôn theo đuổi những công nghệ mới nhất và áp dụng các best practices để đảm bảo chất lượng và hiệu suất cao nhất.',
    'about.goal.title': 'Mục tiêu nghề nghiệp',
    'about.goal.description': 'Trở thành Solution Architect hàng đầu, đóng góp vào việc xây dựng các hệ thống công nghệ tiên tiến và giúp các doanh nghiệp Việt Nam nâng cao năng lực số hóa.',
    
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
    'hero.title': 'IT Technology Expert',
    'hero.subtitle': 'Specialized in software development, system architecture and cloud technology. With over 8 years of experience, I have helped many businesses successfully transform digitally.',
    'hero.cta1': 'Explore More',
    'hero.cta2': 'Contact Now',
    
    // About Section
    'about.title': 'About Me',
    'about.name': 'Nguyen Anh Duc',
    'about.description1': 'I am an IT expert with a passion for creativity and solving complex challenges through technology. With over 8 years of industry experience, I have participated in developing many large-scale systems and helped businesses successfully transform digitally.',
    'about.description2': 'My expertise focuses on web application development, microservices architecture, and cloud deployment. I always pursue the latest technologies and apply best practices to ensure the highest quality and performance.',
    'about.goal.title': 'Career Goals',
    'about.goal.description': 'To become a leading Solution Architect, contributing to building advanced technology systems and helping Vietnamese businesses enhance their digital capabilities.',
    
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