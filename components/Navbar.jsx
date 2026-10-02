"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useFavorite } from "@/context/FavoriteContext";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/profile", label: "Profile" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { name, submitted } = useUser();
  const { favorites } = useFavorite();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-border bg-card px-4 py-2 shadow-md">
        <Link href="/" className="shrink-0 text-sm font-bold tracking-tight">
          MyWebsite
        </Link>

        <div className="hidden items-center gap-1 text-sm text-card-foreground sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors hover:bg-primary/15",
                  isActive &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/favorites"
            className={cn(
              "rounded-full px-3 py-1.5 transition-colors hover:bg-primary/15",
              pathname === "/favorites" &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
            )}
          >
            Favorite ({favorites.length})
          </Link>
        </div>

        {submitted && <span>Hi, {name} 👋</span>}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-full px-3 py-1.5 text-sm sm:hidden"
          aria-label="Buka menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
        >
          Get in touch
        </Link>
      </nav>
      {open && (
        <div className="mt-2 flex flex-col gap-1 rounded-2xl border border-border bg-card p-3 text-sm sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-3 py-2 hover:bg-primary/15"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/favorites"
            onClick={() => setOpen(false)}
            className="rounded-full px-3 py-2 hover:bg-primary/15"
          >
            Favorite ({favorites.length})
          </Link>
        </div>
      )}
    </header>
  );
}
