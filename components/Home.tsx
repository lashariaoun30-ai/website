import React from 'react';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { SolutionsSection } from './sections/SolutionsSection';
import { LiveDemoSection } from './sections/LiveDemoSection';
import { BookingSection } from './sections/booking';
import { SocialProof } from './sections/social-proof';
import { BlogList } from './sections/blog-list';
import { FaqSection } from './sections/faq';

export default function Home() {
  return (
    <div className="relative font-sans antialiased selection:bg-[#006400] selection:text-white">
      {/* Hero Section */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* Problem Section */}
      <section id="problem">
        <ProblemSection />
      </section>
      
      {/* Solutions Section */}
      <section id="solution">
        <SolutionsSection />
      </section>

      {/* Live Demo Section */}
      <section id="demo">
        <LiveDemoSection />
      </section>

      {/* Booking Section */}
      <section id="booking">
        <BookingSection />
      </section>

      {/* Social Proof - Placed after Booking */}
      <section>
        <SocialProof />
      </section>

      {/* Blog Section */}
      <section id="blog">
        <BlogList />
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <FaqSection />
      </section>
      
    </div>
  )
}
