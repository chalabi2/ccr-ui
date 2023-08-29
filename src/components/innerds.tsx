import { Box, Text, Flex, Img, VStack, Button, ButtonGroup, HStack, List, Tabs, TabList, Tab, Input, TabPanels, TabPanel, Divider, IconButton, Spacer, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useConnectMetaMask } from "../hooks/connector";
import Web3 from "web3";
import { FaGithub, FaInternetExplorer, FaTwitter } from "react-icons/fa";

export function ConnectWallets() {
    const [connected, setIsconnected] = useState(false);
    const [accountMetaMask, connectMetaMask, setAccount] = useConnectMetaMask();
    const [balance, setBalance] = useState<string  | null>(null);

    const feeCheck = () => {
        if (!connected) {
            return ""; // Shows nothing when the wallet is disconnected
        } else if (balance && parseFloat(balance) >= 0.025) {
            return "Enuf👍"; 
        } else {
            return "NotEnuf👎"; 
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
        <HStack height="100%" width="100%">
            <VStack
                bgColor="#818181"
                width="30%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                position="relative"
                spacing={1}
            >
                <Flex
                justifyContent={"center"}
                flexDirection={"row"}
                mt={4}
                >
                <Img src="/keys.gif" height="40px" width="40px" mr={-8} /> {/* Adjust the size and margin as needed */}
                    <Button
                     _active={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                     _selected={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                    _hover={{ backgroundColor: "grey.200" }}
                 
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="45px"
                        paddingX="0.5rem"
                        marginX="2.5rem"
                        width="120px"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                        onClick={handleMetaMaskClick} >
                        {connected ? "Disconnect" : "Connect Wallet"}
                    </Button>
                </Flex>
                
    
                    <Box
                     mt={4}
                        borderRadius="2px"
                        bgColor="lightgrey"
                        width="calc(100% - 3rem)"
                        maxWidth="calc(100% - 3rem)"
                        height="255px"
                        alignContent="center"
                        alignItems="center"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                    >
                        <List 
                        padding={2}
                        spacing={2} color="black">
                            <Text>Address : {accountMetaMask}</Text>
                            <Text>Amount : {balance  ?? "0"} CANTO</Text>
                            <Text>Fee Check : {checkedFees}</Text>
                            <Text>Contract Address: 0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3</Text>
                        </List>
                    </Box>

            </VStack>
            <VStack
                bgColor="#818181"
                width="80%"
                height="100%"
                display="flex"
                alignItems="flex-start"
                justifyContent="flex-start"
            >
                <Tabs
                ml={4}
                mt={4}
                >
                    <TabList>
                        <Tab
                        color="black"
                        _hover={{ backgroundColor: "grey.200" }}
                        _selected={{ color: "black", borderColor: "rgba(0, 128, 0, 1)" }}
                         borderTop="3px solid #efefef"
                         bgColor="lightgrey"
                         borderLeft="3px solid #efefef"
                         borderRight="3px solid black"
                         borderBottom="3px solid black"
                        >
                        Read
                        </Tab>
                        <Tab
                        color="black"
                        _hover={{ backgroundColor: "grey.200" }}
                        _selected={{ color: "black", borderColor: "rgba(0, 128, 0, 1)" }}
                        borderTop="3px solid #efefef"
                        bgColor="lightgrey"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        >
                        Write
                        </Tab>
                    </TabList>
                    <TabPanels>
                    <TabPanel>
                        <VStack>
                            <Flex
                            alignContent="center"
                            alignItems="center"
                            flexDirection="row"
                            width="600px"
                            >
                                <Text
                                fontSize="18px"
                                >
                                    Highest Cluster ID:
                                </Text>
                            </Flex>
                            <Divider/>
                            <Flex
                            alignContent="center"
                            alignItems="center"
                            flexDirection="row"
                            width="600px"
                            >
                                <Text
                                fontSize="18px"
                                >
                                    Get ID by cluster name: 
                                </Text>
                                <Input
                                placeholder="Cluster Name"
                                 color={"black"}
                                 bgColor="white"
                                 borderRadius="1px"
                                 borderColor="grey"
                                 height="30px"
                                 paddingX="0.5rem"
                                 marginX="10px"
                                 width="120px"
                                 border="3px solid black"
                                 _active={{ color:"grey.200", borderColor:"white" }}
                                 _focus={{ color:"grey.200", borderColor:"white", background: "grey.200" }}
                                 _selected={{ color: "grey.200", borderColor: "white" }}
                            
                                ></Input>
                                
                                <Button
                     _active={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                     _selected={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                    _hover={{ backgroundColor: "grey.200" }}
                 
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="30px"
                        paddingX="0.5rem"
                        marginX="10px"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                         >
                        query
                    </Button>
                            </Flex>
                            <Divider/>
                            <Flex
                            alignContent="center"
                            alignItems="center"
                            flexDirection="row"
                            width="600px"
                            >
                                <Text
                                fontSize="18px"
                                >
                                    Get name by cluster ID: 
                                </Text>
                                <Input
                                placeholder="Cluster ID"
                                 color={"black"}
                                 bgColor="white"
                                 borderRadius="1px"
                                 borderColor="grey"
                                 height="30px"
                                 paddingX="0.5rem"
                                 marginX="10px"
                                 width="120px"
                                 border="3px solid black"
                                 _active={{ color:"grey.200", borderColor:"white" }}
                                 _focus={{ color:"grey.200", borderColor:"white", background: "grey.200" }}
                                 _selected={{ color: "grey.200", borderColor: "white" }}
                            
                                ></Input>
                                
                                <Button
                     _active={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                     _selected={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                    _hover={{ backgroundColor: "grey.200" }}
                 
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="30px"
                        paddingX="0.5rem"
                        marginX="10px"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                         >
                        query
                    </Button>
                            </Flex>
                            <Divider/>
                            <Flex
                            alignContent="center"
                            alignItems="center"
                            flexDirection="row"
                            width="600px"
                            >
                                <Text
                                fontSize="18px"
                                >
                                    Get Receiver: 
                                </Text>
                                <Input
                                placeholder="Cluster ID"
                                 color={"black"}
                                 bgColor="white"
                                 borderRadius="1px"
                                 borderColor="grey"
                                 height="30px"
                                 paddingX="0.5rem"
                                 marginX="10px"
                                 width="120px"
                                 border="3px solid black"
                                 _active={{ color:"grey.200", borderColor:"white" }}
                                 _focus={{ color:"grey.200", borderColor:"white", background: "grey.200" }}
                                 _selected={{ color: "grey.200", borderColor: "white" }}
                            
                                ></Input>
                                
                                <Button
                     _active={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                     _selected={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                    _hover={{ backgroundColor: "grey.200" }}
                 
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="30px"
                        paddingX="0.5rem"
                        marginX="10px"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                         >
                        query
                    </Button>
                            </Flex>
                        </VStack>
                        </TabPanel>
                        <TabPanel>
                        <VStack>
                            <Flex
                            alignContent="center"
                            alignItems="center"
                            flexDirection="row"
                            width="600px"
                            >
                                <Text
                                fontSize="18px"
                                >
                                    Register Contract
                                </Text>
                                <Input
                                placeholder="Cluster Name"
                                 color={"black"}
                                 bgColor="white"
                                 borderRadius="1px"
                                 borderColor="grey"
                                 height="30px"
                                 paddingX="0.5rem"
                                 marginX="10px"
                                 width="120px"
                                 border="3px solid black"
                                 _active={{ color:"grey.200", borderColor:"white" }}
                                 _focus={{ color:"grey.200", borderColor:"white", background: "grey.200" }}
                                 _selected={{ color: "grey.200", borderColor: "white" }}
                            
                                ></Input>
                                <Button
                     _active={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                     _selected={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                    _hover={{ backgroundColor: "grey.200" }}
                 
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="30px"
                        paddingX="0.5rem"
                        marginX="10px"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                         >
                        Register
                    </Button>
                            </Flex>
                            <Divider/>
                            <Flex
                            alignContent="center"
                            alignItems="center"
                            flexDirection="row"
                            width="600px"
                            >
                                <Text
                                fontSize="18px"
                                >
                                    Change Receiver
                                </Text>
                                <Input
                                placeholder="Cluster ID"
                                 color={"black"}
                                 bgColor="white"
                                 borderRadius="1px"
                                 borderColor="grey"
                                 height="30px"
                                 paddingX="0.5rem"
                                 marginX="10px"
                                 width="120px"
                                 border="3px solid black"
                                 _active={{ color:"grey.200", borderColor:"white" }}
                                 _focus={{ color:"grey.200", borderColor:"white", background: "grey.200" }}
                                 _selected={{ color: "grey.200", borderColor: "white" }}
                            
                                ></Input>
                                 <Input
                                placeholder="New Receiver"
                                 color={"black"}
                                 bgColor="white"
                                 borderRadius="1px"
                                 borderColor="grey"
                                 height="30px"
                                 paddingX="0.5rem"
                                 marginX="10px"
                                 width="120px"
                                 border="3px solid black"
                                 _active={{ color:"grey.200", borderColor:"white" }}
                                 _focus={{ color:"grey.200", borderColor:"white", background: "grey.200" }}
                                 _selected={{ color: "grey.200", borderColor: "white" }}
                            
                                ></Input>
                                <Button
                     _active={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                     _selected={{ backgroundColor: "grey.200", color: "green", borderColor: "green" }}
                    _hover={{ backgroundColor: "grey.200" }}
                 
                        color={"black"}
                        bgColor="#c0c0c0"
                        borderRadius="1px"
                        borderColor="grey"
                        height="30px"
                        paddingX="0.5rem"
                        marginX="10px"
                        borderTop="3px solid #efefef"
                        borderLeft="3px solid #efefef"
                        borderRight="3px solid black"
                        borderBottom="3px solid black"
                        display="flex"
                        alignItems="center"
                        boxSizing="border-box"
                         >
                        Change
                    </Button>
                            </Flex>
                        </VStack>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            
           
        </VStack>
        </HStack>
    )
}

export function BottomBar() {
    return (
        <Flex
            w="100%" // Stretch the entire width of its parent
            flexDirection="row"
            justifyContent="space-between"
        >
            <ButtonGroup p={4} flexDirection="row">
                <Link
                href="https://twitter.com/CantoPublic/"
                >
                <IconButton
                    variant="unstyled"
                    icon={<FaTwitter />}
                    aria-label={""}
                />
                </Link>
                <Link
                 href="https://github.com/Canto-Network"
                >
                <IconButton
                    variant="unstyled"
                    icon={<FaGithub />}
                    aria-label={""}
                />
                </Link>
                <Link
                href="https://canto.io/"
                >
                <IconButton
                    variant="unstyled"
                    icon={<FaInternetExplorer />}
                    aria-label={""}
                />
                </Link>
            </ButtonGroup>

            <Spacer />

            <Flex flexDirection="row" alignItems="center">
                <Text mr={4}>Chandra Station</Text>
            </Flex>
        </Flex>
    )
}