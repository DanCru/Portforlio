import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle, Radio, Mic } from 'lucide-react';
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
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'COMMS_CHANNEL_01',
      subtitle: 'Email Frequency',
      value: 'nguyenanhduc2909@gmail.com',
      link: 'mailto:nguyenanhduc2909@gmail.com'
    },
    {
      icon: Phone,
      title: 'COMMS_CHANNEL_02',
      subtitle: 'Voice Line',
      value: '+84 901 234 567',
      link: 'tel:+84901234567'
    },
    {
      icon: MapPin,
      title: 'BASE_LOCATION',
      subtitle: 'Coordinates',
      value: 'Thanh Hóa, Việt Nam',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-valorant-black relative overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
            <span className="font-mono text-valorant-red uppercase tracking-widest text-sm mb-2">// Establish Connection</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
                CONTACT <span className="text-stroke text-transparent">ME</span>
            </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 p-6 clip-path-slant-left relative group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-valorant-red/10 rounded-bl-full" />
                <h3 className="text-xl font-display font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="text-valorant-red" size={24} />
                    Official Channels
                </h3>
                
                <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start group/item">
                        <div className="bg-valorant-dark p-3 clip-path-button mr-4 border border-white/10 group-hover/item:border-valorant-red transition-colors">
                            <info.icon className="text-white group-hover/item:text-valorant-red transition-colors" size={20} />
                        </div>
                        <div>
                        <div className="text-[10px] uppercase font-mono text-gray-500 tracking-wider mb-1">{info.title}</div>
                        <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-1">{info.subtitle}</h4>
                        <a 
                            href={info.link}
                            className="text-gray-400 hover:text-valorant-red transition-colors font-mono text-sm"
                        >
                            {info.value}
                        </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* Social Links */}
             <div className="bg-valorant-dark border border-white/10 p-6">
                <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider font-mono">// Social Uplinks</h3>
                <div className="flex gap-4">
                    {['LinkedIn', 'GitHub', 'Twitter', 'Facebook'].map((social, index) => (
                    <a
                        key={index}
                        href="#"
                        className="flex-1 bg-white/5 border border-white/10 text-white p-3 text-center hover:bg-valorant-red hover:border-valorant-red transition-all duration-300 font-display uppercase tracking-widest text-xs clip-path-button"
                    >
                        {social}
                    </a>
                    ))}
                </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 p-8 clip-path-slant-right relative">
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-valorant-red" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-valorant-red" />
            
            <h3 className="text-2xl font-display font-bold text-white mb-6 uppercase tracking-wider">Send Transmission</h3>
            
            {isSubmitted ? (
              <div className="text-center py-12 border border-green-500/30 bg-green-500/10">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-display font-bold text-white mb-2 uppercase tracking-wider">Transmission Sent</h4>
                <p className="text-gray-400 font-mono text-sm">Stand by for response. Estimated time: 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                       // Name ID
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-valorant-black border border-white/20 text-white px-4 py-3 focus:border-valorant-red focus:outline-none transition-colors font-mono text-sm placeholder-gray-600"
                      placeholder="ENTER NAME"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                       // Contact Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-valorant-black border border-white/20 text-white px-4 py-3 focus:border-valorant-red focus:outline-none transition-colors font-mono text-sm placeholder-gray-600"
                      placeholder="ENTER EMAIL"
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                       // Subject Line
                    </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-valorant-black border border-white/20 text-white px-4 py-3 focus:border-valorant-red focus:outline-none transition-colors font-mono text-sm"
                  >
                    <option value="">SELECT DIRECTIVE</option>
                    <option value="project">PROJECT COLLABORATION</option>
                    <option value="job">RECRUITMENT OPP</option>
                    <option value="other">OTHER INQUIRY</option>
                  </select>
                </div>

                <div>
                   <label className="block text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
                       // Encrypted Message
                    </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-valorant-black border border-white/20 text-white px-4 py-3 focus:border-valorant-red focus:outline-none transition-colors resize-vertical font-mono text-sm placeholder-gray-600"
                    placeholder="ENTER MESSAGE CONTENT..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-valorant-red hover:bg-white hover:text-valorant-black text-white py-4 font-display font-bold uppercase tracking-widest transition-all duration-300 clip-path-button relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send size={18} /> Transmit Data
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