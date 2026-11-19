"use client";

import { useCallback, useState } from "react";
import { siteConfig } from "@/config/site";
import { siteContent } from "@/data/site-content";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";

const copy = siteContent.contact;

export function ContactSection() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="py-16 sm:py-22">
      <div className="container-page">
        <AnimatedSection className="flex flex-col gap-7 rounded-panel border border-line bg-linear-to-br from-surface-2 to-surface p-7 sm:p-11 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-eyebrow font-bold text-brand">{copy.eyebrow}</p>
            <h2 id="contacto-title" className="mt-3 max-w-[36rem] text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-[1.2] tracking-[-0.02em]">
              {copy.title}
            </h2>
            <p className="mt-3 max-w-[35rem] text-[0.8125rem] text-muted">{copy.body}</p>
          </div>
          <Button variant="outline" icon="arrow-right" aria-haspopup="dialog" onClick={() => setOpen(true)} className="shrink-0">
            {copy.button}
          </Button>
        </AnimatedSection>
      </div>
      <Modal open={open} onClose={close} titleId="contact-modal-title">
        <p className="pr-12 text-xs font-bold text-ember">{copy.dialogTag}</p>
        <h2 id="contact-modal-title" className="mt-3 text-[1.65rem] font-semibold leading-tight">
          {copy.dialogTitle}
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-[1.8] text-muted">{copy.dialogBody}</p>
        {siteConfig.contactChannels.length > 0 && (
          <ul className="mt-5 grid gap-2">
            {siteConfig.contactChannels.map((channel) => (
              <li key={channel.href}>
                <Button href={channel.href} variant="outline" size="sm">
                  {channel.label}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Modal>
    </section>
  );
}
