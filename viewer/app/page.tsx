'use client';

import { useState, useCallback } from 'react';
import { Copy, Check, ArrowRight, Bell, CreditCard, Eye, GitCommitHorizontal, Mail, Flag } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Toaster, toast } from 'sonner';

/* ── Palette ── Geist tokens. Accent #006bff on interactive elements only. */
const ACCENT = '#006bff';

const CodeBlock = ({ code }: { code: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
    setCopied(true);
    toast.success('Copied');
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group flex items-center justify-between bg-[#171717] border border-[#2e2e2e] hover:border-[#4d4d4d] rounded-[6px] px-4 py-3 font-mono text-sm w-full max-w-sm transition-colors">
      <span className="select-none mr-2.5 text-[#8f8f8f]">$</span>
      <code className="text-[#ededed] flex-1 text-left">{code}</code>
      <button
        onClick={copy}
        aria-label="Copy command"
        className="ml-3 p-1.5 rounded-[6px] text-[#8f8f8f] hover:text-[#ededed] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]"
        style={{ color: copied ? ACCENT : undefined }}
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
};

const STEPS = [
  { n: '01', title: 'Install and link your project', body: 'One global install, one command per project. Clientcast asks for your client, hourly rate, and scope doc.', code: 'clientcast init', detail: 'Creates a .clientcast.json in your repo. Nothing leaves your machine until you send.' },
  { n: '02', title: 'Send an update', body: 'Commit work, run one command. Clientcast reads your recent commits, drafts a plain-English update with AI, and emails it to your client with a review link.', code: 'clientcast send', detail: 'The email lands in their inbox. The link opens a live view of exactly what shipped.' },
  { n: '03', title: 'Client reviews, replies get classified', body: 'They open the link, read, and reply — no account needed. Every reply is classified: approval, feedback, or scope creep.', code: null, detail: 'Scope creep gets an estimate in hours and dollars, based on your rate and scope doc.' },
  { n: '04', title: 'Invoice the extra work', body: 'When a reply asks for work outside scope, you get an "Approve & invoice" button. One click generates a Stripe payment link in-page.', code: null, detail: 'git commit → AI summary → client reply → flagged work → payment link.' },
];

const FEATURES = [
  { icon: GitCommitHorizontal, title: 'Drafts from real commits', desc: 'Reads your git log — files changed, insertions, deletions — and writes the update a client can actually understand.' },
  { icon: Mail, title: 'Sends the email for you', desc: 'clientcast send delivers the update to your client’s inbox via Resend, review link included. No copy-paste.' },
  { icon: Flag, title: 'Scope creep, priced', desc: '"Can you also..." replies get flagged with an estimate in hours and dollars against your original scope doc.' },
  { icon: CreditCard, title: 'One-click Stripe invoicing', desc: 'Flagged extra work gets an "Approve & invoice" button that generates a Stripe payment link in-page.' },
  { icon: Bell, title: 'Reply notifications', desc: 'Slack webhook or email the moment your client responds, with the classification attached.' },
  { icon: Eye, title: 'No account for clients', desc: 'They open a link. That’s it. Zero onboarding friction on their side.' },
];

export default function ClientcastLanding() {
  const reduceMotion = useReducedMotion();

  const reveal = reduceMotion
    ? { initial: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      };
  const enter = (delay = 0) =>
    reduceMotion
      ? { initial: { opacity: 1 } }
      : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#ededed] selection:bg-[#006bff]/30 selection:text-white">
      <Toaster theme="dark" position="bottom-right" />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#2e2e2e] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight">clientcast</span>
          <div className="flex items-center gap-5">
            <a href="https://github.com/nikolas-sapa/clientcast" className="text-[#8f8f8f] hover:text-[#ededed] transition-colors font-mono text-xs tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">GitHub</a>
            <div className="hidden sm:block"><CodeBlock code="npm install -g clientcast" /></div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section className="pt-44 pb-28 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div {...enter(0)}>
            <a
              href="https://github.com/nikolas-sapa/clientcast"
              className="inline-flex items-center gap-2 rounded-full border border-[#2e2e2e] bg-[#171717] px-3 py-1 text-[11px] uppercase tracking-[0.12em] font-mono text-[#8f8f8f] hover:text-[#ededed] hover:border-[#4d4d4d] transition-colors mb-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#47a447]" />
              Beta open on GitHub
            </a>
          </motion.div>

          <motion.h1
            {...enter(0.05)}
            className="text-5xl md:text-[4rem] font-semibold tracking-[-0.025em] leading-[1.04] mb-6 max-w-3xl"
          >
            Get paid for the work you ship. Not the emails you write.
          </motion.h1>

          <motion.p {...enter(0.15)} className="text-lg text-[#8f8f8f] mb-8 max-w-2xl leading-relaxed">
            Clientcast reads your git commits, drafts the client update with AI, and sends the email
            with a review link. When the client replies, it classifies the response — approval,
            feedback, or scope creep — with hours and dollars attached.
          </motion.p>

          {/* Proof strip — real badges, live data */}
          <motion.div {...enter(0.2)} className="flex flex-wrap items-center justify-center gap-3 mb-12">
            <a href="https://www.npmjs.com/package/clientcast" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/npm/v/clientcast?style=flat-square&labelColor=171717&color=2e2e2e" alt="clientcast on npm" className="h-5" />
            </a>
            <a href="https://www.npmjs.com/package/clientcast" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/npm/dm/clientcast?style=flat-square&labelColor=171717&color=2e2e2e" alt="npm downloads per month" className="h-5" />
            </a>
            <a href="https://github.com/nikolas-sapa/clientcast" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://img.shields.io/github/stars/nikolas-sapa/clientcast?style=flat-square&labelColor=171717&color=2e2e2e" alt="GitHub stars" className="h-5" />
            </a>
          </motion.div>

          <motion.div {...enter(0.25)} className="flex flex-col sm:flex-row items-center gap-4">
            <CodeBlock code="npm install -g clientcast" />
            <a href="#how" className="group flex items-center gap-2 text-sm text-[#8f8f8f] hover:text-[#ededed] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">
              See how it works <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform motion-reduce:transition-none" />
            </a>
          </motion.div>
        </section>

        {/* How it works */}
        <section id="how" className="py-28 px-6 max-w-5xl mx-auto">
          <motion.p {...reveal} className="text-[#8f8f8f] font-mono text-[10px] tracking-[0.18em] uppercase mb-20 text-center">How it works</motion.p>

          <div className="space-y-24">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.n}
                {...reveal}
                className={`grid md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-[#8f8f8f]">{step.n}</span>
                    <span className="h-px w-10 bg-[#2e2e2e]" />
                  </div>
                  <h3 className="text-2xl font-semibold leading-tight tracking-tight">{step.title}</h3>
                  <p className="text-[#a8a8a8] leading-relaxed">{step.body}</p>
                  <p className="text-[#8f8f8f] text-sm leading-relaxed">{step.detail}</p>
                </div>
                <div className="relative bg-[#171717] border border-[#2e2e2e] rounded-[12px] p-7 space-y-4 overflow-hidden">
                  {step.code ? (
                    <>
                      <div className="font-mono text-[11px] text-[#8f8f8f] tracking-widest uppercase mb-4">terminal</div>
                      <div className="flex items-start gap-3 font-mono text-sm">
                        <span className="select-none mt-0.5 text-[#8f8f8f]">$</span>
                        <code className="text-[#ededed] leading-relaxed">{step.code}</code>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="font-mono text-[11px] text-[#8f8f8f] tracking-widest uppercase">client reply</div>
                      <div className="space-y-2 text-sm font-mono">
                        <div className="text-[#ededed]">&ldquo;Looks good. Can you also add a Spanish version?&rdquo;</div>
                        <div className="text-[#8f8f8f]">[scope_creep · high]</div>
                        <div className="text-[#8f8f8f]">Add Spanish version of site — ~8h, $960</div>
                        <a href="https://github.com/nikolas-sapa/clientcast#stripe--turn-flagged-work-into-paid-work" className="inline-block text-[#006bff] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">
                          Approve &amp; invoice $960 →
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="py-28 px-6 max-w-5xl mx-auto border-t border-[#2e2e2e]">
          <motion.div {...reveal} className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#2e2e2e] rounded-[12px] overflow-hidden border border-[#2e2e2e]">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="group bg-[#0a0a0a] p-7 space-y-3 hover:bg-[#171717] transition-colors">
                  <span className="grid place-items-center w-9 h-9 rounded-[6px] border border-[#2e2e2e] bg-[#171717] text-[#8f8f8f] group-hover:text-[#ededed] transition-colors">
                    <Icon size={16} />
                  </span>
                  <h4 className="font-semibold text-sm">{f.title}</h4>
                  <p className="text-[#8f8f8f] text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* CTA */}
        <section className="py-32 px-6">
          <motion.div {...reveal} className="relative max-w-2xl mx-auto text-center space-y-8 rounded-[16px] border border-[#2e2e2e] bg-[#171717] px-8 py-14">
            <h2 className="text-4xl font-semibold tracking-[-0.02em]">Stop writing update emails.</h2>
            <p className="text-[#a8a8a8] leading-relaxed">One install. Your commits become the update. Scope creep becomes an invoice.</p>
            <div className="flex justify-center"><CodeBlock code="npm install -g clientcast" /></div>
            <p className="text-[#8f8f8f] text-sm">Open source and free to install — MIT licensed.</p>
          </motion.div>
        </section>
      </main>

      <footer className="py-10 border-t border-[#2e2e2e] text-center text-sm text-[#8f8f8f]">
        <div className="flex justify-center gap-7 mb-3">
          <a href="https://github.com/nikolas-sapa/clientcast" className="hover:text-[#ededed] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">GitHub</a>
          <a href="https://x.com/nikolas_sapa" className="hover:text-[#ededed] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006bff]">X</a>
        </div>
        <p>Built for freelancers and small teams. &copy; 2026 Clientcast.</p>
      </footer>
    </div>
  );
}
