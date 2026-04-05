# ResumeForge — AI-Powered Resume Builder

> A full-featured, production-grade resume builder built with **Vite + React**. Dynamic layouts, AI writing, PDF/Word export, payments, LinkedIn import, and a full admin panel.

![ResumeForge](https://img.shields.io/badge/React-18-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![Zustand](https://img.shields.io/badge/Zustand-5-orange)

---

## ✨ Features

### Core Resume Builder
- **Universal Layout Engine** — Dynamic layout generation via `UniversalLayout` component; templates adapt automatically
- **9+ Premium Templates** — Classic, Modern Sidebar, Minimal, Bold, Executive Dark, Academic, Tech, Creative, Corporate
- **Single & Two-Column Layouts** — Timeline, sidebar, equal columns, single-column
- **Custom Hex Color Picker** — Infinite color combinations via `react-colorful`
- **Typography Control** — 8 font families, size scales, spacing modes
- **Live Preview** — Real-time resume preview as you type
- **Zoom Control** — 50%–150% zoom on the canvas

### AI Features (`/builder/:id`)
- **Enhance Summary** — AI rewrites your summary to be compelling
- **Bullet Point Generator** — Achievement-focused bullets for any role
- **ATS Score Checker** — Keyword analysis and compatibility score
- **Job Tailoring** — Paste a job description, get a tailored resume
- Powered by **Anthropic Claude API** (configure in Admin → Settings)

### Export
- **PDF** — `html2canvas` + `jsPDF`, multi-page, pixel-perfect
- **Word (.docx)** — Full `docx` library with proper headings, colors, borders
- **ATS-Optimized** — Both formats pass major ATS systems

### Authentication
- Email/Password sign-in and registration
- **Google OAuth** (connect in Admin → Settings → Integrations)
- **LinkedIn OAuth** for profile import
- Role-based access: `user`, `admin`

### Dashboard
- Resume card grid with color preview
- Rename, duplicate, delete, download from card menu
- LinkedIn import modal
- Upload existing resume (PDF/Word parsing)

### Payments
- **Subscription plans**: Free / Pro ($9.99/mo) / Enterprise ($29.99/mo)
- **Individual template purchases** — one-time $4.99–$7.99
- Annual billing toggle (20% discount)
- Stripe / Razorpay / PayPal support (configure in Admin)

### Admin Panel (`/admin`)
| Section | Features |
|---------|----------|
| Overview | Stats: users, revenue, resumes, templates |
| Templates | Set each template Free or Paid, set price |
| Plans | Edit plan prices and features live |
| Users | View, search, manage all users |
| Transactions | Full transaction history with status |
| Settings | Site name, AI key, payment gateway, toggles |

### User Profile (`/profile`)
- Edit name/email
- Password change
- Billing history & card management
- Connected accounts (LinkedIn, Google, GitHub)
- Notification preferences

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Demo Accounts
| Email | Password | Role |
|-------|----------|------|
| `demo@resumeforge.com` | any | Pro User |
| `admin@resumeforge.com` | any | Administrator |

---

## 🗂 Project Structure

```
resumeforge/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── src/
│   ├── main.jsx                    # Entry point
│   ├── App.jsx                     # Router + auth guards
│   ├── store/
│   │   └── index.js                # Zustand stores (auth, resume, UI, admin)
│   ├── data/
│   │   └── templates.js            # Template registry + fonts
│   ├── components/
│   │   └── resume/
│   │       └── UniversalLayout.jsx # 🔑 Dynamic Layout Engine
│   ├── pages/
│   │   ├── LandingPage.jsx         # Marketing homepage
│   │   ├── AuthPage.jsx            # Sign in / Register
│   │   ├── DashboardPage.jsx       # User resume dashboard
│   │   ├── BuilderPage.jsx         # Full resume editor
│   │   ├── TemplatesPage.jsx       # Template gallery
│   │   ├── PricingPage.jsx         # Plans + FAQ
│   │   ├── ProfilePage.jsx         # Account settings
│   │   ├── AdminPage.jsx           # Admin panel
│   │   └── NotFoundPage.jsx        # 404
│   ├── utils/
│   │   └── download.js             # PDF + Word generation
│   └── styles/
│       └── globals.css             # Design system
```

---

## 🔧 Configuration

### Environment Variables
Create a `.env` file:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...        # For AI features
VITE_GOOGLE_CLIENT_ID=...                # For Google OAuth
VITE_LINKEDIN_CLIENT_ID=...              # For LinkedIn import
VITE_STRIPE_PUBLIC_KEY=pk_live_...      # For Stripe payments
VITE_RAZORPAY_KEY_ID=rzp_live_...       # For Razorpay
VITE_FIREBASE_CONFIG=...                 # For Firebase auth + DB (optional)
```

### Backend / Database Options

This app uses **Zustand + localStorage** for state by default (demo mode).

For production, swap the store with:

| Option | Best For |
|--------|----------|
| **Firebase** (Firestore + Auth) | Quickest setup, scales well |
| **Supabase** (Postgres + Auth) | Open source, SQL |
| **PocketBase** | Self-hosted, lightweight |
| **Custom Node.js API** | Full control |

The store interface (`login`, `createResume`, `updateResumeData`, etc.) stays the same — just change the implementation to call your API.

---

## 🎨 UniversalLayout — Dynamic Layout Engine

The core of ResumeForge. One component, infinite layouts:

```jsx
<UniversalLayout resume={activeResume} scale={0.8} />
```

**How it works:**
1. Reads `resume.templateId` → looks up template config in `TEMPLATES[]`
2. Routes to the right layout engine (`SingleColumn`, `TwoColumnSidebar`, `TwoColumnEqual`, `Timeline`)
3. Layout engine selects the right header style (`Centered`, `LeftAligned`, `Banner`, `Sidebar`)
4. Renders all sections using shared components (`SectionExperience`, `SectionSkills`, etc.)
5. All colors, fonts, spacing come from `resume.settings` — fully dynamic

**Adding a new template:** Just add an entry to `src/data/templates.js`:

```js
{
  id: 'my-template',
  name: 'My Template',
  category: 'Creative',
  access: 'pro',   // 'free' | 'pro'
  price: 4.99,
  layout: {
    type: 'two-column-sidebar',  // or single-column, two-column-equal, timeline
    headerStyle: 'banner',       // or centered, left-aligned, sidebar
    sectionDivider: 'line',      // or subtle, accent, dot, none, ornate
    fontPrimary: 'Playfair Display',
    fontBody: 'DM Sans',
  },
  defaults: {
    primaryColor: '#your-color',
    secondaryColor: '#accent',
    accentColor: '#highlight',
  }
}
```

---

## 💳 Payment Integration

### Stripe (Recommended)

```bash
npm install @stripe/stripe-js
```

In `src/utils/payment.js`:
```js
import { loadStripe } from '@stripe/stripe-js'
const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export async function checkout(priceId) {
  const session = await fetch('/api/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({ priceId }),
  }).then(r => r.json())
  
  await stripe.redirectToCheckout({ sessionId: session.id })
}
```

### Razorpay

```js
const rzp = new window.Razorpay({
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: 99900, // ₹999 in paise
  currency: 'INR',
  handler: (response) => { /* handle success */ }
})
rzp.open()
```

---

## 🔗 LinkedIn Import

1. Create a LinkedIn App at https://developer.linkedin.com
2. Add OAuth 2.0 redirect: `https://yourdomain.com/auth/linkedin`
3. Set `VITE_LINKEDIN_CLIENT_ID` in `.env`
4. The import modal in Dashboard will fetch: profile, positions, education, skills

