"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface PageHeroProps {
  title: string;
  subtitle: string;
  background: string;
  image?: string;
  className?: string; // For container alignment
  titleMotionProps?: {
    initial?: Parameters<typeof motion.div>["0"]["initial"];
    animate?: Parameters<typeof motion.div>["0"]["animate"];
    transition?: Parameters<typeof motion.div>["0"]["transition"];
    className?: string; // For dynamic text size
  };
  subtitleMotionProps?: {
    initial?: Parameters<typeof motion.div>["0"]["initial"];
    animate?: Parameters<typeof motion.div>["0"]["animate"];
    transition?: Parameters<typeof motion.div>["0"]["transition"];
    className?: string; // For dynamic text size
  };
}

export default function PageHero({
  title,
  subtitle,
  background,
  image,
  className = "",
  titleMotionProps = {},
  subtitleMotionProps = {},
}: PageHeroProps) {
  return (
    <section className={`relative overflow-hidden h-screen flex items-center justify-center ${className}`}>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center">
        <Image src={background} alt={title} fill className="object-cover" priority />
      </div>

      {/* Sky Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-900 via-sky-900 to-sky-900 opacity-50 mix-blend-overlay"></div>

      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Content */}
      <div className="container text-center relative z-10 py-20">
        <motion.h1
          className={`text-5xl md:text-6xl font-bold text-white mb-6 ${titleMotionProps.className || ""}`}
          initial={titleMotionProps.initial || { opacity: 0, y: 30 }}
          animate={titleMotionProps.animate || { opacity: 1, y: 0 }}
          transition={titleMotionProps.transition || { duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className={`text-xl text-gray-200 max-w-3xl mx-auto ${subtitleMotionProps.className || ""}`}
          initial={subtitleMotionProps.initial || { opacity: 0, y: 20 }}
          animate={subtitleMotionProps.animate || { opacity: 1, y: 0 }}
          transition={subtitleMotionProps.transition || { duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>

        {/* Optional Image */}
        {image && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src={image}
              alt="Hero Visual"
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        )}
      </div>
    </section>
  );
}