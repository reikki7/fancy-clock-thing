import React from "react";
import { Icon } from "@iconify/react";

const Clock = () => {
  const [time, setTime] = React.useState(new Date());
  const [continuousSeconds, setContinuousSeconds] = React.useState(() => {
    const now = new Date();
    return now.getSeconds();
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setContinuousSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const romanNumerals = [
    "XII",
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
  ];

  const zodiacIcons = [
    "mdi:zodiac-aries",
    "mdi:zodiac-taurus",
    "mdi:zodiac-gemini",
    "mdi:zodiac-cancer",
    "mdi:zodiac-leo",
    "mdi:zodiac-virgo",
    "mdi:zodiac-libra",
    "mdi:zodiac-scorpio",
    "mdi:zodiac-sagittarius",
    "mdi:zodiac-capricorn",
    "mdi:zodiac-aquarius",
    "mdi:zodiac-pisces",
  ];

  const radius = 38;
  const centerX = 50;
  const centerY = 50;
  const clockSize = 700;

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  const hourAngle = hours * 30 + minutes * 0.5 - 90;
  const minuteAngle = minutes * 6 + seconds * 0.1 - 90;
  const secondAngle = continuousSeconds * 6 - 90;

  return (
    <div
      className="relative border-2 border-black rounded-full"
      style={{
        width: `${clockSize}px`,
        height: `${clockSize}px`,
        fontFamily: "Georgia, serif",
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 1 }}
      >
        {/* Hour hand */}
        <div
          className="absolute bg-black origin-left"
          style={{
            width: "280px",
            height: "2px",
            left: "50%",
            top: "50%",
            transform: `rotate(${hourAngle}deg)`,
            transformOrigin: "0% 50%",
          }}
        />

        {/* Minute hand */}
        <div
          className="absolute bg-black origin-left"
          style={{
            width: "320px",
            height: "2px",
            left: "50%",
            top: "50%",
            transform: `rotate(${minuteAngle}deg)`,
            transformOrigin: "0% 50%",
          }}
        />

        {/* Second hand */}
        <div
          className="absolute bg-red-600 origin-left transition-transform duration-1000 ease-linear"
          style={{
            width: "220px",
            height: "2px",
            left: "50%",
            top: "50%",
            transform: `rotate(${secondAngle}deg)`,
            transformOrigin: "0% 50%",
          }}
        />
      </div>

      <div
        id="outer-circling-circle"
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 2 }}
      >
        <div
          className="border rounded-full"
          style={{ width: "300px", height: "300px" }}
        />
      </div>

      <div
        id="circling-circles"
        className="circling-circles absolute inset-0"
        style={{ zIndex: 3 }}
      >
        <div
          className="absolute inset-0 animate-spin-slow"
          style={{ animationDuration: "30s" }}
        >
          <div
            id="inner-circling-circle"
            className="absolute"
            style={{
              width: "350px",
              height: "350px",
              top: "50%",
              left: "85%",
              transform: "translate(-100%, -78%)",
            }}
          >
            <svg
              width="350"
              height="350"
              viewBox="0 0 350 350"
              style={{ display: "block" }}
            >
              <circle
                cx="175"
                cy="175"
                r="174"
                fill="none"
                stroke="black"
                strokeWidth="2"
                shapeRendering="geometricPrecision"
              />
              <circle
                cx="175"
                cy="175"
                r="115"
                fill="none"
                stroke="black"
                strokeWidth="2"
                shapeRendering="geometricPrecision"
              />
              <defs>
                <mask id="donutMask">
                  <rect width="100%" height="100%" fill="white" />
                  <circle cx="175" cy="175" r="115" fill="black" />
                </mask>
              </defs>
              <circle
                cx="175"
                cy="175"
                r="174"
                fill="white"
                mask="url(#donutMask)"
              />
            </svg>

            {zodiacIcons.map((iconName, index) => {
              const angle =
                index * (360 / zodiacIcons.length) * (Math.PI / 180);
              const symbolRadius = 145;

              const x = 175 + symbolRadius * Math.cos(angle);
              const y = 175 + symbolRadius * Math.sin(angle);

              const rotationAngle = (angle * 180) / Math.PI + 180 - 90;

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
                  }}
                >
                  <Icon icon={iconName} width="32" height="32" />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {romanNumerals.map((numeral, index) => {
        const angle =
          (index * (360 / romanNumerals.length) - 90) * (Math.PI / 180);
        const x = centerX + (radius + 8) * Math.cos(angle);
        const y = centerY + (radius + 8) * Math.sin(angle);
        return (
          <div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 text-xl font-semibold"
            style={{ left: `${x}%`, top: `${y}%`, zIndex: 4 }}
          >
            {numeral}
          </div>
        );
      })}
    </div>
  );
};

export default Clock;
