import { PseudoSelectors } from '@cosmology-ui/theme';
import { BoxProps, config } from '@cosmology-ui/theme';
import styled, { CSSObject } from 'styled-components';
import { createSystem, css, shouldForwardProp } from 'system-props';

const system = createSystem({
  strict: false,
  tokenPrefix: 'prefix',
  pseudoSelectors: PseudoSelectors
});

export const Box = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidtorFn) =>
    shouldForwardProp(prop) && defaultValidtorFn(prop)
})<BoxProps>(
  { boxSizing: 'border-box' },
  system(config),
  ({ sx, ...props }) => css(sx)(props) as CSSObject
);
