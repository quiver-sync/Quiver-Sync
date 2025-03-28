import React, { useState, useEffect } from "react";

const images = [
  "https://www.escuelacantabradesurf.com/wp-content/uploads/2022/01/Aprende-a-surfear-en-Cantabria_resize-scaled.jpg",
  "https://static.wixstatic.com/media/a36029_2f3c760fdd07421aad131d63496a9311~mv2.jpg/v1/fill/w_980,h_651,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a36029_2f3c760fdd07421aad131d63496a9311~mv2.jpg",
  "https://www.surfer.com/.image/w_3840,q_auto:good,c_fill,ar_43:25/MjowMDAwMDAwMDAwMTIxNDg2/lexus-pipe-pro-presented-by-yeti-26.jpg",
  "https://cdn.outsideonline.com/wp-content/uploads/2018/02/28/mick-fanning-surfer-retires_s.jpg"
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mt-1 mx-auto">
      <div className="relative h-56 md:h-96 overflow-hidden rounded-2xl shadow-lg">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Surf slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dots */}
      <div className="absolute z-10 flex bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-3 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 text-black rounded-full px-3 py-2 shadow-md"
        aria-label="Previous Slide"
      >
        ❮
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 z-10 bg-white/60 hover:bg-white/90 text-black rounded-full px-3 py-2 shadow-md"
        aria-label="Next Slide"
      >
        ❯
      </button>
    </div>
  );
}

export default Carousel;
