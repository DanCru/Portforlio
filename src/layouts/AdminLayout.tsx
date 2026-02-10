import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Languages, LogOut } from 'lucide-react';
import api from '../lib/axios';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-gray-500">{user?.name}</p>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/translations" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
            <Languages size={20} /> Translations
          </Link>
          <div className="pt-4 pb-2">
            <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Portfolio</p>
          </div>
          <Link to="/admin/portfolio/general" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             General Settings
          </Link>
          <Link to="/admin/portfolio/experience" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             Experience
          </Link>
          <Link to="/admin/portfolio/skills" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             Skills
          </Link>
          <Link to="/admin/portfolio/projects" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             Projects
          </Link>
          <Link to="/admin/portfolio/education" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             Education
          </Link>
          <Link to="/admin/portfolio/certifications" className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             Certifications
          </Link>
          
          <div className="pt-4 pb-2">
            <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">System</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="flex items-center gap-2 p-2 w-full text-left rounded text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
