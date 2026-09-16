import { firstValueFrom, interval, throwError, timeout, catchError } from 'rxjs';
import { filter, map, concatMap, take, tap } from 'rxjs/operators';
import semver from 'semver';
import { toHex, fromHex } from '@midnight-ntwrk/midnight-js-utils';
import { httpClientProofProvider } from '@midnight-ntwrk/midnight-js-http-client-proof-provider';
import { indexerPublicDataProvider } from '@midnight-ntwrk/midnight-js-indexer-public-data-provider';
import { FetchZkConfigProvider } from '@midnight-ntwrk/midnight-js-fetch-zk-config-provider';
import { deployContract, findDeployedContract } from '@midnight-ntwrk/midnight-js-contracts';
import { Transaction } from '@midnight-ntwrk/midnight-js-types';
import { CompiledContract } from '@midnight-ntwrk/midnight-js-protocol/compact-js';

import { Contract, ledger } from '../managed/contract/index.js';

const COMPATIBLE_CONNECTOR_API_VERSION = '4.x';

declare global {
  interface Window {
    midnight?: Record<string, any>;
  }
}

class InMemoryPrivateStateProvider {
  private state: Record<string, any> = {};
  setContractAddress(address: string) {}
  async get(id: string) { return this.state[id]; }
  async set(id: string, state: any) { this.state[id] = state; }
  async remove(id: string) { delete this.state[id]; }
}

export const connectLaceWallet = async (networkId = 'testnet') => {
  return firstValueFrom(
    interval(100).pipe(
      map(() => {
        if (!window.midnight) return undefined;
        return Object.values(window.midnight).find(
          (wallet) =>
            wallet &&
            typeof wallet === 'object' &&
            'apiVersion' in wallet &&
            semver.satisfies(wallet.apiVersion as string, COMPATIBLE_CONNECTOR_API_VERSION)
        );
      }),
      filter((api): api is any => !!api),
      take(1),
      timeout({
        first: 5_000,
        with: () => throwError(() => new Error('Could not find Midnight Lace wallet.'))
      }),
      concatMap(async (initialAPI) => {
        const connectedAPI = await initialAPI.connect(networkId);
        return connectedAPI;
      }),
      timeout({
        first: 10_000,
        with: () => throwError(() => new Error('Wallet connection failed.'))
      }),
      catchError((error, apis) => error ? throwError(() => error) : apis)
    )
  );
};

export const initializeProviders = async (connectedAPI: any, networkId: string = 'testnet') => {
  const config = await connectedAPI.getConfiguration();
  // We explicitly override endpoints for local docker environments
  const indexerUri = 'http://localhost:8088/api/v1/graphql';
  const indexerWsUri = 'ws://localhost:8088/api/v1/graphql/ws';
  const proverServerUri = 'http://localhost:6300';
  
  const zkConfigPath = window.location.origin + '/managed/';
  const keyMaterialProvider = new FetchZkConfigProvider(zkConfigPath, window.fetch.bind(window));
  
  const shieldedAddresses = await connectedAPI.getShieldedAddresses();
  
  return {
    privateStateProvider: new InMemoryPrivateStateProvider(),
    zkConfigProvider: keyMaterialProvider,
    proofProvider: httpClientProofProvider(proverServerUri, keyMaterialProvider),
    publicDataProvider: indexerPublicDataProvider(indexerUri, indexerWsUri),
    walletProvider: {
      getCoinPublicKey: () => shieldedAddresses.shieldedCoinPublicKey,
      getEncryptionPublicKey: () => shieldedAddresses.shieldedEncryptionPublicKey,
      balanceTx: async (tx: any) => {
        const serializedTx = toHex(tx.serialize());
        const received = await connectedAPI.balanceUnsealedTransaction(serializedTx);
        return Transaction.deserialize('signature', 'proof', 'binding', fromHex(received.tx));
      },
    },
    midnightProvider: {
      submitTx: async (tx: any) => {
        await connectedAPI.submitTransaction(toHex(tx.serialize()));
        return tx.identifiers()[0];
      },
    },
  };
};

export const getCompiledContract = () => {
  const witnesses = {
    getPrivateValue: ({ privateState }: any) => [privateState, privateState.privateValue],
    getSalt: ({ privateState }: any) => [privateState, privateState.salt]
  };

  return CompiledContract.make('Threshold', Contract).pipe(
    CompiledContract.withWitnesses(witnesses),
    CompiledContract.withCompiledFileAssets('/managed/contract')
  );
};

export const deployThresholdContract = async (providers: any) => {
  const deployed = await deployContract(providers, {
    compiledContract: getCompiledContract() as any,
    privateStateId: 'thresholdPrivateState',
    initialPrivateState: {
      privateValue: 0n,
      salt: new Uint8Array(32)
    }
  });
  return deployed;
};

export const joinThresholdContract = async (providers: any, contractAddress: string) => {
  const deployed = await findDeployedContract(providers, {
    contractAddress,
    compiledContract: getCompiledContract() as any,
    privateStateId: 'thresholdPrivateState',
    initialPrivateState: {
      privateValue: 0n,
      salt: new Uint8Array(32)
    }
  });
  return deployed;
};
