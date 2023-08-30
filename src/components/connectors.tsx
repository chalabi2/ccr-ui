import {
    Box,
    Text,
    Flex,
    Img,
    VStack,
    Button,
    HStack,
    List,
    Tabs,
    TabList,
    Tab,
    Input,
    TabPanels,
    TabPanel,
    Divider,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { useConnectMetaMask } from "../hooks/connector";
  import Web3 from "web3";
  import { useClusterQuery } from "../hooks/getClusterById";
  import { useClusterIdByName } from "../hooks/getIdByClusterName";
  import { GetHighestClusterId } from "../hooks/getHIghestClusterId";
  import { GetReceivingAddress } from "../hooks/getReceiver"
  import { RegisterCluster } from "../hooks/registerCluster";

  // Wallet connector & contract interaction
  export function ContractWindow() {
    return (
      <HStack height="100%" width="100%">
        <ConnectWallets />
        <ContractCalls />
      </HStack>
    );
  }
  
  // connect wallet and show data
  function ConnectWallets() {
    const [connected, setIsconnected] = useState(false);
    const [accountMetaMask, connectMetaMask, setAccount] = useConnectMetaMask();
    const [balance, setBalance] = useState<string | null>(null);
  
    const feeCheck = () => {
      if (!connected) {
        return "..."; // Shows nothing when the wallet is disconnected
      } else if (balance && parseFloat(balance) >= 0.025) {
        return "👍";
      } else {
        return "👎";
      }
    };
  
    const checkedFees = feeCheck();
  
    useEffect(() => {
      const fetchBalance = async () => {
        if (accountMetaMask) {
          const web3 = new Web3(window.ethereum);
          const balanceWei = await web3.eth.getBalance(accountMetaMask);
          const balanceEth = web3.utils.fromWei(balanceWei, "ether");
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

      if (!connected) {
        await connectMetaMask();
      } else {

        setAccount(null);
      }
    };
  
    return (
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
        <Flex justifyContent={"center"} flexDirection={"row"} mt={4}>
          <Img src="/keys.gif" height="40px" width="40px" mr={-8} />{" "}
          <Button
            _active={{
              backgroundColor: "grey.200",
              color: "#008689",
              borderColor: "#008689",
            }}
            _selected={{
              backgroundColor: "grey.200",
              color: "#008689",
              borderColor: "#008689",
            }}
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
            onClick={handleMetaMaskClick}
          >
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
          <List padding={2} spacing={2} color="black">
            <Text>Address : {accountMetaMask}</Text>
            <Text>Amount : {balance ?? "0"} CANTO</Text>
            <Text>Fee Check : {checkedFees}</Text>
            <Text>
              Contract Address: 0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3
            </Text>
          </List>
        </Box>
      </VStack>
    );
  }
  
  // contract interactions

function ContractCalls() {
  // get name by id
    const [inputValue, setInputValue] = useState('');
    const [queryId, setQueryId] = useState<string | null>(null);  
    
    const { clusterName, error } = useClusterQuery(queryId);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };
    
    const handleQueryClick = () => {
        if (inputValue) {  
            setQueryId(inputValue); 
        }
    };

    // get id by name
    const [NameInputValue, setNameInputValue] = useState('');
    const [nameQueryId, setNameQueryId] = useState<string | null>(null); 
    
    const { clusterId,  } = useClusterIdByName(nameQueryId);
    
    const handleInputChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameInputValue(e.target.value);
    };
    
    const handleQueryClickName = () => {
        if (NameInputValue) { 
          setNameQueryId(NameInputValue);  
        }
    };

    // highest id

    const { highestClusterId, highestClustererror } = GetHighestClusterId();

    // receiver address

    const [recieverInputValue, setReceiverInputValue] = useState('');
    const [receiverQueryId, setReceiverQueryId] = useState<string | null>(null);  
    
    const { receiverAddress, receiverError  } = GetReceivingAddress(receiverQueryId);
    
    const handleInputReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
      setReceiverInputValue(e.target.value);
    };
    
    const handleQueryClickReceiver = () => {
        if (recieverInputValue) {  
          setReceiverQueryId(recieverInputValue);  
        }
    };

        // Register Cluster

        const [registerInputValue, setRegisterInputValue] = useState('');
        
        const [message, setMessage] = useState<string | null>(null);


        // Button click handler
        const handleRegisterClick = async () => {

          try {
            const result = RegisterCluster(registerInputValue); 
            if (result.hash) {
              setMessage('Transaction was successful!');
            } else {
              setMessage('Transaction failed.');
            }
          } catch (error: any) {
            setMessage(`Error: ${error.message}`);
          }
        };
        
        const handleInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
          setRegisterInputValue(e.target.value);
        };
        



    return (
      <VStack
        bgColor="#818181"
        width="80%"
        height="100%"
        display="flex"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Tabs ml={4} mt={4}>
          <TabList>
            <Tab
              color="black"
              _hover={{ backgroundColor: "grey.200" }}
              _selected={{ color: "black", borderColor: "#008689" }}
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
              _selected={{ color: "black", borderColor: "#008689" }}
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
              <VStack
              spacing={4}
              >
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                  <Text 
                  color="black"
                  fontWeight="bold"
                  fontSize="18px">Highest Cluster ID:</Text>
                  <Text
                  fontWeight="bold"
                  color="black"
                  >
                  {highestClusterId ? highestClusterId.toString() : 'Loading...'}
                  </Text>
                </Flex>
                <Divider />
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                  <Text 
                  color="black"
                  fontWeight="bold"
                  fontSize="18px">Get ID by cluster name:</Text>
                  <Input
                    placeholder="Cluster Name"
                    color={"black"}
                    bgColor="grey"
                    borderRadius="1px"
                    borderColor="grey"
                    height="30px"
                    paddingX="0.5rem"
                    marginX="10px"
                    width="120px"
                    border="3px solid lightgrey"
                    _active={{ color: "grey.200", borderColor: "white" }}
                    _focus={{
                      color: "grey.200",
                      borderColor: "white",
                      background: "grey.200",
                    }}
                    _selected={{ color: "grey.200", borderColor: "white" }}
                    _placeholder={{ color: "#02b0b3" }}
                    onChange={handleInputChangeName}
                    value={NameInputValue}
                  ></Input>
  
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
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
                    onClick={handleQueryClickName}
                  >
                    Query
                  </Button>
                  {clusterId?.toString && clusterId !== 0n && (
    <Text color="black" fontWeight="bold">{clusterId.toString()}</Text>
)}
                </Flex>
                <Divider />
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                  <Text 
                  color="black"
                  fontWeight="bold"
                  fontSize="18px">Get name by cluster ID:</Text>
                  <Input
                    placeholder="Cluster ID"
                    color={"black"}
                    bgColor="grey"
                    borderRadius="1px"
                    borderColor="grey"
                    height="30px"
                    paddingX="0.5rem"
                    marginX="10px"
                    width="120px"
                    border="3px solid lightgrey"
                    _active={{ color: "grey.200", borderColor: "white" }}
                    _focus={{
                      color: "grey.200",
                      borderColor: "white",
                      background: "grey.200",
                    }}
                    _selected={{ color: "grey.200", borderColor: "white" }}
                    _placeholder={{ color: "#02b0b3" }}
                    onChange={handleInputChange}
                    value={inputValue}
                  ></Input>
  
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
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
                    onClick={handleQueryClick}
                  >
                    Query
                  </Button>
                  {clusterName && <Text
                  color="black"
                  fontWeight="bold"
                  >{clusterName.toString()}</Text>}
                </Flex>
                <Divider />
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                  <Text 
                  color="black"
                  fontWeight="bold"
                  fontSize="18px">Get Receiver:</Text>
                  <Input
                    placeholder="Cluster ID"
                    color={"black"}
                    bgColor="grey"
                    borderRadius="1px"
                    borderColor="grey"
                    height="30px"
                    paddingX="0.5rem"
                    marginX="10px"
                    width="120px"
                    border="3px solid lightgrey"
                    _active={{ color: "grey.200", borderColor: "white" }}
                    _focus={{
                      color: "grey.200",
                      borderColor: "white",
                      background: "grey.200",
                    }}
                    _selected={{ color: "grey.200", borderColor: "white" }}
                    _placeholder={{ color: "#02b0b3" }}
                    onChange={handleInputReceiver}
                    value={recieverInputValue}
                  ></Input>
  
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
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
                    onClick={handleQueryClickReceiver}
                  >
                    Query
                  </Button>
                  
                </Flex>
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                <Text
                  justifySelf="left"
                  textAlign="left"
                  color="black"
                  fontSize="16px"
                  fontWeight="bold"
                  >
                  {receiverAddress ? receiverAddress.toString() : ''}
                  </Text>
                  </Flex>
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack
              spacing={4}
              >
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                  <Text 
                  color="black"
                  fontWeight="bold"
                  fontSize="18px">Register Contract</Text>
                  <Input
                    placeholder="Cluster Name"
                    color={"black"}
                    bgColor="grey"
                    borderRadius="1px"
                    borderColor="grey"
                    height="30px"
                    paddingX="0.5rem"
                    marginX="10px"
                    width="120px"
                    border="3px solid lightgrey"
                    _active={{ color: "grey.200", borderColor: "white" }}
                    _focus={{
                      color: "grey.200",
                      borderColor: "white",
                      background: "grey.200",
                    }}
                    _selected={{ color: "grey.200", borderColor: "white" }}
                    _placeholder={{ color: "#02b0b3" }}
                    onChange={handleInputRegister}
                    value={registerInputValue}
                  ></Input>
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
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
                    onClick={handleRegisterClick}
                  >
                    Register
                  </Button>
                </Flex>
                <Divider />
                <Flex
                  alignContent="center"
                  alignItems="center"
                  flexDirection="row"
                  width="600px"
                >
                  <Text 
                  color="black"
                  fontWeight="bold"
                  fontSize="18px">Change Receiver</Text>
                  <Input
                    placeholder="Cluster ID"
                    color={"black"}
                    bgColor="grey"
                    borderRadius="1px"
                    borderColor="grey"
                    height="30px"
                    paddingX="0.5rem"
                    marginX="10px"
                    width="120px"
                    border="3px solid lightgrey"
                    _active={{ color: "grey.200", borderColor: "white" }}
                    _focus={{
                      color: "grey.200",
                      borderColor: "white",
                      background: "grey.200",
                    }}
                    _selected={{ color: "grey.200", borderColor: "white" }}
                    _placeholder={{ color: "#02b0b3" }}
                  ></Input>
                  <Input
                    placeholder="New Receiver"
                    color={"black"}
                    bgColor="grey"
                    borderRadius="1px"
                    borderColor="grey"
                    height="30px"
                    paddingX="0.5rem"
                    marginX="10px"
                    width="120px"
                    border="3px solid lightgrey"
                    _active={{ color: "grey.200", borderColor: "white" }}
                    _focus={{
                      color: "grey.200",
                      borderColor: "white",
                      background: "grey.200",
                    }}
                    _selected={{ color: "grey.200", borderColor: "white" }}
                    _placeholder={{ color: "#02b0b3" }}
                  ></Input>
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#008689",
                      borderColor: "#008689",
                    }}
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
    );
  }
  