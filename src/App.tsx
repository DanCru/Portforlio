import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Translations from './pages/admin/Translations';
import GeneralSettings from './pages/admin/Portfolio/GeneralSettings';
import ExperienceManager from './pages/admin/Portfolio/ExperienceManager';
import SkillManager from './pages/admin/Portfolio/SkillManager';
import ProjectManager from './pages/admin/Portfolio/ProjectManager';
import EducationManager from './pages/admin/Portfolio/EducationManager';
import CertificationManager from './pages/admin/Portfolio/CertificationManager';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-slate-900 dark:bg-valorant-black dark:text-valorant-white font-sans selection:bg-valorant-red selection:text-white overflow-x-hidden">
           <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,70,85,0.05),transparent_70%)]" />
           <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-grid-pattern" />

           <BrowserRouter>
             <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/login" element={<Login />} />
               
               <Route path="/admin" element={<AdminLayout />}>
                 <Route index element={<Navigate to="/admin/dashboard" replace />} />
                 <Route path="dashboard" element={<Dashboard />} />
                 <Route path="translations" element={<Translations />} />
          
          {/* Portfolio Management Routes */}
          <Route path="portfolio/general" element={<GeneralSettings />} />
          <Route path="portfolio/experience" element={<ExperienceManager />} />
          <Route path="portfolio/skills" element={<SkillManager />} />
          <Route path="portfolio/projects" element={<ProjectManager />} />
          <Route path="portfolio/education" element={<EducationManager />} />
          <Route path="portfolio/certifications" element={<CertificationManager />} />
        </Route>
             </Routes>
           </BrowserRouter>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;