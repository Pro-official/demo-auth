"use client";

import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
// import GirlWithHeadphone from "@/public/GirlWithHeadphone.webp";
// import Image from "next/image";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cardHeight, setCardHeight] = useState(510);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <main
      className="min-h-screen relative overflow-hidden top-20"
      style={{ background: "#0f0016" }}
    >
      {/* Gradient Effects */}
      <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] opacity-30">
        <div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #30E3CA 0%, transparent 70%)",
            top: "20%",
            left: "20%",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, #f1c40f 0%, transparent 70%)",
            top: "40%",
            right: "20%",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#30E3CA] via-white to-[#f1c40f] text-transparent bg-clip-text">
            Listen, Learn & Love
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Find full or Summarized audiobooks. Access anytime, anywhere. Choose
            from more than 10,000 books.
          </p>
        </div>

        <NeonGradientCard className="max-w-sm mx-auto items-center justify-center text-center">
          <div className="max-w-sm mx-auto mx-auto bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/40">
            <div>
              {/* <Image src={`/GirlWithHeadphone.webp`} alt="A Tiger laying on the ground"  width="200" height="150"/> */}
              <img src='/GirlWithHeadphone.webp' alt="A Tiger laying on the ground" height="300" onLoad={(e) => setCardHeight(e.currentTarget.offsetHeight + 100)}/>
              <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            />
              <div className="flex items-center justify-between text-white/80 mt-4">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                onValueChange={handleSliderChange}
                className="my-2"
              />
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = Math.max(
                        0,
                        currentTime - 10
                      );
                    }
                  }}
                >
                  <SkipBack className="h-6 w-6" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="w-16 h-16 rounded-full border-2 border-[#30E3CA] hover:bg-[#30E3CA]/20"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-[#30E3CA]" />
                  ) : (
                    <Play className="h-8 w-8 text-[#30E3CA] ml-1" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/80 hover:text-white hover:bg-white/10"
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = Math.min(
                        duration,
                        currentTime + 10
                      );
                    }
                  }}
                >
                  <SkipForward className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </NeonGradientCard>
      </div>
    </main>
  );
}
