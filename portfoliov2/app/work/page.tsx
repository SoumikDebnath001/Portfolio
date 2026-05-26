"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";

function BrowserWindow({ siteUrl, title }: { siteUrl: string; title: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const [containerHeight, setContainerHeight] = useState(240);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        // Target desktop viewport width to load desktop view
        const desktopWidth = 1280;
        const newScale = width / desktopWidth;
        setScale(newScale);
        
        // Target visual height for the container on mobile
        const visualHeight = 240;
        setContainerHeight(visualHeight);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const iframeWidth = 1280;
  // Calculate original iframe height so that after scaling down, it has visualHeight (e.g. 240px)
  const iframeHeight = containerHeight / scale;

  return (
    <>
      {/* Desktop: full browser chrome + iframe */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="hidden md:flex flex-col rounded-2xl overflow-hidden bg-white w-full"
        style={{ boxShadow: "0 30px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}
      >
        <div className="flex items-center gap-4 px-4.5 py-3 bg-[#F4F4F4] border-b border-[#E5E5E5] select-none">
          <div className="flex gap-2 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 bg-white rounded-lg px-4 py-1.5 text-2.75 text-[#888] border border-border overflow-hidden whitespace-nowrap text-ellipsis font-mono tracking-[0.03em] no-underline hover:bg-[#F9F9F9] transition-colors"
          >
            <span className="text-[#27C93F] text-xs">●</span>
            {siteUrl.replace("https://", "")}
          </a>
        </div>
        <div className="relative w-full h-145 overflow-hidden bg-[#FAFAFA]">
          <iframe
            src={siteUrl}
            className="w-full h-full border-none block bg-white"
            title={`${title} Desktop Preview`}
            scrolling="no"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          />
        </div>
      </motion.div>

      {/* Mobile: simple desktop iframe preview scaled down in a div */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="md:hidden w-full rounded-2xl overflow-hidden bg-white border border-[#E8E8E8] relative"
        style={{
          height: `${containerHeight}px`,
          boxShadow: "0 8px 24px rgba(0,0,0,0.04)"
        }}
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: `${iframeWidth}px`,
            height: `${iframeHeight}px`,
            transform: `scale(${scale})`,
          }}
        >
          <iframe
            src={siteUrl}
            className="w-full h-full border-none block bg-white pointer-events-none"
            title={`${title} Mobile Desktop Preview`}
            scrolling="no"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          />
        </div>
      </motion.div>
    </>
  );
}

const projects = [
  {
    title: "Basanti Variety Store",
    description:
      "A full-stack e-commerce platform for a local variety store, featuring product listings, cart management, and order processing.",
    url: "https://basantivarietystore.in/",
    github: "https://github.com/SoumikDebnath001/BasantiShop",
    tags: ["Next.js", "React", "MongoDB", "NodeJS"],
  },
  {
    title: "Cricket Academy: Foundation & Academy Platform",
    description:
      "Built a full-stack cricket academy management platform with role-based access (member / coach / admin), subscription lifecycle, and real-time admin notification system. RESTful backend using Node.js, Express, TypeScript, and MongoDB with JWT authentication, Zod validation, and Cloudinary. Admin panel supporting soft-delete and bulk-delete for inquiries, subscription management with plan/start-date controls, user suspension toggle, and a polling notification bell (60s interval). Containerised the full stack with Docker and docker-compose; managed environment parity across development and production.",
    url: "https://obuyagrassrootsfoundation.org",
    github: "https://github.com/SoumikDebnath001/Cricket_Academy",
    tags: ["Next.js", "Express", "Node.js", "MongoDB", "TypeScript", "Docker"],
  },
];

export default function WorkPage() {
  return (
    <div className="bg-base min-h-screen relative">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-base/85 backdrop-blur-lg">
        <div className="max-w-350 mx-auto flex items-center justify-between px-5 md:px-20 py-5">
          <Link
            href="/"
            className="flex items-center gap-2 text-primary text-3.25 font-normal tracking-[0.01em] no-underline hover:opacity-60 transition-opacity duration-200"
          >
            <FiArrowLeft size={16} /> Back
          </Link>
          <p className="text-secondary text-2.75 tracking-[0.18em] uppercase font-normal">
            Work
          </p>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-350 mx-auto px-5 md:px-20 pt-12 md:pt-18 pb-24">

        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-secondary text-2.75 tracking-[0.2em] uppercase font-normal mb-4"
          >
            Selected Projects
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-primary font-extralight leading-[0.92] tracking-[-0.03em]"
            style={{ fontSize: "clamp(40px, 8vw, 96px)" }}
          >
            My
            <br />
            Work
          </motion.h1>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-border mb-12 md:mb-18 origin-left"
        />

        {/* Project list */}
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => (
            <div key={project.title}>

              {/* Title + links */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-6 md:mb-8">
                <div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-secondary text-2.75 tracking-[0.15em] uppercase mb-2"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.p>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-primary font-light tracking-[-0.01em]"
                    style={{ fontSize: "clamp(22px, 4vw, 36px)" }}
                  >
                    {project.title}
                  </motion.h2>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3 flex-wrap"
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-primary text-base text-3.25 font-normal rounded-full no-underline tracking-[0.01em] hover:scale-105 hover:bg-[#333] transition-all duration-200"
                  >
                    Visit Site <FiExternalLink size={14} />
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-transparent text-primary text-3.25 font-normal rounded-full no-underline tracking-[0.01em] border border-[#D0D0D0] hover:scale-105 hover:border-primary transition-all duration-200"
                  >
                    GitHub <FiGithub size={14} />
                  </a>
                </motion.div>
              </div>

              {/* Description + tags */}
              <div className="flex flex-col gap-4 mb-8 md:mb-12">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-secondary text-sm font-normal leading-[1.6] max-w-145"
                >
                  {project.description}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex flex-wrap gap-2"
                >
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 border border-[#D8D8D8] rounded-full text-2.75 text-[#666] tracking-wider bg-white font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Browser preview */}
              <BrowserWindow siteUrl={project.url} title={project.title} />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
