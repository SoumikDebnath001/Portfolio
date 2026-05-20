import Image from "next/image";

export default function AboutMe() {
  return (
    <section id="about" className="relative bg-base min-h-screen flex items-center py-20 md:py-24">

      {/* Left vertical label (desktop only) */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-7.5 items-center justify-center">
        <span className="block -rotate-90 whitespace-nowrap text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
          About Me
        </span>
      </div>

      <div className="max-w-350 mx-auto w-full px-5 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">

        {/* Left — text */}
        <div>
          <p className="text-secondary text-2.75 tracking-[0.2em] uppercase font-normal mb-4">
            01 — About Me
          </p>
          <h2
            className="text-primary font-extralight leading-[0.95] tracking-[-0.02em] mb-9"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Who
            <br />
            Am I?
          </h2>

          <div className="h-px bg-border mb-9" />

          <p className="text-primary text-3.75 font-normal leading-[1.8] tracking-[0.01em] mb-5">
            Hi, I&apos;m{" "}
            <strong className="font-semibold">Soumik Debnath</strong> — a
            passionate Full Stack Engineer who loves building things that live
            on the internet.
          </p>
          <p className="text-secondary text-3.75 font-normal leading-[1.8] tracking-[0.01em] mb-5">
            I work across the full stack — from crafting clean, responsive UIs
            with React and Next.js to building robust backends with Node.js,
            Express, and MongoDB. I&apos;m deeply interested in AI integration
            and modern developer tooling.
          </p>
          <p className="text-secondary text-3.75 font-normal leading-[1.8] tracking-[0.01em]">
            When I&apos;m not coding, I enjoy exploring new technologies,
            contributing to open source, and continuously sharpening my
            problem-solving skills through DSA and system design.
          </p>
        </div>

        {/* Right — image */}
        <div className="flex items-center justify-center">
          <Image
            src="/WhoAmI.png"
            alt="Who Am I"
            width={420}
            height={420}
            className="object-contain max-w-full w-56 md:w-full"
          />
        </div>

      </div>
    </section>
  );
}
