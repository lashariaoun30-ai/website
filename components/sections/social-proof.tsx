import React from 'react';
import { Badge } from "../ui/badge";
import { ScrollReveal } from "../ui/scroll-reveal";

export function SocialProof() {
    return (
        <section className="py-16 md:py-24 bg-background border-y border-border/50">
            <div className="container mx-auto px-4 text-center">
                <ScrollReveal>
                     <div className="flex flex-col items-center gap-4 mb-12">
                         <Badge variant="brand" className="mb-2">Partners</Badge>
                         <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                            Già utilizzato negli studi
                         </h2>
                         <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
                            Per gestire meglio richieste, appuntamenti e follow-up ogni giorno.
                         </p>
                    </div>
                    
                    {/* Static Logo Display - Two Fixed Spots */}
                    <div className="flex justify-center items-center gap-6 md:gap-32">
                        {/* Logo 1 */}
                        <div className="w-32 md:w-48 h-16 md:h-24 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                            <img 
                                src="https://skydental3d.com/hosted/images/bd/ae3d27300d457a9ab906b731ca49ca/logo-skydental-2021.png" 
                                alt="Sky Dental 3D" 
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        {/* Logo 2 */}
                        <div className="w-32 md:w-48 h-16 md:h-24 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                            <img 
                                src="https://static.wixstatic.com/media/6d3ee5_bc31c04487cd4f229a253ff4d67c5c84~mv2.jpg/v1/fill/w_277,h_191,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_8393_JPG.jpg" 
                                alt="L'Eye Clinic" 
                                className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal dark:invert"
                            />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}