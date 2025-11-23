"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

// Check if device is mobile
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
};

interface AudioContextType {
  updateSound: (x: number, y: number, screenWidth: number, screenHeight: number) => void;
  playPianoNote: (note: "C4" | "D4" | "E4" | "F4" | "G4" | "A4" | "B4" | "C5" | "D5" | "E5") => void;
  isMuted: boolean;
  toggleMute: () => void;
  isInitialized: boolean;
  getFrequencyData: () => Uint8Array;
}

const AudioContextReact = createContext<AudioContextType | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioContextRef = useRef<globalThis.AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Backing track elements
  const bassOscRef = useRef<OscillatorNode | null>(null);
  const bassGainRef = useRef<GainNode | null>(null);
  const padOscRef = useRef<OscillatorNode | null>(null);
  const pad2OscRef = useRef<OscillatorNode | null>(null);
  const pad3OscRef = useRef<OscillatorNode | null>(null);
  const padGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentChordRef = useRef<number>(0);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Chord progression: Am - F - C - G
  const chordProgression = [
    { root: 220, notes: [220, 261.63, 329.63] }, // Am (A, C, E)
    { root: 174.61, notes: [174.61, 220, 261.63] }, // F (F, A, C)
    { root: 130.81, notes: [130.81, 164.81, 196] }, // C (C, E, G)
    { root: 196, notes: [196, 246.94, 293.66] }, // G (G, B, D)
  ];

  useEffect(() => {
    // Don't initialize audio on mobile devices for performance
    if (isMobileDevice()) {
      return;
    }

    // Initialize audio context on first user interaction
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();

        // Master gain for overall volume control
        masterGainRef.current = audioContextRef.current.createGain();
        masterGainRef.current.gain.setValueAtTime(0.7, audioContextRef.current.currentTime);
        masterGainRef.current.connect(audioContextRef.current.destination);

        // Create oscillator for mouse-controlled melody
        oscillatorRef.current = audioContextRef.current.createOscillator();
        oscillatorRef.current.type = "sine";
        oscillatorRef.current.frequency.setValueAtTime(220, audioContextRef.current.currentTime);

        // Create gain node for melody volume control
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.gain.setValueAtTime(0.08, audioContextRef.current.currentTime);

        // Create stereo panner for left-right positioning
        pannerRef.current = audioContextRef.current.createStereoPanner();
        pannerRef.current.pan.setValueAtTime(0, audioContextRef.current.currentTime);

        // Create filter for harmonic richness
        filterRef.current = audioContextRef.current.createBiquadFilter();
        filterRef.current.type = "lowpass";
        filterRef.current.frequency.setValueAtTime(2000, audioContextRef.current.currentTime);
        filterRef.current.Q.setValueAtTime(1, audioContextRef.current.currentTime);

        // Create analyser for visualizer
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256;
        analyserRef.current.smoothingTimeConstant = 0.8;

        // Connect melody chain to master through analyser
        oscillatorRef.current.connect(filterRef.current);
        filterRef.current.connect(pannerRef.current);
        pannerRef.current.connect(gainNodeRef.current);
        gainNodeRef.current.connect(analyserRef.current);
        analyserRef.current.connect(masterGainRef.current);

        // Create bass line
        bassOscRef.current = audioContextRef.current.createOscillator();
        bassOscRef.current.type = "triangle";
        bassOscRef.current.frequency.setValueAtTime(chordProgression[0].root / 2, audioContextRef.current.currentTime);

        bassGainRef.current = audioContextRef.current.createGain();
        bassGainRef.current.gain.setValueAtTime(0.06, audioContextRef.current.currentTime);

        bassOscRef.current.connect(bassGainRef.current);
        bassGainRef.current.connect(analyserRef.current);
        bassGainRef.current.connect(masterGainRef.current);

        // Create pad (3 oscillators for richer sound)
        padOscRef.current = audioContextRef.current.createOscillator();
        padOscRef.current.type = "sawtooth";
        padOscRef.current.frequency.setValueAtTime(chordProgression[0].notes[0], audioContextRef.current.currentTime);

        pad2OscRef.current = audioContextRef.current.createOscillator();
        pad2OscRef.current.type = "sawtooth";
        pad2OscRef.current.frequency.setValueAtTime(chordProgression[0].notes[1], audioContextRef.current.currentTime);

        pad3OscRef.current = audioContextRef.current.createOscillator();
        pad3OscRef.current.type = "sawtooth";
        pad3OscRef.current.frequency.setValueAtTime(chordProgression[0].notes[2], audioContextRef.current.currentTime);

        padGainRef.current = audioContextRef.current.createGain();
        padGainRef.current.gain.setValueAtTime(0.02, audioContextRef.current.currentTime);

        // Add filter for pad warmth
        const padFilter = audioContextRef.current.createBiquadFilter();
        padFilter.type = "lowpass";
        padFilter.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
        padFilter.Q.setValueAtTime(0.7, audioContextRef.current.currentTime);

        padOscRef.current.connect(padFilter);
        pad2OscRef.current.connect(padFilter);
        pad3OscRef.current.connect(padFilter);
        padFilter.connect(padGainRef.current);
        padGainRef.current.connect(analyserRef.current);
        padGainRef.current.connect(masterGainRef.current);

        // Start all oscillators
        oscillatorRef.current.start();
        bassOscRef.current.start();
        padOscRef.current.start();
        pad2OscRef.current.start();
        pad3OscRef.current.start();

        // Start beat pattern (75 BPM = 800ms per beat)
        const bpm = 75;
        const beatDuration = (60 / bpm) * 1000;

        let beatCount = 0;
        beatIntervalRef.current = setInterval(() => {
          if (!audioContextRef.current) return;
          const currentTime = audioContextRef.current.currentTime;

          // Change chord every 8 beats (2 bars)
          if (beatCount % 8 === 0) {
            currentChordRef.current = Math.floor(beatCount / 8) % 4;
            const chord = chordProgression[currentChordRef.current];

            // Update bass
            if (bassOscRef.current) {
              bassOscRef.current.frequency.setTargetAtTime(chord.root / 2, currentTime, 0.1);
            }

            // Update pad
            if (padOscRef.current && pad2OscRef.current && pad3OscRef.current) {
              padOscRef.current.frequency.setTargetAtTime(chord.notes[0], currentTime, 0.2);
              pad2OscRef.current.frequency.setTargetAtTime(chord.notes[1], currentTime, 0.2);
              pad3OscRef.current.frequency.setTargetAtTime(chord.notes[2], currentTime, 0.2);
            }
          }

          // Kick drum on beats 1 and 3
          if (beatCount % 4 === 0 || beatCount % 4 === 2) {
            playKick(currentTime);
          }

          // Snare on beats 2 and 4
          if (beatCount % 4 === 1 || beatCount % 4 === 3) {
            playSnare(currentTime);
          }

          // Hi-hat on every beat
          playHiHat(currentTime);

          beatCount++;
        }, beatDuration);

        setIsInitialized(true);

        // Remove listeners
        document.removeEventListener("mousemove", initAudio);
        document.removeEventListener("click", initAudio);
      }
    };

    const playKick = (startTime: number) => {
      if (!audioContextRef.current || !analyserRef.current || !masterGainRef.current) return;

      const osc = audioContextRef.current.createOscillator();
      const gain = audioContextRef.current.createGain();

      osc.frequency.setValueAtTime(150, startTime);
      osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      gain.gain.setValueAtTime(0.4, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

      osc.connect(gain);
      gain.connect(analyserRef.current);
      gain.connect(masterGainRef.current);

      osc.start(startTime);
      osc.stop(startTime + 0.5);
    };

    const playSnare = (startTime: number) => {
      if (!audioContextRef.current || !analyserRef.current || !masterGainRef.current) return;

      const noise = audioContextRef.current.createBufferSource();
      const buffer = audioContextRef.current.createBuffer(1, audioContextRef.current.sampleRate * 0.2, audioContextRef.current.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      noise.buffer = buffer;

      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(1000, startTime);

      const gain = audioContextRef.current.createGain();
      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(analyserRef.current);
      gain.connect(masterGainRef.current);

      noise.start(startTime);
      noise.stop(startTime + 0.2);
    };

    const playHiHat = (startTime: number) => {
      if (!audioContextRef.current || !analyserRef.current || !masterGainRef.current) return;

      const noise = audioContextRef.current.createBufferSource();
      const buffer = audioContextRef.current.createBuffer(1, audioContextRef.current.sampleRate * 0.05, audioContextRef.current.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      noise.buffer = buffer;

      const filter = audioContextRef.current.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.setValueAtTime(7000, startTime);

      const gain = audioContextRef.current.createGain();
      gain.gain.setValueAtTime(0.05, startTime);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(analyserRef.current);
      gain.connect(masterGainRef.current);

      noise.start(startTime);
      noise.stop(startTime + 0.05);
    };

    document.addEventListener("mousemove", initAudio, { once: true });
    document.addEventListener("click", initAudio, { once: true });

    return () => {
      if (beatIntervalRef.current) {
        clearInterval(beatIntervalRef.current);
      }
      document.removeEventListener("mousemove", initAudio);
      document.removeEventListener("click", initAudio);
    };
  }, []);

  const updateSound = (x: number, y: number, screenWidth: number, screenHeight: number) => {
    if (!audioContextRef.current || !oscillatorRef.current || !gainNodeRef.current || !pannerRef.current || !filterRef.current || !isInitialized || isMuted) {
      return;
    }

    const currentTime = audioContextRef.current.currentTime;

    // Calculate distance from center
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;
    const dx = (x - centerX) / (screenWidth / 2);
    const dy = (y - centerY) / (screenHeight / 2);
    const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
    const normalizedDistance = Math.min(distanceFromCenter, 1);

    // Get current chord to align melody
    const currentChord = chordProgression[currentChordRef.current];

    // Use pentatonic scale that fits the current chord
    // A minor pentatonic works over all these chords
    const pentatonicScale = [220, 261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99];

    const normalizedY = y / screenHeight;
    const scaleIndex = Math.floor((1 - normalizedY) * (pentatonicScale.length - 1));
    const targetFreq = pentatonicScale[scaleIndex];

    oscillatorRef.current.frequency.setTargetAtTime(targetFreq, currentTime, 0.15);

    // Pan
    const normalizedX = (x / screenWidth) * 2 - 1;
    pannerRef.current.pan.setTargetAtTime(normalizedX, currentTime, 0.05);

    // Volume - slightly reduced to blend with backing track
    const volumeMultiplier = 1 - (normalizedDistance * 0.7);
    const volume = 0.08 * volumeMultiplier;
    gainNodeRef.current.gain.setTargetAtTime(volume, currentTime, 0.1);

    // Filter
    const filterFreq = 1000 + (1 - normalizedDistance) * 2500;
    filterRef.current.frequency.setTargetAtTime(filterFreq, currentTime, 0.1);
  };

  const playPianoNote = (note: "C4" | "D4" | "E4" | "F4" | "G4" | "A4" | "B4" | "C5" | "D5" | "E5") => {
    if (!audioContextRef.current || !isInitialized || isMuted || !analyserRef.current || !masterGainRef.current) return;

    // A minor pentatonic scale: A, C, D, E, G (matches our backing track)
    const pentatonicNotes = {
      C4: 220,    // A3
      D4: 261.63, // C4
      E4: 293.66, // D4
      F4: 329.63, // E4
      G4: 392.00, // G4
      A4: 440.00, // A4
      B4: 523.25, // C5
      C5: 587.33, // D5
      D5: 659.25, // E5
      E5: 783.99, // G5
    };

    const currentTime = audioContextRef.current.currentTime;

    const noteOsc = audioContextRef.current.createOscillator();
    noteOsc.type = "triangle";
    noteOsc.frequency.setValueAtTime(pentatonicNotes[note], currentTime);

    const noteGain = audioContextRef.current.createGain();
    noteGain.gain.setValueAtTime(0, currentTime);
    noteGain.gain.linearRampToValueAtTime(0.12, currentTime + 0.01);
    noteGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.5);

    const harmOsc = audioContextRef.current.createOscillator();
    harmOsc.type = "sine";
    harmOsc.frequency.setValueAtTime(pentatonicNotes[note] * 2, currentTime);

    const harmGain = audioContextRef.current.createGain();
    harmGain.gain.setValueAtTime(0, currentTime);
    harmGain.gain.linearRampToValueAtTime(0.04, currentTime + 0.01);
    harmGain.gain.exponentialRampToValueAtTime(0.001, currentTime + 1.2);

    // Connect to analyser AND master gain
    noteOsc.connect(noteGain);
    noteGain.connect(analyserRef.current);
    noteGain.connect(masterGainRef.current);

    harmOsc.connect(harmGain);
    harmGain.connect(analyserRef.current);
    harmGain.connect(masterGainRef.current);

    noteOsc.start(currentTime);
    noteOsc.stop(currentTime + 1.5);

    harmOsc.start(currentTime);
    harmOsc.stop(currentTime + 1.2);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);

    if (!isMuted && masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    } else if (isMuted && masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.setValueAtTime(0.7, audioContextRef.current.currentTime);
    }
  };

  const getFrequencyData = (): Uint8Array => {
    if (!analyserRef.current) {
      return new Uint8Array(0);
    }
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);
    return dataArray;
  };

  return (
    <AudioContextReact.Provider value={{ updateSound, playPianoNote, isMuted, toggleMute, isInitialized, getFrequencyData }}>
      {children}
    </AudioContextReact.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContextReact);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};
