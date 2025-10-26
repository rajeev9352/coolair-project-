import { Variants } from 'framer-motion';

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay = 0.2): Variants => {
  const distance = 30;
  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directionMap[direction],
      transition: {
        type: 'tween',
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeInOut',
        duration: 0.5,
        delay,
      },
    },
  };
};

export const scaleIn = (delay = 0.2): Variants => ({
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.5,
      delay,
    },
  },
});

export const rotateIn = (delay = 0.2): Variants => ({
  hidden: { 
    opacity: 0, 
    rotate: -10,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      delay,
    },
  },
});

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', delay = 0.2): Variants => {
  const distance = 100;
  const directionMap = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: distance },
    down: { y: -distance },
  };

  return {
    hidden: { 
      opacity: 0, 
      ...directionMap[direction],
      transition: {
        type: 'tween',
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.6,
        delay,
      },
    },
  };
};

export const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.03,
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 10,
  },
};

export const tapScale = {
  scale: 0.98,
};

// Scroll reveal animation
export const scrollReveal = {
  hidden: { 
    opacity: 0, 
    y: 50,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

// For text animations
export const textVariant = (delay = 0) => ({
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1.25,
      delay,
    },
  },
});

// For fade-in animations
export const fadeInVariant = (delay = 0) => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeInOut',
    },
  },
});

// For staggered children animations
export const staggerChildren = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});
