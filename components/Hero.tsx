import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { BlurredStagger } from "./blurtext";

export default function Hero() {
  return (
    <section className="w-full max-w-350 mx-auto px-6 sm:px-10 md:px-16 xl:px-20 pt-12 sm:pt-14 md:pt-16 pb-16 sm:pb-20 flex flex-col items-center gap-8 text-center">
      {/* Visual row: badge + image + badge */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 w-full">
        {/* Left badge — location */}
        <div className="flex flex-row items-center gap-4 md:flex-col md:items-center md:gap-3 md:max-w-40">
          <div
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shrink-0"
            style={{ boxShadow: "0px 4px 6px 2px rgba(0,0,0,0.25)" }}
          >
            <MdLocationOn
              size={32}
              className="sm:text-[36px] md:text-[40px]"
              color="#B5E64D"
            />
          </div>
          <div className="text-left md:text-center">
            <p
              className="text-[14px] sm:text-[14px] md:text-[13px] font-semibold leading-snug text-[#0a0a0a] m-0"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Based in Srilanka
              <br className="hidden sm:block" /> Working World Wide
            </p>
          </div>
        </div>

        {/* Hero image */}
        <div className="shrink-0 order-first md:order-0">
          <Image
            src="/hero.png"
            alt="Rishiharan"
            width={320}
            height={420}
            priority
            className="rounded-3xl object-cover object-top w-65 h-95 sm:w-72.5 sm:h-97.5 md:w-[320px] md:h-115"
          />
        </div>

        {/* Right badge — value prop */}
        <div className="flex flex-row items-center gap-4 md:flex-col md:items-center md:gap-3 md:max-w-40">
          <div
            className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shrink-0"
            style={{ boxShadow: "0px 4px 6px 2px rgba(0,0,0,0.25)" }}
          >
            <MdVerified
              size={32}
              className="sm:text-[36px] md:text-[40px]"
              color="#B5E64D"
            />
          </div>
          <div className="text-left md:text-center">
            <p
              className="text-[14px] sm:text-[14px] md:text-[13px] font-semibold leading-snug text-[#0a0a0a] m-0"
              style={{ fontFamily: "var(--font-primary)" }}
            >
              Helping Business Growth
              <br className="hidden sm:block" /> with Softwares
            </p>
          </div>
        </div>
      </div>

      {/* Copy block */}
      <div className="flex flex-col items-center gap-4 w-full max-w-205">
        <h1
          className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-bold leading-[1.2] md:leading-[1.15] text-[#0a0a0a] m-0 text-left sm:text-center"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <BlurredStagger text="Hello, I'm Rishiharan" />
          <br />
          <BlurredStagger text="Full-stack developer and AI &amp; ML" />
          <br className="hidden sm:block" />{" "}
          <BlurredStagger
            text="Enthusiast, I build web products
          "
          />
          <br />
          <BlurredStagger text="that move businesses forward." />
        </h1>

        <p
          className="text-[18px] font-normal leading-relaxed text-[#5b5959] m-0 max-w-140 text-left sm:text-center"
          style={{ fontFamily: "var(--font-primary)" }}
        >
          <BlurredStagger text="I help startups and businesses launch websites, web applications, and AI-powered solutions that generate leads, automate workflows, and support growth. From strategy to deployment, I handle the entire development process." />
        </p>
      </div>
    </section>
  );
}
