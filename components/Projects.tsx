import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { BlurredStagger } from "./blurtext";

// Neumorphic shadow tokens — same language as KeyButton / SlotButton / Navbar /
// Hero card / ProblemSection icons / DeliversSection pills.
const SHADOW_CONVEX = {
  boxShadow:
    "-8px -8px 18px rgba(255,255,255,0.95), 10px 10px 22px rgba(163,177,198,0.55)",
};
const SHADOW_GLOW =
  "0 0 20px 4px rgba(181,230,77,0.45), -3px -3px 8px rgba(255,255,255,0.9), 4px 4px 10px rgba(163,177,198,0.5)";

const projects = [
  {
    name: "Primeleed.com",
    image: "/primeleed.png",
    url: "https://www.primeleed.com/",
    ongoing: false,
  },
  {
    name: "studentfinancechecker.co.uk/",
    image: "/students.png",
    url: "https://www.studentfinancechecker.co.uk/",
    ongoing: true,
  },
];

export default function ProjectsSection() {
  return (
    <section
      id="work"
      className="w-full max-w-300 mx-auto px-6 md:px-16 xl:px-20 py-20 flex flex-col gap-12"
      style={{ fontFamily: "var(--font-primary)" }}
    >
      {/* ── Header row: headline left | supporting text right ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="text-[42px] md:text-[48px] font-bold leading-[1.1] text-[#0a0a0a] max-w-130">
          <BlurredStagger text="Don't take my word for it," />

          <BlurredStagger text="see it live." />
        </h2>
        <p className="text-[18px] text-[#5b5959] leading-relaxed max-w-[320px] md:text-right">
          <BlurredStagger text="Every project here solved a real" />
          <br className="hidden md:block" />
          <BlurredStagger text="problem for a real person or business." />
        </p>
      </div>

      {/* ── Project cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map(({ name, image, url, ongoing }) => (
          <Link
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-4 rounded-xl bg-[#e6ebf2] p-4 transition-transform duration-300 hover:-translate-y-1"
            style={SHADOW_CONVEX}
          >
            {/* Screenshot */}
            <div className="relative w-full overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={name}
                width={1200}
                height={750}
                className="w-full h-auto object-cover rounded-xl"
              />

              {/* Ongoing badge — top-right inside image */}
              {ongoing && (
                <span
                  className="absolute top-3 right-3 flex items-center gap-1.5 bg-[#B5E64D] text-[#0a0a0a] text-[13px] font-semibold px-3 py-1 rounded-full"
                  style={{ boxShadow: SHADOW_GLOW }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#0a0a0a] animate-pulse inline-block" />
                  Ongoing
                </span>
              )}
            </div>

            {/* Card footer: domain name + arrow */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[18px] font-semibold text-[#0a0a0a]">
                {name}
              </span>
              <span
                className="w-8 h-8 rounded-full bg-[#e6ebf2] flex items-center justify-center text-[#0a0a0a] transition-all duration-200 group-hover:bg-[#B5E64D] shadow-[-8px_-8px_18px_rgba(255,255,255,0.95),10px_10px_22px_rgba(163,177,198,0.55)] group-hover:shadow-[0_0_20px_4px_rgba(181,230,77,0.45),-3px_-3px_8px_rgba(255,255,255,0.9),4px_4px_10px_rgba(163,177,198,0.5)]"
              >
                <FiArrowUpRight
                  size={16}
                  className="transition-transform duration-200 group-hover:rotate-45"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}