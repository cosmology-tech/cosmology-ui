import {
  Box,
  Divider,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { AnimateBox } from '@cosmology-ui/animation';
import Decimal from 'decimal.js';
import React, { useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import { SwapSkeletonPrice } from './swap-skeleton';
import { SwapDetailsProps, SwapPriceAndDetailsType } from './type';

const SwapDetail = ({
  priceImpact,
  swapFee,
  expectedOutput,
  minimumReceived,
  route,
  tokenOutSymbol
}: SwapDetailsProps) => {
  return (
    <Box className="swap-price-detail-box">
      {priceImpact && (
        <Flex className="swap-price-detail swap-price-impact">
          <Text className="swap-price-title">Price Impact</Text>
          <Text className="swap-price-value">{priceImpact}</Text>
        </Flex>
      )}
      {swapFee && (
        <Flex className="swap-price-detail swap-fee">
          <Text className="swap-price-title">
            Swap Fee{`(${swapFee.percentage})`}
          </Text>
          <Text className="swap-price-value">~ {swapFee.value}</Text>
        </Flex>
      )}
      {expectedOutput && (
        <Flex className="swap-price-detail swap-expected-output">
          <Text className="swap-price-title">Expected Output</Text>
          <Text className="swap-price-value">
            ~ {expectedOutput} {tokenOutSymbol}
          </Text>
        </Flex>
      )}
      {minimumReceived && (
        <Flex className="swap-price-detail swap-minimum-received">
          <Text className="swap-price-title">
            Minimum received after slippage
          </Text>
          <Text className="swap-price-value">
            {minimumReceived} {tokenOutSymbol}
          </Text>
        </Flex>
      )}
      {route && (
        <Flex className="swap-price-detail swap-route">
          <Text className="swap-price-title swap-route-title">Route</Text>
          <Flex className="swap-route-details">
            <Image
              className="swap-route-sellToken swap-route-icon"
              alt={route.tokenIn.symbol}
              src={
                route.tokenIn.logoUrl
                  ? route.tokenIn.logoUrl.png ||
                    route.tokenIn.logoUrl.jpeg ||
                    route.tokenIn.logoUrl.svg
                  : `https://dummyimage.com/400x400/A7B4C2/fff&text=${route.tokenIn.symbol.slice(
                      0,
                      1
                    )}`
              }
            />
            <Box className="swap-route-divider-box">
              <Divider className="swap-route-divider" />
            </Box>
            {route.routes.map(
              ({
                poolId,
                swapFee,
                baseLogo,
                baseSymbol,
                quoteLogo,
                quoteSymbol
              }) => {
                return (
                  <React.Fragment key={poolId}>
                    <Flex className="swap-route-pool-box">
                      <Image
                        className="swap-route-icon swap-route-icon-left"
                        alt={baseSymbol}
                        src={
                          baseLogo
                            ? baseLogo.png || baseLogo.jpeg || baseLogo.svg
                            : `https://dummyimage.com/400x400/A7B4C2/fff&text=${baseSymbol.slice(
                                0,
                                1
                              )}`
                        }
                      />
                      <Image
                        className="swap-route-icon swap-route-icon-right"
                        alt={quoteSymbol}
                        src={
                          quoteLogo
                            ? quoteLogo.png || quoteLogo.jpeg || quoteLogo.svg
                            : `https://dummyimage.com/400x400/A7B4C2/fff&text=${quoteSymbol.slice(
                                0,
                                1
                              )}`
                        }
                      />
                    </Flex>
                    <Text className="swap-route-fee">{swapFee}</Text>
                    <Box className="swap-route-divider-box">
                      <Divider className="swap-route-divider" />
                    </Box>
                  </React.Fragment>
                );
              }
            )}
            <Image
              className="swap-route-buyToken swap-route-icon"
              alt={route.tokenOut.symbol}
              src={
                route.tokenOut.logoUrl
                  ? route.tokenOut.logoUrl.png ||
                    route.tokenOut.logoUrl.jpeg ||
                    route.tokenOut.logoUrl.svg
                  : `https://dummyimage.com/400x400/A7B4C2/fff&text=${route.tokenOut.symbol.slice(
                      0,
                      1
                    )}`
              }
            />
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export const SwapPriceAndDetails = ({
  loading,
  price,
  tokenInSymbol,
  tokenOutSymbol,
  swapDetails
}: SwapPriceAndDetailsType) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const showSwapDetailToggleBtn =
    swapDetails &&
    swapDetails.route?.routes &&
    swapDetails.route?.routes?.length > 0 &&
    !new Decimal(swapDetails?.expectedOutput || 0).eq(0);

  useEffect(() => {
    if (!showSwapDetailToggleBtn) onClose();
  }, [onClose, showSwapDetailToggleBtn]);

  return (
    <Box className="swap-price-box">
      <Flex className="swap-price">
        <Text className="swap-price-title">Price</Text>
        <Box className="swap-price-value">
          {loading ? (
            <SwapSkeletonPrice />
          ) : (
            <>
              <Text as="span" className="swap-price-amount">
                1&nbsp;{tokenInSymbol}&nbsp;=&nbsp;
                {price?.priceRate || '0'} {tokenOutSymbol}
              </Text>
              <Text as="span" className="swap-price-fiat">
                ~&nbsp;${price?.dollarValue || '0'}
              </Text>
              {showSwapDetailToggleBtn && (
                <IconButton
                  aria-label="swap-detail"
                  icon={<FiChevronDown />}
                  className={`swap-toggle-button ${
                    isOpen ? 'swap-detail-button-open' : ''
                  }`}
                  onClick={onToggle}
                />
              )}
            </>
          )}
        </Box>
      </Flex>
      {isOpen && (
        <AnimateBox
          className="swap-detail-animate"
          transition={{ duration: 0.2, ease: [0.37, 0, 0.63, 1] }}
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <SwapDetail {...swapDetails} tokenOutSymbol={tokenOutSymbol} />
        </AnimateBox>
      )}
    </Box>
  );
};
