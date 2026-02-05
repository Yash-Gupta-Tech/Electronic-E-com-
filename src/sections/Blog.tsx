import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { blogPosts } from '@/data';

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-dark w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span
              className={`inline-block text-primary text-sm font-semibold tracking-wider mb-4 ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
            >
              FROM THE BLOG
            </span>
            <h2
              className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              LATEST <span className="text-gradient">BLOG</span>
            </h2>
          </div>
          <a
            href="#"
            className={`inline-flex items-center gap-2 text-primary hover:text-white transition-colors mt-4 lg:mt-0 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            View All Articles
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.15}s` }}
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                {/* Glassmorphism panel */}
                <div className="bg-dark/60 backdrop-blur-md rounded-xl p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-custom text-sm">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-custom text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                    Read More
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
