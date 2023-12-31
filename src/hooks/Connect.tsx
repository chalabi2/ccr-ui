import { Button, Box, Text, Grid } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { BaseError } from "viem";
import { useAccount, useConnect, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";

function underlineFirstLetters(str: string): JSX.Element {
  return (
    <>
      {str.split(' ').map((word, index) => (
        <React.Fragment key={index}>
          <span style={{ textDecoration: 'underline' }}>{word.charAt(0)}</span>
          {word.slice(1)}
          {index !== str.split(' ').length - 1 && '\u00A0'} 
        </React.Fragment>
      ))}
    </>
  );
}

export function Connect() {
  const { connector, isConnected } = useAccount();
  const {
    connect,
    connectors,
    error: connectError,
    isLoading,
    pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();

  const { chain } = useNetwork();
  const { error: switchError, switchNetwork } =
    useSwitchNetwork();


    useEffect(() => {
      if (chain && chain.id !== 7700 && switchNetwork) {
        switchNetwork(7700);
      }
    }, [chain, switchNetwork]); 
  return (
    <Box justifyContent="center">
      <Grid
        templateColumns="repeat(2, 1fr)"
        backgroundColor="lightgrey"
      gap={4}
      >
        {isConnected && (
          <Button 
          _active={{
            backgroundColor: "grey.200",
            color: "#02cf7c",
            borderColor: "#02cf7c",
          }}
          _selected={{
            backgroundColor: "grey.200",
            color: "#02cf7c",
            borderColor: "#02cf7c",
          }}
          _hover={{ backgroundColor: "grey.200" }}
          color={"black"}
          bgColor="#c0c0c0"
          borderRadius="1px"
          borderColor="grey"
          height="45px"
          paddingX="0.5rem"
          marginX="2rem"
          width="120px"
          borderTop="3px solid #efefef"
          borderLeft="3px solid #efefef"
          borderRight="3px solid black"
          borderBottom="3px solid black"
          display="flex"
          alignItems="center"
          boxSizing="border-box"
          onClick={() => disconnect()}>
             <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>D</span>isconnect
          </Button>
        )}
        {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <Button
            _active={{
              backgroundColor: "grey.200",
              color: "#02cf7c",
              borderColor: "#02cf7c",
            }}
            _selected={{
              backgroundColor: "grey.200",
              color: "#02cf7c",
              borderColor: "#02cf7c",
            }}
            _hover={{ backgroundColor: "grey.200" }}
            color={"black"}
            bgColor="#c0c0c0"
            borderRadius="1px"
            borderColor="grey"
            height="45px"
            paddingX="0.5rem"
            marginX="2rem"
            width="120px"
            borderTop="3px solid #efefef"
            borderLeft="3px solid #efefef"
            borderRight="3px solid black"
            borderBottom="3px solid black"
            display="flex"
            alignItems="center"
            boxSizing="border-box"
              key={x.id}
              onClick={() => connect({ connector: x })}
              isLoading={isLoading && x.id === pendingConnector?.id}
              zIndex={1000}
            >
              {underlineFirstLetters(x.name)}
            </Button>
          ))}
      </Grid>
      {connectError && <Text color="red.500">{(connectError as BaseError).shortMessage}</Text>}
      {switchError && <Text color="red.500">{(switchError as BaseError).shortMessage}</Text>}
    </Box>
  );
}
