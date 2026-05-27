export const ease = [0.25, 0.46, 0.45, 0.94] as const;

export const blurSlideUp = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 28 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.7, ease } },
};

export const blurSlideUpFast = {
  hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
  visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.5, ease } },
};

export const imageEntrance = {
  hidden: { scale: 0.92, opacity: 0, filter: 'blur(10px)' },
  visible: { scale: 1, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] as const } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: { y: -7, scale: 1.018, transition: { type: 'spring', stiffness: 300, damping: 22 } },
};

export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.97 },
  transition: { type: 'spring', stiffness: 400, damping: 20 },
};
