"use client";

import { useEffect, useRef } from "react";

const featherMask =
  "linear-gradient(to right, transparent 0%, #000 10%, #000 90%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 9%, #000 98%, transparent 100%)";

/**
 * Background hero loop that keeps playing no matter what — it re-starts itself
 * if the browser ever pauses it (tab switch, battery saver, off-screen, iOS
 * low-power). Edges are feathered so the video blends into the page.
 */
export function HeroVideo({ fill = false }: { fill?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const play = () => {
      const p = video.play();
      if (p) p.catch(() => {});
    };

    play();
    const onPause = () => play();
    const onEnded = () => play();
    const onVisibility = () => {
      if (!document.hidden) play();
    };

    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    document.addEventListener("visibilitychange", onVisibility);
    // Safety net in case a frame stalls.
    const interval = window.setInterval(() => {
      if (video.paused) play();
    }, 2000);

    return () => {
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearInterval(interval);
    };
  }, []);

  if (fill) {
    return (
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        {/* biome-ignore lint/a11y/useMediaCaption: decorative, muted background loop */}
        <video
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/turnover-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/turnover.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={
        {
          WebkitMaskImage: featherMask,
          WebkitMaskComposite: "source-in",
          maskImage: featherMask,
          maskComposite: "intersect",
        } as React.CSSProperties
      }
    >
      {/* biome-ignore lint/a11y/useMediaCaption: decorative, muted background loop */}
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/turnover-poster.jpg"
        className="w-full object-cover"
        style={{ aspectRatio: "1280 / 674" }}
      >
        <source src="/turnover.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
