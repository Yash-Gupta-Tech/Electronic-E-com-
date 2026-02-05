import { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '@/data';

export default function Reviews() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-dark w-full overflow-hidden"
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-primary text-sm font-semibold tracking-wider mb-4 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
          >
            TESTIMONIALS
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            CUSTOMER <span className="text-gradient">REVIEWS</span>
          </h2>
        </div>

        {/* Reviews Carousel */}
        <div
          className={`relative max-w-4xl mx-auto ${
            isVisible ? 'animate-scale-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Main Review Card */}
          <div className="relative bg-dark-light rounded-3xl p-8 lg:p-12">
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Quote className="w-6 h-6 text-white" />
            </div>

            {/* Review Content */}
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < reviews[activeIndex].rating
                        ? 'fill-primary text-primary'
                        : 'text-gray-custom'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-white text-lg lg:text-xl leading-relaxed mb-8">
                "{reviews[activeIndex].comment}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <img
                  src={reviews[activeIndex].avatar}
                  alt={reviews[activeIndex].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div className="text-left">
                  <h4 className="font-display text-lg font-semibold text-white">
                    {reviews[activeIndex].name}
                  </h4>
                  <p className="text-gray-custom text-sm">
                    {reviews[activeIndex].date}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 border border-dark-light rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-primary w-8'
                      : 'bg-dark-light hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="w-12 h-12 border border-dark-light rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Review Cards Grid (Desktop) */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mt-12">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                index === activeIndex
                  ? 'bg-primary/20 border-2 border-primary'
                  : 'bg-dark-light border-2 border-transparent hover:border-primary/30'
              } ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white text-sm font-semibold line-clamp-1">
                    {review.name}
                  </p>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
