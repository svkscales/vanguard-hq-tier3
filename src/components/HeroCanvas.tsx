"use client";
import { useEffect, useRef, useState } from "react";
import { MotionValue, useTransform } from "framer-motion";

export default function HeroCanvas({ progress }: { progress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const frameIndex = useTransform(progress, [0, 1], [0, 165]);

  useEffect(() => {
    const loaded: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    for (let i = 0; i < 166; i++) {
      const img = new Image();
      img.src = `/hero-sequence/frame_${i.toString().padStart(3, '0')}_delay-0.041s.jpg`;
      
      img.onload = () => {
        loadedCount++;
        // As soon as the first frame loads, trigger a render
        if (i === 0) setImagesLoaded(prev => !prev);
      };
      
      loaded.push(img);
    }
    
    // If the browser cached the image instantly, force the render flag
    if (loaded[0].complete) {
      setImagesLoaded(true);
    }
    
    setImages(loaded);
  }, []);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx || images.length === 0) return;

      const idx = Math.floor(frameIndex.get());
      const img = images[idx] || images[0];

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      // Do not draw if image lacks layout dims
      if (!img.width || !img.height) return;

      const imgRatio = img.width / img.height;
      const canvasRatio = window.innerWidth / window.innerHeight;
      let dW, dH, dX, dY;

      if (imgRatio > canvasRatio) {
        dH = window.innerHeight; dW = dH * imgRatio;
        dX = (window.innerWidth - dW) / 2; dY = 0;
      } else {
        dW = window.innerWidth; dH = dW / imgRatio;
        dX = 0; dY = (window.innerHeight - dH) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dX, dY, dW, dH);
    };

    const unsub = frameIndex.on("change", render);
    // Force initial render especially if imagesLoaded flag toggled
    render();
    window.addEventListener("resize", render);
    return () => { unsub(); window.removeEventListener("resize", render); };
  }, [images, frameIndex, imagesLoaded]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[2] object-cover brightness-[0.8] contrast-[1.1]" />;
}
