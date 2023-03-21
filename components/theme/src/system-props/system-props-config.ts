import * as CSS from 'csstype';
import { ReactNode } from 'react';
import {
  AllSystemProps,
  background,
  border,
  color,
  CSSFunctionArgs,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  SystemProp,
  typography
} from 'system-props';

import { PseudoProps } from './pseudo-selectors';

const extraProps = {
  transform: true,
  textDecoration: true,
  transition: true
} as const;

type PrefixOptions = 'noprefix' | 'prefix' | 'all';

export type BaseProps<Prefix extends PrefixOptions = 'prefix'> =
  AllSystemProps<Prefix> & {
    [k in keyof typeof extraProps]?: SystemProp<CSS.Properties[k]>;
  };

export interface DefaultProps<Prefix extends PrefixOptions = 'prefix'>
  extends BaseProps<Prefix>,
    PseudoProps<BaseProps<Prefix>> {
  className?: string;
  sx?: CSSFunctionArgs<'prefix'>;
  children?: ReactNode;
}

export const config = {
  ...color,
  ...border,
  ...background,
  ...flexbox,
  ...grid,
  ...shadow,
  ...position,
  ...layout,
  ...space,
  ...typography,
  ...extraProps
};
