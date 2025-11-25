"use client";
import { useState, useEffect } from "react";

interface SlideType {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  img: string;
}

const slides: SlideType[] = [
  {
    title: "NEW SEASON",
    subtitle: "FASHION SALE",
    description: "Browse our new collection and find your next favorite outfit.",
    buttonText: "Shop Now",
    img: "/banner.png",
  },
  {
    title: "SUMMER COLLECTION",
    subtitle: "HOT DEALS",
    description: "Discover trendy summer outfits at amazing discounts.",
    buttonText: "Explore",
    img: "/lm101.jpg",
  },
  {
    title: "WINTER ARRIVALS",
    subtitle: "STAY WARM",
    description: "New jackets, hoodies & more winter essentials now available.",
    buttonText: "Buy Now",
    img: "/lm110.jpg",
  },
];

const Hero = ({ setCurrentPage }: any) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[35vh] sm:h-[50vh] md:h-[92vh] overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out 
            ${index === currentSlide ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          style={{
            backgroundImage: `url(${slide.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 h-full flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 md:px-12">
            <h3 className="text-sm sm:text-base md:text-lg mb-2 sm:mb-3 text-white">
              {slide.title}
            </h3>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-[#D4AF37]">
              {slide.subtitle}
            </h1>

            <p className="max-w-xl text-xs sm:text-sm md:text-lg mb-4 sm:mb-6 text-white">
              {slide.description}
            </p>

            <button
              onClick={() => setCurrentPage("shop")}
              className="bg-gray-700 text-[#D4AF37] py-2 sm:py-3 px-6 sm:px-8 rounded-md hover:text-white transition"
            >
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-3 w-3 rounded-full cursor-pointer transition 
              ${i === currentSlide ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
