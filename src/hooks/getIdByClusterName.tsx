import { useContractRead } from 'wagmi';
import { clusterRegistryAbi } from "../abis/ClusterRegistryAbi";

export function useClusterIdByName(name: string | null) {

    if (!name) {
        name = "";
    }

  const clusterIdFetch = useContractRead({
    address: '0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3',
    abi: clusterRegistryAbi,
    functionName: 'getIdByClusterName',
    args: [name],
  });

  return {
    clusterId: clusterIdFetch.data,
    error: clusterIdFetch.error,
  };
}