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
    Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import Web3 from "web3";
  import { useClusterQuery } from "../hooks/getClusterById";
  import { useClusterIdByName } from "../hooks/getIdByClusterName";
  import { GetHighestClusterId } from "../hooks/getHIghestClusterId";
  import { GetReceivingAddress } from "../hooks/getReceiver"
  import { useRegisterCluster } from "../hooks/registerCluster";
  import { Connect } from "../hooks/Connect";
  import { useAccount, useNetwork } from 'wagmi'
import { useChangeReceivingAddress } from "../hooks/changeReceiver";

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
    const { chain } = useNetwork();
    const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

    const [connected, setIsconnected] = useState(false);
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
    const { address, isConnected } = useAccount()
    useEffect(() => {
      const fetchBalance = async () => {
        if (address && window.ethereum) {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          const balanceWei = await web3.eth.getBalance(address);
          const balanceEth = web3.utils.fromWei(balanceWei, "ether");
          setBalance(balanceEth);
          setIsconnected(true);
        } else {
          setBalance(null);
          setIsconnected(false);
        }
      };
  
      fetchBalance();
    }, [address, chain, isConnected]);
  
    const handleMetaMaskClick = async () => {
      openModal();
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
          <Img src="/ccr-ui/keys.gif" height="40px" width="40px" mr={-8} />{" "}
          <Button
            _active={{
              backgroundColor: "grey.200",
              color: "#03ab22 ",
              borderColor: "#03ab22 ",
            }}
            _selected={{
              backgroundColor: "grey.200",
              color: "#03ab22 ",
              borderColor: "#03ab22 ",
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
              {connected ? 
        <><span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>D</span>isconnect</> 
        : 
        <>
        <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>C</span>onnect&nbsp;
        <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>W</span>allet
    </>
    }
          </Button>
           <Modal 
           size="md"
           isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
          borderLeft="3px solid #efefef"
          borderRight="3px solid black"
          backgroundColor="lightgrey"
          borderTop="3px solid #efefef"
          >
            <Flex
    flexDirection="row"
    justifyContent="space-between"
    maxWidth="100%"
    height="30px"
    background="linear-gradient(90deg, #03ab22 0%, #02c927 100%)"
    padding="5px"
    mb={2}
>
              <Text
              color="white"
              fontSize="18px"
              textAlign="center"
              >Connect Wallet</Text>
              <ModalCloseButton
              mr="20px"
              mt="6px"
              size="sm"
           _active={{
            backgroundColor: "grey.200",
            color: "#03ab22 ",
            borderColor: "#03ab22 ",
          }}
          _selected={{
            backgroundColor: "grey.200",
            color: "#03ab22 ",
            borderColor: "#03ab22 ",
          }}
          _hover={{ backgroundColor: "grey.200" }}
          color={"black"}
          bgColor="#c0c0c0"
          borderRadius="1px"
          borderColor="grey"
          borderTop="3px solid #efefef"
          borderLeft="3px solid #efefef"
          borderRight="3px solid black"
          borderBottom="3px solid black"
          />
            </Flex>
         
            <Connect />
          </ModalBody>
          <ModalFooter
          borderBottom="3px solid black"
           borderLeft="3px solid #efefef"
           borderRight="3px solid black"
          backgroundColor="lightgrey"
          >
          </ModalFooter>
        </ModalContent>
      </Modal>
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
            <Text>Address : {address}</Text>
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
  // set account
  const { address } = useAccount()

  // get name by id
    const [inputValue, setInputValue] = useState('');
    const [queryId, setQueryId] = useState('');  
    
    const { clusterName } = useClusterQuery(queryId);
    
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
    const [nameQueryId, setNameQueryId] = useState(''); 
    
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

    const { highestClusterId } = GetHighestClusterId();

    // receiver address

    const [recieverInputValue, setReceiverInputValue] = useState('');
    const [receiverQueryId, setReceiverQueryId] = useState('');  
    
    const { receiverAddress  } = GetReceivingAddress(receiverQueryId);
    
    const handleInputReceiver = (e: React.ChangeEvent<HTMLInputElement>) => {
      setReceiverInputValue(e.target.value);
    };
    
    const handleQueryClickReceiver = () => {
        if (recieverInputValue) {  
          setReceiverQueryId(recieverInputValue);  
        }
    };

        // Register Cluster

        const [isButtonClicked, setIsButtonClicked] = useState(false);

        const [registerInputValue, setRegisterInputValue] = useState('');
        
        //@ts-ignore
        const [message, setMessage] = useState<string | null>(null);


        const { 
          setName, 
          register, 
          isSuccess, 
          data, 
          prepareError, 
          isPrepareError, 
          registerError, 
          isRegisterError 
      } = useRegisterCluster();
      
      const handleRegisterClick = () => {
        setName(registerInputValue);
        setIsButtonClicked(true);
        register();
        if (isSuccess) {
            setMessage('Transaction was successful!');
        } else {
            setMessage('Transaction failed.');
        }
    };

        const handleInputRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
          setRegisterInputValue(e.target.value);
        };
        

        // Change Address

        const [changeInputValueAddress, setChangeInputValueAddress] = useState('');
        const [changeInputValueId, setChangeInputValueId] = useState('');

        const {
          setAddress,
          setId,
          changeAddress,
          isSuccessChange,
          error,
        } = useChangeReceivingAddress();

        const handleInputChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
          setChangeInputValueAddress(e.target.value);
        };

        const handleInputChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
          setChangeInputValueId(e.target.value);
        };
      
        const handleChangeAddressClick = () => {
          setAddress(changeInputValueAddress);
          setId(changeInputValueId);
          changeAddress();
          if (isSuccessChange) {
            setMessage('Successfully Changed the Receiving Address!');
          } else if (error) {
            setMessage(`Error: ${error.message}`);
          }
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
              _selected={{ color: "black", borderColor: "#03ab22 " }}
              borderTop="3px solid #efefef"
              bgColor="lightgrey"
              borderLeft="3px solid #efefef"
              borderRight="3px solid black"
              borderBottom="3px solid black"
            >
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>R</span>ead
            </Tab>
            <Tab
              color="black"
              _hover={{ backgroundColor: "grey.200" }}
              _selected={{ color: "black", borderColor: "#03ab22 " }}
              borderTop="3px solid #efefef"
              bgColor="lightgrey"
              borderLeft="3px solid #efefef"
              borderRight="3px solid black"
              borderBottom="3px solid black"
            >
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>W</span>rite
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
                    _placeholder={{ color: "#06FC99" }}
                    onChange={handleInputChangeName}
                    value={NameInputValue}
                  ></Input>
  
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
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
                    isDisabled={!address || !NameInputValue}
                  >
                   <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Q</span>uery
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
                    _placeholder={{ color: "#06FC99" }}
                    onChange={handleInputChange}
                    value={inputValue}
                  ></Input>
  
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
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
                    isDisabled={!address || !inputValue}
                  >
                   <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Q</span>uery
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
                    _placeholder={{ color: "#06FC99" }}
                    onChange={handleInputReceiver}
                    value={recieverInputValue}
                  ></Input>
  
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
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
                    isDisabled={!address || !recieverInputValue}
                  >
                    <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Q</span>uery
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
                    _placeholder={{ color: "#06FC99" }}
                    onChange={handleInputRegister}
                    value={registerInputValue}
                  ></Input>
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
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
                    isDisabled={!address || !registerInputValue}
                  >
                    <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>R</span>egister
                  </Button>
                  {isButtonClicked && (
    <div style={{ width: '70px', height: '25px', overflowY: 'auto' }}>
        {isSuccess && (
            <div>
                Successfully Registered your Cluster
                <div>
                    <a href={`https://tuber.build/tx/${data?.hash}`}>Tuber</a>
                </div>
            </div>
        )}
    </div>
)}

{isButtonClicked && (
    <div style={{ width: '70px', height: '25px', overflowY: 'auto' }}>
        {isPrepareError && (
            <div>Error: {prepareError?.message}</div>
        )}
    </div>
)}

{isButtonClicked && (
    <div style={{ width: '70px', height: '25px', overflowY: 'auto' }}>
        {isRegisterError && (
            <div>Error: {registerError?.message}</div>
        )}
    </div>
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
                    _placeholder={{ color: "#06FC99" }}
                    value={changeInputValueId}
                    onChange={handleInputChangeId}
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
                    _placeholder={{ color: "#06FC99" }}
                    value={changeInputValueAddress}
                    onChange={handleInputChangeAddress}
                  ></Input>
                  <Button
                    _active={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
                    }}
                    _selected={{
                      backgroundColor: "grey.200",
                      color: "#03ab22 ",
                      borderColor: "#03ab22 ",
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
                    isDisabled={!address || !changeInputValueAddress || !changeInputValueId }
                    onClick={handleChangeAddressClick}
                  >
                    <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>C</span>hange
                  </Button>
                </Flex>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    );
  }
  