"use client";
import React from "react";
import { Music, VolumeX } from "lucide-react";
import { useAudio } from "@/contexts/audio-context";
import { cn } from "@/lib/utils";

function MusicToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { isMuted, toggleMute, isInitialized, getFrequencyData } = useAudio();
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number>();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted || !canvasRef.current || !isInitialized) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const frequencyData = getFrequencyData();
      const bufferLength = frequencyData.length;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMuted || bufferLength === 0) {
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      // Draw circular visualizer
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 35;
      const barCount = 32;

      // Use lower frequency bins for more visible movement
      const usefulBins = Math.min(64, bufferLength);

      for (let i = 0; i < barCount; i++) {
        // Map each bar to a specific frequency bin, focusing on lower frequencies
        const binIndex = Math.floor((i / barCount) * usefulBins);
        const value = frequencyData[binIndex] / 255;

        const angle = (i / barCount) * Math.PI * 2;
        const barHeight = value * 30;

        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius + barHeight);
        const y2 = centerY + Math.sin(angle) * (radius + barHeight);

        // Gradient color based on value
        const hue = 200 + value * 60;
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${0.3 + value * 0.7})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, isInitialized, isMuted, getFrequencyData]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed top-10 right-12 z-[1000]">
      <canvas
        ref={canvasRef}
        width={150}
        height={150}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <button
        onClick={toggleMute}
        className={cn(
          "relative",
          "p-3 rounded-full",
          "bg-white/80 dark:bg-black/80 backdrop-blur-sm",
          "border-2 border-slate-200 dark:border-slate-800",
          "hover:scale-110 transition-all duration-300",
          "shadow-lg hover:shadow-xl"
        )}
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        ) : (
          <Music className="w-5 h-5 text-slate-800 dark:text-white" />
        )}
      </button>
    </div>
  );
}

export default MusicToggle;
