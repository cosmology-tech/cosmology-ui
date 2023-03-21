import { PseudoSelectors } from '@cosmology-ui/theme';
import { config, DefaultProps } from '@cosmology-ui/theme';
import styled, { CSSObject } from 'styled-components';
import { createSystem, css, shouldForwardProp } from 'system-props';

const system = createSystem({
  strict: false,
  tokenPrefix: 'prefix',
  pseudoSelectors: PseudoSelectors
});

export const Text = styled('p').withConfig({
  shouldForwardProp: (prop, defaultValidtorFn) =>
    shouldForwardProp(prop) && defaultValidtorFn(prop)
})<DefaultProps>(
  { margin: 0 },
  system(config),
  ({ sx, ...props }) => css(sx)(props) as CSSObject
);
