# 🛒 FreshBasket

A grocery e-commerce web application built with React, featuring category-based browsing, cart management, and Firebase authentication with address management.

**Live Demo:**[(https://fresh-basket-dusky.vercel.app/)]

---

## 🛠️ Tech Stack

- **React (Vite)** — frontend framework
- **React Router v7** — routing (declarative mode)
- **Tailwind CSS v4 + DaisyUI** — styling
- **Firebase Authentication** — user register/login/logout
- **Firebase Firestore** — address book storage (per-user)
- **react-toastify** — notifications
- **lucide-react / react-icons** — icons
- **localStorage** — cart persistence

---

## ✅ Features Implemented

### Navigation
- Responsive Navbar with category dropdown menus (Vegetables, Organic, Snacks & Beverages, Fish & Meat, Dairy, Bakery & Pastry) and their subcategories
- Sticky navbar with smooth scroll-collapse animation (desktop) — announcement bar and search bar merge into the menu row on scroll
- Expandable search bar (desktop scrolled state, mobile/tablet)
- Mobile/tablet hamburger menu with accordion-style category expansion
- Cart icon with live item-count badge

### Homepage
- Auto-rotating Hero Slider with animated text entrance and a CTA button on the last slide
- Featured Products section
- Latest Products section (general categories)
- Latest Products section (Fish & Meat only)
- "How It Works" 4-step section

### Shop / Catalog
- **Shop page** (`/shop`, `/shop/:category`) — simple grid filtered by subcategory, with a themed banner per top-level category and a "Back to Home" button
- **Catalog page** (`/catalog`) — full product listing with Filter by category, Sort by (price/name/date), live product count, and pagination
- Search from the navbar matches subcategories or product names and routes to the Shop page

### Cart
- Global `CartContext` (React Context + `useReducer`-style state) with `localStorage` persistence
- Add/remove/increase/decrease quantity from product cards (stepper UI)
- Toast notifications on cart actions
- Full Cart page with order summary and "Proceed to Checkout" (UI only, not yet wired to checkout flow)

### Authentication (Firebase)
- Separate minimal Navbar/Footer for auth-related pages (Login, Register, Account, Addresses)
- Register and Login pages with error handling
- `AuthProvider` (Context) wrapping the app, tracking logged-in user via `onAuthStateChanged`
- `PrivateRoute` protecting `/auth/account` and `/auth/addresses`
- **My Account** page — order history placeholder + account details + link to addresses
- **Addresses** page — Firestore-backed CRUD (add/edit/delete/set default) via a modal form, with a country dropdown

### Product Data
- `src/data/products.json` — 112 products across all categories/subcategories, matching the reference site's structure
- `src/data/categories.js` — category/subcategory list + slug helpers used by both the Navbar and Shop/Catalog filtering

---

## 📁 Folder Structure

```
src/
├── assets/
│   ├── hero/           → hero slider images
│   └── banners/        → category banner images (shop pages)
├── components/
│   ├── navbar/          → Navbar.jsx
│   ├── authNavbar/       → AuthNavbar.jsx
│   ├── footer/          → Footer.jsx
│   ├── authFooter/       → AuthFooter.jsx
│   ├── hero/            → HeroSlider.jsx
│   ├── howItWorks/       → HowItWorks.jsx
│   ├── product/          → ProductCard.jsx
│   └── addressModal/     → AddressModal.jsx
├── pages/
│   ├── Home.jsx, Shop.jsx, Catalog.jsx, Cart.jsx
│   ├── Login.jsx, Register.jsx
│   ├── MyAccount.jsx, Addresses.jsx
│   └── NotFound.jsx
├── layout/
│   ├── MainLayout.jsx   → Navbar + Outlet + Footer
│   └── AuthLayout.jsx   → AuthNavbar + Outlet + AuthFooter
├── routes/
│   └── Routes.jsx
├── provider/
│   ├── AuthProvider.jsx
│   └── PrivateRoute.jsx
├── context/
│   └── CartContext.jsx
├── firebase/
│   └── firebase_init.js
├── hooks/
│   └── useAddresses.js
├── data/
│   ├── products.json
│   ├── categories.js
│   └── countries.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Get these values from Firebase Console → Project Settings → Your apps → Web app config.

---

## 🔥 Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication → Sign-in method → Email/Password**
3. Enable **Firestore Database** (Standard edition, Start in test mode for development)
4. Firestore security rules (apply before submitting/deploying long-term):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /addresses/{addressId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 🌐 Deployment (Vercel)

1. Push the project to GitHub
2. Import the repo in Vercel (framework auto-detected as Vite)
3. Add all `VITE_FIREBASE_*` environment variables in Vercel project settings
4. A `vercel.json` in the project root handles client-side routing on refresh:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

5. After deploying, add the Vercel domain to **Firebase Console → Authentication → Settings → Authorized domains**

### Notable fix
`src/index.css` locks DaisyUI to the light theme only, so text/colors stay consistent across devices regardless of the user's system dark-mode setting:

```css
@import "tailwindcss";
@plugin "daisyui" {
  themes: light --default;
}
```

