import { useState, useEffect } from "react";

/**
 * Custom hook to keep track of window height and width
 */
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowDimensions>({
    width: undefined,
    height: undefined
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    // cleanup function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;