import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const rareTags = [
  "avant-garde",
  "krautrock",
  "shoegaze",
  "dream pop",
  "post-rock",
  "chamber pop",
  "idm",
  "noise rock",
  "math rock",
  "nu jazz",
  "dark ambient",
  "space rock",
  "folktronica",
  "psychedelic folk",
  "psychedelic rock",
  "drone",
  "tribal",
  "future garage",
  "vaporwave",
  "synthwave",
  "coldwave",
  "darkwave",
  "post-punk revival",
  "baroque pop",
  "lo-fi",
  "breakcore",
  "glitch",
  "electroacoustic",
  "minimalism",
  "neoclassical",
  "gothic rock",
  "industrial",
  "jangle pop",

  "post-minimalism",
];
