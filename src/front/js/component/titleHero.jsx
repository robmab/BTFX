import React from "react";
import { useParallax } from "../hooks/useParallax.jsx";

export const TitleHero = ({ img, title }) => {
  useParallax(".title-hero");
  return (
    <div style={{ backgroundImage: `url(${img})` }} className="title-hero">
      <h1>{title}</h1>
    </div>
  );
};
