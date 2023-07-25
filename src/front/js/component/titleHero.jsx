import React from "react";
import { useParallax } from "../hooks/useParallax.jsx";

import "../../styles/titleHero.css";

export const TitleHero = ({ img, title, y }) => {
  useParallax(".title-hero", y);
  return (
    <div
      style={{ backgroundImage: `url(${img})`, backgroundPositionY: `-${y}px` }}
      className="title-hero"
    >
      <h1>{title}</h1>
    </div>
  );
};
