"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

export default function VideoShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // HD 1080p video bebas lisensi
  const videoUrl =
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current?.play();
            setIsPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.5 } // autoplay kalau 50% terlihat
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative mx-auto max-w-6xl h-[550px] rounded-3xl overflow-hidden shadow-xl bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Overlay Card */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-6 bottom-8 max-w-md bg-black/40 backdrop-blur-md p-6 rounded-xl text-white"
      >
        <p className="text-sm leading-relaxed">
          Through Journals, we provide a collection of ready-to-use market
          templates that are designed with precision for Entrepreneurs,
          Startups, Freelancers, Students, Brand, and Fashion experts to deliver
          meaningful stories. Each journal is a time capsule that transforms
          market data into powerful, well-designed insights that preserve unique
          narratives and simplify the complex.
        </p>
        <button className="mt-4 px-5 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition">
          Read more
        </button>
      </motion.div>

      {/* Play/Pause Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="absolute bottom-8 right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-md"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-black" />
        ) : (
          <Play className="w-6 h-6 text-black" />
        )}
      </motion.button>
    </section>
  );
}
