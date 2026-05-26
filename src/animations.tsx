import {  type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [
  0.22,
  1,
  0.36,
  1,
];

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.8,
      ease: smoothEase,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};