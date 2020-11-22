import { useEffect, useState } from 'react';

export const useElementSize = (element: HTMLElement | null) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleElementResize = () => {
    setSize({
      width: element ? element.clientWidth : 0,
      height: element ? element.clientHeight : 0,
    });
  };

  useEffect(() => {
    if (element) {
      // New element so get the initial size
      handleElementResize();
      element.addEventListener('resize', handleElementResize, false);
    }

    return function cleanUp() {
      if (element) {
        element.removeEventListener('resize', handleElementResize);
      }
    };
  }, [element]);

  return size;
};
