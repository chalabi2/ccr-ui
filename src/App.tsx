import * as React from "react";
import {
  ChakraProvider,
  Box,
  theme,
  extendTheme,
} from "@chakra-ui/react";
import { Window } from "./components/appBrakcet";
import { ConnectWallets } from "./components/innerds";
import './fonts/fonts.css'

const customTheme = extendTheme({
  fonts: {
    body: "Windows",
    heading: "Windows", 
  },
});

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <Box position="relative" width="100vw" height="100vh">
      <Window/>
    </Box>
  </ChakraProvider>
);

export default App;
