"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import { motion } from "motion/react";

import { instrumentSerif } from "@/config/font";

import { Container } from "../common/Container";

const Hero = () => {
  const [image, setImage] = useState("/assets/logo.png");
  const audioRef = useRef(null);

  const handleClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    setImage((prev) =>
      prev === "/assets/logo.png" ? "/assets/mohan.jpeg" : "/assets/logo.png"
    );
  };
  return (
    <Container>
      <div className="relative">
        <div className="relative z-0 mx-auto my-5 h-80 w-3xl overflow-hidden rounded-2xl shadow-xl">
          <Image fill alt="Sukuna GIF" src={"/assets/sukuna.gif"} />
        </div>
        <motion.div
          className="absolute -bottom-15 left-10 z-10 flex size-35 items-end justify-center overflow-hidden rounded-full shadow-xl ring-5 ring-white dark:ring-black"
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="relative size-full"
            onClick={handleClick}
            animate={{ rotateY: image === "/assets/mohan.jpeg" ? 180 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src="/assets/logo.png"
              alt="Logo"
              fill
              className="rounded-full bg-[#8EC0E8] object-cover dark:bg-[#EEDA66]"
              style={{ backfaceVisibility: "hidden" }}
            />

            <Image
              src="/assets/mohan.jpeg"
              alt="Avatar"
              fill
              className="scale-150 rounded-full object-cover"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          <audio src="/assets/coinFlip.mp3" ref={audioRef} preload="auto" />
        </motion.div>
      </div>

      <div className="mt-20">
        <div className="flex items-center gap-3">
          <h1
            className={`${instrumentSerif.className} text-3xl font-bold italic`}
          >
            Mohan S P
          </h1>
          <span>
            <svg
              viewBox="0 0 24 24"
              className="ml-1 h-5 w-5 fill-current text-[#1D9BF0]"
              aria-label="Verified Account"
            >
              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.457.748 2.795 1.867 3.48-.05.19-.083.39-.083.595 0 2.21 1.71 3.998 3.818 3.998.47 0 .92-.084 1.336-.25.62 1.333 1.926 2.25 3.437 2.25s2.817-.917 3.437-2.25c.415.165.866.25 1.336.25 2.11 0 3.818-1.79 3.818-4 0-.205-.034-.405-.084-.595 1.12-.685 1.868-2.023 1.868-3.48zm-11.454 4.34l-3.32-3.32 1.415-1.415 1.905 1.905 4.775-4.775 1.415 1.415-6.19 6.19z"></path>
            </svg>
          </span>
        </div>
        <p className="text-neutral-500">
          Full Stack Developer · UI/UX Designer · Polymath
        </p>
        <p className="text-xl">Code, create, ship, repeat.</p>
      </div>
    </Container>
  );
};

export { Hero };
