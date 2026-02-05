import { useEffect, useRef, useState } from 'react';
import { Truck, RefreshCw, Shield, Headphones } from 'lucide-react';
import { features } from '@/data';

const iconMap: Record<string, React.ElementType> = {
  Truck,
  RefreshCw,
  Shield,
  Headphones,
};

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="features"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative py-20 lg:py-32 bg-dark w-full overflow-hidden"
    >
      {/* Spotlight effect */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(217, 13, 44, 0.15) 0%, transparent 70%)',
          opacity: isVisible ? 1 : 0,
        }}
      />

      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className={`inline-block text-primary text-sm font-semibold tracking-wider mb-4 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
          >
            WHY CHOOSE US
          </span>
          <h2
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            OUR <span className="text-gradient">FEATURES</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className={`group relative bg-dark-light rounded-2xl p-8 text-center hover:bg-dark-lighter transition-all duration-500 ${
                  isVisible ? 'animate-slide-up' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  transform: isVisible ? 'rotateX(0deg)' : 'rotateX(90deg)',
                  transformOrigin: 'top',
                }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-custom text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-2xl transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
