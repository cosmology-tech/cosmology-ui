import { ChakraProvider } from '@chakra-ui/react';
import { semanticTokens, theme } from '@cosmology-ui/utils';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const customTheme = {
    ...theme,
    semanticTokens: {
      ...semanticTokens.semanticTokens,
      colors: {
        'connect-wallet-button-background-color-light': 'blue.600',
        'connect-wallet-button-background-color-dark': 'cyan.700'
      }
    }
  };
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
