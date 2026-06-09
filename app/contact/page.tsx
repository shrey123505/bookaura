import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
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

          <ContactForm />
        </div>
      </section>
    </MotionWrapper>
  );
}
