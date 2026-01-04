# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev        # Start development server on http://localhost:5173
npm run build      # Build for production (outputs to build/)
npm run start      # Start production server (serves from build/server/index.js)
npm run typecheck  # Run TypeScript type checking
npm run lint       # Run ESLint
```

## Tech Stack

- **Framework**: Remix v2.15.0 (with Vite v5.4.11)
- **UI**: React v18.3.1 with TypeScript v5.7.2
- **Styling**: CSS Modules (component-scoped styles)
- **Icons**: React Icons v5.5.0
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel
- **Node Version**: >= 20.0.0

## Architecture Overview

### Remix Configuration
- Uses Remix v3 future flags in `vite.config.ts`:
  - `v3_fetcherPersist`
  - `v3_relativeSplatPath`
  - `v3_throwAbortReason`
  - `v3_singleFetch`
  - `v3_lazyRouteDiscovery`
- Path aliases configured via `tsconfig.json`: `~/*` maps to `./app/*`

### Application Structure

**Single-Page Portfolio**: The app is a single-route application (`app/routes/_index.tsx`) with all sections rendered on one page. Navigation is anchor-based (`#inicio`, `#servicios`, `#proyectos`, `#tech`, `#contacto`).

**Component Architecture**:
- `app/components/home/`: All page sections (Header, Hero, Services, Projects, OtherApps, Websites, TechCarousel, ClaudeCodeBanner, Contact, Footer, RainEffect)
- Each component has a paired CSS Module (e.g., `Header.tsx` + `Header.module.css`)
- Components are exported via `app/components/home/index.ts` for clean imports

**Global State Management**:
- Custom React Context implementations (no external state library)
- `LanguageContext`: Manages 3-language i18n (Spanish, German, English)
- `ThemeContext`: Manages light/dark theme switching
- Both contexts use localStorage for persistence and client-side only initialization

### Internationalization (i18n)

**Implementation**: Custom React Context-based solution in `app/context/LanguageContext.tsx`

**Key Features**:
- Supports 3 languages: Spanish (es), German (de), English (en)
- Browser language auto-detection on first visit
- Falls back to English for unsupported languages
- Persists user preference to localStorage as `portfolio-language`
- All translations stored inline within `LanguageContext.tsx` in a `translations` object
- Translation function: `t(key)` returns translated string for current language

**Usage Pattern**:
```typescript
const { language, setLanguage, t, mounted } = useLanguage();
const title = t("hero.title");
```

**Adding Translations**:
1. Add new translation key to all three language objects in `LanguageContext.tsx`
2. Use the `t()` function in components to access translations
3. Always provide translations for all three languages

### Theme System

**Implementation**: Custom React Context in `app/context/ThemeContext.tsx`

**Features**:
- Light/dark theme switching
- System preference detection via `prefers-color-scheme`
- Persists to localStorage as `portfolio-theme`
- Sets `data-theme` attribute on `<html>` element
- Anti-flash script in `root.tsx` prevents incorrect theme flash on load

### Hydration & SSR Considerations

**Client-Only Features**: Both LanguageContext and ThemeContext use a `mounted` state to prevent hydration mismatches:
- Initial state is set server-side
- `useEffect` runs client-side to load from localStorage or detect browser preferences
- Components should check `mounted` state before showing theme/language-dependent UI

**PageLoader**: Custom loading component (`app/components/PageLoader.tsx`) that displays during hydration

### SEO & Metadata

**Route-Level Meta**: Metadata defined in `app/routes/_index.tsx` using Remix `meta` function
- Dynamic meta tags based on language
- Includes Open Graph, Twitter Cards, and geo-tags for St. Gallen, Switzerland
- Metadata translations stored inline in route file (separate from LanguageContext)

### Styling Conventions

- CSS Modules for component-scoped styles (`.module.css` extension)
- Global styles in `app/styles/global.css`
- Theme variables accessible via `data-theme` attribute on `<html>`
- Custom fonts: Sora (main) and Fira Code (monospace) from Google Fonts

### Key Files

- `app/root.tsx`: Application root with Layout, ErrorBoundary, context providers
- `app/routes/_index.tsx`: Main page route with all sections and SEO metadata
- `app/context/LanguageContext.tsx`: Complete i18n implementation with all translations
- `app/context/ThemeContext.tsx`: Theme management
- `vite.config.ts`: Vite and Remix configuration

## Development Notes

- Always use the `~/*` path alias for imports from the `app/` directory
- CSS Module imports require `?url` suffix: `import styles from './Component.module.css?url'`
- When adding new translatable content, update all three languages in `LanguageContext.tsx`
- Component styles are self-contained in CSS Modules alongside their TypeScript files
- The portfolio showcases mobile apps with links to App Store and Google Play
- Static assets (images, icons, vCard) are in `public/` directory
