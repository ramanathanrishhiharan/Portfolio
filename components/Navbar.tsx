"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

// Shared neumorphic shadow tokens — same convex/concave/glow language as
// KeyButton / SlotButton so the nav matches the rest of the UI.
const SHADOW_CONVEX =
  "-8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)";
const SHADOW_CONCAVE =
  "inset 3px 3px 8px rgba(163,177,198,0.5), inset -3px -3px 8px rgba(255,255,255,0.9)";
const SHADOW_GLOW =
  "0 0 30px 6px rgba(181,230,77,0.45), -8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(
    null
  );

  // Hide on scroll down, show on scroll up.
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Ignore tiny jitters and always stay visible near the very top.
      if (currentY < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
        setOpen(false);
      } else if (delta < -4) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const isActive = (link: (typeof NAV_LINKS)[number]) => {
    if (link.href === "/") return pathname === "/" && activeSection === "home";
    if (link.href.startsWith("/#"))
      return pathname === "/" && activeSection === link.id;
    return pathname.startsWith(link.href);
  };

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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ type: "spring", stiffness: 380, damping: 38 }}
    >
      <div className="relative flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          className="flex items-center gap-1 rounded-full bg-[#e6ebf2] px-2 py-2"
          style={{ boxShadow: SHADOW_CONVEX }}
          aria-label="Primary"
        >
          <div ref={containerRef} className="hidden md:flex items-center gap-1 relative">
            {indicator && (
              <motion.div
                className="absolute top-0 h-full rounded-full bg-[#B5E64D] -z-10"
                initial={false}
                animate={{ left: indicator.left, width: indicator.width }}
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
                style={{ boxShadow: SHADOW_GLOW }}
              />
            )}
            {NAV_LINKS.map((link) => {
              const active = isActive(link);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  ref={(el) => {
                    itemRefs.current[link.href] = el;
                  }}
                  className={`relative z-10 shrink-0 whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-200 ${
                    active ? "text-[#0a0a0a]" : "text-slate-500 hover:text-[#0a0a0a]"
                  }`}
                  style={{ fontFamily: "var(--font-primary)" }}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            whileTap={{ scale: 0.94, y: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="md:hidden relative flex items-center justify-center w-11 h-11 rounded-full bg-[#e6ebf2] text-[#0a0a0a]"
            style={{ boxShadow: open ? SHADOW_CONCAVE : SHADOW_CONVEX }}
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
              className="md:hidden absolute top-16 left-4 right-4 rounded-3xl bg-[#e6ebf2] p-4 flex flex-col gap-1"
              style={{ boxShadow: SHADOW_CONVEX }}
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-2xl text-[16px] font-semibold transition-colors ${
                      active ? "text-[#0a0a0a]" : "text-slate-500 hover:text-[#0a0a0a]"
                    }`}
                    style={{
                      fontFamily: "var(--font-primary)",
                      boxShadow: active ? SHADOW_GLOW : "none",
                      background: active ? "#B5E64D" : "transparent",
                    }}
                  >
                    {link.label}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}