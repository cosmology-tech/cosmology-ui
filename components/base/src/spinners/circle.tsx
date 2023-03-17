import styled, { keyframes } from 'styled-components';

import { Box } from '../index';
import { SpinnerProps } from './type';

const motion = keyframes`
  0%,
  100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const Spinner = styled(Box)`
  display: inline-block;
  border-radius: 50%;
  animation: ${motion} 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

export const CircleSpinner = ({ className }: SpinnerProps) => (
  <Spinner className={className} />
);
