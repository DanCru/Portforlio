import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, Code2, Briefcase, GraduationCap, Mail, Award, ArrowRight, Clock } from 'lucide-react';
import api from '../../lib/axios';

interface Stats {
  projects: number;
  skills: number;
  experiences: number;
  educations: number;
  certifications: number;
  unreadMessages: number;
  recentMessages: any[];
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({
    projects: 0, skills: 0, experiences: 0, educations: 0, certifications: 0, unreadMessages: 0, recentMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projects, skills, experiences, educations, certifications, messages] = await Promise.all([
          api.get('/admin/portfolio/projects'),
          api.get('/admin/portfolio/skills'),
          api.get('/admin/portfolio/experiences'),
          api.get('/admin/portfolio/educations'),
          api.get('/admin/portfolio/certifications'),
          api.get('/admin/contacts').catch(() => ({ data: [] })),
        ]);

        setStats({
          projects: projects.data.length,
          skills: skills.data.length,
          experiences: experiences.data.length,
          educations: educations.data.length,
          certifications: certifications.data.length,
          unreadMessages: messages.data.filter((m: any) => !m.is_read).length,
          recentMessages: messages.data.slice(0, 5),
        });
      } catch (err) {
        console.error('Failed to fetch stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Projects', value: stats.projects, icon: FolderKanban, color: 'from-blue-500 to-indigo-600', link: '/admin/portfolio/projects' },
    { label: 'Skills', value: stats.skills, icon: Code2, color: 'from-emerald-500 to-teal-600', link: '/admin/portfolio/skills' },
    { label: 'Experience', value: stats.experiences, icon: Briefcase, color: 'from-orange-500 to-amber-600', link: '/admin/portfolio/experience' },
    { label: 'Education', value: stats.educations, icon: GraduationCap, color: 'from-purple-500 to-violet-600', link: '/admin/portfolio/education' },
    { label: 'Certifications', value: stats.certifications, icon: Award, color: 'from-pink-500 to-rose-600', link: '/admin/portfolio/certifications' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: 'from-red-500 to-rose-600', link: '/admin/contacts' },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  if (loading) {
    return <div className="flex items-center justify-center p-12"><div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card, i) => (
          <Link
            key={i}
            to={card.link}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
              <card.icon size={18} className="text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Messages */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Mail size={18} className="text-blue-500" /> Recent Messages
            </h2>
            <Link to="/admin/contacts" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          {stats.recentMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Mail size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No messages yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {stats.recentMessages.map((msg: any) => (
                <Link
                  key={msg.id}
                  to="/admin/contacts"
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${msg.is_read ? 'bg-gray-400' : 'bg-blue-500'}`}>
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${msg.is_read ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}>{msg.name}</span>
                      {!msg.is_read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{msg.subject}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{formatDate(msg.created_at)}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Add Project', link: '/admin/portfolio/projects', icon: FolderKanban, color: 'text-blue-500' },
              { label: 'Add Skill', link: '/admin/portfolio/skills', icon: Code2, color: 'text-emerald-500' },
              { label: 'Add Experience', link: '/admin/portfolio/experience', icon: Briefcase, color: 'text-orange-500' },
              { label: 'View Site', link: '/', icon: ArrowRight, color: 'text-purple-500', external: true },
            ].map((action, i) => (
              action.external ? (
                <a
                  key={i}
                  href={action.link}
                  target="_blank"
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <action.icon size={20} className={action.color} />
                  <span className="text-sm font-medium">{action.label}</span>
                </a>
              ) : (
                <Link
                  key={i}
                  to={action.link}
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                >
                  <action.icon size={20} className={action.color} />
                  <span className="text-sm font-medium">{action.label}</span>
                </Link>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
