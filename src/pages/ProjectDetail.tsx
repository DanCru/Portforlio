import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Briefcase, ChevronRight } from 'lucide-react';
import PortfolioService, { Project } from '../services/portfolio.service';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalized } from '../utils/languageUtils';
import ImageModal from '../components/ImageModal';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await PortfolioService.getProjectBySlug(slug!);
        setProject(data);
      } catch (err) {
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProject();
  }, [slug]);

  const getImageUrl = (image: string) => {
    if (!image) return '';
    return image.startsWith('http') ? image : `${API_BASE}${image}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-valorant-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-sky-500 dark:border-valorant-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white dark:bg-valorant-black flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl font-display font-bold text-slate-900 dark:text-white mb-4">404</h1>
        <p className="text-slate-600 dark:text-gray-400 mb-8">{error || 'Project not found'}</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-sky-500 dark:bg-valorant-red text-white font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
          {t('projectDetail.back')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-valorant-black transition-colors duration-300">
      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img 
          src={getImageUrl(project.image || '')} 
          alt={getLocalized(project.title, language)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-valorant-black via-white/50 dark:via-black/50 to-transparent" />
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 dark:bg-black/30 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 dark:hover:bg-black/50 transition-colors z-10"
        >
          <ArrowLeft size={18} />
          <span className="font-mono text-sm uppercase">{t('projectDetail.back')}</span>
        </button>

        {/* Project Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="container mx-auto">
            <span className="text-sky-400 dark:text-valorant-red font-mono text-sm uppercase tracking-widest mb-2 block">
              {getLocalized(project.category, language)}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter mb-4">
              {getLocalized(project.title, language)}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <div>
              <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">
                {getLocalized(project.long_description || project.description, language)}
              </p>
            </div>

            {/* Role & Responsibilities */}
            {(getLocalized(project.role, language) || getLocalized(project.responsibilities, language)) && (
              <div className="space-y-6">
                {getLocalized(project.role, language) && (
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-lg">
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Briefcase size={18} className="text-sky-500 dark:text-valorant-red" />
                      {t('projectDetail.role')}
                    </h3>
                    <p className="text-slate-600 dark:text-gray-300">{getLocalized(project.role, language)}</p>
                  </div>
                )}

                {getLocalized(project.responsibilities, language) && (
                  <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-lg">
                    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                      {t('projectDetail.responsibilities')}
                    </h3>
                    <div className="text-slate-600 dark:text-gray-300 whitespace-pre-line">
                      {getLocalized(project.responsibilities, language)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Gallery */}
            {project.gallery_images && project.gallery_images.length > 0 && (
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">
                  {t('projectDetail.gallery')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery_images.map((img, idx) => (
                    <div 
                      key={idx} 
                      className="aspect-video overflow-hidden rounded-lg cursor-pointer group border border-slate-200 dark:border-white/10 shadow-sm"
                      onClick={() => setModalImage(getImageUrl(img))}
                    >
                      <img 
                        src={getImageUrl(img)} 
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Info Card */}
            <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-lg space-y-4">
              {project.start_date && (
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-sky-500 dark:text-valorant-red" />
                  <div>
                    <div className="text-slate-400 dark:text-gray-500 text-xs uppercase tracking-widest">{t('projectDetail.duration')}</div>
                    <div className="text-slate-900 dark:text-white font-mono">
                      {project.start_date} — {project.end_date || 'Present'}
                    </div>
                  </div>
                </div>
              )}
              
              {project.team && (
                <div className="flex items-center gap-3 text-sm">
                  <Users size={16} className="text-sky-500 dark:text-valorant-red" />
                  <div>
                    <div className="text-slate-400 dark:text-gray-500 text-xs uppercase tracking-widest">{t('projectDetail.team')}</div>
                    <div className="text-slate-900 dark:text-white font-mono">{project.team}</div>
                  </div>
                </div>
              )}

              {project.status && (
                <div className="flex items-center gap-3 text-sm">
                  <ChevronRight size={16} className="text-sky-500 dark:text-valorant-red" />
                  <div>
                    <div className="text-slate-400 dark:text-gray-500 text-xs uppercase tracking-widest">{t('projectDetail.status')}</div>
                    <div className="text-slate-900 dark:text-white font-mono uppercase">{project.status}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-lg">
                <h3 className="text-sm font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">{t('projectDetail.techStack')}</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1.5 bg-white dark:bg-white/10 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/10 rounded-sm uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {project.live_url && (
                <a 
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-sky-500 dark:bg-valorant-red text-white font-display font-bold uppercase tracking-widest hover:opacity-90 transition-opacity rounded-sm"
                >
                  <ExternalLink size={18} />
                  {t('projectDetail.visitSite')}
                </a>
              )}
              {project.github_url && (
                <a 
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-display font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-colors rounded-sm"
                >
                  <Github size={18} />
                  {t('projectDetail.viewCode')}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal 
        isOpen={!!modalImage} 
        imageUrl={modalImage || ''} 
        onClose={() => setModalImage(null)} 
      />
    </div>
  );
};

export default ProjectDetail;
