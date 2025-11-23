# Sparkfined Landing Page

Professional landing page for Sparkfined – crypto trading analytics platform.

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Animations**: Framer Motion
- **Deployment**: Vercel (SPA rewrite configured in `vercel.json`)
- **Domain**: sparkfined.xyz

## 📦 Project Structure

```
sparkfined-landing/
├── src/
│   ├── components/
│   │   └── sections/
│   │       └── Hero.tsx
│   ├── styles/
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── assets/
├── vercel.json
└── package.json
```

## 🛠️ Setup

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Server läuft auf http://localhost:5173

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🌐 Deployment

### Vercel Setup (empfohlen)

1. **Login to Vercel** (falls noch nicht geschehen)
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Erstes Deployment**
   ```bash
   vercel
   ```
   - Framework wird automatisch als **Vite** erkannt.
   - Build command: `npm run build`
   - Output directory: `dist`
   - Rewrites für SPA sind bereits in `vercel.json` definiert.

3. **Production Deployment**
   ```bash
   vercel --prod
   ```

4. **Custom Domain Setup (sparkfined.xyz)**
   - In den Projekteinstellungen unter **Domains** `sparkfined.xyz` hinzufügen.
   - Vercel schlägt die notwendigen DNS-Records vor (A-Record `76.76.21.21` und CNAME `cname.vercel-dns.com` für `www`).

### Environment Variables
- Kopiere `.env.example` zu `.env.local` und passe Werte an.
- Vercel: Project Settings → Environment Variables → Werte aus `.env.local` eintragen (z.B. `VITE_SITE_URL`).

## 🎨 Design System

### Colors
- Background: `#0A0E1A` (Deep space)
- Surface: `#141927` (Elevated panels)
- Primary: `#00F5FF` (Cyan - CTAs)
- Success: `#00DD88` (Green - Positive)
- Warning: `#FFA500` (Orange - Caution)
- Error: `#FF4444` (Red - Negative)

## 🔮 Easter Eggs

- Ghost glow effects (333ms timing)
- Alchemical symbols (5% opacity)
- Color progression (lead → gold)
- Phase number math (1+2+3+4=10→1)

## 📊 Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Lighthouse Score: 95+

## 🔗 Links

- **Production**: https://sparkfined.xyz
- **GitHub**: https://github.com/baum777/sparkfined-landing

## 📄 License

Private - © 2024 Sparkfined
