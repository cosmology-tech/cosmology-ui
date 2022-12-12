# @cosmology-ui/utils

## Install

```
yarn add @chakra-ui^2.4.2 @cosmology-ui/utils
```

## How to use

import `ChakraProvider` and our default theme
```
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@cosmology-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
```

then can use
```
import { ConnectWalletButton } from '@cosmology-ui/utils';

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
