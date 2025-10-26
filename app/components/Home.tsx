import Image from "next/image";
import React from "react";
import NeonSign from "./NeonSign";


export default function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Catiray</h1>
     <NeonSign />
    </div>
  );
}