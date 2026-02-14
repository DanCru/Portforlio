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
    'hero.systemInit': '// Hệ thống khởi tạo',
    'hero.highlight.years': '2+ Năm',
    'hero.highlight.yearsDesc': 'KINH NGHIỆM THỰC CHIẾN',
    'hero.highlight.projects': '10+ Dự án',
    'hero.highlight.projectsDesc': 'ĐÃ HOÀN THÀNH',
    'hero.highlight.student': 'Sinh viên IT',
    'hero.highlight.studentDesc': 'KHÔNG NGỪNG HỌC HỎI',
    'hero.highlight.dedication': '100%',
    'hero.highlight.dedicationDesc': 'TẬN TÂM',
    'hero.scroll': 'Cuộn xuống',
    
    // About Section
    'about.title': 'Giới thiệu bản thân',
    'about.name': 'Nguyễn Anh Đức',
    'about.description1': 'Tôi là sinh viên năm 3 ngành Công nghệ thông tin với niềm đam mê mãnh liệt về lập trình và phát triển sản phẩm. Mặc dù còn trẻ nhưng tôi đã tích lũy được kinh nghiệm thực tế thông qua vừa học vừa làm.',
    'about.description2': 'Chuyên môn của tôi tập trung vào phát triển web với React, Node.js và các công nghệ hiện đại. Tôi luôn học hỏi và áp dụng những kiến thức mới vào các dự án thực tế.',
    'about.goal.title': 'Mục tiêu nghề nghiệp',
    'about.goal.description': 'Trở thành Full Stack Developer chuyên nghiệp, đóng góp vào các dự án có ý nghĩa và không ngừng phát triển bản thân trong lĩnh vực công nghệ.',
    
    // Experience
    'experience.title': 'Kinh nghiệm làm việc',
    'experience.subtitle': '// Hành trình nghề nghiệp',
    'experience.sectionTitle1': 'Lịch sử',
    'experience.sectionTitle2': 'Hoạt động',
    'experience.keyAchievements': '// Thành tựu nổi bật',
    
    // Skills
    'skills.title': 'Kỹ năng chuyên môn',
    'skills.subtitle': 'Tôi có kinh nghiệm sâu rộng với nhiều công nghệ và framework hiện đại, từ frontend đến backend, từ mobile đến cloud.',
    'skills.sectionSubtitle': '// Năng lực',
    'skills.sectionTitle1': 'Công nghệ',
    'skills.sectionTitle2': 'sử dụng',
    'skills.additionalSkills': 'Kỹ năng bổ sung',
    'skills.agile': 'Agile/Scrum',
    'skills.architecture': 'Kiến trúc hệ thống',
    'skills.performance': 'Tối ưu hiệu suất',
    'skills.security': 'Bảo mật',
    'skills.codeReview': 'Code Review',
    'skills.problemSolving': 'Giải quyết vấn đề',
    'skills.teamLead': 'Quản lý nhóm',
    'skills.communication': 'Giao tiếp khách hàng',
    
    // Education
    'education.title': 'Học vấn & Chứng chỉ',
    'education.subtitle': '// Nền tảng học thuật',
    'education.degrees': 'Bằng cấp',
    'education.certifications': 'Chứng chỉ chuyên môn',
    'education.achievements': 'Thành tựu nổi bật',
    'education.philosophy': 'Triết lý học tập',
    'education.philosophyTitle': 'Triết lý cốt lõi',
    'education.philosophy.text': 'Công nghệ không ngừng thay đổi, vì vậy việc học hỏi liên tục là chìa khóa để duy trì sự cạnh tranh và sáng tạo trong lĩnh vực IT. Tôi luôn cập nhật kiến thức mới và chia sẻ những gì mình học được với cộng đồng.',
    'education.clickToView': 'Nhấp để xem',
    'education.academic': 'Quá trình học tập',
    
    // Projects
    'projects.title': 'Dự án nổi bật',
    'projects.subtitle': 'Tổng hợp các dự án tiêu biểu mà tôi đã tham gia phát triển, từ ứng dụng web quy mô lớn đến giải pháp mobile sáng tạo.',
    'projects.sectionSubtitle': '// Tác phẩm chọn lọc',
    'projects.sectionTitle1': 'Dự án',
    'projects.sectionTitle2': 'nổi bật',
    'projects.viewAll': 'Xem tất cả dự án',
    'projects.viewDetail': 'Xem chi tiết',
    
    // Project Detail
    'projectDetail.back': 'Quay lại',
    'projectDetail.role': 'Vai trò',
    'projectDetail.duration': 'Thời gian',
    'projectDetail.team': 'Nhóm',
    'projectDetail.status': 'Trạng thái',
    'projectDetail.techStack': 'Công nghệ sử dụng',
    'projectDetail.features': 'Tính năng chính',
    'projectDetail.responsibilities': 'Trách nhiệm',
    'projectDetail.gallery': 'Hình ảnh dự án',
    'projectDetail.visitSite': 'Truy cập trang',
    'projectDetail.viewCode': 'Xem mã nguồn',
    
    // Contact
    'contact.title': 'Liên hệ với tôi',
    'contact.subtitle': 'Sẵn sàng thảo luận về dự án của bạn hoặc cơ hội hợp tác mới. Hãy liên hệ để chúng ta có thể tạo ra điều gì đó tuyệt vời cùng nhau.',
    'contact.sectionSubtitle': '// Kết nối',
    'contact.sectionTitle1': 'Liên hệ',
    'contact.sectionTitle2': 'ngay',
    'contact.info': 'Thông tin liên hệ',
    'contact.email': 'Email',
    'contact.emailAction': 'Gửi Email',
    'contact.phone': 'Điện thoại',
    'contact.phoneAction': 'Gọi cho tôi',
    'contact.location': 'Địa chỉ',
    'contact.locationAction': 'Vị trí',
    'contact.socialProfiles': '// Mạng xã hội',
    'contact.sendMessage': 'Gửi tin nhắn',
    'contact.formName': '// Họ tên',
    'contact.formEmail': '// Email',
    'contact.formSubject': '// Chủ đề',
    'contact.formMessage': '// Nội dung',
    'contact.namePlaceholder': 'NHẬP HỌ TÊN',
    'contact.emailPlaceholder': 'NHẬP EMAIL',
    'contact.messagePlaceholder': 'NHẬP NỘI DUNG...',
    'contact.selectSubject': 'CHỌN CHỦ ĐỀ',
    'contact.subjectProject': 'Hợp tác dự án',
    'contact.subjectJob': 'Tuyển dụng / Cơ hội việc làm',
    'contact.subjectOther': 'Câu hỏi khác',
    'contact.submit': 'Gửi tin nhắn',
    'contact.sent': 'Đã gửi thành công',
    'contact.sentDesc': 'Cảm ơn bạn. Tôi sẽ phản hồi sớm nhất có thể.',
    'contact.sending': 'Đang gửi...',
    'contact.error': 'Gửi thất bại. Vui lòng thử lại.',
    
    // Footer
    'footer.description': 'Xây dựng các giải pháp web trực quan, có khả năng mở rộng và hấp dẫn. Luôn sẵn sàng cho thử thách tiếp theo.',
    'footer.navigate': 'Điều hướng',
    'footer.status': 'Trạng thái',
    'footer.openForWork': 'Sẵn sàng làm việc',
    'footer.buildingSolutions': 'Xây dựng giải pháp',
    'footer.basedIn': 'Việt Nam',
    'footer.copyright': '© 2026 Duc.DEV // Bảo lưu mọi quyền',
    'footer.backToTop': 'Về đầu trang',
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
    'hero.systemInit': '// System Initialized',
    'hero.highlight.years': '2+ Years',
    'hero.highlight.yearsDesc': 'COMBAT EXPERIENCE',
    'hero.highlight.projects': '10+ Projects',
    'hero.highlight.projectsDesc': 'MISSIONS COMPLETED',
    'hero.highlight.student': 'IT Student',
    'hero.highlight.studentDesc': 'LEVELING UP',
    'hero.highlight.dedication': '100%',
    'hero.highlight.dedicationDesc': 'DEDICATION',
    'hero.scroll': 'Scroll',
    
    // About Section
    'about.title': 'About Me',
    'about.name': 'Nguyen Anh Duc',
    'about.description1': 'I am a 3rd year IT student with a strong passion for programming and product development. Although young, I have gained practical experience through working while studying.',
    'about.description2': 'My expertise focuses on web development with React, Node.js and modern technologies. I am always learning and applying new knowledge to real projects.',
    'about.goal.title': 'Career Goals',
    'about.goal.description': 'To become a professional Full Stack Developer, contribute to meaningful projects and continuously grow in the technology field.',
    
    // Experience
    'experience.title': 'Work Experience',
    'experience.subtitle': '// Career Path',
    'experience.sectionTitle1': 'Active',
    'experience.sectionTitle2': 'Timeline',
    'experience.keyAchievements': '// Key Achievements',
    
    // Skills
    'skills.title': 'Professional Skills',
    'skills.subtitle': 'I have extensive experience with many modern technologies and frameworks, from frontend to backend, from mobile to cloud.',
    'skills.sectionSubtitle': '// Proficiency',
    'skills.sectionTitle1': 'Technical',
    'skills.sectionTitle2': 'Stack',
    'skills.additionalSkills': 'Additional Skills',
    'skills.agile': 'Agile/Scrum',
    'skills.architecture': 'System Architecture',
    'skills.performance': 'Performance Optimization',
    'skills.security': 'Security Practices',
    'skills.codeReview': 'Code Review',
    'skills.problemSolving': 'Problem Solving',
    'skills.teamLead': 'Team Leadership',
    'skills.communication': 'Client Communication',
    
    // Education
    'education.title': 'Education & Certifications',
    'education.subtitle': '// Academic Background',
    'education.degrees': 'Degrees',
    'education.certifications': 'Professional Certifications',
    'education.achievements': 'Notable Achievements',
    'education.philosophy': 'Learning Philosophy',
    'education.philosophyTitle': 'Core Philosophy',
    'education.philosophy.text': 'Technology is constantly changing, so continuous learning is the key to maintaining competitiveness and innovation in the IT field. I always update new knowledge and share what I learn with the community.',
    'education.clickToView': 'Click to view',
    'education.academic': 'Academic Background',
    
    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle': 'A compilation of representative projects I have participated in developing, from large-scale web applications to innovative mobile solutions.',
    'projects.sectionSubtitle': '// Selected Works',
    'projects.sectionTitle1': 'Featured',
    'projects.sectionTitle2': 'Projects',
    'projects.viewAll': 'View All Projects',
    'projects.viewDetail': 'View Detail',
    
    // Project Detail
    'projectDetail.back': 'Go Back',
    'projectDetail.role': 'Role',
    'projectDetail.duration': 'Duration',
    'projectDetail.team': 'Team',
    'projectDetail.status': 'Status',
    'projectDetail.techStack': 'Tech Stack',
    'projectDetail.features': 'Key Features',
    'projectDetail.responsibilities': 'Responsibilities',
    'projectDetail.gallery': 'Project Gallery',
    'projectDetail.visitSite': 'Visit Site',
    'projectDetail.viewCode': 'View Code',
    
    // Contact
    'contact.title': 'Contact Me',
    'contact.subtitle': 'Ready to discuss your project or new collaboration opportunities. Contact me so we can create something great together.',
    'contact.sectionSubtitle': '// Connect',
    'contact.sectionTitle1': 'Get In',
    'contact.sectionTitle2': 'Touch',
    'contact.info': 'Contact Info',
    'contact.email': 'Email',
    'contact.emailAction': 'Send a Mail',
    'contact.phone': 'Phone',
    'contact.phoneAction': 'Call Me',
    'contact.location': 'Location',
    'contact.locationAction': 'Based In',
    'contact.socialProfiles': '// Social Profiles',
    'contact.sendMessage': 'Send Message',
    'contact.formName': '// Name',
    'contact.formEmail': '// Email',
    'contact.formSubject': '// Subject',
    'contact.formMessage': '// Message',
    'contact.namePlaceholder': 'ENTER NAME',
    'contact.emailPlaceholder': 'ENTER EMAIL',
    'contact.messagePlaceholder': 'ENTER MESSAGE...',
    'contact.selectSubject': 'SELECT SUBJECT',
    'contact.subjectProject': 'Project Collaboration',
    'contact.subjectJob': 'Recruitment / Job Opportunity',
    'contact.subjectOther': 'Other Inquiry',
    'contact.submit': 'Send Message',
    'contact.sent': 'Message Sent',
    'contact.sentDesc': 'Thank you. I will reply shortly.',
    'contact.sending': 'Sending...',
    'contact.error': 'Failed to send. Please try again.',
    
    // Footer
    'footer.description': 'Building intuitive, scalable, and engaging web solutions. Always ready for the next challenge.',
    'footer.navigate': 'Navigate',
    'footer.status': 'Status',
    'footer.openForWork': 'Open for Work',
    'footer.buildingSolutions': 'Building Solutions',
    'footer.basedIn': 'Based in Vietnam',
    'footer.copyright': '© 2026 Duc.DEV // All Rights Reserved',
    'footer.backToTop': 'Back to Top',
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