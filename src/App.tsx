import * as React from "react";
import {
  ChakraProvider,
  Box,
  extendTheme,
} from "@chakra-ui/react";
import { Window } from "./components/window";
import './fonts/fonts.css'
import { WagmiConfig } from 'wagmi'

import { config } from './wagmi'

const customTheme = extendTheme({
  fonts: {
    body: "Windows",
    heading: "Windows", 
  },
  components: {
    Tab: {
      baseStyle: {
        _hover: {
          // Color when hovered
          backgroundColor: "gray.200", // Example color
        },
        _selected: {
          // Text and border color when selected
          color: "green", // Example color
          borderColor: "green", // Example color
        },
      },
    },
  },
});
export const App = () => (
  <ChakraProvider theme={customTheme}>
    <WagmiConfig config={config}>
    <Box position="relative" width="100vw" height="100vh">
      <Window/>
    </Box>
    </WagmiConfig>
  </ChakraProvider>
);

export default App;