---

## 🤖 AI Integration

The AIPanel in the Builder uses the Anthropic API directly from the browser (for the demo). In production, **proxy through your backend** to protect your API key:

```js
// Your API route: POST /api/ai/enhance
const response = await anthropic.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1000,
  messages: [{ role: 'user', content: prompt }]
})
```

---

## 📱 Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| Mobile (< 768px) | Single column, sidebar stacks below |
| Tablet (768–1024px) | Compact builder, preview hidden |
| Desktop (> 1024px) | Full 3-pane builder |

---

## 🏗 Build & Deploy

```bash
# Production build
npm run build

# Preview production build
npm run preview

# Deploy to Vercel
npx vercel

# Deploy to Netlify
npm run build && netlify deploy --prod --dir=dist
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `zustand` | State management |
| `react-hot-toast` | Toast notifications |
| `lucide-react` | Icon library |
| `react-colorful` | Hex color picker |
| `html2canvas` | PDF rendering |
| `jspdf` | PDF generation |
| `docx` | Word document generation |
| `framer-motion` | Animations |
| `react-dnd` | Drag and drop |
| `uuid` | Unique ID generation |

---

## 📄 License

MIT — Free to use and modify for personal and commercial projects.

---

## 🙏 Credits

Inspired by makemycv.com, visualcv.com, cvdesignr.com, and myperfectresume.com.

Built with ❤️ using Vite, React, and Anthropic Claude.
