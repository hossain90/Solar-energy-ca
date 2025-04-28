export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  category: BlogCategory;
  tags: string[];
  imageUrl: string;
  publishedAt: string;
  readTime: number;
}

export type BlogCategory = 
  | 'Technology'
  | 'Maintenance'
  | 'Savings'
  | 'Installation'
  | 'Environment'
  | 'Tips';

export interface BlogFilters {
  category?: BlogCategory;
  search?: string;
  tag?: string;
}