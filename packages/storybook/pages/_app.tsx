import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme, ThemeProvider } from '@cosmology-ui/react';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ChakraProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
