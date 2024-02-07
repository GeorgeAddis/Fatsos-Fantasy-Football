import React, { useState, useEffect } from 'react';
import theme from '../shared/theme'; // Adjust the path to where your theme.ts is located

type DefaultPageProps = {
  children: React.ReactNode;
  className?: string;
};

// Define the type for the function that debounce will wrap
type Func = (...args: any[]) => any;

// Debounce function with explicit types
const debounce = (func: Func, delay: number): (...args: any[]) => void => {
  let inDebounce: ReturnType<typeof setTimeout> | null;
  return function (...args: any[]) {
    // 'this' typing is not necessary as arrow functions do not have their own 'this' context
    clearTimeout(inDebounce!);
    inDebounce = setTimeout(() => func(...args), delay);
  };
};

const DefaultPage: React.FC<DefaultPageProps> = ({ children, className }) => {
  // Initialize isMobile with false to ensure SSR compatibility
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);

    // Debounced handle resize function
    const handleResize = debounce(updateIsMobile, 250); // Delay in ms

    // Set up the event listener
    window.addEventListener('resize', handleResize);

    // Initialize with the current value
    updateIsMobile();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Outer style for the full width green background
  const outerStyle = {
    paddingTop: '3rem',
    backgroundColor: theme.colors.secondary,
    width: '100%',
    minHeight: '100vh',
  };

  // Adjust innerStyle padding based on isMobile state
  const innerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    color: theme.colors.blackText,
    boxSizing: 'border-box',
    width: isMobile ? '100%' : '70%', // Adjust width based on isMobile
    minHeight: '100vh',
    margin: '0 auto',
    padding: '2%',
  };

  return (
    <div style={outerStyle} className={className}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
};

export default DefaultPage;
