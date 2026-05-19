"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import * as THREE from "three";

const slides = [
  {
    id: 0,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1800&q=80",
    tag: "Premium Celebrity Booking",
    title: "Book World-Class Celebrities",
    subtitle: "Connect with the world's finest talent for your events.",
    cta1: { label: "Browse Celebrities", href: "/celebrities" },
    cta2: { label: "How It Works", href: "#how-it-works" },
  },
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1800&q=80",
    tag: "Music & Entertainment",
    title: "Top Music Artists, One Click Away",
    subtitle: "From Grammy winners to rising stars — book them for your next show.",
    cta1: { label: "Explore Artists", href: "/celebrities?category=Music" },
    cta2: { label: "Learn More", href: "#how-it-works" },
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80",
    tag: "Corporate Events",
    title: "Elevate Your Corporate Events",
    subtitle: "Keynote speakers, innovators and icons ready for your stage.",
    cta1: { label: "View Speakers", href: "/celebrities?category=Tech" },
    cta2: { label: "Get Started", href: "/signup" },
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1800&q=80",
    tag: "Sports Legends",
    title: "Book Sports Icons",
    subtitle: "Bring legendary athletes to your brand activations and events.",
    cta1: { label: "View Athletes", href: "/celebrities?category=Sports" },
    cta2: { label: "Create Account", href: "/signup" },
  },
];

const PARTICLE_COUNT = 2000;

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);
  const targetPositionsRef = useRef(null);
  const originalPositionsRef = useRef(null);
  const isExplodingRef = useRef(false);
  const explodeTimeRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const triggerExplosion = useCallback(() => {
    isExplodingRef.current = true;
    explodeTimeRef.current = 0;

    const geo = particlesRef.current?.geometry;
    if (!geo) return;

    const positions = geo.attributes.position.array;
    const targets = targetPositionsRef.current;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // explode outward
      targets[i3] = positions[i3] + randomRange(-8, 8);
      targets[i3 + 1] = positions[i3 + 1] + randomRange(-8, 8);
      targets[i3 + 2] = positions[i3 + 2] + randomRange(-8, 8);
    }
  }, []);

  const next = useCallback(() => {
    triggerExplosion();
    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 400);
  }, [triggerExplosion]);

  const prev = useCallback(() => {
    triggerExplosion();
    setTimeout(() => {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, 400);
  }, [triggerExplosion]);

  const goTo = useCallback((index) => {
    triggerExplosion();
    setTimeout(() => {
      setCurrent(index);
    }, 400);
  }, [triggerExplosion]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Three.js setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
    camera.position.z = 4;

    // Build particles
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targets = new Float32Array(PARTICLE_COUNT * 3);
    const originals = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const x = randomRange(-10, 10);
      const y = randomRange(-6, 6);
      const z = randomRange(-4, 4);
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      originals[i3] = x;
      originals[i3 + 1] = y;
      originals[i3 + 2] = z;
      targets[i3] = x;
      targets[i3 + 1] = y;
      targets[i3 + 2] = z;
    }

    targetPositionsRef.current = targets;
    originalPositionsRef.current = originals;

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.022,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse
    const handleMouse = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener("mousemove", handleMouse);

    // Resize
    const handleResize = () => {
      const nw = canvas.offsetWidth;
      const nh = canvas.offsetHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animate
    const animate = () => {
      animRef.current = requestAnimationFrame(animate);

      const pos = geo.attributes.position.array;
      const tgt = targetPositionsRef.current;
      const orig = originalPositionsRef.current;

      if (isExplodingRef.current) {
        explodeTimeRef.current += 0.016;

        // Phase 1: explode outward (0 - 0.4s)
        // Phase 2: reform back (0.4s+)
        const t = explodeTimeRef.current;

        if (t < 0.4) {
          // explode
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            pos[i] += (tgt[i] - pos[i]) * 0.12;
          }
        } else if (t < 1.8) {
          // reform to original
          let allBack = true;
          for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
            const diff = orig[i] - pos[i];
            pos[i] += diff * 0.06;
            if (Math.abs(diff) > 0.01) allBack = false;
          }
          if (allBack) isExplodingRef.current = false;
        } else {
          isExplodingRef.current = false;
        }
      } else {
        // Normal gentle float
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;
      }

      // Mouse parallax on camera
      camera.position.x += (mouseRef.current.x - camera.position.x) * 0.04;
      camera.position.y += (-mouseRef.current.y - camera.position.y) * 0.04;

      geo.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100svh",
        minHeight: "640px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* Slide backgrounds */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          width: `${slides.length * 100}%`,
          height: "100%",
          transform: `translateX(-${(current * 100) / slides.length}%)`,
          transition: "transform 0.9s cubic-bezier(0.77,0,0.175,1)",
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            style={{
              position: "relative",
              width: `${100 / slides.length}%`,
              height: "100%",
              flexShrink: 0,
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority={slide.id === 0}
            />
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
          </div>
        ))}
      </div>

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "110px",
          paddingBottom: "52px",
          paddingLeft: "24px",
          paddingRight: "24px",
          textAlign: "center",
        }}
      >
        {/* Tag */}
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {slides[current].tag}
        </p>

        {/* Title + Subtitle */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            maxWidth: "900px",
            width: "100%",
          }}
        >
          <h1
            key={`title-${current}`}
            className="animate-fadeInUp"
            style={{
              fontSize: "clamp(2.2rem, 6.5vw, 5rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {slides[current].title}
          </h1>
          <p
            key={`sub-${current}`}
            className="animate-fadeInUp"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "500px",
              lineHeight: 1.7,
            }}
          >
            {slides[current].subtitle}
          </p>
        </div>

        {/* Bottom Controls */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            width: "100%",
          }}
        >
          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              width: "100%",
            }}
          >
            <Link
              href={slides[current].cta1.href}
              style={{
                background: "#fff",
                color: "#000",
                fontWeight: 700,
                fontSize: "14px",
                padding: "18px 44px",
                borderRadius: "999px",
                textDecoration: "none",
                minWidth: "200px",
                textAlign: "center",
              }}
            >
              {slides[current].cta1.label}
            </Link>
            <Link
              href={slides[current].cta2.href}
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                padding: "18px 44px",
                borderRadius: "999px",
                textDecoration: "none",
                minWidth: "200px",
                textAlign: "center",
              }}
            >
              {slides[current].cta2.label}
            </Link>
          </div>

          {/* Arrows + Dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={prev}
              aria-label="Previous"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    width: i === current ? "28px" : "7px",
                    height: "7px",
                    background: i === current ? "#fff" : "rgba(255,255,255,0.25)",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.2)",
                background: "transparent",
                color: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Progress bars */}
          <div style={{ display: "flex", gap: "6px", width: "200px" }}>
            {slides.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={
                    i === current
                      ? { animation: "progress 5s linear forwards", background: "#fff", height: "100%" }
                      : i < current
                      ? { width: "100%", background: "#fff", opacity: 0.3, height: "100%" }
                      : { width: "0%", height: "100%" }
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}