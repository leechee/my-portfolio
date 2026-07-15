"use client";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideUp } from "./anim";

export default function Index() {
  // Always start from the SSR fallback so the server-rendered markup matches
  // the client's first render pass; the effect below swaps in real dimensions
  // post-mount, after hydration has already succeeded.
  const [dimension, setDimension] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: targetPath,
      transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
    },
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      className={styles.introduction}
    >
      {dimension.width > 0 && (
        <>
          {/* Plain divs, not framer-motion driven: the CSS keyframes start running
              the instant this paints, and it needs to be visible immediately or
              the walk cycle runs invisibly for a while and gets caught mid-loop
              once a JS-driven fade-in finally reveals it. */}
          <div className={styles.loaderWrap}>
            <svg className={styles.ring} viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" />
            </svg>
            <div className={styles.loader} />
          </div>
          <svg>
            <motion.path
              variants={curve}
              initial="initial"
              exit="exit"
            ></motion.path>
          </svg>
        </>
      )}
    </motion.div>
  );
}