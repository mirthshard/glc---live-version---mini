/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import type { AmbienceMode } from '../utils/audioSynthesizer';

export type LuxuryThemeMode = 'mayfair-heritage' | 'nocturne-stealth' | 'white-tie';

interface AmbienceContextType {
  isPlaying: boolean;
  mode: AmbienceMode;
  volume: number;
  theme: LuxuryThemeMode;
  togglePlay: () => void;
  setAmbienceMode: (mode: AmbienceMode) => void;
  setVolume: (vol: number) => void;
  setTheme: (theme: LuxuryThemeMode) => void;
}

const AmbienceContext = createContext<AmbienceContextType | undefined>(undefined);

type AudioSynthesizerModule = typeof import('../utils/audioSynthesizer');

export const AmbienceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<AmbienceMode>('hearth');
  const [volume, setVolumeState] = useState(0.45);
  const synthRef = useRef<AudioSynthesizerModule['audioSynthesizer'] | null>(null);
  const [theme, setThemeState] = useState<LuxuryThemeMode>('mayfair-heritage');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('tglc_theme_remix');
      if (stored === 'nocturne-stealth' || stored === 'white-tie' || stored === 'mayfair-heritage') {
        setThemeState(stored);
      }
    } catch (_) {}
  }, []);

  const setTheme = (newTheme: LuxuryThemeMode) => {
    setThemeState(newTheme);
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('tglc_theme_remix', newTheme);
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.remove('theme-mayfair-heritage', 'theme-nocturne-stealth', 'theme-white-tie');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const loadSynthesizer = async () => {
    if (!synthRef.current) {
      const mod = await import('../utils/audioSynthesizer');
      synthRef.current = mod.audioSynthesizer;
    }
    return synthRef.current;
  };

  const togglePlay = () => {
    if (isPlaying) {
      synthRef.current?.stop();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      loadSynthesizer()
        .then((synth) => {
          synth.start(mode, volume);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  };

  const setAmbienceMode = (newMode: AmbienceMode) => {
    setMode(newMode);
    if (isPlaying) {
      loadSynthesizer()
        .then((synth) => {
          synth.start(newMode, volume);
        })
        .catch(() => {});
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    synthRef.current?.setVolume(val);
  };

  return (
    <AmbienceContext.Provider
      value={{
        isPlaying,
        mode,
        volume,
        theme,
        togglePlay,
        setAmbienceMode,
        setVolume,
        setTheme,
      }}
    >
      {children}
    </AmbienceContext.Provider>
  );
};

export const useAmbience = () => {
  const context = useContext(AmbienceContext);
  if (!context) {
    throw new Error('useAmbience must be used within an AmbienceProvider');
  }
  return context;
};
