import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Liên kết nhanh',
      links: [
        { name: 'Trang chủ', href: '#home' },
        { name: 'Giới thiệu', href: '#about' },
        { name: 'Kinh nghiệm', href: '#experience' },
        { name: 'Dự án', href: '#projects' },
      ]
    },
    {
      title: 'Dịch vụ',
      links: [
        { name: 'Phát triển Web', href: '#' },
        { name: 'Mobile App', href: '#' },
        { name: 'Tư vấn công nghệ', href: '#' },
        { name: 'Code Review', href: '#' },
      ]
    },
    {
      title: 'Công nghệ',
      links: [
        { name: 'React/Next.js', href: '#' },
        { name: 'Node.js', href: '#' },
        { name: 'AWS/Azure', href: '#' },
        { name: 'Docker/K8s', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-slate-900 dark:bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Nguyễn Anh Đức</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Chuyên gia IT với 8+ năm kinh nghiệm, chuyên về phát triển 
              phần mềm và kiến trúc hệ thống hiện đại.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-sky-500 hover:bg-sky-600 p-2 rounded transition-colors">
                LinkedIn
              </a>
              <a href="#" className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition-colors">
                GitHub
              </a>
              <a href="#" className="bg-sky-400 hover:bg-sky-500 p-2 rounded transition-colors">
                Twitter
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-xl font-semibold mb-2">Đăng ký nhận tin tức công nghệ</h4>
              <p className="text-gray-300">
                Cập nhật những xu hướng và tip công nghệ mới nhất từ tôi
              </p>
            </div>
            <div className="flex">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              />
              <button className="bg-sky-500 hover:bg-sky-600 px-6 py-3 rounded-r-lg font-medium transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-300 mb-4 md:mb-0">
              <span>© 2024 Nguyễn Anh Đức. Được phát triển với</span>
              <Heart className="mx-2 text-red-500" size={16} />
              <span>và React + TypeScript</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Chính sách bảo mật
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Điều khoản sử dụng
              </a>
              <button
                onClick={scrollToTop}
                className="bg-sky-500 hover:bg-sky-600 p-2 rounded-full transition-colors"
                aria-label="Scroll to top"
              >
                <ArrowUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;