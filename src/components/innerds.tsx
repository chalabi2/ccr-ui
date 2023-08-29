import { Box, Text, Flex, Img, VStack, Button, ButtonGroup, HStack, List } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useConnectMetaMask } from "../hooks/connector";
import Web3 from "web3";

export function ConnectWallets() {
    const [connected, setIsconnected] = useState(false);
    const [accountMetaMask, connectMetaMask, setAccount] = useConnectMetaMask();
    const [balance, setBalance] = useState<string | null>(null);

    const feeCheck = () => {
        if (!connected) {
            return ""; // Shows nothing when the wallet is disconnected
        } else if (balance && parseFloat(balance) >= 0.025) {
            return "Enuf"; 
        } else {
            return "NotEnuf"; 
        }
    }


    const checkedFees = feeCheck()

    useEffect(() => {
        const fetchBalance = async () => {
            if (accountMetaMask) {
                const web3 = new Web3(window.ethereum);
                const balanceWei = await web3.eth.getBalance(accountMetaMask);
                const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
                setBalance(balanceEth);
                setIsconnected(true);
            } else {
                setBalance(null);
                setIsconnected(false);
            }
        };

        fetchBalance();
    }, [accountMetaMask]);

    const handleMetaMaskClick = async () => {
        console.log("Button clicked");
        if (!connected) {
            await connectMetaMask();
        } else {
            // Disconnect the wallet
            setAccount(null);
        }
    };

    return (
        <HStack
        height="100%"
        width="100%"
        >
        <Box
            bgColor="#818181"
            position="relative" 
            width="20%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
                <Img
                    position="absolute"
                    src="/connect.png"
                    height="100px"
                    width="100px"
                    top={0}
                    left={0}
                />
                <Text 
                top="135px"
                left={4}
                position="absolute"
                mt="-50px"
                fontSize="25px">
                    Connect Wallet
                </Text>
                <VStack
                position="absolute"
                top="130px"
                left={-2}
                >
                    <Button
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="25px"
                        paddingX="0.5rem"
                        marginX="2.5rem"
                        width="calc(100% - 3rem)"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                        onClick={handleMetaMaskClick}>
                         {connected ? "Disconnect" : "Meta Mask"}
                    </Button>
                    <Box
                    borderRadius="2px"
                     bgColor="lightgrey"
                     position="absolute"
                     top="50px"
                     width="240px"
                     height="255px"
                    ml="124px"
                    alignContent="center"
                    alignItems="center"
                    >
                        <List
                        spacing={6}
                        color="black"
                        >
                    <Text>
                        Address : {accountMetaMask}
                    </Text>
                    <Text>
                        Amount : {balance} CANTO
                    </Text>
                    <Text>
                       Fee Check : {checkedFees}
                    </Text>
                    </List>
                    </Box>
                    </VStack>
        </Box>
        <Box
            bgColor="#818181"
            position="relative" 
            width="80%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            
           
        </Box>
        </HStack>
    )
}