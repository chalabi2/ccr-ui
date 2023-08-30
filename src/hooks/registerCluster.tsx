import { useState } from 'react'
import { useWaitForTransaction } from 'wagmi'

import {
  usePrepareClusterRegistryRegister,
  useClusterRegistryRegister,
} from '../generated'

export function RegisterCluster(name: string | null) {
    console.log('in register',name);
    const {
      config,
      error: prepareError,
      isError: isPrepareError,
    } = usePrepareClusterRegistryRegister({
      args: name ? [name] : undefined,
    });
    const { data, error, isError, write } = useClusterRegistryRegister(config);
  
    const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  
    console.log(write)
    if (write) {
     write(); // Directly call the write function here
    }
  
    return {
      hash: isSuccess,
    };
  }
