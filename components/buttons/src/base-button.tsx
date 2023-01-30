import { Button } from '@chakra-ui/react';
import React from 'react';

export interface BaseButtonType {
  buttonText: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  styleProps?: object;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type GBaseButton<T = BaseButtonType> = T;

export const BaseButton = ({
  buttonText,
  loading,
  disabled,
  className,
  styleProps,
  onClick
}: GBaseButton) => {
  return (
    <Button
      className={className}
      isLoading={loading}
      isDisabled={disabled}
      sx={styleProps}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};
