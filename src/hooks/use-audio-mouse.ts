"use client";
import { useEffect, useRef, useState } from "react";

// Global mute state to persist across component remounts
let globalIsMuted = false;

export function useAudioMouse() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(globalIsMuted);

  useEffect(() => {
    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Create oscillator for continuous harmonic hum
        oscillatorRef.current = audioContextRef.current.createOscillator();
        oscillatorRef.current.type = "sine";
        oscillatorRef.current.frequency.setValueAtTime(220, audioContextRef.current.currentTime); // A3 note

        // Create gain node for volume control
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.setValueAtTime(0.08, audioContextRef.current.currentTime); // Subtle volume

        // Create stereo panner for left-right positioning
        pannerRef.current = audioContextRef.current.createStereoPanner();
        pannerRef.current.pan.setValueAtTime(0, audioContextRef.current.currentTime);

        // Create filter for harmonic richness
        filterRef.current = audioContextRef.current.createBiquadFilter();
        filterRef.current.type = "lowpass";
        filterRef.current.frequency.setValueAtTime(2000, audioContextRef.current.currentTime);
        filterRef.current.Q.setValueAtTime(1, audioContextRef.current.currentTime);

        // Connect nodes: oscillator -> filter -> panner -> gain -> destination
        oscillatorRef.current.connect(filterRef.current);
        filterRef.current.connect(pannerRef.current);
        pannerRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(audioContextRef.current.destination);

        // Start oscillator
        oscillatorRef.current.start();

        setIsInitialized(true);

        // Remove listener after initialization
        document.removeEventListener("mousemove", initAudio);
        document.removeEventListener("click", initAudio);
      }
    };

    // Wait for user interaction before initializing audio
    document.addEventListener("mousemove", initAudio, { once: true });
    document.addEventListener("click", initAudio, { once: true });

    return () => {
      document.removeEventListener("mousemove", initAudio);
      document.removeEventListener("click", initAudio);
    };
  }, []);

  const updateSound = (x: number, y: number, screenWidth: number, screenHeight: number) => {
    if (!audioContextRef.current || !oscillatorRef.current || !gainNodeRef.current || !pannerRef.current || !filterRef.current || !isInitialized || isMuted) {
      return;
    }

    const currentTime = audioContextRef.current.currentTime;

    // Calculate distance from center (0 to 1, where 0 is center)
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    const dx = (x - centerX) / (screenWidth / 2);
    const dy = (y - centerY) / (screenHeight / 2);
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    const normalizedDistance = Math.min(distanceFromCenter, 1);

    // Use pentatonic scale for more melodic sound
    // A minor pentatonic: A, C, D, E, G (frequencies: 220, 261.63, 293.66, 329.63, 392)
    const pentatonicScale = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99];

    // Map vertical position to pentatonic scale notes
    const normalizedY = y / screenHeight;
    const scaleIndex = Math.floor((1 - normalizedY) * (pentatonicScale.length - 1)); // Inverted so top is higher
    const targetFreq = pentatonicScale[scaleIndex];

    // Smooth transition between notes
    oscillatorRef.current.frequency.setTargetAtTime(targetFreq, currentTime, 0.15);

    // Pan: left to right based on horizontal position
    const normalizedX = (x / screenWidth) * 2 - 1; // -1 to 1
    pannerRef.current.pan.setTargetAtTime(normalizedX, currentTime, 0.05);

    // Volume: quieter when far from center, louder when closer
    const volumeMultiplier = 1 - (normalizedDistance * 0.7); // Reduce volume by up to 70% when far
    const volume = 0.1 * volumeMultiplier; // Slightly increased volume for better presence
    gainNodeRef.current.gain.setTargetAtTime(volume, currentTime, 0.1);

    // Filter: brighter (higher cutoff) near center, darker when far
    const filterFreq = 1000 + (1 - normalizedDistance) * 2500; // 1000Hz to 3500Hz
    filterRef.current.frequency.setTargetAtTime(filterFreq, currentTime, 0.1);
  };

  const playPianoNote = (note: "C4" | "D4" | "E4" | "F4" | "G4" | "A4" | "B4" | "C5" | "D5" | "E5") => {
    if (!audioContextRef.current || !isInitialized || isMuted) return;

    const noteFrequencies = {
      C4: 261.63,
      D4: 293.66,
      E4: 329.63,
      F4: 349.23,
      G4: 392.00,
      A4: 440.00,
      B4: 493.88,
      C5: 523.25,
      D5: 587.33,
      E5: 659.25,
    };

    const currentTime = audioContextRef.current.currentTime;

    // Create a separate oscillator for the piano note
    const noteOsc = audioContextRef.current.createOscillator();
    noteOsc.type = "triangle"; // Triangle wave sounds more piano-like
    noteOsc.frequency.setValueAtTime(noteFrequencies[note], currentTime);

    // Create gain for the note with envelope
    const noteGain = audioContextRef.current.createGain();
    noteGain.gain.setValueAtTime(0, currentTime);
    noteGain.gain.linearRampToValueAtTime(0.15, currentTime + 0.01); // Quick attack
    noteGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.5); // Decay

    // Add some harmonics with a second oscillator
    const harmOsc = audioContextRef.current.createOscillator();
    harmOsc.type = "sine";
    harmOsc.frequency.setValueAtTime(noteFrequencies[note] * 2, currentTime); // Octave above

    const harmGain = audioContextRef.current.createGain();
    harmGain.gain.setValueAtTime(0, currentTime);
    harmGain.gain.linearRampToValueAtTime(0.05, currentTime + 0.01);
    harmGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.2);

    // Connect and play
    noteOsc.connect(noteGain);
    noteGain.connect(audioContextRef.current.destination);

    harmOsc.connect(harmGain);
    harmGain.connect(audioContextRef.current.destination);

    noteOsc.start(currentTime);
    noteOsc.stop(currentTime + 1.5);

    harmOsc.start(currentTime);
    harmOsc.stop(currentTime + 1.2);
  };

  const toggleMute = () => {
    globalIsMuted = !globalIsMuted;
    setIsMuted(globalIsMuted);

    // If muting, set volume to 0 immediately
    if (globalIsMuted && gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    }
  };

  return { updateSound, playPianoNote, isInitialized, isMuted, toggleMute };
}