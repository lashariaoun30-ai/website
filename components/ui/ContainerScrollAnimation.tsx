"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children?: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const element = containerRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate how much of the element has been scrolled
      // 0 = element just entered viewport from bottom
      // 1 = element has completely scrolled past viewport top
      const scrolled = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
      const progress = Math.max(0, Math.min(1, scrolled));

      setScrollProgress(progress);
    };

    // Initial calculation
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Calculate transform values based on scroll progress
  // isMobile range [0.7, 1] for strong zoom on small screens
  // Desktop range [0.8, 1] for balanced zoom
  const scaleDimensions = isMobile ? [0.7, 1] : [0.8, 1];
  const rotate = 20 - scrollProgress * 20; // 20deg → 0deg
  const scale = scaleDimensions[0] + scrollProgress * (scaleDimensions[1] - scaleDimensions[0]);
  const translateY = -scrollProgress * 100; // 0 → -100px

  return (
    <div
      className="h-[45rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-5"
      ref={containerRef}
    >
      <div
        className="py-5 md:py-20 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        {/* Header with translateY animation */}
        <motion.div
          {...({
            animate: { y: translateY },
            transition: { duration: 0.15 },
            className: "max-w-5xl mx-auto text-center"
          } as any)}
        >
          {titleComponent}
        </motion.div>

        {/* Card with 3D rotation and scale */}
        <motion.div
          {...({
            animate: {
              rotateX: rotate,
              scale: scale,
            },
            transition: { duration: 0.15 },
            style: {
              transformStyle: "preserve-3d",
              boxShadow:
                "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
            },
            className: "max-w-5xl -mt-12 mx-auto h-[25rem] md:h-[40rem] w-full border-4 border-[#006400] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
          } as any)}
        >
          <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};