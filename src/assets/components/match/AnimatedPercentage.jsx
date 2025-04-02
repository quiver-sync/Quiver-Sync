import React, { useEffect, useState } from "react";

const AnimatedPercentage = ({ value, duration = 800 }) => {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let current = 0;
      const steps = Math.floor(duration / 10);
      const increment = value / steps;
  
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(Math.round(value));
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, 30);
  
      return () => clearInterval(interval);
    }, [value]);
  
    return (
      <span
        className="text-white bg-sky-600 px-3 py-1 text-sm rounded-full font-semibold shadow transition-all duration-300"
        aria-label={`Match score: ${count}%`}
      >
        {count}%
      </span>
    );
  };

  export default AnimatedPercentage;