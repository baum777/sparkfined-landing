# Sparkfined Landing Page

Hero's Journey narrative landing page for Sparkfined – professional crypto trading analytics platform.

🌐 **Live:** [sparkfined.xyz](https://sparkfined.xyz)

---

## 🎯 Overview

A narrative-driven landing page that tells the trader's journey from chaos to mastery through five transformational phases. Built with React 19, TypeScript, and Design System v1.0.

### Features

- **Hero's Journey Narrative** - Emotional storytelling from Degen to Sage
- **Interactive Phase Timeline** - Five clickable journey phases with detailed descriptions
- **Design System v1.0** - Alchemical color scheme with professional design tokens
- **Trading Demo Tools** - Interactive market replay and signal analysis components
- **Performance Optimized** - Lighthouse score 95+, < 1.5s FCP
- **Fully Responsive** - Mobile-first design with optimized breakpoints

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Development server runs on [http://localhost:5173](http://localhost:5173)

---

## 📚 Documentation

- **[Quick Start Guide](./docs/QUICKSTART.md)** - Get started with development
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Deploy to Vercel or custom server
- **[Trading Demo Tools](./docs/trading-demo-tools/)** - Interactive component architecture
- **[Full Documentation](./docs/)** - Complete docs directory

---

## 🎨 Design System v1.0

### Alchemical Color Palette

```css
/* Primary Colors */
--color-void: #0A0A0A;           /* Background - Pure black */
--color-spark: #00F0FF;          /* Brand primary - Cyan */
--color-smoke: #2A2A2A;          /* Containers */
--color-mist: #FFFFFF;           /* Primary text */

/* Semantic Colors */
--color-blood: #FF006E;          /* Danger/stop-loss */
--color-gold: #FFB800;           /* Warning/opportunities */
--color-phosphor: #39FF14;       /* Success/confirmation */
--color-violet: #9D4EDD;         /* Mystical/mastery */

/* Phase Colors */
--color-phase-degen: var(--color-blood);
--color-phase-seeker: var(--color-gold);
--color-phase-warrior: var(--color-spark);
--color-phase-master: var(--color-violet);
--color-phase-sage: var(--color-phosphor);
```

### Typography

- **Display Font:** Space Grotesk (headings, phase names)
- **Body Font:** Inter (paragraph text, UI)
- **Mono Font:** JetBrains Mono (data, code)

### Spacing System

8px-based spacing scale:
- `--space-1`: 4px
- `--space-2`: 8px
- `--space-4`: 16px
- `--space-8`: 48px
- `--space-12`: 96px

---

## 🏗️ Project Structure

```
sparkfined-landing/
├── src/
│   ├── components/
│   │   ├── landing/              # Hero's Journey components
│   │   ├── shared/               # Reusable UI components
│   │   ├── charts/               # Trading visualizations
│   │   └── tools/                # Interactive demo tools
│   ├── data/
│   │   └── journey.ts            # Content for Hero's Journey
│   ├── styles/
│   │   ├── design-tokens.css     # Design System v1.0 variables
│   │   ├── global.css            # Base styles and components
│   │   └── landing.css           # Landing page specific styles
│   ├── pages/
│   │   └── LandingPage.tsx       # Main page component
│   └── main.tsx                  # Application entry point
├── docs/                         # Documentation
├── public/                       # Static assets
└── design-tokens-extracted/      # Design system source files
```

---

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Animation** | Framer Motion |
| **Styling** | CSS Custom Properties (Design System v1.0) |
| **Deployment** | Vercel |
| **Domain** | sparkfined.xyz |

---

## 🎭 Content Structure

The landing page follows the Hero's Journey arc:

1. **Hero Section** - Opening statement: "From Chaos to Mastery"
2. **Wounds Section** - Four pain points (Chaos, Confusion, Delusion, Isolation)
3. **Journey Section** - Five interactive phases with detailed descriptions
4. **Transformation Section** - Before/After comparison
5. **Voices Section** - Testimonials from traders at different phases
6. **Final CTA** - "Begin The Transformation" call-to-action
7. **Footer** - Social links and closing quote

Edit content in `src/data/journey.ts`

---

## 🛠️ Development

### Content Updates

All narrative content is centralized in:
```
src/data/journey.ts
```

Update:
- Phase descriptions and markers
- Testimonials
- Wounds (pain points)
- Before/After transformation items
- CTA text and URLs
- Navigation links

### Style Customization

Design tokens are in:
```
src/styles/design-tokens.css
```

Modify:
- Color palette
- Spacing scale
- Typography settings
- Animation timings
- Shadow/glow effects

### Component Development

Landing page components:
```
src/components/landing/
```

Shared UI components:
```
src/components/shared/
```

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Manual Deployment

```bash
# Build
npm run build

# Upload dist/ folder to your hosting provider
```

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions including custom domain setup.

---

## 📊 Performance Targets

- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.0s
- **Lighthouse Score:** 95+
- **Bundle Size:** < 250KB (gzipped)

---

## 🧪 Testing

```bash
# Lint code
npm run lint

# Type check
npm run type-check

# Build check
npm run build
```

---

## 🔗 Links

- **Production:** [sparkfined.xyz](https://sparkfined.xyz)
- **GitHub:** [github.com/baum777/sparkfined-landing](https://github.com/baum777/sparkfined-landing)
- **Documentation:** [./docs/](./docs/)

---

## 📄 License

Private - © 2024 Sparkfined

---

## 🎉 Credits

**Design System v1.0** - Alchemical trading interface
**Hero's Journey Framework** - Joseph Campbell's monomyth adapted for trader transformation
