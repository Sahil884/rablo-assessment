This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Assessment App

A Next.js frontend assignment project designed to manage fitness centres with role-based onboarding flows.  
This app demonstrates routing control, profile creation, and dashboard management using React, Next.js, and context-based state handling.

---

## 🚀 Features
- **Splash Routing**: Redirects users based on `userID` and `accCreated` values in localStorage.
  - No `userID` → `/login`
  - `accCreated = 0` or missing → `/manager` (profile creation page)
  - `accCreated = 1` → `/dashboard`
- **Manager Profile Creation**: Form for managers to create their account and business profile.
- **Auth Context**: Centralized state management for `userID` and `accCreated`.
- **Responsive UI**: TailwindCSS-based design with pixel-perfect layouts.
- **Deployment Ready**: Configured for Vercel hosting.

---

## ⚠️ Important Note
The backend Google Auth integration is currently **not working **.  
As a workaround, the app uses **manual `userID` assignment** via localStorage and query parameters.  

This means:
- After login, `userID` is set manually in localStorage.
- Routing decisions are based on `userID` and `accCreated` values stored in localStorage.
- Once the backend is fixed, `getBasicProfile()` will fetch the real profile data from the server.

---

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Deployment**: Vercel



