import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

const variants = {
  primary:
    "bg-ocean text-white shadow-lg shadow-blue-600/25 hover:-translate-y-0.5 hover:bg-blue-700",
  secondary:
    "border border-slate-200 bg-white/80 text-ink shadow-sm hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white",
  ghost: "text-ink hover:bg-slate-100"
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick
}: ButtonProps) {
  const classes = cn(
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {variant !== "ghost" && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
