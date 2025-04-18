'use client';

import { motion } from 'framer-motion';
import { CustomFont } from './ui/custom-font';

export function AnimatedLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="flex items-center justify-center space-x-2"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM20 36C11.163 36 4 28.837 4 20C4 11.163 11.163 4 20 4C28.837 4 36 11.163 36 20C36 28.837 28.837 36 20 36Z"
            fill="currentColor"
          />
          <path
            d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 28C15.582 28 12 24.418 12 20C12 15.582 15.582 12 20 12C24.418 12 28 15.582 28 20C28 24.418 24.418 28 20 28Z"
            fill="currentColor"
          />
          <path
            d="M20 16C17.791 16 16 17.791 16 20C16 22.209 17.791 24 20 24C22.209 24 24 22.209 24 20C24 17.791 22.209 16 20 16Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>
      <CustomFont variant="h1" className="text-primary">
        Fit Track
      </CustomFont>
    </motion.div>
  );
} 