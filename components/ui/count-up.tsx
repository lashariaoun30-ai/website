import React, { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CountUpProps {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  currency?: boolean;
  className?: string;
  decimals?: number;
}

export function CountUp({
  to,
  duration = 1.5,
  prefix = "",
  suffix = "",
  currency = false,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        if (currency) {
          setDisplay(
            new Intl.NumberFormat("it-IT", {
              style: "currency",
              currency: "EUR",
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(Math.round(value / 10) * 10)
          );
        } else {
          setDisplay(
            new Intl.NumberFormat("it-IT", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }).format(Math.round(value))
          );
        }
      },
    });

    return () => controls.stop();
  }, [isInView, to, duration, currency, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}