import axios from '../lib/axios';

export type LocalizedString = string | { vi: string; en: string };

export interface PortfolioSettings {
  [key: string]: any; // Can be string or LocalizedString
}

export interface Experience {
  id: number;
  position: LocalizedString;
  company: LocalizedString;
  location?: LocalizedString;
  period: string; // usually date range, keep as string or make localized if needed
  description?: LocalizedString;
  achievements?: string[]; // Array of strings, maybe we need Array of LocalizedString later? For now keep simple
  technologies?: string[];
  rank?: string;
  sort_order: number;
  is_active: boolean;
}

export interface Skill {
  id: number;
  name: string; // Tech names usually universal
  category: LocalizedString;
  proficiency: number;
  icon?: string;
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

  updateSettings: async (settings: {key: string, value: any}[]) => {
    const response = await axios.post('/admin/portfolio/settings', { settings });
    return response.data;
  },

  getItems: async (type: string) => {
    const response = await axios.get(`/admin/portfolio/${type}`);
    return response.data;
  },

  createItem: async (type: string, data: any) => {
    // Check if data is FormData
    const isFormData = data instanceof FormData;
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
    
    const response = await axios.post(`/admin/portfolio/${type}`, data, config);
    return response.data;
  },

  updateItem: async (type: string, id: number, data: any) => {
    // Check if data is FormData
    const isFormData = data instanceof FormData;
    const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};

    // For PUT/PATCH with FormData in Laravel/PHP, method spoofing is often needed
    // However, Axios usually handles PUT fine, but PHP sometimes struggles with multipart PUT.
    // Safe bet: Use POST with _method=PUT if it's FormData
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
  }
};

export default PortfolioService;
