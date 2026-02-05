import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, totalPrice, items, removeFromCart, updateQuantity, setIsCartOpen, isCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Categories', href: '#categories' },
    { name: 'Products', href: '#products' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark/90 backdrop-blur-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-white tracking-wider">
              TECH<span className="text-primary">GEAR</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-custom hover:text-white transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-custom hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:block p-2 text-gray-custom hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            {/* Cart */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <button className="p-2 text-gray-custom hover:text-white transition-colors relative">
                  <ShoppingCart className="w-5 h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                      {totalItems}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md bg-dark border-dark-light">
                <SheetHeader>
                  <SheetTitle className="text-white font-display text-xl">Your Cart</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
                  {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-custom">
                      <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
                      <p className="text-lg">Your cart is empty</p>
                      <p className="text-sm mt-2">Add some products to get started</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-4 pr-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-4 bg-dark-light rounded-lg p-3 animate-slide-in-right"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h4 className="text-white font-medium text-sm line-clamp-1">
                                {item.name}
                              </h4>
                              <p className="text-primary font-semibold mt-1">
                                ${item.price.toFixed(2)}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 bg-dark rounded flex items-center justify-center text-white hover:bg-primary transition-colors"
                                >
                                  -
                                </button>
                                <span className="text-white text-sm w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 bg-dark rounded flex items-center justify-center text-white hover:bg-primary transition-colors"
                                >
                                  +
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-auto text-gray-custom hover:text-red-500 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t border-dark-light pt-4 mt-4">
                        <div className="flex justify-between text-white mb-4">
                          <span className="text-gray-custom">Subtotal</span>
                          <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3">
                          Checkout
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-gray-custom hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-dark-light animate-slide-up">
            <div className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-custom hover:text-white transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
