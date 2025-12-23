"use client"

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

export interface Logo {
  name: string
  id: number
  src: string
  className?: string
}

interface LogoColumnProps {
  logos: Logo[]
  index: number
  currentTime: number
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const minLogosPerColumn = 3; // Reduced since we don't scroll
  let logosToDistribute = [...allLogos];
  
  // Ensure enough logos
  while (logosToDistribute.length < columnCount * minLogosPerColumn) {
    logosToDistribute = [...logosToDistribute, ...allLogos];
  }

  const shuffled = shuffleArray(logosToDistribute)
  const columns: Logo[][] = Array.from({ length: columnCount }, () => [])

  shuffled.forEach((logo, index) => {
    columns[index % columnCount].push(logo)
  })

  // Normalize lengths
  const maxLength = Math.max(...columns.map((col) => col.length))
  columns.forEach((col) => {
    while (col.length < maxLength) {
      col.push(shuffled[Math.floor(Math.random() * shuffled.length)])
    }
  })

  return columns
}

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 1500 // 1.5 seconds
    const columnDelay = index * 200 // Slight stagger between columns
    const adjustedTime = (currentTime + columnDelay) % (cycleInterval * logos.length)
    const currentIndex = Math.floor(adjustedTime / cycleInterval)
    const currentLogo = useMemo(() => logos[currentIndex], [logos, currentIndex])

    return (
      <motion.div
        className="relative h-16 w-24 md:h-24 md:w-48 overflow-hidden flex items-center justify-center"
        {...({
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: {
            delay: index * 0.1,
            duration: 0.5,
            ease: "easeOut",
            }
        } as any)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLogo.id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center p-2"
            {...({
                initial: { opacity: 0 },
                animate: {
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                        duration: 0.3,
                        ease: "easeOut"
                    },
                },
                exit: {
                    opacity: 0,
                    filter: "blur(2px)",
                    transition: {
                        duration: 0.2,
                        ease: "easeIn"
                    },
                }
            } as any)}
          >
            <img 
              src={currentLogo.src} 
              alt={currentLogo.name}
              className={`max-h-[80%] max-w-[80%] object-contain ${currentLogo.className || ""}`}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    )
  }
)

interface LogoCarouselProps {
  columnCount?: number
  logos: Logo[]
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([])
  const [currentTime, setCurrentTime] = useState(0)

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100)
    return () => clearInterval(intervalId)
  }, [updateTime])

  useEffect(() => {
    const distributedLogos = distributeLogos(logos, columnCount)
    setLogoSets(distributedLogos)
  }, [logos, columnCount])

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      {logoSets.map((logos, index) => (
        <LogoColumn
          key={index}
          logos={logos}
          index={index}
          currentTime={currentTime}
        />
      ))}
    </div>
  )
}