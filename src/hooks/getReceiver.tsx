import { useContractRead } from 'wagmi'

import { clusterRegistryAbi } from '../abis/ClusterRegistryAbi'

export function GetReceivingAddress(id: string | null) {

    if (!id) {
        id = "0";
    }

  const clusterIdFetch = useContractRead({
    address: '0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3',
    abi: clusterRegistryAbi,
        functionName: 'getReceivingAddress',
        args: [BigInt(id)],
  });


  return {
    receiverAddress: clusterIdFetch.data,
    receiverError: clusterIdFetch.error,
  };
}