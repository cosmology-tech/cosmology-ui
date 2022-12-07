import { assets, chains } from 'chain-registry';

import { shuffledArray } from '@cosmology-ui/utils';
import { ChainListType } from './types';

const defaultStringArray = [
  ...[...Array(26)].map((_, i) => String.fromCharCode('A'.charCodeAt(0) + i)),
  ...[...Array(26)].map((_, i) => String.fromCharCode('a'.charCodeAt(0) + i)),
  ...[...Array(10)].map((_, i) => i.toString())
];

const handleShuffledLetters = (name: string, maxLength: number = 32) => {
  const randomLetter = shuffledArray(defaultStringArray)
    .toString()
    .replaceAll(',', '');
  // eslint-disable-next-line
  return (name.replaceAll(/[\-[\s[\.]/g, '') + randomLetter).slice(
    0,
    maxLength
  );
};

export const chainList = assets
  .filter((list) => {
    const chain = chains.find((chain) => chain.chain_name === list.chain_name);
    if (!chain) return false;
    if (chain.network_type !== 'mainnet') return false;
    return true;
  })
  .map(({ assets }) => assets.values())
  .map((iterator) => {
    for (const value of iterator) {
      return {
        chainName: value.base,
        label: value.name,
        value: value.name,
        icon: {
          png: value.logo_URIs?.png,
          jpeg: value.logo_URIs?.jpeg,
          svg: value.logo_URIs?.svg
        },
        ibc: value.ibc,
        address:
          value.base.slice(0, 1) === 'u'
            ? handleShuffledLetters(value.name, 12)
            : handleShuffledLetters(value.name)
      };
    }
  })
  .filter((a) => (a ? a.icon : null)) // only images
  .sort(
    () => (Math.random() > 0.5 ? 1 : -1) // random
  ) as ChainListType[];
