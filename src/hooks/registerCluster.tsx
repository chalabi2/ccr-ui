
import { useWaitForTransaction } from 'wagmi'

import {
  usePrepareClusterRegistryRegister,
  useClusterRegistryRegister,
} from '../generated'

export function RegisterCluster(name: string | null) {
    console.log('in register',name);
    const {
      config,
    } = usePrepareClusterRegistryRegister({
      args: name ? [name] : undefined,
    });
    const { data, write } = useClusterRegistryRegister(config);
  
    const { isSuccess } = useWaitForTransaction({
      hash: data?.hash,
    });
  

    if (write) {
     write(); 
    }
  
    return {
      hash: isSuccess,
    };
  }
