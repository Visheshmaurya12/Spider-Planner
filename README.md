# The Daily Edit 📓

A premium, undated daily planner built with React, Vite, and Tailwind CSS. **The Daily Edit** is designed to combine productivity, mindfulness, and intentional living into a single, seamless digital experience. 

It functions as a beautiful, fully client-side single-page application (SPA) where all your data is stored locally and securely in your browser.

## ✨ Features

- **📅 Daily Planning (4 Layouts)**
  - *Productivity:* Time-blocking schedule with top priorities.
  - *Balanced Life:* Condensed schedule alongside mood and water trackers.
  - *Deep Work:* Single-focus hero session blocks for intense concentration.
  - *Soft Productivity:* Gentle reminders, gratitude, and self-care focus.
- **✅ Habit Tracking**
  - 31-day interactive grid for up to 10 habits.
  - Automatic completion rate and "Best Streak" calculation.
- **🌿 Wellness Tracking (7 Trackers)**
  - Track Mood, Energy, Sleep, Water intake, Self-care activities, Movement (minutes), and Gratitude.
- **🪞 Reflection & Reset**
  - Daily reflection prompts and a "One Word for Today" summary.
  - Monthly reset views for big-picture focusing and important dates.
- **🎯 Vision & Goals**
  - Define your big picture in a 2x2 matrix (What matters, What I want more of, etc.)
  - Track major goals, milestones, and write a letter to your "Future Self."
- **🧠 Brain Dump**
  - 4 distinct note-taking modes: Structured categories, Dot Grid, Lined Notes, and a boundless Creative Space.

## 🚀 Tech Stack

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite`) + Custom CSS variables
- **State Management:** React Hooks + `localStorage` persistence

## 📦 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. We recommend using `pnpm` (which this project is locked to), but `npm` works perfectly fine as well.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YourUsername/daily-planner.git
   cd daily-planner
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   # or npm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   # or npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## 💾 Data Persistence
This application is entirely client-side. There is no backend database. All of your notes, checkboxes, and habit data are automatically saved to your browser's **Local Storage**. 

*Note: If you clear your browser data or use an incognito window, your planner data will be reset.*

## 🛠️ Building for Production

To create a production-ready build, run:
```bash
pnpm build
# or npm run build
```
This will generate a `dist/` folder containing the optimized static assets, which can be easily deployed to hosting platforms like Vercel, Netlify, or GitHub Pages.

## 🤝 Contributing
Feel free to submit issues or pull requests if you have suggestions for new planner layouts, trackers, or general improvements!

## 📄 License
This project is open-source and available under the MIT License.
