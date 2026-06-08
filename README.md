# BookAura

BookAura is a premium online storefront for curated books, productivity tools, creative desk products, and everyday upgrades. It is built with Next.js, React, Tailwind CSS, Framer Motion, and Lucide React.

## Features

- Modern responsive landing page with hero, CTAs, featured products, benefits, testimonials, and newsletter block
- Product listing page with search, category filters, product cards, pricing, ratings, and quick add-to-cart actions
- Product detail pages generated from local dummy product data
- Cart page with localStorage persistence, quantity controls, totals, remove item, and clear cart actions
- About page with brand story, mission, and differentiation
- Contact page with accessible form fields and contact/social links
- Mobile navbar, smooth animations, focus states, and optimized Next.js images

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Local dummy data and localStorage cart state

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
components/
  navbar.tsx
  footer.tsx
  product-card.tsx
  button.tsx
  motion-wrapper.tsx
lib/
  products.ts
  cart-context.tsx
  utils.ts
```

## Deploying To Vercel

1. Push this project to a GitHub repository.
2. Go to Vercel and choose New Project.
3. Import the GitHub repository.
4. Keep the framework preset as Next.js.
5. Use the default build command: `npm run build`.
6. Use the default output settings.
7. Click Deploy.

No environment variables are required for the current dummy-data version.

## Future Improvements

- Add authentication and customer accounts
- Connect a real product database or CMS
- Add Stripe or Razorpay checkout
- Add order confirmation emails
- Add admin product management
