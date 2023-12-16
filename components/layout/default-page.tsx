import React from 'react';
import theme from '../shared/theme'; // Adjust the path to where your theme.ts is located

const DefaultPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Outer style for the full width green background
  const outerStyle = {
    paddingTop: '3rem',
    backgroundColor: theme.colors.secondary,
    width: '100%', // Changed from 100vw to 100% which is relative to the parent element
    minHeight: '100vh',
  };
  // Inner style for the centered content
  const innerStyle: React.CSSProperties = {
    backgroundColor: theme.colors.background,
    color: theme.colors.blackText,
    boxSizing: 'border-box', // Set to 'border-box' which is a valid value
    width: '70%',
    minHeight: '100vh',
    margin: '0 15%', // Ensuring 15% margin on each side
    padding: '2rem', // Padding is now included within the width
  };

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

export default DefaultPage;