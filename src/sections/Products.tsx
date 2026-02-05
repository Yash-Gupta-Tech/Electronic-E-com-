import { useEffect, useRef, useState } from 'react';
import { ShoppingCart, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

export default function Products() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      description: `$${product.price.toFixed(2)}`,
    });
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
      setScrollPosition(newPosition);
    }
  };

  const displayProducts = products.slice(0, 6);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-dark w-full overflow-hidden"
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
              FEATURED PRODUCTS
            </span>
            <h2
              className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.1s' }}
            >
              OUR <span className="text-gradient">PRODUCTS</span>
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div
            className={`flex gap-3 mt-6 lg:mt-0 ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 border border-dark-light rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 border border-dark-light rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all duration-300"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Products */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-12 xl:px-20 pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProducts.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className={`flex-shrink-0 w-72 group ${
              isVisible ? 'animate-slide-up' : 'opacity-0'
            }`}
            style={{ animationDelay: `${0.3 + index * 0.1}s` }}
          >
            <div className="bg-dark-light rounded-2xl overflow-hidden hover-lift">
              {/* Image */}
              <div className="relative aspect-square bg-gradient-to-b from-dark-lighter to-dark p-6">
                {product.badge && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                    {product.badge}
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 right-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary-light"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-gray-custom text-xs mb-2">{product.category}</p>
                <h3 className="font-display text-lg font-semibold text-white mb-2 line-clamp-1">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-white text-sm">{product.rating}</span>
                  </div>
                  <span className="text-gray-custom text-sm">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-custom text-sm line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div
        className={`text-center mt-12 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.8s' }}
      >
        <Button
          variant="outline"
          size="lg"
          className="border-white/30 text-white hover:bg-white/10 px-8"
        >
          View All Products
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}
