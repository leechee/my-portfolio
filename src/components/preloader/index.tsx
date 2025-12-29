"use client";
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useRef,
} from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "./loader";
import gsap from "gsap";

type PreloaderContextType = {
  isLoading: boolean;
  loadingPercent: number;
  bypassLoading: () => void;
  splineLoaded: boolean;
  setSplineLoaded: (loaded: boolean) => void;
};
const INITIAL: PreloaderContextType = {
  isLoading: true,
  loadingPercent: 0,
  bypassLoading: () => {},
  splineLoaded: false,
  setSplineLoaded: () => {},
};
export const preloaderContext = createContext<PreloaderContextType>(INITIAL);

type PreloaderProps = {
  children: ReactNode;
  disabled?: boolean;
};

export const usePreloader = () => {
  const context = useContext(preloaderContext);
  if (!context) {
    throw new Error("usePreloader must be used within a PreloaderProvider");
  }
  return context;
};
const LOADING_TIME = 1.67;
function Preloader({ children, disabled = false }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const loadingTween = useRef<gsap.core.Tween>();
  const timerCompleted = useRef(false);

  const bypassLoading = () => {
    // Only finish loading if both timer and Spline are ready
    if (timerCompleted.current && splineLoaded) {
      loadingTween.current?.progress(0.99).kill();
      setLoadingPercent(100);
      setIsLoading(false);
    }
  };

  const loadingPercentRef = useRef<{ value: number }>({ value: 0 });
  useEffect(() => {
    loadingTween.current = gsap.to(loadingPercentRef.current, {
      value: 100,
      duration: LOADING_TIME,
      ease: "slow(0.7,0.7,false)",
      onUpdate: () => {
        setLoadingPercent(loadingPercentRef.current.value);
      },
      onComplete: () => {
        timerCompleted.current = true;
        // Only finish if Spline is also loaded
        if (splineLoaded) {
          setIsLoading(false);
        }
      },
    });
  }, [splineLoaded]);

  // Effect to check if we can finish loading when Spline loads
  useEffect(() => {
    if (splineLoaded && timerCompleted.current) {
      setIsLoading(false);
    }
  }, [splineLoaded]);

  return (
    <preloaderContext.Provider
      value={{ isLoading, bypassLoading, loadingPercent, splineLoaded, setSplineLoaded }}
    >
      <AnimatePresence mode="wait">{isLoading && <Loader />}</AnimatePresence>
      {children}
    </preloaderContext.Provider>
  );
}

export default Preloader;
