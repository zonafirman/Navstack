// components/Hero.tsx
"use client";

import { Poppins } from "next/font/google";
import { motion } from "framer-motion";
import { Layers, Rocket, Palette } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export default function Hero() {
  const stats = [
    { icon: <Layers size={24} />, value: "200+", label: "Templates" },
    { icon: <Rocket size={24} />, value: "Fast", label: "Responsive" },
    { icon: <Palette size={24} />, value: "Custom", label: "Designs" },
  ];

  return (
    <section
      className={clsx(
        poppins.className,
        "relative w-full min-h-screen overflow-hidden bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]",
        "grid lg:grid-cols-2 items-center px-4 sm:px-8 md:px-12 lg:px-16",
        "mt-16"
      )}
    >
      {/* Kolom Kiri: Konten Teks */}
      <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left py-20 lg:py-0">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full 
            bg-white/80 backdrop-blur-xl border border-gray-200 
            shadow-sm hover:shadow-blue-500/10 
            hover:border-blue-500/40 transition-all duration-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-blue-600 font-bold uppercase tracking-wide text-xs">
            New
          </span>
          <span className="text-gray-600 text-sm">This web built by YMW</span>
        </motion.div>

        {/* Title */}
        <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-blue-900">
          Let&apos;s start looking for <br className="hidden sm:block" /> your
          favorite template
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-xl text-gray-600 text-base md:text-lg leading-relaxed">
          Discover a vast library of ready-to-use navbar templates to accelerate
          your development and unlock your creative potential.
        </p>
        
        {/* Search Bar */}
        <div className="mt-8 w-full max-w-md relative">
          <input
            type="text"
            placeholder="Search templates..."
            aria-label="Search templates"
            className="w-full pl-5 pr-28 py-3.5 rounded-full bg-gray-50 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <button
            aria-label="Search"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 text-sm"
          >
            Search
          </button>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <button
            aria-label="Try for free"
            className="px-8 py-3.5 rounded-full bg-blue-600 text-white font-semibold text-base shadow-lg 
              hover:scale-105 hover:shadow-blue-500/30
              transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Try for free</span>
            <span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            ></span>
          </button>
          <button
            aria-label="Browse templates"
            className="px-8 py-3.5 rounded-full border border-gray-300 
              text-gray-800 font-medium text-base 
              hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
          >
            Search Templates
          </button>
        </motion.div>
      </div>

      {/* Kolom Kanan: Gambar */}
      <div className="relative hidden lg:flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-[500px] h-[500px] rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=2070&auto=format&fit=crop"
            alt="Abstract background image representing technology and design"
            fill
            className="object-cover"
            priority 
          />
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="lg:col-span-2 w-full pt-10 pb-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center space-y-2"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-900">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-10 text-center text-gray-500">
          Trusted by <span className="text-blue-900 font-semibold">10,000+</span> developers worldwide
        </p>
      </div>
    </section>
  );
}