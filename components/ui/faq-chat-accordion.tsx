"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp,
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <div className={cn("p-4", className)}>
      {timestamp && (
        <div className="mb-4 text-sm text-muted-foreground">{timestamp}</div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item 
            value={item.id.toString()} 
            key={item.id} 
            className="mb-4"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-start gap-x-4 group">
                <div
                  className={cn(
                    "relative flex items-center space-x-4 rounded-2xl p-4 transition-colors w-full text-left",
                    openItem === item.id.toString() 
                      ? "bg-[#006400]/10 text-[#006400]" 
                      : "bg-muted/50 hover:bg-[#006400]/5",
                    questionClassName
                  )}
                >
                  {item.icon && (
                    <span
                      className={cn(
                        "absolute -top-3 shadow-sm bg-background rounded-full p-1 border border-border/50",
                        item.iconPosition === "right" ? "-right-2" : "-left-2"
                      )}
                      style={{
                        transform: item.iconPosition === "right" 
                          ? "rotate(7deg)" 
                          : "rotate(-4deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span className="font-medium text-base md:text-lg pr-8">{item.question}</span>
                </div>

                <span 
                  className={cn(
                    "text-muted-foreground transition-colors hidden sm:block",
                    openItem === item.id.toString() && "text-[#006400]"
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <motion.div
                {...({
                    initial: "collapsed",
                    animate: openItem === item.id.toString() ? "open" : "collapsed",
                    variants: {
                    open: { opacity: 1, height: "auto", marginTop: 8 },
                    collapsed: { opacity: 0, height: 0, marginTop: 0 },
                    },
                    transition: { duration: 0.3, ease: "easeInOut" },
                    className: "overflow-hidden"
                } as any)}
              >
                <div className="ml-0 md:ml-4">
                  <div
                    className={cn(
                      "relative max-w-2xl rounded-2xl bg-[#006400] px-6 py-4 text-white shadow-sm",
                      "rounded-tl-none", 
                      answerClassName
                    )}
                  >
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}