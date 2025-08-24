# LumiStore - Modern E-commerce Frontend

A stunning, responsive e-commerce website built with React 19.1.1, TypeScript, Tailwind CSS, and Framer Motion. Features a minimalistic design with electric blue accents, smooth animations, and a masonry grid layout.

## 🚀 Features

### Design & UX
- **Minimalistic Design**: Clean white/black/gray palette with vibrant electric blue accents
- **Fully Responsive**: Mobile-first approach with perfect scaling across all devices
- **Smooth Animations**: Professional Framer Motion animations throughout
- **Masonry Grid Layout**: Pinterest-style product display that adapts to content
- **iOS-Style Navigation**: Clean desktop navbar + iOS-style mobile bottom tabs

### Key Sections
- **Animated Hero Section**: Striking hero with layered animations, parallax effects, and auto-sliding content
- **Product Grid**: Dynamic masonry layout with hover effects, like functionality, and interactive cards
- **Categories**: Beautiful category showcase with gradient overlays and smooth transitions
- **Responsive Header**: Glass morphism effects, search functionality, and mobile-optimized menu
- **Modern Footer**: Comprehensive footer with newsletter signup and social links

### Technical Excellence
- **React 19.1.1** with TypeScript for type safety
- **Framer Motion** for professional animations and micro-interactions
- **Tailwind CSS** with custom design system and semantic tokens
- **Component-driven architecture** for scalability
- **Mobile-first responsive design**
- **Professional code structure** with hooks and interfaces

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Quick Start
```bash
# Clone the repository
git clone <your-repo-url>
cd lumi-grid-store

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Customizing Theme & Colors

### Design System Location
The entire design system is centralized in:
- `src/index.css` - CSS variables, color tokens, component classes
- `tailwind.config.ts` - Tailwind theme extensions

### Color Customization
To change the primary accent color, update these variables in `src/index.css`:

```css
:root {
  /* Change these values for different accent colors */
  --primary: 215 91% 55%;        /* Electric Blue */
  --primary-foreground: 0 0% 100%;
  --primary-glow: 215 91% 65%;   /* Lighter variant */
}
```

### Example Color Palettes
```css
/* Emerald Green */
--primary: 142 76% 36%;
--primary-glow: 142 76% 46%;

/* Sunset Orange */
--primary: 24 95% 53%;
--primary-glow: 24 95% 63%;

/* Royal Purple */
--primary: 263 70% 60%;
--primary-glow: 263 70% 70%;
```

### Component Variants
Add new button variants in `src/index.css`:
```css
.custom-button {
  @apply inline-flex items-center justify-center px-6 py-3;
  @apply bg-primary text-primary-foreground rounded-xl;
  @apply transition-all duration-300 hover:scale-105;
}
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn UI components
│   ├── layout/            # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── MobileBottomNav.tsx
│   └── sections/          # Page sections
│       ├── HeroSection.tsx
│       ├── ProductGrid.tsx
│       └── CategoriesSection.tsx
├── pages/                 # Route pages
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
├── index.css             # Design system & global styles
└── main.tsx
```

## 🔧 Adding New Pages/Components

### Creating a New Page
1. Create file in `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`:
```tsx
<Route path="/new-page" element={<NewPage />} />
```
3. Add navigation link in `Header.tsx` and `MobileBottomNav.tsx`

### Creating Components
Follow the established patterns:
```tsx
import React from 'react';
import { motion } from 'framer-motion';

const MyComponent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="custom-component-class"
    >
      {/* Component content */}
    </motion.div>
  );
};

export default MyComponent;
```

## 🎯 Backend Integration Ready

The project is structured for easy backend integration:

### API Integration Points
- Product data fetching in `ProductGrid.tsx`
- Category data in `CategoriesSection.tsx`
- User authentication flows ready
- Cart state management prepared
- Search functionality hooks included

### Recommended Backend Integration
```tsx
// Example API integration
const useProducts = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);
  
  return products;
};
```

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Mobile**: < 768px (bottom navigation, stacked layout)
- **Tablet**: 768px - 1023px (adapted grid, condensed header)
- **Desktop**: 1024px+ (full features, hover effects)

### Mobile-Specific Features
- iOS-style bottom tab navigation
- Touch-optimized interactions
- Swipe gestures ready
- Optimized image loading
- Reduced motion support

## 🚀 Performance Optimizations

- **Lazy loading** for images and components
- **Framer Motion** optimized animations
- **Tailwind CSS** purged for minimal bundle size
- **Code splitting** ready for route-based chunks
- **Semantic HTML** for accessibility and SEO

## 🎨 Animation System

### Animation Classes Available
```css
/* Hover effects */
.hover-scale          /* Scale on hover */
.product-card         /* Product card effects */
.nav-link            /* Navigation link animations */

/* Layout animations */
.hero-button         /* Primary CTA button */
.hero-button-outline /* Secondary button */
.glass              /* Glassmorphism effect */
```

### Custom Animation Variants
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};
```

## 📚 Built With

- **React 19.1.1** - Latest stable React
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Shadcn/UI** - Beautiful, accessible component library
- **Lucide React** - Clean, consistent icons
- **React Router** - Client-side routing

## 🔗 Useful Links

- [Design System Documentation](src/index.css)
- [Component Examples](src/components/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [React 19 Docs](https://react.dev/)

## 📄 License

This project is built for modern e-commerce applications. Feel free to customize and extend based on your needs.

---

**Built with ❤️ for modern web commerce**