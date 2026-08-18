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
// Hard ceiling so a page can never hang on the curtain forever (e.g. a page
// that never mounts a Spline scene at all, or Spline failing to load). The
// normal path below always resolves well before this fires.
const MAX_WAIT_MS = 10000;

function Preloader({ children, disabled = false }: PreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [splineLoaded, setSplineLoadedState] = useState(false);
  const loadingTween = useRef<gsap.core.Tween>();
  const timerCompleted = useRef(false);
  // Mirrors `splineLoaded` in a ref so gating checks always read the latest
  // value instead of a value captured in a stale effect closure.
  const splineLoadedRef = useRef(false);
  const resolved = useRef(false);

  const setSplineLoaded = (loaded: boolean) => {
    splineLoadedRef.current = loaded;
    setSplineLoadedState(loaded);
  };

  const finishLoading = () => {
    if (resolved.current) return;
    resolved.current = true;
    loadingTween.current?.progress(0.99).kill();
    setLoadingPercent(100);
    setIsLoading(false);
  };

  // Only finishes once both the branding timer and Spline are ready, so the
  // curtain never lifts onto an unfinished scene.
  const bypassLoading = () => {
    if (timerCompleted.current && splineLoadedRef.current) {
      finishLoading();
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
        if (splineLoadedRef.current) finishLoading();
      },
    });

    const safety = setTimeout(finishLoading, MAX_WAIT_MS);
    return () => clearTimeout(safety);
  }, []);

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
