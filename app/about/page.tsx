import Image from "next/image";
import { Compass, HeartHandshake, Lightbulb } from "lucide-react";
import { MotionWrapper } from "@/components/motion-wrapper";

const values = [
  {
    icon: Compass,
    title: "Curated direction",
    text: "We reduce the endless scroll by choosing items with a clear purpose and a high daily-use ceiling."
  },
  {
    icon: Lightbulb,
    title: "Useful inspiration",
    text: "BookAura blends reading, creation, and lifestyle products so ideas can turn into better habits."
  },
  {
    icon: HeartHandshake,
    title: "Human support",
    text: "We write clear product notes, answer practical questions, and treat every order like it matters."
  }
];

export default function AboutPage() {
  return (
    <MotionWrapper>
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">About BookAura</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-ink sm:text-5xl">
              Built for people who want their days to feel more intentional
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              BookAura began with a simple observation: people love discovering good books and useful products, but most online shopping feels crowded, rushed, and forgettable. We built a calmer store where every item earns its place.
            </p>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Our mission is to help students, readers, creators, and online shoppers build better routines through thoughtfully selected books, tools, and everyday essentials.
            </p>
          </div>
          <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1100&q=80"
                alt="People discussing books and creative work"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white/70 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-ocean">Difference</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              Not a giant marketplace. A focused shelf of better choices.
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <value.icon className="h-8 w-8 text-ocean" />
                <h3 className="mt-5 text-xl font-black text-ink">{value.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
}
