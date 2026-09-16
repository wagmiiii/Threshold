import { DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

declare global {
  interface Window {
    midnight?: {
      mnLace?: {
        enable(): Promise<DAppConnectorAPI>;
        isEnabled(): Promise<boolean>;
      };
    };
  }
}

export async function connectLaceWallet(): Promise<DAppConnectorAPI> {
  if (!window.midnight?.mnLace) {
    throw new Error('Midnight Lace wallet is not installed.');
  }

  const isEnabled = await window.midnight.mnLace.isEnabled();
  if (isEnabled) {
    // Already connected, we could return it directly, but enable() returns the API
  }

  try {
    const api = await window.midnight.mnLace.enable();
    return api;
  } catch (err) {
    console.error('Wallet connection rejected', err);
    throw new Error('User rejected wallet connection.');
  }
}
