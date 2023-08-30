import { useContractRead } from 'wagmi'

import { clusterRegistryAbi } from '../abis/ClusterRegistryAbi'

export function useClusterQuery(id: string | null) {
    
    if (!id) {
        id = "0";
    }
    
    const clusterIdFetch = useContractRead({
      address: '0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3',
      abi: clusterRegistryAbi,
      functionName: 'getClusterByID',
      args: [BigInt(id)],
    });

  
    return {
      clusterName: clusterIdFetch.data,
      error: clusterIdFetch.error,
    };
  }