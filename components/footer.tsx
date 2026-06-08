import Link from "next/link";
import { BookOpen, Facebook, Instagram, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://www.instagram.com/bookaura", label: "BookAura on Instagram", icon: Instagram },
  { href: "https://www.facebook.com/bookaura", label: "BookAura on Facebook", icon: Facebook },
  { href: "https://www.linkedin.com/company/bookaura", label: "BookAura on LinkedIn", icon: Linkedin },
  { href: "mailto:hello@bookaura.store", label: "Email BookAura", icon: Mail }
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-ink">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="text-xl font-black">BookAura</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            Discover books and products that upgrade your everyday life, from sharper study routines to calmer reading corners.
          </p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-200"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold">Shop</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <Link href="/products">All products</Link>
            <Link href="/products?category=Books">Books</Link>
            <Link href="/products?category=Productivity">Productivity tools</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-300">
            <a href="mailto:hello@bookaura.store">hello@bookaura.store</a>
            <a href="tel:+14155550198">+1 (415) 555-0198</a>
            <span>Mon-Fri, 9:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-slate-400">
        Copyright 2026 BookAura. Built for curious readers and modern shoppers.
      </div>
    </footer>
  );
}
