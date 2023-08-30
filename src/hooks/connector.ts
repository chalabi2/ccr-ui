import { useState } from "react";
import WalletLink from "@coinbase/wallet-sdk";

export const useConnectMetaMask = (): [string | null, () => Promise<void>, (account: string | null) => void, boolean] => {
    const [account, setAccount] = useState<string | null>(null);
    const [isConnectedToCanto, setIsConnectedToCanto] = useState<boolean>(false);

    const connectMetaMask = async () => {

        if (window.ethereum) {

            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                const networkId = await window.ethereum.request({ method: 'net_version' });

                if (networkId === '7700') {
                    setIsConnectedToCanto(true);
                } else {
                    const userResponse = window.confirm("You're not connected to the Canto network. Would you like to switch to or add the Canto network?");
                    if (userResponse) {
                        await addCantoNetworkToMetaMask();
                    }
                }

                setAccount(accounts[0]);
            } catch (error: any) {
                console.error(error)
            }
        } else {

        }
    };

    return [account, connectMetaMask, setAccount, isConnectedToCanto];
};

export const addCantoNetworkToMetaMask = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x1E14',
          chainName: 'Canto',
          nativeCurrency: {
            name: 'Canto', 
            symbol: 'CANTO', 
            decimals: 18
          },
          rpcUrls: ['https://canto.evm.chandrastation.com'], 
        }]
      });
    } catch (error) {
      console.error('Failed to add Canto network:', error);
    }
  };