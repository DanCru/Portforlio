import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  tech_stack: string[];
  live_url: string;
  github_url: string;
  sort_order: number;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  rank: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get<Project[]>('/projects');
      return data;
    },
  });
};

export const useExperience = () => {
  return useQuery({
    queryKey: ['experience'],
    queryFn: async () => {
      const { data } = await api.get<Experience[]>('/experiences');
      return data;
    },
  });
};

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get<Skill[]>('/skills');
      return data;
    },
  });
};

export const useTranslations = (locale: string) => {
  return useQuery({
    queryKey: ['translations', locale],
    queryFn: async () => {
      const { data } = await api.get<Record<string, string>>(`/translations?locale=${locale}`);
      return data;
    },
  });
};
