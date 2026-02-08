# CA-Monk: Premium Blog Dashboard

## Overview
A modern, premium blog dashboard application for content creators. Features a sleek UI with dark mode support, intuitive content management, and responsive design. Built with performance and aesthetics in mind.

<img width="3167" height="1668" alt="Screenshot 2026-02-08 144947" src="https://github.com/user-attachments/assets/f0fa2fca-0756-41b4-aff7-f884cceb68a1" />

## Features
- **Dashboard**: content management.
- **Studio**: Manage your narratives (Create, Edit, Delete).
- **Dark Mode**: Fully optimized dark theme for all components.
- **Authentication**: Secure Google OAuth integration.
- **Responsive Design**: Seamless experience across mobile and desktop.
- **Animations**: Smooth transitions using Framer Motion.

## Tech Stack
- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Routing**: [React Router](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Backend (Mock)**: [JSON Server](https://github.com/typicode/json-server)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CA-Monk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running the Application
The application requires both the frontend development server and the mock backend server to be running.

1. **Start the Mock Server** (runs on port 3001)
   ```bash
   npm run server
   ```

2. **Start the Frontend** (runs on port 5173 by default)
   Open a new terminal and run:
   ```bash
   npm run dev
   ```

Open [http://localhost:5173](http://localhost:5173) to view the application in your browser.

## key Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run server`: Starts the json-server mock backend watching `db.json`.
- `npm run build`: Builds the app for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure
- `src/components`: Reusable UI components (buttons, layout, etc.).
- `src/pages`: Main application pages (Home, Studio, Blog Details).
- `src/services`: API service functions.
- `src/hooks`: Custom React hooks (e.g., useTheme).
- `src/lib`: Utility functions.

---
*Built with ❤️ for Creators.*
