import { CartProvider } from '@/context/CartContext';
import { Toaster } from '@/components/ui/sonner';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Categories from '@/sections/Categories';
import Products from '@/sections/Products';
import Features from '@/sections/Features';
import Reviews from '@/sections/Reviews';
import Blog from '@/sections/Blog';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-dark text-white overflow-x-hidden">
        <Navigation />
        <main>
          <Hero />
          <Categories />
          <Products />
          <Features />
          <Reviews />
          <Blog />
          <Newsletter />
        </main>
        <Footer />
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#fff',
              border: '1px solid #2a2a2a',
            },
          }}
        />
      </div>
    </CartProvider>
  );
}

export default App;
