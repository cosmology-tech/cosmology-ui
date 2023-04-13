import React from 'react';

export interface MyComponentProps {
  children?: React.ReactNode;
}

export const MyComponent = ({ children }: MyComponentProps) => {
  return <>{children}</>;
};

MyComponent.displayName = 'MyComponent';

export default MyComponent;
