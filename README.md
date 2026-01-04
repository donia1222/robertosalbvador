# 💼 Roberto Salvador - Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://www.roberto-salvador.dev)
[![Remix](https://img.shields.io/badge/Remix-000000?style=for-the-badge&logo=remix&logoColor=white)](https://remix.run)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

Modern, multilingual portfolio showcasing professional services in mobile and web development. Built with cutting-edge technologies and best practices for optimal performance and SEO.

🌐 **[Visit Live Site](https://www.roberto-salvador.dev)**

---

## ✨ Features

### 🌍 **Multilingual Support**
- **3 Languages**: Spanish (ES), German (DE), and English (EN)
- **Auto-detection**: Automatically detects browser language on first visit
- **Persistent Preference**: Saves user language choice to localStorage
- **Seamless Switching**: Language selector in Header and Contact sections
- **Full Translation**: All content, metadata, and error messages translated

### 🎨 **Modern Design**
- Responsive design optimized for all devices
- Smooth animations and transitions
- Custom UI components with CSS modules
- Clean, professional aesthetic
- Accessible and user-friendly interface

### 🚀 **Performance Optimized**
- Built with Remix for optimal performance
- Server-side rendering (SSR)
- Progressive enhancement
- Optimized assets and images
- Fast loading times

### 📱 **Sections**
- **Hero**: Introduction with key statistics and CTAs
- **Services**: Mobile apps, web development, AI integration, tech consulting
- **Projects**: Published mobile applications showcase
- **Websites**: Professional websites portfolio
- **Tech Stack**: Technologies and frameworks carousel
- **Claude Code Banner**: AI-powered development workflow
- **Contact**: Contact information and downloadable vCard
- **Footer**: Legal information and links

### 🔍 **SEO Optimized**
- Dynamic meta tags per language
- Open Graph tags for social media
- Twitter Card integration
- Geo-tags for local SEO (St. Gallen, Switzerland)
- Semantic HTML structure
- Sitemap ready

---

## 🛠️ Tech Stack

- **Framework**: [Remix](https://remix.run) v2.15.0
- **UI Library**: [React](https://reactjs.org) v18.3.1
- **Language**: [TypeScript](https://www.typescriptlang.org) v5.7.2
- **Build Tool**: [Vite](https://vitejs.dev) v5.4.11
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) v5.5.0
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Styling**: CSS Modules
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20.0.0
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run typecheck  # Run TypeScript type checking
npm run lint       # Run ESLint
```

---

## 📂 Project Structure

```
portfolio/
├── app/
│   ├── components/
│   │   └── home/
│   │       ├── Header.tsx
│   │       ├── Hero.tsx
│   │       ├── Services.tsx
│   │       ├── OtherApps.tsx
│   │       ├── Websites.tsx
│   │       ├── TechCarousel.tsx
│   │       ├── ClaudeCodeBanner.tsx
│   │       ├── Contact.tsx
│   │       └── Footer.tsx
│   ├── context/
│   │   └── LanguageContext.tsx    # i18n implementation
│   ├── routes/
│   │   └── _index.tsx              # Main page route
│   └── root.tsx                     # Root layout
├── public/                          # Static assets
├── package.json
└── README.md
```

---

## 🌐 Internationalization

The portfolio uses a custom React Context-based i18n solution:

- **LanguageContext**: Manages language state and translations
- **Auto-detection**: Detects browser language on first visit
- **Fallback**: Defaults to English for unsupported languages
- **Storage**: Persists user preference in localStorage

### Supported Languages
- 🇪🇸 Spanish (es)
- 🇩🇪 German (de)
- 🇬🇧 English (en)

---

## 📞 Contact

**Roberto Salvador**
📍 Sevelen, Switzerland (9475)
🌐 [roberto-salvador.dev](https://www.roberto-salvador.dev)

---

## 📄 License

This project is private and proprietary.

---

## 🙏 Acknowledgments

- Built with ❤️ using Remix and React
- Powered by Claude Code AI agents for rapid development
- Deployed on Vercel

---

**⭐ Star this repo if you find it helpful!**
