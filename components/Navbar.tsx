"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MdMenu, MdClose } from "react-icons/md";

const NAV_LINKS = [
  { label: "Home", href: "/", id: "home" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Products", href: "/products", id: null },
  { label: "Free Resources", href: "/free_resources", id: "resources" },
  { label: "Book a Call", href: "/contact", id: "contact" },
  
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
    null
  );

  // Scrollspy: only runs on the home page, where sections actually exist.
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = NAV_LINKS.map((l) => l.id).filter(
      (id): id is NonNullable<typeof id> => id !== null
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // Single source of truth: exactly one link can be active at a time.
  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.href === "/") return pathname === "/" && activeSection === "home";
    if (link.href.startsWith("/#"))
      return pathname === "/" && activeSection === link.id;
    return pathname.startsWith(link.href); // e.g. /products
  };

  // Measure the active link's real position and move ONE indicator there.
  // No mount/unmount pair, so there's no race between two layoutId
  // instances when the active link changes quickly (e.g. fast scrolling).
  const measure = () => {
    const activeLink = NAV_LINKS.find((l) => isActive(l));
    const el = activeLink ? itemRefs.current[activeLink.href] : null;
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    }
  };

  useLayoutEffect(() => {
    measure();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, pathname]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        aria-hidden
        className="md:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 via-white/40 to-transparent backdrop-blur-sm pointer-events-none"
      />
      <div className="relative flex justify-center px-4 pt-4 sm:pt-5">
        <nav
        className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full px-2 py-2 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-black/5"
        aria-label="Primary"
      >
        <div ref={containerRef} className="hidden md:flex items-center gap-1 relative">
          {indicator && (
            <motion.div
              className="absolute top-0 h-full rounded-full bg-[#0a0a0a] -z-10"
              initial={false}
              animate={{ left: indicator.left, width: indicator.width }}
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
            />
          )}
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  itemRefs.current[link.href] = el;
                }}
                className={`relative z-10 shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-200 ${
                  active ? "text-white" : "text-[#0a0a0a] hover:text-[#0a0a0a]"
                }`}
                style={{ fontFamily: "var(--font-primary)" }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`md:hidden flex items-center justify-center w-11 h-11 rounded-full border transition-colors duration-200 ${
            open
              ? "bg-[#0a0a0a] border-[#0a0a0a] text-white shadow-md"
              : "bg-white border-black/5 text-[#0a0a0a] shadow-md"
          }`}
        >
          {open ? <MdClose size={22} /> : <MdMenu size={22} />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden absolute top-16 left-4 right-4 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl p-4 flex flex-col gap-1"
          >
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-2xl text-[16px] font-semibold ${
                    active
                      ? "bg-[#0a0a0a] text-white"
                      : "text-[#0a0a0a] hover:bg-black/5"
                  }`}
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
}