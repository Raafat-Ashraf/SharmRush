"use client";

import { useEffect, useRef } from "react";

function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface BubbleStyle {
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: string;
}

const BUBBLE_COUNT = 14;

// Pre-format every value as a string so server HTML and client re-render
// produce identical strings — prevents hydration attribute mismatch.
const BUBBLES: BubbleStyle[] = Array.from({ length: BUBBLE_COUNT }, (_, i) => {
  const x       = seededRandom(i * 13) * 95;
  const size    = 6  + seededRandom(i * 7)  * 22;
  const dur     = 12 + seededRandom(i * 3)  * 20;
  const delay   = seededRandom(i * 17) * -22;
  const opacity = 0.15 + seededRandom(i * 11) * 0.35;
  return {
    left:     `${x.toFixed(3)}%`,
    size:     `${size.toFixed(3)}px`,
    duration: `${dur.toFixed(3)}s`,
    delay:    `${delay.toFixed(3)}s`,
    opacity:  opacity.toFixed(4),
  };
});

export default function WaveBackground() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    const onScroll = () => {
      frameId = requestAnimationFrame(() => {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform =
            `translateY(${(window.scrollY * 0.35).toFixed(2)}px)`;
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Parallax gradient */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 -top-[30%] bg-ocean-radial will-change-transform"
        style={{ height: "160%" }}
      />

      {/* Bubbles */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left:              b.left,
            width:             b.size,
            height:            b.size,
            animationDuration: b.duration,
            animationDelay:    b.delay,
            opacity:           b.opacity,
          }}
        />
      ))}

      {/* Wave layer 1 — slow */}
      <div className="absolute bottom-0 left-0 right-0 h-36 md:h-52">
        <div className="wave-track animate-wave-slow h-full">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full">
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1440,40 L1440,80 L0,80 Z"
              fill="rgba(11,177,191,0.18)"
            />
          </svg>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full">
            <path
              d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1440,40 L1440,80 L0,80 Z"
              fill="rgba(11,177,191,0.18)"
            />
          </svg>
        </div>
      </div>

      {/* Wave layer 2 — fast */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36">
        <div className="wave-track animate-wave-fast h-full">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="h-full">
            <path
              d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
              fill="rgba(38,204,214,0.12)"
            />
          </svg>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="h-full">
            <path
              d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
              fill="rgba(38,204,214,0.12)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
