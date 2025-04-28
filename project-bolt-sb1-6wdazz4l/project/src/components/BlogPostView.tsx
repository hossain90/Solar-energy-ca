import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../types/blog';
import { blogService } from '../services/blogService';
import AdSense from './AdSense';

const BlogPostView: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const postData = await blogService.getPost(id);
        setPost(postData);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">{t('common.loading')}</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600 mb-4">{t('blog.postNotFound')}</p>
        <Link 
          to="/blog" 
          className="text-primary-600 hover:text-primary-700"
        >
          ← {t('blog.backToBlog')}
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-16">
      <div className="container-narrow mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600 mb-6">
            <span>{post.author}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.published).toLocaleDateString()}</span>
          </div>
        </header>

        {post.images?.[0] && (
          <div className="mb-8">
            <img
              src={post.images[0]}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="mb-8">
          <AdSense
            adSlot="3456789012"
            className="mb-8"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12">
          <AdSense
            adSlot="5678901234"
            className="mb-8"
            style={{ display: 'block', textAlign: 'center' }}
          />
        </div>

        <footer className="mt-12 pt-8 border-t">
          <Link 
            to="/blog" 
            className="text-primary-600 hover:text-primary-700"
          >
            ← {t('blog.backToBlog')}
          </Link>
        </footer>
      </div>
    </article>
  );
};

export default BlogPostView;