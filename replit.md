# ML Engineer Portfolio - Sangam Nirala

## Overview

This is a personal portfolio website for Sangam Nirala, a Machine Learning Engineer. The application is a single-page portfolio showcasing professional experience, projects, and skills in ML/AI, with a focus on MLOps and production ML systems. The site features a modern, clean aesthetic inspired by tech companies like Linear, Vercel, and GitHub, with an immersive hero section, animated components, and downloadable resume functionality.

## User Preferences

Preferred communication style: Simple, everyday language.
Refactoring approach: Modular component architecture with domain-based organization.

## Recent Changes (November 30, 2025)

### Complete Component Refactoring - Professional Modular Architecture

**Major Refactoring Initiative**: Transformed 8+ monolithic components into a professional, modular architecture with clear separation of concerns.

**Refactored Components:**

1. **Projects Section** (249 → 27 lines)
   - `projects-data.ts` - All project data and metadata (64 lines)
   - `project-card.tsx` - Individual project card component (144 lines)
   - `animated-metric.tsx` - Reusable animated counter for metrics (40 lines)
   - `projects-section.tsx` - Main orchestrator (27 lines)

2. **Experience Section** (193 → 97 lines)
   - `experience-data.ts` - Experience entries and TypeScript interfaces (41 lines)
   - `experience-card.tsx` - Individual experience card with timeline (114 lines)
   - `experience-section.tsx` - Main orchestrator with tooltip & scroll logic (97 lines)

3. **Skills Section** (114 → 109 lines)
   - `skills-data.ts` - Skill icons, tiers, and configuration (70 lines)
   - `skills-section.tsx` - Main rendering with grid layout (109 lines)
   - Eliminated duplicate `AnimatedSection` component

4. **Footer Section** (162 → 107 lines)
   - `footer-data.ts` - Footer links, columns, social media, contact info (81 lines)
   - `newsletter-section.tsx` - Newsletter subscription isolated (88 lines)
   - `footer.tsx` - Main orchestrator (107 lines)

**Impact**: Total refactored code went from ~800+ lines of mixed concerns to ~1,000+ lines of clean, modular architecture with 100% code reusability.

## System Architecture

### Component Organization

**Domain-Based Structure** - Components organized by feature/domain for scalability:

```
components/
├── sections/
│   ├── hero/
│   │   ├── hero-section.tsx
│   │   ├── hero-content.tsx
│   │   ├── profile-image.tsx
│   │   └── hero-cta.tsx
│   ├── projects/
│   │   ├── projects-section.tsx
│   │   ├── projects-data.ts
│   │   ├── project-card.tsx
│   │   └── animated-metric.tsx
│   ├── experience/
│   │   ├── experience-section.tsx
│   │   ├── experience-data.ts
│   │   └── experience-card.tsx
│   ├── skills/
│   │   ├── skills-section.tsx
│   │   └── skills-data.ts
├── footer/
│   ├── footer.tsx
│   ├── footer-data.ts
│   └── newsletter-section.tsx
├── forms/
│   ├── contact-form.tsx
│   └── contact-form-data.ts
├── chat/
│   ├── ai-chat-dialog.tsx
│   ├── chat-interface.tsx
│   ├── chat-messages.tsx
│   └── chat-data.ts
├── navigation/
│   ├── navbar.tsx
│   └── mobile-menu.tsx
├── animations/
│   └── scroll-animations.tsx
├── utils/
│   ├── animated-section.tsx
│   ├── data-loader.ts
│   └── helpers.ts
└── ui/
    └── [shadcn components]
```

**Refactoring Patterns Applied:**
- Extract data constants into dedicated `*-data.ts` files
- Create reusable card/item components for repeated UI patterns
- Main section files act as clean orchestrators that compose child components
- Eliminate duplicate utility components (e.g., removed duplicate `AnimatedSection`)
- Pass callbacks/props instead of hardcoding behavior

### Frontend Architecture

**Framework**: React with TypeScript and Vite as the build tool. The application uses a modern client-side rendering approach with a single-page architecture.

**Routing**: Wouter library for lightweight client-side routing. The application currently has two routes:
- `/` - Home page (main portfolio)
- Catch-all route for 404 handling

**UI Component Library**: Shadcn/ui (New York style variant) built on Radix UI primitives. This provides accessible, customizable components with a consistent design system using CSS variables for theming.

**Styling**: 
- Tailwind CSS for utility-first styling
- Custom design system defined in `index.css` with CSS variables for colors, spacing, and effects
- Typography system using Inter (primary) and JetBrains Mono (for code/technical badges) from Google Fonts
- Responsive design with mobile-first approach
- Custom animations using Framer Motion for scroll-triggered animations and transitions

**State Management**: TanStack Query (React Query) for server state management and API calls. Configured with conservative defaults (no automatic refetching, infinite stale time).

