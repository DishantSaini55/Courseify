<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=4F46E5&height=220&section=header&text=Courseify&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=ffffff" />
  
  <a href="https://github.com/DishantSaini55/Courseify">
    <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=800&size=24&pause=1000&color=F97316&center=true&vCenter=true&width=600&lines=Premium+Course+Platform;Built+with+React+%2B+Tailwind+CSS;Powered+by+Clerk+%2B+Supabase;Smooth+Framer+Motion+Animations!" alt="Typing SVG" />
  </a>
</div>

<p align="center">
  <strong>A breathtaking, modern, Apple & Stripe-inspired course-selling application.</strong><br>
  Designed by <strong>Dishant</strong>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Clerk_Auth-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
</p>

## ✨ Features

- 🎨 **Glassmorphism UI:** Deep blue dark mode with frosted glass components, hovering glows, and customized scrollbars.
- 🔐 **Bulletproof Authentication:** Integrated exclusively with **Clerk**—abandoning standard JWTs for seamless Google/Social logins.
- 🗄️ **Supabase Postgres:** Entire custom MERN stack migrated over to rapid, secure Supabase relational tables.
- 🎬 **Cinematic Animations:** Powered by **Framer Motion** for elegant page-routing, grid staggering, and element popping.
- 💻 **Dual-Pane Course Editor:** Next-gen horizontal instructor dashboard with real-time course preview cards alongside the editor.
- 🔔 **Hot Toasts:** Sleek loading spinners and error handling baked natively into the UI.

<br>

<div align="center">
  <h2>🚀 Tech Stack</h2>
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,postgres,supabase,git&theme=dark" />
</div>

## 🛠️ Getting Started

To get a local clone up and running, follow these simple steps.

### Prerequisites
* npm (`npm install npm@latest -g`)
* A free [Clerk](https://clerk.com/) Account (for Authentication)
* A free [Supabase](https://supabase.com/) Account (for the Database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DishantSaini55/Courseify.git
   cd Courseify
   ```

2. **Setup Frontend (`/Frontend`)**
   ```bash
   cd Frontend
   npm install
   ```
   Create a `.env.local` file in the Frontend directory and add your Clerk publishable key:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
   Start Vite:
   ```bash
   npm run dev
   ```

3. **Setup Backend (`/Backend`)**
   ```bash
   cd ../Backend
   npm install
   ```
   Create a `.env` file in the Backend directory with your Supabase and Clerk secret keys:
   ```env
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_KEY=your_supabase_anon_key
   CLERK_SECRET_KEY=sk_test_your_secret_key
   ```
   Start Express server:
   ```bash
   npm run dev
   ```

---
<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=4F46E5&height=100&section=footer" />
</div>
