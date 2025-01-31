import { useState, useEffect } from "react";

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined"; // Check if window is defined

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : 0;
    const height = hasWindow ? window.innerHeight : 0;
    return { width, height };
  };

  // Initialize the state with window dimensions or 0 if SSR
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasWindow]); // Dependency array

  return windowDimensions;
};

export default useWindowDimensions;