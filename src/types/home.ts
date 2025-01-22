import { ReactNode } from 'react';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  sort: number;
}

export interface Update {
  type: 'article' | 'tool';
  title: string;
  updatedAt: Date;
  slug?: string;
  content?: string;
  description?: string;
  icon: ReactNode;
}

export interface HomeProps {
  categoriesData: Category[];
  latestUpdates: Update[];
}

export type Content = {
  title: string;
  updatedAt: string;
  slug: string;
  content: string;
};

export type Tool = {
  name: string;
  updatedAt: string;
  description: string;
}; 