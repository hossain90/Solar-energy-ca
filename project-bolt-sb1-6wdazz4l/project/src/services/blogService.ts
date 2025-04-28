import { BlogPost } from '../types/blog';

class BlogService {
  private apiUrl = process.env.VITE_API_URL || 'https://api.example.com';

  async getPosts(limit: number = 10): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${this.apiUrl}/blog/posts?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch blog posts');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  async getPost(id: string): Promise<BlogPost | null> {
    try {
      const response = await fetch(`${this.apiUrl}/blog/posts/${id}`);
      if (!response.ok) throw new Error('Failed to fetch blog post');
      return await response.json();
    } catch (error) {
      console.error(`Error fetching blog post ${id}:`, error);
      return null;
    }
  }

  async searchPosts(query: string): Promise<BlogPost[]> {
    try {
      const response = await fetch(`${this.apiUrl}/blog/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search blog posts');
      return await response.json();
    } catch (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${this.apiUrl}/blog/categories`);
      if (!response.ok) throw new Error('Failed to fetch blog categories');
      return await response.json();
    } catch (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }
  }
}

export const blogService = new BlogService();