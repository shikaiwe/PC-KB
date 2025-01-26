import { ReactNode } from 'react';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  sort: number;
  createdAt: Date;
}

export interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  downloadUrl: string;
  size: string;
  version: string;
  downloadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type ArticleUpdate = {
  type: 'article';
  title: string;
  updatedAt: Date;
  slug: string;
};

export type Update = ArticleUpdate;

export interface HomeProps {
  categories: Category[];
  latestUpdates: Update[];
} 