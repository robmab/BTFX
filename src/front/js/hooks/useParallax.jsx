import { useEffect } from "react";
import { useLocation } from "react-router";

export const useParallax = (div, y) => {
  useEffect(() => {
    document.querySelector("body").onscroll = () => {
      let scrolltotop = document.scrollingElement.scrollTop;
      if (y) scrolltotop -= y * 2;
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
