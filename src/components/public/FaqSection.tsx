import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "../common/Reveal";
import { faqs } from "../../constants/publicData";
import { trackEvent } from "../../analytics";

export const FaqSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="scroll-mt-20 sm:scroll-mt-24 py-8 min-[380px]:py-10 sm:py-12 bg-[#14141c] border-b border-[rgba(212,175,55,0.15)]"
    >
      <div className="mx-auto max-w-3xl px-3 min-[360px]:px-4 sm:px-8">
        <Reveal className="text-center">
          <span className="text-[10px] min-[360px]:text-[11px] font-bold uppercase tracking-widest gold-gradient-text">
            Clear Answers
          </span>
          <h2 className="mt-1 font-serif text-xl min-[360px]:text-2xl sm:text-3xl font-bold text-white">
            Aapke Sawaal, Hamare Jawab (FAQ)
          </h2>
        </Reveal>

        <div className="mt-5 space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-[rgba(212,175,55,0.18)] bg-[#181824] overflow-hidden"
              >
                <button
                  className="flex w-full items-center justify-between gap-3 p-3 text-left cursor-pointer transition hover:bg-[rgba(212,175,55,0.05)]"
                  onClick={() => {
                    const next = !isOpen;
                    if (next) trackEvent("card_click", `FAQ Toggle: ${faq.question.slice(0, 32)}...`);
                    setOpenFaq(next ? index : null);
                  }}
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xs min-[360px]:text-sm font-bold text-white">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={15}
                    className={`shrink-0 text-[var(--gold-primary)] transition duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-3 pb-3 text-xs leading-relaxed text-slate-300 border-t border-[rgba(212,175,55,0.1)] pt-2">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
