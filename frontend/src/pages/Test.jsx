import React, { useEffect } from "react";
import gsap from "gsap";

const Test = () => {
  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".title", {
      y: -50,
      opacity: 0,
      duration: 1,
    })
      .from(".subtitle", {
        y: 50,
        opacity: 0,
        duration: 1,
      })
      .from(".btn", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
      });
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="title text-4xl font-bold mb-4">Welcome to My Website</h1>

      <p className="subtitle text-lg text-gray-600 mb-6">
        Learn GSAP Animation Easily 🚀
      </p>

      <button className="btn px-6 py-3 bg-blue-500 text-white rounded-lg">
        Get Started
      </button>
    </div>
  );
};

export default Test;
