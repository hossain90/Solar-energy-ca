import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../types/blog';
import { blogService } from '../services/blogService';
import BlogCard from './BlogCard';
import AdSense from './AdSense';

const BlogSection: React.FC = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const latestPosts = await blogService.getPosts(6);
        setPosts(latestPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('blog.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              <BlogCard post={post} />
              {index === 2 && (
                <div className="col-span-full my-8">
                  <AdSense 
                    adSlot="7654321098"
                    className="w-full"
                    style={{ minHeight: '250px' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;