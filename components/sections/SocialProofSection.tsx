import React from 'react';
import { LogoCarousel, Logo } from '../ui/logo-carousel';

export function SocialProofSection() {
    const logos: Logo[] = [
        { name: "Sky Dental 3D", id: 1, src: "/logos/sky-dental.png" },
        { name: "L'Eye Clinic", id: 2, src: "/logos/eye-clinic.jpg", className: "mix-blend-multiply dark:mix-blend-normal dark:invert" },
        { name: "Sky Dental 3D", id: 3, src: "/logos/sky-dental.png" },
        { name: "L'Eye Clinic", id: 4, src: "/logos/eye-clinic.jpg", className: "mix-blend-multiply dark:mix-blend-normal dark:invert" },
        { name: "Sky Dental 3D", id: 5, src: "/logos/sky-dental.png" },
        { name: "L'Eye Clinic", id: 6, src: "/logos/eye-clinic.jpg", className: "mix-blend-multiply dark:mix-blend-normal dark:invert" },
        { name: "Sky Dental 3D", id: 7, src: "/logos/sky-dental.png" },
        { name: "L'Eye Clinic", id: 8, src: "/logos/eye-clinic.jpg", className: "mix-blend-multiply dark:mix-blend-normal dark:invert" },
    ];

    return (
        <section className="py-12 bg-background border-y border-border/50">
            <div className="container mx-auto px-4 text-center">
                 <div className="mb-8 flex flex-col items-center gap-2">
                     <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">
                        Già utilizzato negli studi
                     </h2>
                     <p className="text-muted-foreground text-sm md:text-base">
                        Per gestire meglio richieste, appuntamenti e follow-up.
                     </p>
                </div>
                <div className="mx-auto w-full max-w-5xl">
                    <LogoCarousel logos={logos} columnCount={4} />
                </div>
            </div>
        </section>
    );
}