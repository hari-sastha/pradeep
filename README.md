# ELITE XI FOOTBALL ACADEMY PORTAL

> A premium, production-grade football player management portal designed for youth & elite football academies. Built with React, Vite, Tailwind CSS, Lucide icons, and browser `localStorage` persistence.

---

## ⚽ Project Overview

The **Elite XI Football Academy Portal** simulates a professional football organization's digital ecosystem. Players can register an account, log in, track assigned training tasks, review performance metrics on a 5-axis tactical radar, view pitch session schedules, message their assigned mentor/coach, and stay updated with academy announcements.

---

## ⚡ Tech Stack

- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4 + Pitch Dark Theme Design System
- **Icons**: Lucide React
- **State & Data**: React Context API (`AuthContext`, `AcademyContext`, `ToastContext`)
- **Persistence**: Browser `localStorage` (Centralized `storage.js` architecture)
- **CI/CD**: GitHub Actions workflow for automatic GitHub Pages deployment

---

## 🔑 Key Features

1. **Public Landing Page**: Premium hero section, tactical philosophy breakdown, academy development plans, mentor spotlight, and call-to-action.
2. **Player Registration & Login**: Real-time form validation, position selection (Goalkeeper to Striker), experience levels, emergency contacts, and one-click demo login.
3. **Comprehensive Player Dashboard**: Player profile summary, active training tasks, streak counter, circular overall progress indicator, upcoming training session preview, assigned mentor spotlight, and recent announcements.
4. **Academy Training Plan**: Curriculum breakdown for Foundation, Development, and Elite plans with module progress tracking and plan switching.
5. **Interactive Training Tasks**: Filterable by category (*Technical, Tactical, Fitness, Mental, Recovery*) and status (*Pending, In Progress, Completed*). Completing tasks dynamically updates streak days and overall performance index.
6. **Performance Analytics & Radar**: 5-Axis SVG Spider/Radar chart visualizer evaluating Technical, Physical, Tactical, Mental, and Discipline attributes, alongside a milestone "Development Journey" timeline.
7. **Mentors & Coaching Staff**: Detailed coach profiles (license, experience, philosophy, achievements) with primary assigned coach spotlight and interactive "Contact Coach" modal.
8. **Training Session Calendar**: Upcoming pitch drills, gym sessions, match simulations, venue locations, lead coach, and interactive RSVP/attendance tracking.
9. **Academy Announcements**: News bulletins with priority badges, read/unread filters, and expandable notice details.
10. **Player Profile & Settings**: Editable profile details, password change, notification toggles, and factory data reset confirmation modal.

---

## 📂 Project Structure

```
c:\Users\Harisastha\projects\pradeep\
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages automated build & deployment workflow
├── src/
│   ├── config/
│   │   └── academyConfig.js     # Single point of truth for branding, academy details, and plans
│   ├── data/
│   │   └── demoData.js          # Factory seed data for demo player, mentors, tasks, sessions & news
│   ├── utils/
│   │   ├── storage.js           # Safe localStorage reader, writer & deleter
│   │   ├── auth.js              # Auth helper logic
│   │   └── calculations.js      # Business logic: task completion %, overall rating, streaks
│   ├── context/
│   │   ├── AuthContext.jsx      # Global authentication state context
│   │   ├── AcademyContext.jsx   # Global academy state (tasks, progress, mentors, sessions, news)
│   │   └── ToastContext.jsx     # Reusable notification toast system
│   ├── components/
│   │   ├── common/              # Reusable UI components (StatCard, TaskCard, MentorCard, SessionCard, CircularProgress, RadarChart, Modal, Navbar, Sidebar, Header, MobileNav, Footer)
│   │   └── layout/              # MainLayout wrapper
│   ├── pages/                   # All 12 application pages
│   ├── index.css                # Tailwind CSS v4 & football pitch styling utilities
│   ├── App.jsx                  # Application router configuration
│   └── main.jsx                 # Entry point
├── .gitignore
├── index.html                   # HTML template with SEO meta tags
├── package.json
├── README.md
└── vite.config.js               # Vite config with relative base path for GitHub Pages
```

---

## 💾 LocalStorage Architecture

All persistent data is stored in the browser using these centralized keys:

- `footballAcademyUsers`: Array of registered player accounts
- `footballAcademyCurrentUser`: Currently authenticated player session
- `footballAcademyTasks`: List of assigned training tasks
- `footballAcademyProgress`: Player attribute ratings and journey milestones
- `footballAcademyMentors`: Coaching staff directory
- `footballAcademySessions`: Training calendar sessions
- `footballAcademyAnnouncements`: Academy announcements & read statuses
- `footballAcademyPlans`: Enrolled academy plans

---

## 👤 Demo Login Credentials

For testing and demonstration, use the pre-configured demo account or click the **"Use Demo Account"** button on the login screen:

- **Email**: `demo@elitexi.com`
- **Password**: `demo123`

---

## 🛠️ Local Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 🚀 GitHub Remote Setup & Deployment

### 1. Connecting to a GitHub Remote

To push this repository to GitHub:

1. Create a new empty repository on GitHub (e.g., `football-academy-portal`).
2. Open your terminal in the project folder and run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   ```
3. Verify the remote connection:
   ```bash
   git remote -v
   ```
4. Push your code to the `main` branch:
   ```bash
   git push -u origin main
   ```

---

### 2. Deploying to GitHub Pages

This project includes a pre-configured GitHub Actions workflow in `.github/workflows/deploy.yml`.

To activate automatic GitHub Pages deployment:

1. Push your code to the `main` branch on GitHub.
2. Open your repository on **GitHub.com**.
3. Go to **Settings** → **Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. The deployment workflow will trigger automatically. Once complete, your site will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`

*Note: No environment variables or external API keys are required for deployment.*

---

## 🔒 Technical Disclaimer

> *This application uses browser `localStorage` for demonstration and prototype purposes. Production deployment should use secure server-side authentication and an external database (e.g. PostgreSQL, Node.js API).*

---

© 2026 ELITE XI FOOTBALL ACADEMY. All Rights Reserved.
