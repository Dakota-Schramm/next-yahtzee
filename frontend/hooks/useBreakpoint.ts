'use client'

import { useState, useEffect } from "react";

const defaultTheme = require('tailwindcss/defaultTheme');

const breakpoints = defaultTheme.screens;

export default function useBreakpoint() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [breakpoint, setBreakpoint] = useState(getCurrentBreakpoint(windowSize));

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    setBreakpoint(getCurrentBreakpoint(windowSize))

    return () => window.removeEventListener('resize', handleResize);
  }, [windowSize.width]);

  return [breakpoint, setBreakpoint]
}

function getCurrentBreakpoint(windowSize) {
  const { width } = windowSize;
  if (0 < width && width < 600) {
    return breakpoints[0];
  }
  if (600 < width && width < 960) {
    return breakpoints[600];
  }
  if (960 < width && width < 1280) {
    return breakpoints[960];
  }
  if (1280 < width && width < 1920) {
    return breakpoints[1280];
  }
  if (width >= 1920) {
    return breakpoints[1920];
  }
}

