"use client";

import React, { useEffect, useState } from "react";
import "./style.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lagPosition, setLagPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const followCursor = () => {
      setLagPosition((lagPos) => ({
        x: lagPos.x + (position.x - lagPos.x) * 0.3,
        y: lagPos.y + (position.y - lagPos.y) * 0.3,
      }));
    };

    const interval = setInterval(followCursor, 8);
    return () => clearInterval(interval);
  }, [position]);

  return (
    <div
      style={{
        left: `${lagPosition.x}px`,
        top: `${lagPosition.y}px`,
      }}
      className="custom-cursor"
    />
  );
};

export default CustomCursor;
