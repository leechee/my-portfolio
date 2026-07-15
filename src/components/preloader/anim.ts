export const slideUp = {
  initial: {
    transform: 'translateY(0)'
  },
  exit: {
    transform: 'translateY(-100vh)',
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
  }
};