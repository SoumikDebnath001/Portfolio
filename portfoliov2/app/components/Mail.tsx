"use client";

import { useState } from "react";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Status = "idle" | "sending" | "success" | "error" | "limited";

const EMAIL = "debnathsoumik17@gmail.com";

const inputCls = [
  "w-full rounded-xl border border-border bg-elevated px-4 text-[16px] text-primary",
  "placeholder:text-muted outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10",
].join(" ");

const labelCls = "mb-2 block text-[13px] font-medium text-primary";

export default function Mail() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState<Status>("idle");
  const [errMsg,  setErrMsg]  = useState("");

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

  return (
    <section id="mail" aria-labelledby="mail-title" className="bg-base py-section md:py-section-lg">
      <div className="max-w-350 mx-auto px-5 md:px-12 lg:px-20">
        <SectionHeading
          accent="var(--color-accent-contact)"
          index="05"
          label="Contact"
          titleId="mail-title"
          title={<>Let&apos;s <em className="font-playfair italic font-normal">talk</em></>}
          image="/Cat_ContactMe.png"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="max-w-[40ch] text-[16px] leading-[1.75] text-secondary md:text-[18px]">
              Have a project in mind, a role to discuss, or just want to say hi?
              Send a message and I&apos;ll get back to you.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-6 inline-flex max-w-full items-center gap-3 text-[15px] text-primary no-underline"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary">
                <FiMail size={16} aria-hidden />
              </span>
              <span className="truncate border-b border-transparent transition-colors duration-200 group-hover:border-primary">
                {EMAIL}
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border bg-surface p-5 sm:p-7 md:p-9"
              style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 12px 40px rgba(0,0,0,0.04)" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="mail-name" className={labelCls}>Name</label>
                  <input
                    id="mail-name" type="text" required autoComplete="name" placeholder="Your name"
                    value={name} onChange={e => setName(e.target.value)}
                    className={`${inputCls} h-12`}
                  />
                </div>
                <div>
                  <label htmlFor="mail-email" className={labelCls}>Email</label>
                  <input
                    id="mail-email" type="email" required autoComplete="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)}
                    className={`${inputCls} h-12`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mail-subject" className={labelCls}>
                    Subject <span className="font-normal text-secondary">(optional)</span>
                  </label>
                  <input
                    id="mail-subject" type="text" placeholder="What's this about?"
                    value={subject} onChange={e => setSubject(e.target.value)}
                    className={`${inputCls} h-12`}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="mail-message" className={labelCls}>Message</label>
                  <textarea
                    id="mail-message" required rows={5} placeholder="Tell me a little about it…"
                    value={message} onChange={e => setMessage(e.target.value)}
                    className={`${inputCls} resize-y py-3 leading-relaxed`}
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p role="status" aria-live="polite" className="min-h-5 text-[14px]">
                  {status === "success" && <span className="text-green-700">Message sent — I&apos;ll reply soon.</span>}
                  {status === "error" && <span className="text-red-600">Something went wrong. Please try again.</span>}
                  {status === "limited" && <span className="text-amber-700">{errMsg || "You've already sent a message today."}</span>}
                </p>
                <button
                  type="submit"
                  disabled={isBlocked}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-7 text-[15px] font-medium text-on-primary transition-colors duration-200 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                >
                  {status === "sending" ? (
                    <>
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                      Sending…
                    </>
                  ) : status === "success" ? (
                    "Sent ✓"
                  ) : (
                    <>Send message <FiArrowUpRight size={16} aria-hidden /></>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
