// components/Footer.tsx
"use client";

import Image from "next/image";
import { FaInstagram, FaLinkedin, FaBehance } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const menu = ["Home", "Template", "Yofa - AI", "Playground"];
  const legal = ["Privacy Policy", "Terms of Service", "Contact"];

  return (
    <footer className="w-full text-gray-200 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Logo + Description + Menu */}
        <div>
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Navstack — build, design, and scale modern web solutions with ease.
          </p>

          {/* Menu kecil */}
          <div className="mt-6">
            <h4 className="text-white font-semibold mb-3 text-sm">Menu</h4>
            <ul className="space-y-1 text-sm">
              {menu.map((m) => (
                <li key={m}>
                  <a
                    href="#"
                    className="relative group hover:text-white/90 transition-colors"
                  >
                    {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center text-center">
          <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-gray-200 mb-4 leading-relaxed max-w-sm">
            Subscribe to our newsletter for updates, tips, and insights.
          </p>
          <form className="w-full max-w-sm flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-3 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-white text-[#1E3A8A] font-medium hover:bg-gray-100 transition"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social + Contact */}
        <div className="flex flex-col gap-6 lg:items-end lg:text-right">
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 text-2xl lg:justify-end">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-pink-400 hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Linkedin"
                className="hover:text-blue-200 hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                aria-label="Behance"
                className="hover:text-cyan-200 hover:scale-110 transition"
              >
                <FaBehance />
              </a>
            </div>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <h5 className="font-medium text-white">Business enquiries</h5>
              <a
                href="mailto:hi@formandfun.co"
                className="text-gray-200 hover:text-white transition"
              >
                hi@formandfun.co
              </a>
            </div>
            <div>
              <h5 className="font-medium text-white">Join our team</h5>
              <a
                href="mailto:apply@formandfun.co"
                className="text-gray-200 hover:text-white transition"
              >
                apply@formandfun.co
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Legal Links */}
        <ul className="flex flex-wrap gap-6 text-sm text-gray-200">
          {legal.map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-white transition">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Copyright */}
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} Navstack. All rights reserved.
        </p>
      </div>

      {/* Bottom Big Text with shimmer */}
      <div className="text-center py-24 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="relative text-[18vw] md:text-[20vw] font-bold tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-white/60 via-white to-white/60"
        >
          <motion.span
            animate={{ backgroundPosition: ["200% 50%", "-200% 50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="bg-gradient-to-r from-white via-gray-100 to-white bg-[length:200%_100%] bg-clip-text text-transparent inline-block"
          >
            Navstack<span className="align-top text-[2vw]">™</span>
          </motion.span>
        </motion.h1>
      </div>
    </footer>
  );
}
