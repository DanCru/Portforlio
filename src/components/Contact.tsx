import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Radio, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import api from '../lib/axios';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      await api.post('/contact', formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err: any) {
      setError(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      subtitle: t('contact.emailAction'),
      value: 'nguyenanhduc2909@gmail.com',
      link: 'mailto:nguyenanhduc2909@gmail.com'
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      subtitle: t('contact.phoneAction'),
      value: '+84 901 234 567',
      link: 'tel:+84901234567'
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      subtitle: t('contact.locationAction'),
      value: 'Thanh Hóa, Việt Nam',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-valorant-black relative overflow-hidden transition-colors duration-300">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-grid opacity-5 dark:opacity-10 pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-sky-50 dark:from-white/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
            <span className="font-mono text-sky-600 dark:text-valorant-red uppercase tracking-widest text-sm mb-2">{t('contact.sectionSubtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                {t('contact.sectionTitle1')} <span className="dark:text-stroke dark:text-transparent text-slate-900">{t('contact.sectionTitle2')}</span>
            </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 clip-path-slant-left relative group shadow-lg dark:shadow-none">
                <div className="absolute top-0 right-0 w-20 h-20 bg-sky-100 dark:bg-valorant-red/10 rounded-bl-full" />
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="text-sky-600 dark:text-valorant-red" size={24} />
                    {t('contact.info')}
                </h3>
                
                <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start group/item">
                        <div className="bg-white dark:bg-valorant-dark p-3 clip-path-button mr-4 border border-slate-200 dark:border-white/10 group-hover/item:border-sky-500 dark:group-hover/item:border-valorant-red transition-colors shadow-sm">
                            <info.icon className="text-slate-600 dark:text-white group-hover/item:text-sky-600 dark:group-hover/item:text-valorant-red transition-colors" size={20} />
                        </div>
                        <div>
                        <div className="text-[10px] uppercase font-mono text-slate-400 dark:text-gray-500 tracking-wider mb-1">{info.title}</div>
                        <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wide text-sm mb-1">{info.subtitle}</h4>
                        <a 
                            href={info.link}
                            className="text-slate-600 dark:text-gray-400 hover:text-sky-600 dark:hover:text-valorant-red transition-colors font-mono text-sm"
                        >
                            {info.value}
                        </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Social Links */}
             <div className="bg-white dark:bg-valorant-dark border border-slate-200 dark:border-white/10 p-6 shadow-lg dark:shadow-none">
                <h3 className="text-sm font-bold text-slate-500 dark:text-gray-400 mb-4 uppercase tracking-wider font-mono">{t('contact.socialProfiles')}</h3>
                <div className="flex gap-4">
                    {['LinkedIn', 'GitHub', 'Twitter', 'Facebook'].map((social, index) => (
                    <a
                        key={index}
                        href="#"
                        className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white p-3 text-center hover:bg-sky-500 dark:hover:bg-valorant-red hover:text-white dark:hover:text-white hover:border-sky-500 dark:hover:border-valorant-red transition-all duration-300 font-display uppercase tracking-widest text-xs clip-path-button shadow-sm"
                    >
                        {social}
                    </a>
                    ))}
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 clip-path-slant-right relative shadow-xl dark:shadow-none">
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-sky-500 dark:border-valorant-red" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-sky-500 dark:border-valorant-red" />
            
            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-wider">{t('contact.sendMessage')}</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12 border border-green-500/30 bg-green-500/10 rounded-sm">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider">{t('contact.sent')}</h4>
                <p className="text-slate-600 dark:text-gray-400 font-mono text-sm">{t('contact.sentDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm text-red-600 dark:text-red-400 text-sm">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                       {t('contact.formName')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-valorant-black border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white px-4 py-3 focus:border-sky-500 dark:focus:border-valorant-red focus:outline-none transition-colors font-mono text-sm placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                       {t('contact.formEmail')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white dark:bg-valorant-black border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white px-4 py-3 focus:border-sky-500 dark:focus:border-valorant-red focus:outline-none transition-colors font-mono text-sm placeholder-gray-400 dark:placeholder-gray-600"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                       {t('contact.formSubject')}
                    </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-valorant-black border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white px-4 py-3 focus:border-sky-500 dark:focus:border-valorant-red focus:outline-none transition-colors font-mono text-sm"
                  >
                    <option value="">{t('contact.selectSubject')}</option>
                    <option value="project">{t('contact.subjectProject')}</option>
                    <option value="job">{t('contact.subjectJob')}</option>
                    <option value="other">{t('contact.subjectOther')}</option>
                  </select>
                </div>

                <div>
                   <label className="block text-xs font-mono text-slate-500 dark:text-gray-500 uppercase tracking-widest mb-2">
                       {t('contact.formMessage')}
                    </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-valorant-black border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white px-4 py-3 focus:border-sky-500 dark:focus:border-valorant-red focus:outline-none transition-colors resize-vertical font-mono text-sm placeholder-gray-400 dark:placeholder-gray-600"
                    placeholder={t('contact.messagePlaceholder')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-sky-500 dark:bg-valorant-red hover:bg-sky-600 dark:hover:bg-white hover:text-white dark:hover:text-valorant-black text-white py-4 font-display font-bold uppercase tracking-widest transition-all duration-300 clip-path-button relative overflow-hidden group shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <><Loader2 size={18} className="animate-spin" /> {t('contact.sending')}</>
                    ) : (
                      <><Send size={18} /> {t('contact.submit')}</>
                    )}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;