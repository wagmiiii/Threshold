import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wallet,
  Activity,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  Lock,
  Key,
  Server
} from 'lucide-react';

import { connectLaceWallet, initializeProviders, deployThresholdContract, joinThresholdContract } from './lib/midnight-client';
import { toHex, fromHex } from '@midnight-ntwrk/midnight-js-utils';

function App() {
  const [activeTab, setActiveTab] = useState<'prover' | 'verifier'>('prover');
  const [walletApi, setWalletApi] = useState<any>(null);
  const [providers, setProviders] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [contractAddress, setContractAddress] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      const api = await connectLaceWallet('testnet');
      setWalletApi(api);
      const initProviders = await initializeProviders(api);
      setProviders(initProviders);
    } catch (err) {
      console.error(err);
      alert('Failed to connect wallet: ' + (err as Error).message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDeployContract = async () => {
    if (!providers) return;
    setIsDeploying(true);
    try {
      const deployed = await deployThresholdContract(providers);
      setContract(deployed);
      setContractAddress(deployed.deployTxData.public.contractAddress);
    } catch (err) {
      console.error(err);
      alert('Failed to deploy contract.');
    } finally {
      setIsDeploying(false);
    }
  };

  const handleJoinContract = async () => {
    if (!providers || !contractAddress) return;
    setIsDeploying(true);
    try {
      const deployed = await joinThresholdContract(providers, contractAddress);
      setContract(deployed);
    } catch (err) {
      console.error(err);
      alert('Failed to join contract.');
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-200">
      <nav className="border-b border-neutral-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            <span className="font-semibold tracking-tight text-lg">Threshold</span>
          </div>
          
          <div className="flex items-center gap-4">
            {contractAddress && (
              <div className="hidden md:flex items-center gap-1.5 text-xs font-mono bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full border border-neutral-200">
                <Server className="w-3.5 h-3.5" />
                {contractAddress.slice(0, 10)}...{contractAddress.slice(-6)}
              </div>
            )}
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting || !!walletApi}
              className="flex items-center gap-2 text-sm font-medium bg-neutral-900 text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wallet className="w-4 h-4" />
              )}
              {walletApi ? 'Connected' : 'Connect Lace'}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6 py-12">
        {!contract && walletApi && (
          <div className="mb-12 p-6 bg-white border border-neutral-200 rounded-xl shadow-sm text-center animate-in fade-in slide-in-from-top-4 duration-500">
            <h2 className="font-semibold mb-2">Contract Initialization</h2>
            <p className="text-sm text-neutral-500 mb-6">Deploy a new Threshold contract to the testnet, or join an existing one.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleDeployContract}
                disabled={isDeploying}
                className="flex-1 bg-neutral-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-neutral-800 disabled:opacity-50"
              >
                {isDeploying ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Deploy New Contract'}
              </button>
              <div className="flex-1 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Contract Address" 
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
                <button 
                  onClick={handleJoinContract}
                  disabled={isDeploying || !contractAddress}
                  className="px-4 bg-white border border-neutral-200 text-neutral-900 py-2 rounded-lg text-sm font-medium hover:bg-neutral-50 disabled:opacity-50"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex p-1 bg-neutral-200/50 rounded-xl mb-8">
          <button
            onClick={() => setActiveTab('prover')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'prover'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Prove (User)
          </button>
          <button
            onClick={() => setActiveTab('verifier')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'verifier'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-700'
            }`}
          >
            Verify (Auditor)
          </button>
        </div>

        {activeTab === 'prover' ? (
          <ProverFlow walletApi={walletApi} contract={contract} providers={providers} />
        ) : (
          <VerifierFlow contract={contract} />
        )}
      </main>
    </div>
  );
}

function ProverFlow({ walletApi, contract, providers }: { walletApi: any, contract: any, providers: any }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'proving' | 'success' | 'error'>('idle');
  const [commitment, setCommitment] = useState('');

  const handleProve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !contract) return;
    setStatus('proving');

    try {
      const privateValue = BigInt(value);
      const salt = crypto.getRandomValues(new Uint8Array(32));
      
      providers.privateStateProvider.set('thresholdPrivateState', { privateValue, salt });
      
      const txData = await contract.callTx.attest(1n); // hardcoded rule ID 1
      
      const resultingCommitment = toHex(txData.public.result);
      setCommitment(resultingCommitment);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      if (err.message?.includes('Failed comparison') || err.message?.includes('Assertion failed')) {
        setStatus('error');
      } else {
        alert('Proof generation failed: ' + err.message);
        setStatus('idle');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Prove Attestation</h1>
        <p className="text-neutral-500 mt-2">
          Generate a local zero-knowledge proof that your private value meets the threshold requirement.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-medium">Selected Rule</span>
          </div>
          <span className="text-xs font-mono bg-white px-2 py-1 rounded border border-neutral-200">
            rule-1
          </span>
        </div>
        
        <form onSubmit={handleProve} className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="privateValue" className="text-sm font-medium">
                Private Value (USD)
              </label>
              <span className="text-xs text-neutral-500">Must be ≥ 5000</span>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-neutral-500 sm:text-sm">$</span>
              </div>
              <input 
                id="privateValue"
                type="number" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="5000"
                className="w-full pl-7 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all disabled:bg-neutral-50 disabled:text-neutral-500"
                disabled={status === 'proving' || !contract}
              />
            </div>
            <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-2">
              <Key className="w-3.5 h-3.5" />
              This value never leaves your device.
            </p>
          </div>

          <button 
            type="submit"
            disabled={status === 'proving' || !value || !contract}
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'proving' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Proof...
              </>
            ) : !walletApi ? (
              'Connect Wallet to Continue'
            ) : !contract ? (
              'Deploy/Join Contract First'
            ) : (
              <>
                Generate Proof & Attest
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {status === 'success' && (
        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium text-green-900">Attestation Successful</h3>
              <p className="text-sm text-green-700 mt-1">Your proof was verified and recorded on the ledger.</p>
              
              <div className="mt-4 space-y-1.5">
                <div className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Commitment Hash</div>
                <div className="font-mono text-xs text-neutral-600 bg-neutral-100 p-2 rounded border border-neutral-200 break-all select-all">
                  {commitment}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium text-red-900">Threshold Not Met</h3>
              <p className="text-sm text-red-700 mt-1">
                Your private value does not meet the rule requirements. No proof was generated and nothing was recorded on-chain.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VerifierFlow({ contract }: { contract: any }) {
  const [commitment, setCommitment] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [record, setRecord] = useState<any>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitment || !contract) return;
    setStatus('verifying');

    try {
      const commBytes = fromHex(commitment.replace('0x', ''));
      const txData = await contract.callTx.verify(commBytes, 1n);
      const result = txData.public.result; // AttestationRecord
      
      setRecord(result);
      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Verify Attestation</h1>
        <p className="text-neutral-500 mt-2">
          Lookup a commitment hash on the ledger to confirm it exists and corresponds to a valid threshold proof.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleVerify} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="commitment" className="text-sm font-medium block">
              Commitment Hash
            </label>
            <input 
              id="commitment"
              type="text" 
              value={commitment}
              onChange={(e) => setCommitment(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all disabled:bg-neutral-50 disabled:text-neutral-500 font-mono text-sm"
              disabled={status === 'verifying' || !contract}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'verifying' || !commitment || !contract}
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'verifying' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Querying Ledger...
              </>
            ) : !contract ? (
              'Deploy/Join Contract First'
            ) : (
              <>
                Verify Record
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {status === 'success' && record && (
        <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
            <div className="w-full">
              <h3 className="font-medium text-green-900">Valid Attestation Found</h3>
              <p className="text-sm text-green-700 mt-1">This commitment exists on-chain and represents a passed threshold for <span className="font-mono text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">rule-{record.ruleId.toString()}</span>.</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-green-100">
                <div>
                  <div className="text-xs font-medium text-green-800 uppercase tracking-wider">Status</div>
                  <div className="text-sm text-green-900 mt-0.5">{record.passed ? 'Verified Pass' : 'Verified Fail'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-white border border-red-200 rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-start gap-3">
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-medium text-red-900">Record Not Found or Invalid</h3>
              <p className="text-sm text-red-700 mt-1">
                The provided hash does not correspond to any valid attestation on the ledger.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
