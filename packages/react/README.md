# @cosmology-ui/react

## 👉 Make sure you are using `react^18.2`

## Install

```
yarn add @chakra-ui^2.4.2 @cosmology-ui/react
```

## How to use

import `ChakraProvider` and our `ThemeProvider`

```
import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme, ThemeProvider } from '@cosmology-ui/react';
// or import { defaultTheme, ThemeProvider } from '@cosmology-ui/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ChakraProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}
```

then can use

```
import { ConnectWalletButton } from '@cosmology-ui/react';

export default function Home() {
  return (
    <ConnectWalletButton />
  );
}
```

## Our Website

⚛️ https://cosmoskit.com/

## Credits

🛠 Built by Cosmology — if you like our tools, please consider delegating to [our validator ⚛️](https://cosmology.tech/validator)
