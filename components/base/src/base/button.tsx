import { PseudoSelectors } from '@cosmology-ui/theme';
import { BoxProps, config } from '@cosmology-ui/theme';
import styled, { CSSObject } from 'styled-components';
import { createSystem, css, shouldForwardProp } from 'system-props';

const system = createSystem({
  strict: false,
  tokenPrefix: 'prefix',
  pseudoSelectors: PseudoSelectors
});

export const Button = styled('button').withConfig({
  shouldForwardProp: (prop, defaultValidtorFn) =>
    shouldForwardProp(prop) && defaultValidtorFn(prop)
})<BoxProps>(
  {
    boxSizing: 'border-box',
    font: 'inherit',
    border: 'none',
    background: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 'auto',
    padding: 0,
    ':hover': {
      cursor: 'pointer'
    },
    ':active': {
      cursor: 'pointer'
    },
    ':disabled': {
      cursor: 'not-allowed'
    }
  },
  system(config),
  ({ sx, ...props }) => css(sx)(props) as CSSObject
);
