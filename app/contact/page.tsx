import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";

const contactItems = [
  { icon: Mail, text: "hello@bookaura.store" },
  { icon: Phone, text: "+1 (415) 555-0198" },
  { icon: MapPin, text: "San Francisco, CA - Online worldwide" }
];

const socialLinks = [
  { href: "https://www.instagram.com/bookaura", label: "BookAura on Instagram", icon: Instagram },
  { href: "https://www.facebook.com/bookaura", label: "BookAura on Facebook", icon: Facebook },
  { href: "https://www.linkedin.com/company/bookaura", label: "BookAura on LinkedIn", icon: Linkedin }
];

export default function ContactPage() {
  return (
    <MotionWrapper>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Contact</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Need a recommendation or order help?
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Tell us what you are shopping for, and the BookAura team will help you find the right book, bundle, or gift.
            </p>
            <div className="mt-8 grid gap-4">
              {contactItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-mist text-ocean">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-bold text-slate-700">{text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:-translate-y-0.5 hover:bg-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <form className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                First name
                <input
                  name="firstName"
                  autoComplete="given-name"
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Last name
                <input
                  name="lastName"
                  autoComplete="family-name"
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                What can we help with?
                <select
                  name="topic"
                  className="min-h-12 rounded-2xl border border-slate-200 bg-white px-4 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
                >
                  <option>Product recommendation</option>
                  <option>Order support</option>
                  <option>Bulk or gift order</option>
                  <option>Partnership inquiry</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700 sm:col-span-2">
                Message
                <textarea
                  name="message"
                  rows={6}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-ocean focus:ring-4 focus:ring-blue-100"
                  placeholder="Share your goal, budget, or the kind of books and products you enjoy."
                />
              </label>
            </div>
            <button
              type="button"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-ocean px-6 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean sm:w-auto"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </MotionWrapper>
  );
}
