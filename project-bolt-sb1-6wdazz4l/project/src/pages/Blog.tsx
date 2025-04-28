import React, { useState, useEffect } from 'react';
import { Search, Filter, ArrowLeft } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { BlogPostView } from '../components/BlogPostView';
import { blogService } from '../services/blogService';
import type { BlogPost, BlogCategory, BlogFilters } from '../types/blog';

const POSTS_PER_PAGE = 6;

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<BlogFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const [allPosts, allCategories, allTags] = await Promise.all([
          blogService.getAllPosts(filters),
          blogService.getCategories(),
          blogService.getTags()
        ]);
        setPosts(allPosts);
        setCategories(allCategories);
        setTags(allTags);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
  };

  const handleCategoryFilter = (category: BlogCategory) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? undefined : category
    }));
    setCurrentPage(1);
  };

  const handleTagFilter = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tag: prev.tag === tag ? undefined : tag
    }));
    setCurrentPage(1);
  };

  const handlePostClick = async (id: string) => {
    const post = await blogService.getPostById(id);
    if (post) {
      setSelectedPost(post);
      window.scrollTo(0, 0);
    }
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-96"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (selectedPost) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-12">
        <BlogPostView post={selectedPost} onBack={handleBackClick} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <h1 className="text-4xl font-bold">Solar Energy Blog</h1>
        
        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="w-full md:w-80 px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Search className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Categories
            </h2>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    filters.category === category
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.tag === tag
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {(filters.category || filters.tag || filters.search) && (
            <div>
              <h2 className="text-lg font-semibold mb-3">Active Filters</h2>
              <div className="space-y-2">
                {filters.category && (
                  <div className="flex items-center justify-between">
                    <span>Category: {filters.category}</span>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, category: undefined }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}
                {filters.tag && (
                  <div className="flex items-center justify-between">
                    <span>Tag: {filters.tag}</span>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, tag: undefined }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}
                {filters.search && (
                  <div className="flex items-center justify-between">
                    <span>Search: {filters.search}</span>
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, search: undefined }));
                        setSearchTerm('');
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {currentPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blog posts found matching your criteria.</p>
              <button
                onClick={() => {
                  setFilters({});
                  setSearchTerm('');
                }}
                className="mt-4 text-blue-600 hover:text-blue-800"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {currentPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onClick={handlePostClick}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;