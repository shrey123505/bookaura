export type Product = {
  id: string;
  title: string;
  category: "Books" | "Productivity" | "Wellness" | "Creative Tools";
  price: number;
  rating: number;
  badge: string;
  image: string;
  description: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: "deep-work-modern",
    title: "Deep Work for Modern Makers",
    category: "Books",
    price: 24,
    rating: 4.9,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    description:
      "A focused guide for students, builders, and creators who want to protect attention, design better routines, and produce meaningful work in a noisy world.",
    features: [
      "Practical focus systems for busy schedules",
      "Printable weekly planning prompts",
      "Case studies from readers, founders, and creators"
    ]
  },
  {
    id: "aura-journal",
    title: "Aura Daily Clarity Journal",
    category: "Productivity",
    price: 18,
    rating: 4.8,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=900&q=80",
    description:
      "A premium guided journal built around morning priorities, evening reflection, and small daily wins that compound over time.",
    features: [
      "120 days of guided pages",
      "Habit, energy, and mood tracking",
      "Minimal layouts that keep writing friction-free"
    ]
  },
  {
    id: "creator-desk-kit",
    title: "Creator Desk Essentials Kit",
    category: "Creative Tools",
    price: 49,
    rating: 4.7,
    badge: "Bundle",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    description:
      "A refined desk kit with sticky tabs, idea cards, a compact stand, and cable tools for people who learn, ship, and create every day.",
    features: [
      "Includes cards, tabs, stand, and organizer clips",
      "Designed for small desks and dorm rooms",
      "Pairs well with physical books and digital workflows"
    ]
  },
  {
    id: "mindful-reading-lamp",
    title: "Mindful Reading Lamp",
    category: "Wellness",
    price: 36,
    rating: 4.6,
    badge: "Staff pick",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    description:
      "A soft, adjustable lamp that makes late-night reading comfortable without turning your room into a harsh workspace.",
    features: [
      "Warm dimmable light modes",
      "Compact metal body with stable base",
      "Great for reading corners and study desks"
    ]
  },
  {
    id: "startup-bookshelf",
    title: "The Startup Bookshelf",
    category: "Books",
    price: 32,
    rating: 4.9,
    badge: "Curated",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    description:
      "A concise reading path covering product thinking, customer research, pricing, and personal execution for early-stage builders.",
    features: [
      "Five-book learning path in one guide",
      "Chapter-by-chapter implementation prompts",
      "Made for first-time founders and indie makers"
    ]
  },
  {
    id: "focus-timer-cube",
    title: "Focus Timer Cube",
    category: "Productivity",
    price: 22,
    rating: 4.5,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=80",
    description:
      "A tactile timer for study blocks, writing sprints, and screen-free focus sessions. Flip it, start, and get back to the work.",
    features: [
      "Preset 5, 15, 30, and 60-minute modes",
      "Silent and soft-alert options",
      "Pocket-sized for campus, office, and travel"
    ]
  }
];

export const categories = ["All", ...Array.from(new Set(products.map((item) => item.category)))];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}
