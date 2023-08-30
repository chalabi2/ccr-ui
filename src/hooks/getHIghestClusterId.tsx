import { useContractRead } from 'wagmi'

import { clusterRegistryAbi } from "../abis/ClusterRegistryAbi"

export function GetHighestClusterId() {
  let id: any = null

  const clusterFetch = useContractRead({
    address: '0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3',
    abi: clusterRegistryAbi,
    functionName: 'getHighestClusterID',
  });

  if (clusterFetch.error) {
    console.log(clusterFetch.error)
  } else {
    id = clusterFetch.data
  }

  return {
    highestClusterId: id,
    highestClustererror: clusterFetch.error,
  };
   
}