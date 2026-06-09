# BookAura

**BookAura** is a premium full-stack online storefront for curated books, productivity tools, creative desk products, and everyday lifestyle upgrades.

It is built with **Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, and Supabase**. The project includes a modern storefront, product browsing, cart system, demo checkout flow, contact form storage, Supabase-backed data, and a protected admin panel.

---

## Live Demo

**Website:** https://bookaura-beta.vercel.app/

---

## Overview

BookAura is designed as a modern e-commerce-style web application where users can browse products, view product details, add items to cart, and place demo orders.

The project also includes an admin panel where authorized admins can manage products, view orders, and read customer contact messages.

This project was developed as a full-stack learning and portfolio project with a focus on:

* Clean UI/UX
* Responsive design
* Reusable components
* Supabase backend integration
* Secure admin access
* Production deployment on Vercel

---

## Features

### Storefront

* Modern responsive landing page
* Hero section with call-to-action buttons
* Featured products section
* Product listing page
* Product search functionality
* Category-based filtering
* Product cards with price, rating, badge, and quick actions
* Product detail pages
* Cart page with quantity controls
* Remove item and clear cart options
* LocalStorage-based cart persistence
* Demo checkout flow
* Order saving through Supabase backend
* About page with brand story and mission
* Contact page with form submission
* Smooth animations and transitions
* Mobile-friendly navbar
* Clean footer and consistent layout

---

### Backend

* Supabase database integration
* Supabase-first product fetching
* Local fallback product data for development
* API route for contact form submission
* API route for demo order checkout
* Orders saved in Supabase
* Order items saved in Supabase
* Contact messages saved in Supabase

---

### Admin Panel

* Protected admin login
* Admin dashboard
* Product management
* Add new products
* Edit existing products
* Delete products
* View orders
* View contact messages
* Admin access controlled through allowed admin emails

---

## Tech Stack

### Frontend

* Next.js App Router
* React
* TypeScript
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend

* Supabase Database
* Supabase Auth
* Next.js API Routes
* Server-side Supabase client

### Deployment

* GitHub
* Vercel

---

## Project Structure

```txt
bookaura/
│
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── products/
│   │   ├── page.tsx
│   │   ├── products-client.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       └── product-actions.tsx
│   │
│   ├── cart/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── edit/
│   │   │           └── page.tsx
│   │   ├── orders/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       └── page.tsx
│   │
│   └── api/
│       ├── contact/
│       │   └── route.ts
│       ├── orders/
│       │   └── route.ts
│       └── admin/
│           ├── me/
│           │   └── route.ts
│           ├── products/
│           │   ├── route.ts
│           │   └── [id]/
│           │       └── route.ts
│           ├── orders/
│           │   └── route.ts
│           └── messages/
│               └── route.ts
│
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── product-card.tsx
│   ├── checkout-button.tsx
│   ├── contact-form.tsx
│   ├── button.tsx
│   ├── motion-wrapper.tsx
│   ├── section-heading.tsx
│   └── admin/
│       ├── admin-shell.tsx
│       ├── admin-stat-card.tsx
│       └── product-form.tsx
│
├── lib/
│   ├── products.ts
│   ├── cart-context.tsx
│   ├── admin-auth.ts
│   ├── types.ts
│   ├── utils.ts
│   └── supabase/
│       ├── client.ts
│       ├── server.ts
│       ├── admin.ts
│       └── queries.ts
│
├── supabase/
│   ├── schema.sql
│   └── seed.sql
│
├── public/
├── .env.example
├── .gitignore
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── README.md
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
```

### Variable Details

| Variable                        | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                   |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase publishable key used by frontend-safe clients |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase secret key used only on the server side       |
| `ADMIN_EMAILS`                  | Comma-separated list of allowed admin emails           |

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
ADMIN_EMAILS=admin@example.com
```

---

## Security Note

Never commit `.env.local`, `.env`, or secret keys to GitHub.

The `SUPABASE_SERVICE_ROLE_KEY` must only be used in server-side files. It should never be exposed in frontend components or browser code.

The `.gitignore` file should include:

```txt
.env
.env.local
.env*.local
.vercel
node_modules
.next
```

---

## Supabase Setup

### 1. Create a Supabase Project

Go to Supabase and create a new project.

### 2. Run Database Schema

Open the Supabase SQL Editor and run:

```sql
supabase/schema.sql
```

This creates the required database tables.

### 3. Insert Seed Data

Run:

```sql
supabase/seed.sql
```

This inserts initial product data into the database.

### 4. Create Admin User

Go to Supabase Authentication and create an admin user with email and password.

Make sure the same email is added inside:

```env
ADMIN_EMAILS=your-admin-email@example.com
```

Multiple admin emails can be added like this:

```env
ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shrey123505/bookaura.git
```

### 2. Go to Project Folder

```bash
cd bookaura
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment File

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Then add your Supabase keys and admin email inside `.env.local`.

### 5. Run Development Server

```bash
npm run dev
```

Open the project in browser:

```txt
http://localhost:3000
```

---

## Available Scripts

### Start Development Server

```bash
npm run dev
```

### Create Production Build

```bash
npm run build
```

### Start Production Server Locally

```bash
npm run start
```

### Run Lint Check

```bash
npm run lint
```

---

## Deployment on Vercel

### 1. Push Project to GitHub

```bash
git add .
git commit -m "Update project"
git push
```

### 2. Import Project in Vercel

* Go to Vercel
* Click on **New Project**
* Import the GitHub repository
* Keep framework preset as **Next.js**
* Keep default build command:

```bash
npm run build
```

### 3. Add Environment Variables in Vercel

Go to:

```txt
Vercel Project Settings → Environment Variables
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_EMAILS
```

### 4. Redeploy

After adding environment variables, redeploy the project from the Vercel dashboard.

---

## Admin Panel

The project includes a protected admin panel.

Admin can:

* View dashboard stats
* Manage products
* Add products
* Edit products
* Delete products
* View orders
* View contact messages

Admin access is controlled using allowed emails from:

```env
ADMIN_EMAILS
```

Do not share admin credentials publicly.

---

## Database Tables

The Supabase backend includes tables for:

* Products
* Orders
* Order items
* Contact messages
* Admin users or admin allowlist logic

---

## Main Pages

| Page            | Route              |
| --------------- | ------------------ |
| Home            | `/`                |
| Products        | `/products`        |
| Product Details | `/products/[id]`   |
| Cart            | `/cart`            |
| About           | `/about`           |
| Contact         | `/contact`         |
| Admin Login     | `/admin/login`     |
| Admin Dashboard | `/admin/dashboard` |
| Admin Products  | `/admin/products`  |
| Admin Orders    | `/admin/orders`    |
| Admin Messages  | `/admin/messages`  |

---

## Future Improvements

* Add real payment gateway using Razorpay or Stripe
* Add customer login and user accounts
* Add order confirmation emails
* Add product image upload using Supabase Storage
* Add wishlist functionality
* Add product reviews and ratings from users
* Add inventory management
* Add coupon and discount system
* Add advanced admin analytics
* Add invoice generation
* Add search engine optimization improvements

---

## Author

**Shrey Prajapati**

GitHub: https://github.com/shrey123505

---

## License

This project is created for learning, practice, and portfolio purposes.
