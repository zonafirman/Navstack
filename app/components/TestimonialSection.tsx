// components/TestimonialSection.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Poppins } from "next/font/google";
import { ChevronLeft, ChevronRight, Pause, Play, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const testimonials = [
  {
    quote: "It saved my life and brought me back to myself",
    description:
      "Through Navstack, we provide a collection of ready-to-use navbar templates that can be integrated with various popular frameworks like Tailwind, Bootstrap, React, Vue, and standard HTML & CSS. Furthermore, we offer an AI Navbar Generator feature that allows anyone, both beginners and professionals, to create custom navbars with just one simple command.",
    image:
      "https://images.pexels.com/photos/1848565/pexels-photo-1848565.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Sarah Johnson",
    role: "UX Designer",
    rating: 5,
  },
  {
    quote: "This tool made my workflow 10x faster!",
    description:
      "I never thought creating navbars could be this easy. With Navstack, I can generate custom navbars in seconds and integrate them with any project seamlessly.",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Michael Carter",
    role: "Frontend Developer",
    rating: 4,
  },
  {
    quote: "A must-have for every developer!",
    description:
      "Navstack gave me pre-built navbar templates and an AI tool to generate unique ones. It saved me hours of repetitive coding.",
    image:
      "https://images.pexels.com/photos/3771835/pexels-photo-3771835.jpeg?auto=compress&cs=tinysrgb&w=800",
    author: "Emily Davis",
    role: "Software Engineer",
    rating: 5,
  },
];

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  // Auto-slide
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide]);

  return (
    <section
      className={`${poppins.className} relative w-full py-20 bg-[url('/bg-blur-green.jpg')] bg-cover bg-center overflow-hidden`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 px-6">
        {/* Text Section */}
        <div className="flex-1 text-black">
          <p className="text-sm mb-2 opacity-70">Client Testimonial</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 italic">
                “{testimonials[current].quote}”
              </h2>
              <p className="text-sm leading-relaxed opacity-90">
                {testimonials[current].description}
              </p>

              <div className="mt-4">
                <p className="font-medium">{testimonials[current].author}</p>
                <p className="text-xs opacity-70">{testimonials[current].role}</p>

                {/* Rating */}
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonials[current].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <button className="mt-6 px-5 py-2 rounded-xl bg-white text-[#1E3A8A] font-semibold shadow-lg hover:bg-blue-100 transition">
            Try Navstack Now
          </button>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonials[current].image}
              className="relative w-[300px] aspect-[3/4] rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={testimonials[current].image}
                alt={`Photo of ${testimonials[current].author}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center gap-6 mt-10">
        <button
          onClick={prevSlide}
          aria-label="Previous testimonial"
          className="w-10 h-10 flex items-center justify-center border border-[#1E3A8A] rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
        >
          <ChevronLeft className="text-[#1E3A8A]" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next testimonial"
          className="w-10 h-10 flex items-center justify-center border border-[#1E3A8A] rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
        >
          <ChevronRight className="text-[#1E3A8A]" />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
          className="w-10 h-10 flex items-center justify-center border border-[#1E3A8A] rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition"
        >
          {isPlaying ? (
            <Pause className="text-[#1E3A8A]" size={18} />
          ) : (
            <Play className="text-[#1E3A8A]" size={18} />
          )}
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {testimonials.map((_, i) => (
          <motion.span
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === current ? "bg-[#1E3A8A]" : "bg-[#537bea]"
            }`}
            animate={{
              scale: i === current ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          ></motion.span>
        ))}
      </div>
    </section>
  );
}
