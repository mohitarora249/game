"use client";
import { useState, useEffect } from "react";

type UseAudioOptions = {
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
};

/**
 * Custom hook that provides audio playback functionality.
 *
 * @param url - The URL of the audio file.
 * @param options - Optional configuration options for the audio playback.
 * @returns Object with audio control methods and current playback state.
 */
const useAudio = (url: string, options: UseAudioOptions = {}) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { autoPlay = false, loop = false, volume = 1 } = options;
  /**
   * Sets up the audio element and handles auto-playback.
   */
  useEffect(() => {
    const newAudio = new Audio(url);
    setAudio(newAudio);
    newAudio.src = url;
    newAudio.loop = loop;
    newAudio.volume = volume;

    if (autoPlay) {
      play();
    }

    // Cleanup function
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [url, loop, volume, autoPlay, audio]);

  /**
   * Starts playback of the audio.
   */
  const play = () => {
    if (audio) {
      audio.play();
      setIsPlaying(true);
    }
  };

  /**
   * Pauses the audio playback.
   */
  const pause = () => {
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  /**
   * Toggles between play and pause based on the current playback state.
   */
  const toggle = () => {
    if (isPlaying) pause();
    else play();
  };

  /**
   * Sets the volume of the audio.
   *
   * @param newVolume - The new volume value (between 0 and 1).
   */
  const setVolume = (newVolume: number) => {
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return {
    play,
    pause,
    toggle,
    setVolume,
    isPlaying,
  };
};

export default useAudio;
