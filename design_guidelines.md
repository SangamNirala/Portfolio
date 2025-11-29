# Design Guidelines: ML Engineer Portfolio for Sangam Nirala

## Design Approach
**Reference-Based**: Inspired by modern tech portfolios (Linear, Vercel, GitHub) with clean, technical aesthetic emphasizing professionalism and innovation in ML/AI space.

## Typography System
**Primary Font**: Inter (Google Fonts) - modern, technical, highly readable
**Secondary Font**: JetBrains Mono (Google Fonts) - for code snippets and technical badges

**Hierarchy**:
- Hero Name: text-6xl md:text-7xl lg:text-8xl, font-bold, tracking-tight
- Hero Tagline: text-xl md:text-2xl, font-medium
- Section Headings: text-4xl md:text-5xl, font-bold
- Subsection Headings: text-2xl md:text-3xl, font-semibold
- Project Titles: text-xl font-semibold
- Body Text: text-base md:text-lg, font-normal, leading-relaxed
- Tech Badges: text-sm, font-medium, JetBrains Mono
- Captions: text-sm, font-normal

## Spacing System
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24**
- Component padding: p-6 to p-8
- Section vertical spacing: py-16 md:py-24
- Card gaps: gap-6 md:gap-8
- Container max-width: max-w-7xl

## Layout Structure

### Hero Section (100vh)
Full-viewport immersive introduction with large hero image background showcasing ML/AI workspace or abstract tech visualization. Content centered with glassmorphic overlay card.

**Content**:
- Name (large, bold typography)
- Title: "Machine Learning Engineer"
- Two-line summary highlighting MLOps and production ML systems
- CTA buttons: "View Projects" (primary), "Download Resume" (secondary) with backdrop-blur
- Social links: LinkedIn, GitHub, Email (icon buttons)

### About Section
Single-column layout (max-w-4xl centered) with expanded summary, highlighting passion for end-to-end ML pipelines and deployment automation.

### Experience Timeline
Vertical timeline design with two experience cards (Zenbourg, Sakura Biotech). Each card includes:
- Company logo placeholder (circular, 64px)
- Role title, duration, location
- 3 bullet points with quantifiable achievements
- Tech stack badges at bottom
- Hover: subtle elevation and glow effect

Layout: Single column on mobile, staggered left-right on desktop for visual interest.

### Featured Projects Showcase
2-column grid (1 col mobile, 2 col desktop) with large project cards for Face Detection and PDF Chatbot.

**Each Card**:
- Project thumbnail/mockup image (16:9 aspect ratio)
- Project title
- 2-3 line description
- Tech stack badges (pill-shaped, grouped by category)
- "View Details" link with arrow icon (Heroicons)
- Hover: scale transform and border glow

### Skills Matrix
4-column grid (2 col mobile, 4 col desktop) organizing skills by category:
1. Languages
2. ML Frameworks
3. MLOps Tools  
4. Cloud & Deployment

**Presentation**: Each category as a card with icon header, list of technologies as badges with icons from Font Awesome.

### Education
Centered card layout with institution name, degree, CGPA, and years. Include university logo placeholder.

### Honors & Achievements
Two achievement cards in 2-column grid:
1. StemFusion Winner with trophy icon
2. Technovanza Marketing Head with leadership icon

Include brief description under each title.

### Footer
3-column layout (stacks on mobile):
- Column 1: Name, tagline, social links
- Column 2: Quick navigation (Projects, Experience, Contact)
- Column 3: Contact info (email, location)

## Component Library

**Cards**: Rounded-2xl borders, subtle shadow, hover elevation, padding p-6 to p-8

**Buttons**:
- Primary: Solid fill, rounded-lg, px-6 py-3, font-medium
- Secondary: Outline style, same sizing
- All buttons with backdrop-blur when on images

**Badges**: Rounded-full, px-3 py-1, text-xs uppercase tracking-wide

**Timeline Connector**: Vertical line with circular node markers

**Icons**: Heroicons or Font Awesome, size-5 to size-6

## Images

### Hero Background (Required)
**Description**: Abstract neural network visualization, circuit board patterns, or modern ML workspace with multiple monitors showing code/visualizations. Should evoke innovation and technology.
**Placement**: Full-width background with overlay gradient (dark to transparent) for text readability

### Project Thumbnails (2 images)
**Face Detection**: Screenshot of Flask web interface showing face detection in action with bounding boxes
**PDF Chatbot**: Streamlit interface showing chat conversation with PDF document visible
**Placement**: Top of each project card, 16:9 ratio

### Company Logos (2 placeholders)
Circular 64px placeholders for Zenbourg and Sakura Biotech

### University Logo (1 placeholder)
120px width for VJTI logo in education section

## Animations
Minimal, purposeful animations:
- Scroll-triggered fade-in for sections (subtle, fast)
- Card hover: scale(1.02) transform
- Button hover: slight translate-y
- Timeline nodes: pulse animation on scroll into view

## Accessibility
- Semantic HTML throughout
- ARIA labels on icon-only buttons
- Sufficient contrast ratios (WCAG AA)
- Keyboard navigation support
- Focus indicators on interactive elements

**Overall Aesthetic**: Professional, modern, tech-forward portfolio that balances visual appeal with clarity, showcasing ML engineering expertise through clean design and strategic use of technical elements.