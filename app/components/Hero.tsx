// components/Hero.tsx
"use client";

import { Poppins } from "next/font/google";
import { motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function Hero() {
  return (
    <section
      className={`${poppins.className} relative flex flex-col items-center justify-center text-center h-screen px-6 
         text-white overflow-hidden`}
    >
      <div className="relative z-10 flex flex-col items-center">
        {/* Badge with Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full 
            bg-white/10 backdrop-blur-xl border border-[#2563EB] 
            shadow-[0_0_15px_rgba(255,255,255,0.1)] text-xs md:text-sm font-medium 
            text-black hover:shadow-[#2563EB] 
            hover:border-[#2563EB] transition-all duration-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E3A8A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1E3A8A]"></span>
          </span>
          <span className="bg-[#2563EB] bg-clip-text text-transparent font-bold uppercase tracking-wide">
            New
          </span>
          <span className="text-black">This web build by YMW</span>
        </motion.div>

        {/* Title */}
        <h1
          className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl 
          bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] bg-clip-text text-transparent"
        >
          The best navbar <br /> for your project
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-gray-500 max-w-xl text-sm md:text-base leading-relaxed">
          Provides a navbar library for developers and maximizes your potential
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            className="px-8 py-3.5 rounded-full 
            bg-black text-white font-semibold text-sm md:text-base shadow-lg 
            hover:scale-105 hover:shadow-[#2563EB] 
            transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Try for free</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            ></span>
          </button>

          <button
            className="px-8 py-3.5 rounded-full border border-[#2563EB] 
            text-[#2563EB] font-medium text-sm md:text-base 
            hover:bg-[#1E3A8A] backdrop-blur-md transition-all duration-300
            hover:shadow-[#1E3A8A] hover:text-white"
          >
            Browse Templates
          </button>
        </motion.div>
      </div>
    </section>
  );
}
