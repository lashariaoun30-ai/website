"use client";
import React from "react";
import { ContainerScroll } from "../ui/ContainerScrollAnimation";

export function HeroSection() {
  return (
    <div className="flex flex-col overflow-hidden -mb-12 md:-mb-36">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl sm:text-5xl md:text-[4.5rem] font-bold mt-1 leading-none text-black dark:text-white">
              Agenda piena. Sedie occupate. <span className="text-[#006400]">Meno Stress.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-8 max-w-3xl mx-auto font-medium px-4">
              Gestione automatica di richieste, appuntamenti e follow-up,
              <br className="hidden md:block" /> senza caricare la segreteria.
            </p>
          </>
        }
      >
        {/* Mobile Image */}
        <img
          src="https://imgur.com/bpRrFO4.jpeg"
          alt="Intelligenzia Artificiale per studi medici"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top block md:hidden"
          draggable={false}
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
        />
        {/* Desktop Image */}
        <img
          src="https://i.imgur.com/2BbLFA5.jpeg"
          alt="Intelligenzia Artificiale per studi medici"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top hidden md:block"
          draggable={false}
          loading="eager"
          // @ts-ignore
          fetchpriority="high"
        />
      </ContainerScroll>
    </div>
  );
}