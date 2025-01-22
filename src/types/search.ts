export interface SearchResult {
  id: string | number;
  type: 'article' | 'tool' | 'category' | 'content';
  title: string;
  slug?: string;
  content?: string;
  updatedAt?: string | Date;
  downloadUrl?: string;
}

