import React from 'react';
import { motion } from 'motion/react';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  stagger = false,
  staggerDelay = 0.08,
}) => {
  if (stagger) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10% 0px' }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
}

export const RevealItem: React.FC<RevealItemProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: EASE_OUT },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
