import axios from '../lib/axios';

export type LocalizedString = string | { vi: string; en: string };

export interface PortfolioSettings {
  [key: string]: any;
}

export interface Experience {
  id: number;
  position: LocalizedString;
  company: LocalizedString;
  location?: LocalizedString;
  period: string;
  description?: LocalizedString;
  achievements?: string[];
  technologies?: string[];
  rank?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: LocalizedString;
  icon_url?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Education {
  id: number;
  degree: LocalizedString;
  school: LocalizedString;
  period: string;
  gpa?: string;
  description?: LocalizedString;
  image?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Project {
  id: number;
  title: LocalizedString;
  slug: string | { vi: string, en: string };
  category?: LocalizedString;
  description?: LocalizedString;
  long_description?: LocalizedString;
  content?: LocalizedString;
  image?: string;
  tech_stack?: string[];
  features?: string[];
  metrics?: {[key: string]: string};
  duration?: string;
  team?: string;
  role?: LocalizedString;
  responsibilities?: LocalizedString;
  gallery_images?: string[];
  start_date?: string;
  end_date?: string;
  status: string;
  live_url?: string;
  github_url?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Certification {
  id: number;
  name: LocalizedString;
  issuer: LocalizedString;
  issue_date?: string;
  url?: string;
  image?: string;
  sort_order: number;
  is_active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface PortfolioData {
  settings: PortfolioSettings;
  experiences: Experience[];
  skills: {[category: string]: Skill[]};
  educations: Education[];
  projects: Project[];
  certifications: Certification[];
}

const PortfolioService = {
  getPublicData: async () => {
    const response = await axios.get('/portfolio');
    return response.data;
  },

  getProjectBySlug: async (slug: string) => {
    const response = await axios.get(`/portfolio/projects/${slug}`);
    return response.data;
  },

  updateSettings: async (settings: {key: string, value: any}[]) => {
    const response = await axios.post('/admin/portfolio/settings', { settings });
    return response.data;
  },

  getItems: async (type: string) => {
    const response = await axios.get(`/admin/portfolio/${type}`);
    return response.data;
  },

  createItem: async (type: string, data: any) => {
    const isFormData = data instanceof FormData;
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    
    const response = await axios.post(`/admin/portfolio/${type}`, data, config);
    return response.data;
  },

  updateItem: async (type: string, id: number, data: any) => {
    const isFormData = data instanceof FormData;
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};

    if (isFormData) {
        data.append('_method', 'PUT');
        const response = await axios.post(`/admin/portfolio/${type}/${id}`, data, config);
        return response.data;
    } else {
        const response = await axios.put(`/admin/portfolio/${type}/${id}`, data);
        return response.data;
    }
  },

  deleteItem: async (type: string, id: number) => {
    const response = await axios.delete(`/admin/portfolio/${type}/${id}`);
    return response.data;
  },

  reorderItems: async (type: string, items: {id: number, sort_order: number}[]) => {
    const response = await axios.post(`/admin/portfolio/${type}/reorder`, { items });
    return response.data;
  },

  // Contact Messages
  getContactMessages: async () => {
    const response = await axios.get('/admin/contacts');
    return response.data;
  },

  getContactMessage: async (id: number) => {
    const response = await axios.get(`/admin/contacts/${id}`);
    return response.data;
  },

  deleteContactMessage: async (id: number) => {
    const response = await axios.delete(`/admin/contacts/${id}`);
    return response.data;
  },
};

export default PortfolioService;
