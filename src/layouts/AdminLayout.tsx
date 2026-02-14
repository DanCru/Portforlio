import { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Languages, LogOut, Mail, Settings, Briefcase, 
  Code2, FolderKanban, GraduationCap, Award, ChevronDown, 
  Menu, X, Home
} from 'lucide-react';
import api from '../lib/axios';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [portfolioOpen, setPortfolioOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await api.get('/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data.role !== 'admin') {
          navigate('/');
        }
        setUser(response.data);

        // Fetch unread count
        try {
          const msgs = await api.get('/admin/contacts');
          setUnreadCount(msgs.data.filter((m: any) => !m.is_read).length);
        } catch {}
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive(path)
        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
    }`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        {/* Logo & User */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                D
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Admin Panel</h1>
                <p className="text-xs text-gray-400">{user?.name}</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {/* Main */}
          <div className="mb-6">
            <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em]">Main</p>
            <Link to="/admin/dashboard" className={navLinkClass('/admin/dashboard')}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link to="/admin/contacts" className={navLinkClass('/admin/contacts')}>
              <Mail size={18} /> 
              Messages
              {unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          </div>

          {/* Portfolio */}
          <div className="mb-6">
            <button 
              onClick={() => setPortfolioOpen(!portfolioOpen)}
              className="flex items-center justify-between w-full px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] hover:text-gray-600 transition-colors"
            >
              Portfolio
              <ChevronDown size={14} className={`transition-transform ${portfolioOpen ? 'rotate-180' : ''}`} />
            </button>
            {portfolioOpen && (
              <div className="space-y-0.5">
                <Link to="/admin/portfolio/general" className={navLinkClass('/admin/portfolio/general')}>
                  <Settings size={18} /> General Settings
                </Link>
                <Link to="/admin/portfolio/experience" className={navLinkClass('/admin/portfolio/experience')}>
                  <Briefcase size={18} /> Experience
                </Link>
                <Link to="/admin/portfolio/skills" className={navLinkClass('/admin/portfolio/skills')}>
                  <Code2 size={18} /> Skills
                </Link>
                <Link to="/admin/portfolio/projects" className={navLinkClass('/admin/portfolio/projects')}>
                  <FolderKanban size={18} /> Projects
                </Link>
                <Link to="/admin/portfolio/education" className={navLinkClass('/admin/portfolio/education')}>
                  <GraduationCap size={18} /> Education
                </Link>
                <Link to="/admin/portfolio/certifications" className={navLinkClass('/admin/portfolio/certifications')}>
                  <Award size={18} /> Certifications
                </Link>
              </div>
            )}
          </div>

          {/* System */}
          <div>
            <p className="px-3 mb-2 text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em]">System</p>
            <Link to="/admin/translations" className={navLinkClass('/admin/translations')}>
              <Languages size={18} /> Translations
            </Link>
            <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all">
              <Home size={18} /> View Site
            </a>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-6 gap-4 sticky top-0 z-20">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