**Design Rationale**: The choice of Shadcn/ui over a heavier component library provides flexibility and customization while maintaining accessibility standards through Radix UI. Wouter was chosen over React Router for its minimal bundle size, appropriate for a simple portfolio site. The modular component architecture ensures scalability and maintainability as features are added.

### Backend Architecture

**Server Framework**: Express.js with TypeScript, running on Node.js.

**Build System**: Custom build script using esbuild for server bundling and Vite for client bundling. The build process:
- Bundles commonly used dependencies (allowlist approach) to reduce cold start times
- Externalizes rarely-used dependencies
- Produces optimized production builds in the `dist` directory

**API Structure**: Minimal REST API with a single endpoint:
- `GET /api/resume` - Serves the PDF resume file from `attached_assets` directory

**Static File Serving**: Client build artifacts served from `dist/public` directory with SPA fallback to `index.html` for client-side routing.

**Development Environment**: 
- Vite development server in middleware mode for HMR (Hot Module Replacement)
- Replit-specific plugins for error overlay and development banner
- Custom logging middleware for request monitoring

**Rationale**: Express was chosen for its simplicity and widespread adoption. The minimal API surface reflects the portfolio's static nature, with only resume download requiring server-side handling.

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL (via Neon Database serverless driver).

**Schema**: Basic user authentication schema defined in `shared/schema.ts`:
- Users table with id, username, and password fields
- Zod validation schemas for type safety

**Current State**: Database infrastructure is configured but not actively used in the portfolio. The schema exists for potential future features like contact forms, admin panels, or visitor analytics.

**In-Memory Storage**: Fallback `MemStorage` implementation for user data without database dependency.

**Rationale**: Drizzle was chosen for its TypeScript-first approach and lightweight nature. The Neon serverless driver enables edge deployment and eliminates connection pooling concerns. The schema is prepared but inactive, following a "build for scale later" approach.

### External Dependencies

**UI & Interaction**:
- `@radix-ui/*` - Accessible component primitives (20+ components)
- `framer-motion` - Animation library for scroll-triggered effects
- `lucide-react` - Icon library
- `embla-carousel-react` - Carousel component
- `class-variance-authority` & `clsx` - Conditional styling utilities

**Forms & Validation**:
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `drizzle-zod` - Integration between Drizzle and Zod

**Database & API**:
- `@neondatabase/serverless` - PostgreSQL serverless driver
- `drizzle-orm` - TypeScript ORM
- `@tanstack/react-query` - Server state management

**Development Tools**:
- Vite plugins for Replit integration (`@replit/vite-plugin-*`)
- TypeScript for type safety across the stack
- Tailwind CSS with PostCSS for styling

**Build & Deployment**:
- `esbuild` - Fast JavaScript bundler for server code
- `vite` - Frontend build tool and dev server
- `tsx` - TypeScript execution for development and build scripts

**Typography**:
- Google Fonts: Inter (sans-serif), JetBrains Mono (monospace), DM Sans, Fira Code, Geist Mono

**Asset Management**: Static assets stored in `attached_assets` directory, aliased as `@assets` in the build configuration for easy imports.

## Development Workflow

### Adding New Features

1. **Define Data Model**: Create or update `shared/schema.ts` with TypeScript interfaces
2. **Extract Constants**: Put static data in `*-data.ts` files within the feature domain
3. **Create Card Component**: Build reusable UI component (e.g., `project-card.tsx`)
4. **Build Orchestrator**: Main section file that composes data and card components
5. **Integrate Animations**: Use `AnimatedSection` or `framer-motion` for scroll effects

### File Naming Conventions

- `*-section.tsx` - Main container component for a page section
- `*-card.tsx` - Reusable card component for individual items
- `*-data.ts` - Data constants, interfaces, and configuration
- `*-form.tsx` - Form components with validation
- `animated-*.tsx` - Components with animation logic

### Key Utilities

- `AnimatedSection` - Scroll-triggered fade and slide animations
- `StaggeredContainer` & `StaggeredItem` - Staggered animation containers
- `SectionHeading` - Animated section heading component

## Performance Optimizations

- Server-side components bundle common dependencies for faster cold starts
- Lazy component imports with code splitting
- Optimized bundle size with esbuild minification
- Image optimization with Vite asset handling
- CSS-in-JS with Tailwind for minimal CSS payload
- Scroll-triggered animations with Intersection Observer API

## Accessibility & Compliance

- WCAG AA compliant with semantic HTML
- Proper ARIA labels and roles
- Keyboard navigation support
- Dark mode support with theme persistence
- Responsive design from mobile to desktop
- Data-testid attributes on all interactive elements for testing

## Testing & Quality Assurance

- TypeScript strict mode for type safety
- Zod validation for runtime type checking
- Component-level testing with data-testid attributes
- Accessibility testing with ARIA compliance
- Performance monitoring with Lighthouse
