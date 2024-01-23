import React from 'react';
import theme from '../shared/theme'; // Adjust the path to where your theme.ts is located

// Extend the component props to include className
type DefaultPageProps = {
  children: React.ReactNode;
  className?: string;
};

const DefaultPage: React.FC<DefaultPageProps> = ({ children, className }) => {
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
    margin: '0 auto', // Centering the content
    padding: '2%', // Padding is now included within the width
  };

  return (
    <div style={outerStyle} className={className}>
      <div style={innerStyle}>{children}</div>
    </div>
  );
};

export default DefaultPage;
