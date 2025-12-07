// components/AboutSection.tsx
"use client";

import { Poppins } from "next/font/google";
import { motion, Variants } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Container untuk stagger animasi
const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25, // jeda antar elemen
    },
  },
};

// Child animasi (fade + slide up + sedikit scale)
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }, // smooth ease-out
  },
};

export default function AboutSection() {
  return (
    <section
      className={`${poppins.className} relative w-full py-20 bg-[url('/bg-blur-green.jpg')] bg-cover bg-center`}
    >
      <div className="w-full px-6">
        {/* Bungkus dengan motion.div supaya stagger aktif */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }} // replay setiap kali muncul di layar
        >
          {/* Label kiri atas */}
          <motion.p
            variants={fadeInUp}
            className="text-xs text-gray-500 mb-8"
          >
            The Navstack
          </motion.p>

          {/* Teks utama */}
          <motion.p
            variants={fadeInUp}
            className="text-2xl md:text-5xl font-medium leading-snug text-black text-justify first:indent-12"
          >
            We believe that the navbar is not just a UI component, but rather the
            foundation of an effective and intuitive user experience.{" "}
            {/* Tombol */}
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-4 py-1.5 rounded-full bg-black text-white text-sm font-medium hover:bg-gray-900 transition ml-2 align-middle"
            >
              learn more
            </motion.button>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
