"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "success" | "error" | "limited";

const PLAYFAIR = "var(--font-playfair), 'Georgia', serif";

function PostmarkRing() {
  return (
    <svg viewBox="0 0 76 76" width="72" height="72" fill="none" className="opacity-20">
      <circle cx="38" cy="38" r="34" stroke="white" strokeWidth="1.5" />
      <circle cx="38" cy="38" r="28" stroke="white" strokeWidth="0.5" />
      <text x="38" y="26" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace" letterSpacing="2">PERSONAL</text>
      <text x="38" y="37" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">MAIL</text>
      <text x="38" y="48" textAnchor="middle" fill="white" fontSize="4.5" fontFamily="monospace" letterSpacing="2">✦ ✦ ✦ ✦ ✦</text>
      <text x="38" y="57" textAnchor="middle" fill="white" fontSize="4.5" fontFamily="monospace" letterSpacing="1">2024–INDIA</text>
    </svg>
  );
}

function Perforations({ position }: { position: "top" | "bottom" }) {
  return (
    <div className={`absolute ${position}-0 left-3 right-3 flex justify-between pointer-events-none z-10`}>
      {Array.from({ length: 28 }).map((_, i) => (
        <div key={i} className="w-1.25 h-1.25 rounded-full bg-base shrink-0" />
      ))}
    </div>
  );
}

export default function Mail() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: "-60px" });

  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [errMsg,  setErrMsg]  = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res  = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (res.status === 429) { setErrMsg(data.error); setStatus("limited"); return; }
      if (!res.ok) throw new Error();
      setStatus("success");
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const isBlocked = status === "sending" || status === "success" || status === "limited";

  const inputCls = [
    "w-full bg-transparent border-b pb-2 outline-none",
    "text-primary text-[13px] font-light placeholder:text-[#C8C8C8]",
    "transition-colors duration-200",
  ].join(" ");

  const focusBorder = (field: string) =>
    focused === field ? "border-primary" : "border-border";

  return (
    <section ref={sectionRef} id="mail" className="relative bg-base py-24 overflow-hidden">


      {/* Left vertical label (desktop only) */}
    

      <div className="relative max-w-350 mx-auto px-5 md:px-20">


        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <h2
            style={{
              fontFamily: PLAYFAIR,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(40px, 7vw, 72px)",
              color: "var(--color-primary)",
              lineHeight: 0.93,
              letterSpacing: "-0.02em",
            }}
          >
            Drop me<br />a line.
          </h2>
          <Image
            src="/Cat_ContactMe.png"
            alt="Cat Contact Me"
            width={110}
            height={110}
            className="object-contain mb-1 w-20 h-20 md:w-28 md:h-28"
          />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="relative bg-white border border-border overflow-hidden rounded-sm"
          style={{ boxShadow: "0 2px 24px rgba(0,0,0,0.055), 0 0 0 0.5px rgba(0,0,0,0.04)" }}
        >
          <Perforations position="top" />

          <div className="flex flex-col md:flex-row" style={{ minHeight: "460px" }}>

            {/* ── Left stamp panel — desktop only ── */}
            <div
              className="hidden md:flex flex-col justify-between p-8 relative bg-primary shrink-0"
              style={{ width: "220px" }}
            >
              {/* Registration corners */}
              {(["top-[10px] left-[10px] border-t border-l", "top-[10px] right-[10px] border-t border-r",
                "bottom-[10px] left-[10px] border-b border-l", "bottom-[10px] right-[10px] border-b border-r"] as const)
                .map((cls, i) => (
                  <div key={i} className={`absolute w-3 h-3 ${cls} border-white/20`} />
                ))}
              

              <div>
                <p className="text-[7px] text-white/30 tracking-[0.25em] font-medium mb-2">DELIVER TO</p>
                <p
                  style={{ fontFamily: PLAYFAIR, fontStyle: "italic" }}
                  className="text-sm text-white/85 font-light leading-relaxed"
                >
                  Soumik Debnath
                </p>
                <p className="text-[10px] text-white/35 tracking-[0.03em] mt-1">
                  debnathsoumik17@gmail.com
                </p>
              
              </div>
            </div>

            {/* ── Form panel ── */}
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-5 md:p-8 bg-white relative">

              {/* Ruled lines */}
              <div
                className="absolute inset-0 pointer-events-none"
                
              />

              <div className="relative flex flex-col gap-5 md:gap-6 flex-1">

                {/* From + Name — stacked on mobile, side-by-side on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.75">
                    <label className="text-[8px] font-medium tracking-[0.22em] text-secondary">FROM</label>
                    <input
                      type="email" required placeholder="your@email.com"
                      value={email} onChange={e => setEmail(e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      className={`${inputCls} ${focusBorder("email")}`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.75">
                    <label className="text-[8px] font-medium tracking-[0.22em] text-secondary">NAME</label>
                    <input
                      type="text" required placeholder="Your name"
                      value={name} onChange={e => setName(e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      className={`${inputCls} ${focusBorder("name")}`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.75">
                  <label className="text-[8px] font-medium tracking-[0.22em] text-secondary">RE: SUBJECT</label>
                  <input
                    type="text" placeholder="What's this about?"
                    value={subject} onChange={e => setSubject(e.target.value)}
                    onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                    className={`${inputCls} ${focusBorder("subject")}`}
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.75 flex-1">
                  <label className="text-[8px] font-medium tracking-[0.22em] text-secondary">MESSAGE</label>
                  <textarea
                    required rows={6} placeholder="Write your message here…"
                    value={message} onChange={e => setMessage(e.target.value)}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    className={`${inputCls} resize-none leading-[1.85] ${focusBorder("message")}`}
                  />
                </div>
              </div>

              {/* Toolbar */}
              <div className="relative mt-5 md:mt-6 pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isBlocked}
                    className="inline-flex items-center gap-2 px-5 py-2.25 bg-primary text-white text-[10px] font-medium tracking-[0.2em] rounded-sm transition-all duration-200 hover:bg-[#3a3a3a] hover:-translate-y-px disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0"
                  >
                    {status === "sending" ? (
                      <>
                        <span className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin inline-block" />
                        SENDING…
                      </>
                    ) : status === "success" ? "SENT ✓" : "SEND ↗"}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setName(""); setEmail(""); setSubject(""); setMessage(""); setStatus("idle"); }}
                    className="text-secondary text-[10px] tracking-[0.18em] px-1 py-2.25 bg-transparent border-none cursor-pointer transition-colors duration-200 hover:text-primary"
                  >
                    CLEAR
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {status === "success" && (
                    <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-[10px] tracking-[0.12em] text-green-600">
                      ✓ MESSAGE SENT — I&apos;LL REPLY SOON
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p key="err" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-[10px] tracking-[0.12em] text-red-500">
                      ✦ SOMETHING WENT WRONG — TRY AGAIN
                    </motion.p>
                  )}
                  {status === "limited" && (
                    <motion.p key="ltd" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="text-[10px] tracking-[0.12em] text-amber-500">
                      ✦ {errMsg?.toUpperCase() ?? "RATE LIMITED"}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>

          <Perforations position="bottom" />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.55 }}
          className="mt-5 flex justify-between flex-wrap gap-2"
        >
          <p className="text-[8px] text-[#C0C0C0] tracking-[0.18em]">© SOUMIK DEBNATH — PERSONAL MAIL</p>
          <p className="text-[8px] text-[#C0C0C0] tracking-[0.18em]">ALL LETTERS ANSWERED ✦</p>
        </motion.div>

      </div>
    </section>
  );
}
