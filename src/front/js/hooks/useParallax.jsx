import { useEffect } from "react";
import { useLocation } from "react-router";

export const useParallax = (div) => {
  useEffect(() => {
    document.querySelector("body").onscroll = () => {
      const scrolltotop = document.scrollingElement.scrollTop;
      const target1 = document.querySelector(div);
      const xvalue = "center";
      const factor = 0.5;
      const yvalue = scrolltotop * factor;
      target1.style.backgroundPosition = xvalue + " " + yvalue + "px";
    };
    return () => {
      document.querySelector("body").onscroll = () => {};
    };
  });
};
