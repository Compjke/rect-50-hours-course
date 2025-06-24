import { useEffect, useRef, useState, useCallback } from "react";
import { Maximize, Minimize } from "lucide-react";

type Props = {
  src: string;
  alt: string;
};

export const FullscreenImageViewer = ({ src, alt }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center ${
        isFullscreen ? "bg-black" : ""
      }`}
    >
      <img
        src={src}
        alt={alt}
        width={500}
        height={500}
        loading="lazy"
        className={`rounded-lg shadow-md transition-all duration-300 object-contain ${
          isFullscreen ? "w-full h-full" : "w-full h-full"
        }`}
      />
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-50"
      >
        {isFullscreen ? (
          <Minimize className="text-white w-5 h-5" />
        ) : (
          <Maximize className="text-white w-5 h-5" />
        )}
      </button>
    </div>
  );
};