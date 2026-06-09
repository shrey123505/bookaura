# BookAura

BookAura is a premium online storefront for curated books, productivity tools, creative desk products, and everyday upgrades. It is built with Next.js, React, Tailwind CSS, Framer Motion, and Lucide React.

## Features

- Modern responsive landing page with hero, CTAs, featured products, benefits, testimonials, and newsletter block
- Product listing page with search, category filters, product cards, pricing, ratings, and quick add-to-cart actions
- Product detail pages generated from local dummy product data
- Supabase-ready product backend with local fallback data for development
- Cart page with localStorage persistence, demo order checkout, quantity controls, totals, remove item, and clear cart actions
- About page with brand story, mission, and differentiation
- Contact page with accessible form fields saved to Supabase
- Protected admin panel for products, orders, and contact messages
- Mobile navbar, smooth animations, focus states, and optimized Next.js images

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Supabase
- Local fallback data and localStorage cart state

## Environment Variables

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=
```

`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe for browser use. `SUPABASE_SERVICE_ROLE_KEY` is server-only and must never be exposed in frontend code. `ADMIN_EMAILS` is a comma-separated allowlist for admin access.

## Supabase Setup

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `supabase/schema.sql`.
4. Run `supabase/seed.sql`.
5. Create an Auth user for your admin email.
6. Add that email to `ADMIN_EMAILS` or insert it into `admin_users`.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the site:

```bash
http://localhost:3000
```

Run production checks:

```bash
npm run lint
npm run build
```

## Project Structure

```text
app/
  page.tsx
  products/
  cart/
  about/
  contact/
  admin/
  api/
components/
  navbar.tsx
  footer.tsx
  product-card.tsx
  admin/
  button.tsx
  motion-wrapper.tsx
lib/
  products.ts
  cart-context.tsx
  supabase/
  utils.ts
supabase/
  schema.sql
  seed.sql
```

## Deploying To Vercel

1. Push this project to a GitHub repository.
2. Go to Vercel and choose New Project.
3. Import the GitHub repository.
4. Keep the framework preset as Next.js.
5. Use the default build command: `npm run build`.
6. Use the default output settings.
7. Click Deploy.

Add the environment variables above in Vercel Project Settings before deploying the Supabase-backed version.

## Future Improvements

- Add authentication and customer accounts
- Connect a real product database or CMS
- Add Stripe or Razorpay checkout
- Add order confirmation emails
- Add admin product management
