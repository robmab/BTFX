import { useEffect, useState } from "react";

export const useScroll = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(document.scrollingElement.scrollTop);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  return scroll;
};
