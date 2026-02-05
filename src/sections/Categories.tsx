import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data';

export default function Categories() {
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
      id="categories"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-dark w-full"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-primary text-sm font-semibold tracking-wider mb-4 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
          >
            BROWSE BY CATEGORY
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            CHOOSE YOUR
            <br />
            <span className="text-gradient">FAVORITE CATEGORY</span>
          </h2>
        </div>

        {/* Categories Grid - Staggered Layout */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 1 ? 'md:-translate-y-12' : ''
              } ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-gray-custom text-sm mb-2">
                      {category.productCount} Products
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
