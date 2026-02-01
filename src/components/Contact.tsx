import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'minh.nguyen.dev@gmail.com',
      link: 'mailto:minh.nguyen.dev@gmail.com'
    },
    {
      icon: Phone,
      title: 'Điện thoại',
      value: '+84 901 234 567',
      link: 'tel:+84901234567'
    },
    {
      icon: MapPin,
      title: 'Địa chỉ',
      value: 'Thanh Hóa, Việt Nam',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Giờ làm việc',
      value: 'T2-T6: 8:00 - 18:00',
      link: '#'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: '#', color: 'bg-blue-600' },
    { name: 'GitHub', url: '#', color: 'bg-gray-800' },
    { name: 'Twitter', url: '#', color: 'bg-sky-500' },
    { name: 'Facebook', url: '#', color: 'bg-blue-700' }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                <MessageCircle className="inline-block mr-3" size={28} />
                Thông tin liên hệ
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300">
                    <div className="bg-sky-500 p-3 rounded-lg mr-4">
                      <info.icon className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">{info.title}</h4>
                      <a 
                        href={info.link}
                        className="text-gray-600 dark:text-gray-300 hover:text-sky-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Kết nối qua mạng xã hội</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`${social.color} text-white p-3 rounded-lg hover:opacity-90 transition-opacity duration-300 font-medium`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tại sao chọn tôi?</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-sky-500 mr-2" />
                  Đam mê học hỏi và phát triển
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-sky-500 mr-2" />
                  Cam kết chất lượng và deadline
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-sky-500 mr-2" />
                  Sẵn sàng nhận feedback và cải thiện
                </li>
                <li className="flex items-center">
                  <CheckCircle size={16} className="text-sky-500 mr-2" />
                  Giá cả hợp lý, phù hợp sinh viên
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Gửi tin nhắn</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-green-600 mb-2">Gửi thành công!</h4>
                <p className="text-gray-600 dark:text-gray-300">Cảm ơn bạn đã liên hệ. Tôi sẽ phản hồi trong vòng 24 giờ.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Chủ đề *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Chọn chủ đề</option>
                    <option value="project">Thảo luận dự án</option>
                    <option value="job">Cơ hội việc làm</option>
                    <option value="consultation">Tư vấn công nghệ</option>
                    <option value="collaboration">Hợp tác</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-colors resize-vertical bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Mô tả chi tiết về dự án hoặc yêu cầu của bạn..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Gửi tin nhắn
                </button>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  * Thông tin bắt buộc. Tôi cam kết bảo mật thông tin cá nhân của bạn.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Response Time Info */}
        <div className="mt-16 text-center bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-600 dark:to-blue-700 rounded-lg p-8 text-white">
          <Clock className="mx-auto mb-4" size={48} />
          <h3 className="text-2xl font-bold mb-4">Thời gian phản hồi</h3>
          <p className="text-lg mb-2">Tôi thường phản hồi trong vòng <strong>24 giờ</strong></p>
          <p className="opacity-90">
            Đối với các dự án urgent, vui lòng gọi trực tiếp để được hỗ trợ nhanh nhất
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;