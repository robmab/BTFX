import { useEffect } from "react";

export const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    /* unmount, change to previus title */
    return () => {
      document.title = prevTitle;
    };
  });
};
