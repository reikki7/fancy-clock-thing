import React from "react";

const Clock = () => {
  const romanNumerals = ["XII", "III", "VI", "IX"];

  const radius = 38;
  const centerX = 50;
  const centerY = 50;
  const clockSize = 700;

  return (
    <div
      className="relative border-2 border-black rounded-full"
      style={{
        width: `${clockSize}px`,
        height: `${clockSize}px`,
        fontFamily: "Georgia, serif",
      }}
    >
      {romanNumerals.map((numeral, index) => {
        const angle =
          (index * (360 / romanNumerals.length) - 90) * (Math.PI / 180);
        const x = centerX + (radius + 7) * Math.cos(angle);
        const y = centerY + (radius + 7) * Math.sin(angle);
        const rotationAngle = index * (360 / romanNumerals.length);
        return (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-6 bg-black"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: `translate(0%, -0%) rotate(${rotationAngle}deg)`,
              clipPath: "polygon(50% 0%, 100% 30%, 50% 100%, 0% 30%)",
            }}
          ></div>
        );
      })}
      {romanNumerals.map((numeral, index) => {
        const angle =
          (index * (360 / romanNumerals.length) - 90) * (Math.PI / 180);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        return (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {numeral}
          </div>
        );
      })}
    </div>
  );
};

export default Clock;
