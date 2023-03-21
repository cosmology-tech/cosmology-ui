import { Button, RingSpinner } from '@cosmology-ui/base';
import {
  componentThemes,
  Themes
  // useTheme
} from '@cosmology-ui/theme';
import styled from 'styled-components';
import { useTheme as useStyledTheme } from 'styled-components';

import { ConnectWalletButtonType } from './type';

export interface IConnectWalletButton extends ConnectWalletButtonType {}

const StyledConnectWalletButton = styled(Button)<IConnectWalletButton>``;

// export const ConnectWalletButtonStyle = (theme: Themes) => ({
//   py: _ConnectWalletButtonStyle.padding.y,
//   px: _ConnectWalletButtonStyle.padding.x,
//   fontSize: _ConnectWalletButtonStyle.fontSize,
//   fontFamily: _ConnectWalletButtonStyle.fontFamily,
//   boxShadow: _ConnectWalletButtonStyle.boxShadow,
//   color: _ConnectWalletButtonStyle.color[theme],
//   bg: _ConnectWalletButtonStyle.backgroundColor[theme],
//   borderRadius: _ConnectWalletButtonStyle.borderRadius,
//   lineHeight: _ConnectWalletButtonStyle.lineHeight,
//   transition: _ConnectWalletButtonStyle.transition,
//   '&:hover': {
//     bg: _ConnectWalletButtonStyle.hoverBackgroundColor[theme]
//   },
//   '&:active': {
//     bg: _ConnectWalletButtonStyle.activeBackgroundColor[theme],
//     color: _ConnectWalletButtonStyle.activeColor[theme]
//   },
//   '&:focus': {
//     boxShadow: _ConnectWalletButtonStyle.focusOutline[theme]
//   },
//   '&:disabled': {
//     bg: _ConnectWalletButtonStyle.disabledBackgroundColor[theme],
//     color: _ConnectWalletButtonStyle.disabledColor[theme]
//   },
//   '&>.connect-wallet-button-spinner': {
//     mx: _ConnectWalletButtonStyle.loadingIndicatorMargin,
//     border: _ConnectWalletButtonStyle.loadingIndicatorBorder,
//     borderColor: 'transparent',
//     borderTopColor: _ConnectWalletButtonStyle.loadingIndicatorBorderColor,
//     width: _ConnectWalletButtonStyle.loadingIndicatorSize.width,
//     height: _ConnectWalletButtonStyle.loadingIndicatorSize.height
//   }
// });

export const ConnectWalletButtonStyle = (theme: Themes) => {
  const defaultTheme = useStyledTheme();
  console.log('defaultTheme', defaultTheme);
  return {
    py: componentThemes.ConnectWalletButtonStyle.padding.y,
    px: componentThemes.ConnectWalletButtonStyle.padding.x,
    fontSize: componentThemes.ConnectWalletButtonStyle.fontSize,
    fontFamily: componentThemes.ConnectWalletButtonStyle.fontFamily,
    boxShadow: componentThemes.ConnectWalletButtonStyle.boxShadow,
    color: componentThemes.ConnectWalletButtonStyle.color[theme],
    bg: componentThemes.ConnectWalletButtonStyle.backgroundColor[theme],
    borderRadius: componentThemes.ConnectWalletButtonStyle.borderRadius,
    lineHeight: componentThemes.ConnectWalletButtonStyle.lineHeight,
    transition: componentThemes.ConnectWalletButtonStyle.transition,
    '&:hover': {
      bg: componentThemes.ConnectWalletButtonStyle.hoverBackgroundColor[theme]
    },
    '&:active': {
      bg: componentThemes.ConnectWalletButtonStyle.activeBackgroundColor[theme],
      color: componentThemes.ConnectWalletButtonStyle.activeColor[theme]
    },
    '&:focus': {
      boxShadow: componentThemes.ConnectWalletButtonStyle.focusOutline[theme]
    },
    '&:disabled': {
      bg: componentThemes.ConnectWalletButtonStyle.disabledBackgroundColor[
        theme
      ],
      color: componentThemes.ConnectWalletButtonStyle.disabledColor[theme]
    },
    '&>.connect-wallet-button-spinner': {
      mx: componentThemes.ConnectWalletButtonStyle.loadingIndicatorMargin,
      border: componentThemes.ConnectWalletButtonStyle.loadingIndicatorBorder,
      borderColor: 'transparent',
      borderTopColor:
        componentThemes.ConnectWalletButtonStyle.loadingIndicatorBorderColor,
      width:
        componentThemes.ConnectWalletButtonStyle.loadingIndicatorSize.width,
      height:
        componentThemes.ConnectWalletButtonStyle.loadingIndicatorSize.height
    }
  };
};

export const ConnectWalletButton = ({
  buttonText = 'Connect Wallet',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  sx,
  className = 'connect-wallet-button',
  onClick
}: ConnectWalletButtonType) => {
  // const { theme: cosmologyTheme } = useTheme();

  return (
    <StyledConnectWalletButton
      sx={sx ? sx : ConnectWalletButtonStyle(Themes.Light)}
      className={className}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? (
        <RingSpinner className="connect-wallet-button-spinner" />
      ) : undefined}
      {leftIcon}
      {loading ? undefined : buttonText}
      {rightIcon}
    </StyledConnectWalletButton>
  );
};
