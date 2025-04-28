import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      {post.images?.[0] && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.images[0]}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 hover:text-primary-600">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        
        <div className="text-sm text-gray-500 mb-3">
          <span>{post.author}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.published)}</span>
        </div>
        
        <div 
          className="text-gray-600 mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ 
            __html: truncateContent(post.content) 
          }}
        />
        
        <Link
          to={`/blog/${post.id}`}
          className="inline-block text-primary-600 hover:text-primary-700 font-medium"
        >
          {t('blog.readMore')} →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;