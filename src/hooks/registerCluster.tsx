import { useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import {
  usePrepareClusterRegistryRegister,
  useClusterRegistryRegister,
} from '../generated';

export function useRegisterCluster() {
  const [name, setName] = useState<string | null>(null);
  

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareClusterRegistryRegister({
    args: name ? [name] : undefined,
  });
  

  const { 
    data, 
    write, 
    error: registerError, 
    isError: isRegisterError 
  } = useClusterRegistryRegister(config);
  
  const { 
    isSuccess, 
    error: transactionError, 
    isError: isTransactionError 
  } = useWaitForTransaction({
    hash: data?.hash,
  });

  const register = () => {
    if (write) {
      write();
    }
  };

  return {
    data,
    setName,
    register,
    isSuccess,
    prepareError,
    isPrepareError,
    registerError,
    isRegisterError,
    transactionError,
    isTransactionError,
  };
}