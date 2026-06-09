import { Product, ProductCategory } from "@/lib/types";

export type { Product, ProductCategory };

export const fallbackProducts: Product[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    title: "Deep Work for Modern Makers",
    slug: "deep-work-modern",
    category: "Books",
    price: 24,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    image_url:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    description:
      "A focused guide for students, builders, and creators who want to protect attention, design better routines, and produce meaningful work in a noisy world.",
    features: [
      "Practical focus systems for busy schedules",
      "Printable weekly planning prompts",
      "Case studies from readers, founders, and creators"
    ],
    stock: 42,
    featured: true,
    active: true
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    title: "Aura Daily Clarity Journal",
    slug: "aura-journal",
    category: "Productivity",
    price: 18,
    rating: 4.8,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    image_url:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    description:
      "A premium guided journal built around morning priorities, evening reflection, and small daily wins that compound over time.",
    features: [
      "120 days of guided pages",
      "Habit, energy, and mood tracking",
      "Minimal layouts that keep writing friction-free"
    ],
    stock: 80,
    featured: true,
    active: true
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    title: "Creator Desk Essentials Kit",
    slug: "creator-desk-kit",
    category: "Creative Tools",
    price: 49,
    rating: 4.7,
    badge: "Bundle",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    image_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description:
      "A refined desk kit with sticky tabs, idea cards, a compact stand, and cable tools for people who learn, ship, and create every day.",
    features: [
      "Includes cards, tabs, stand, and organizer clips",
      "Designed for small desks and dorm rooms",
      "Pairs well with physical books and digital workflows"
    ],
    stock: 24,
    featured: true,
    active: true
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    title: "Mindful Reading Lamp",
    slug: "mindful-reading-lamp",
    category: "Wellness",
    price: 36,
    rating: 4.6,
    badge: "Staff pick",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    image_url:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description:
      "A soft, adjustable lamp that makes late-night reading comfortable without turning your room into a harsh workspace.",
    features: [
      "Warm dimmable light modes",
      "Compact metal body with stable base",
      "Great for reading corners and study desks"
    ],
    stock: 18,
    featured: false,
    active: true
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    title: "The Startup Bookshelf",
    slug: "startup-bookshelf",
    category: "Books",
    price: 32,
    rating: 4.9,
    badge: "Curated",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    image_url:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    description:
      "A concise reading path covering product thinking, customer research, pricing, and personal execution for early-stage builders.",
    features: [
      "Five-book learning path in one guide",
      "Chapter-by-chapter implementation prompts",
      "Made for first-time founders and indie makers"
    ],
    stock: 35,
    featured: false,
    active: true
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    title: "Focus Timer Cube",
    slug: "focus-timer-cube",
    category: "Productivity",
    price: 22,
    rating: 4.5,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80",
    image_url:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80",
    description:
      "A tactile timer for study blocks, writing sprints, and screen-free focus sessions. Flip it, start, and get back to the work.",
    features: [
      "Preset 5, 15, 30, and 60-minute modes",
      "Silent and soft-alert options",
      "Pocket-sized for campus, office, and travel"
    ],
    stock: 64,
    featured: false,
    active: true
  }
];

export const products = fallbackProducts;
export const categories = ["All", ...Array.from(new Set(fallbackProducts.map((item) => item.category)))];

export function normalizeProduct(row: Record<string, unknown>): Product {
  const imageUrl = String(row.image_url || row.image || "");

  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug || row.id),
    category: String(row.category) as ProductCategory,
    price: Number(row.price || 0),
    rating: Number(row.rating || 0),
    badge: String(row.badge || "New"),
    image: imageUrl,
    image_url: imageUrl,
    description: String(row.description || ""),
    features: Array.isArray(row.features) ? row.features.map(String) : [],
    stock: Number(row.stock || 0),
    featured: Boolean(row.featured),
    active: row.active === undefined ? true : Boolean(row.active),
    created_at: typeof row.created_at === "string" ? row.created_at : undefined,
    updated_at: typeof row.updated_at === "string" ? row.updated_at : undefined
  };
}

export function getProductById(idOrSlug: string) {
  return fallbackProducts.find(
    (product) => product.id === idOrSlug || product.slug === idOrSlug
  );
}
