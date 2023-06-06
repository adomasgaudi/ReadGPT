import { useEffect, useState } from "react";

export const useWindowHeight = () => {
  const [height, setHeight] = useState('90vh');

  useEffect(() => {
    const resizeListener = () => {
      setHeight(`${window.innerHeight - 1}px`);
    };

    resizeListener();
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return height;
}