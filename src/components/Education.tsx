import { Shield, Trophy, ZoomIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import PortfolioService, { Education as EducationType, Certification } from '../services/portfolio.service';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalized } from '../utils/languageUtils';
import ImageModal from './ImageModal';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';

const Education = () => {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const { language, t } = useLanguage();
  const [modalImage, setModalImage] = useState<{url: string, alt: string} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPublicData();
        setEducation(data.educations);
        setCertifications(data.certifications);
      } catch (error) {
        console.error("Failed to fetch education data", error);
      }
    };
    fetchData();
  }, []);

  const getImageUrl = (image: string) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `${API_BASE}${image}`;
  };

  return (
    <section id="education" className="py-24 bg-gray-50 dark:bg-valorant-black relative overflow-hidden transition-colors duration-300">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
            <span className="font-mono text-sky-600 dark:text-valorant-red uppercase tracking-widest text-sm mb-2">{t('education.subtitle')}</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
             {t('education.title')}
          </h2>
        </div>

        {/* Education Section */}
        <div className="mb-24">
             <div className="flex items-center justify-center gap-3 mb-10">
                <Shield className="text-sky-600 dark:text-valorant-red" size={24} />
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest">{t('education.academic') || 'Academic Background'}</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {education.map((edu, index) => (
                    <div key={index} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1 group hover:border-sky-500 dark:hover:border-valorant-red/50 transition-colors overflow-hidden shadow-lg dark:shadow-none">
                        <div className="relative h-48 overflow-hidden mb-4">
                            {edu.image && (
                              <div 
                                className="w-full h-full cursor-pointer relative"
                                onClick={() => setModalImage({ url: getImageUrl(edu.image!), alt: getLocalized(edu.school, language) })}
                              >
                                <img 
                                  src={getImageUrl(edu.image)} 
                                  alt={getLocalized(edu.school, language)} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter dark:grayscale dark:group-hover:grayscale-0" 
                                />
                                {/* Zoom overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                                </div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-transparent dark:bg-black/50 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 bg-sky-500 dark:bg-valorant-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                {edu.period}
                            </div>
                        </div>
                        
                        <div className="p-4">
                            <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase mb-1">{getLocalized(edu.degree, language)}</h3>
                            <p className="text-sky-600 dark:text-valorant-red font-mono text-sm mb-3 uppercase tracking-wider font-bold">{getLocalized(edu.school, language)}</p>
                            
                            {edu.gpa && (
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300 px-2 py-0.5 border border-slate-200 dark:border-white/10 uppercase tracking-widest font-bold">
                                        GRADE: {edu.gpa}
                                    </span>
                                </div>
                            )}
                            
                            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
                                {getLocalized(edu.description, language)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-24">
            <div className="flex items-center justify-center gap-3 mb-10">
                <Trophy className="text-sky-600 dark:text-valorant-red" size={24} />
                <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest">{t('education.certifications')}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {certifications.map((cert, idx) => (
                    <div key={idx} className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-1 group hover:border-sky-500 dark:hover:border-valorant-red/50 transition-colors overflow-hidden shadow-lg dark:shadow-none flex flex-col">
                        <div className="relative h-48 overflow-hidden mb-4 bg-gray-100 dark:bg-black/20">
                            {cert.image ? (
                              <div 
                                className="w-full h-full cursor-pointer relative"
                                onClick={() => setModalImage({ url: getImageUrl(cert.image!), alt: getLocalized(cert.name, language) })}
                              >
                                <img 
                                  src={getImageUrl(cert.image)} 
                                  alt={getLocalized(cert.name, language)} 
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                />
                                {/* Zoom overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                  <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                                </div>
                              </div>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-white/10">
                                    <Trophy size={48} />
                                </div>
                            )}
                            
                            {cert.issue_date && (
                                <div className="absolute bottom-0 left-0 bg-sky-500 dark:bg-valorant-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                                    {new Date(cert.issue_date).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US', { month: 'long', year: 'numeric' })}
                                </div>
                            )}
                        </div>
                        
                        <div className="p-4 flex-grow flex flex-col">
                            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase mb-1 line-clamp-2" title={getLocalized(cert.name, language)}>
                                {getLocalized(cert.name, language)}
                            </h3>
                            <p className="text-sky-600 dark:text-valorant-red font-mono text-sm mb-3 uppercase tracking-wider font-bold truncate">
                                {getLocalized(cert.issuer, language)}
                            </p>
                            
                            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-white/5">
                                {cert.url ? (
                                    <a 
                                        href={cert.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-valorant-red transition-colors flex items-center gap-2"
                                    >
                                        <span>View Credential</span>
                                        <span className="text-[10px]">↗</span>
                                    </a>
                                ) : (
                                    <span className="text-xs text-slate-400 dark:text-gray-600 uppercase tracking-wider">No link available</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Philosophy */}
        <div className="max-w-4xl mx-auto text-center border-t border-slate-200 dark:border-white/10 pt-16 relative">
            <Shield className="text-slate-300 dark:text-white/20 mx-auto mb-6" size={48} />
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-4">{t('education.philosophyTitle')}</h3>
            <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl font-serif italic max-w-2xl mx-auto">
                "{t('education.philosophy.text')}"
            </p>
        </div>

      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={!!modalImage} 
        imageUrl={modalImage?.url || ''} 
        alt={modalImage?.alt}
        onClose={() => setModalImage(null)} 
      />
    </section>
  );
};

export default Education;