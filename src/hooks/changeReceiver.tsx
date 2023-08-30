import { useState } from 'react';
import { useWaitForTransaction } from 'wagmi';
import {
  usePrepareClusterRegistryChangeReceivingAddress,
  useClusterRegistryChangeReceivingAddress,
} from '../generated';

export function useChangeReceivingAddress() {
  const [address, setAddress] = useState('');
  const [id, setId] = useState('');
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareClusterRegistryChangeReceivingAddress({
    args: id && address ? [BigInt(id), `0x${address.substr(2)}`] : [BigInt(-1), '0x605166f88044a4DA4C1Bdd947bAcD7e24D6eaBD3'],
  });
  const { data, error, isError, write } = useClusterRegistryChangeReceivingAddress(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const isSuccessChange = isSuccess

  const changeAddress = () => {
    if (write) {
      write();
    }
  };

  return {
    setAddress,
    setId,
    changeAddress,
    isLoading,
    isSuccessChange,
    error: isPrepareError || isError ? (prepareError || error) : null,
  };
}
