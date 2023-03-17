import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Box } from '../base';
import { SpinnerProps } from './type';

const motion = keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled(Box)`
  box-sizing: border-box;
  display: block;
  border-radius: 50%;
  animation: ${motion} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  :nth-child(1) {
    animation-delay: -0.45s;
  }
  :nth-child(2) {
    animation-delay: -0.3s;
  }
  :nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export const RingSpinner = ({ className }: SpinnerProps) => (
  <Spinner className={className} />
);
