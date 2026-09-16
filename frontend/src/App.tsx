import React, { useState, useEffect } from 'react';
import { Shield, Key, CheckCircle, XCircle, ArrowRight, Loader2, Wallet } from 'lucide-react';
import { connectLaceWallet } from './lib/midnight-client';
import { DAppConnectorAPI } from '@midnight-ntwrk/dapp-connector-api';

type Tab = 'prover' | 'verifier';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('prover');
  const [walletApi, setWalletApi] = useState<DAppConnectorAPI | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletError, setWalletError] = useState('');

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setWalletError('');
      const api = await connectLaceWallet();
      setWalletApi(api);
    } catch (err: any) {
      setWalletError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-neutral-900" />
            <span className="font-semibold tracking-tight text-lg">Threshold</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <button 
              onClick={() => setActiveTab('prover')}
              className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'prover' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Prove
            </button>
            <button 
              onClick={() => setActiveTab('verifier')}
              className={`px-3 py-1.5 rounded-md transition-colors ${activeTab === 'verifier' ? 'bg-neutral-100 text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Verify
            </button>
            <div className="w-px h-4 bg-neutral-300 mx-2" />
            
            <button 
              onClick={handleConnect}
              disabled={isConnecting || !!walletApi}
              className={`flex items-center gap-2 transition-colors ${walletApi ? 'text-green-600' : 'text-neutral-600 hover:text-neutral-900'} disabled:opacity-50`}
            >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
              <span>{walletApi ? 'Lace Connected' : 'Connect Lace'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-xl mx-auto px-6 py-12">
        {walletError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <p>{walletError}</p>
          </div>
        )}
        {activeTab === 'prover' ? <ProverFlow walletApi={walletApi} /> : <VerifierFlow />}
      </main>
    </div>
  );
}

function ProverFlow({ walletApi }: { walletApi: DAppConnectorAPI | null }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'proving' | 'success' | 'error'>('idle');
  const [commitment, setCommitment] = useState('');

  const handleProve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || !walletApi) return;
    
    setStatus('proving');
    
    try {
      // Mocking the proof generation process for now
      // This will be replaced with actual Midnight.js integration
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const val = parseInt(value, 10);
      if (val >= 5000) {
        setStatus('success');
        setCommitment('0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''));
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Prove Qualification</h1>
        <p className="text-neutral-500 mt-2">
          Generate a zero-knowledge proof that your revenue meets the minimum threshold for <span className="font-mono text-xs bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded">rule-1</span>.
        </p>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100">
          <div>
            <div className="text-sm font-medium text-neutral-500">Requirement</div>
            <div className="font-medium mt-0.5">Revenue ≥ $5,000 / mo</div>
          </div>
          <div className="px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
            Active Rule
          </div>
        </div>

        <form onSubmit={handleProve} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="revenue" className="text-sm font-medium block">
              Actual Revenue (Private)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
              <input 
                id="revenue"
                type="number" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="5000"
                className="w-full pl-7 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all disabled:bg-neutral-50 disabled:text-neutral-500"
                disabled={status === 'proving' || !walletApi}
              />
            </div>
            <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-2">
              <Key className="w-3.5 h-3.5" />
              This value never leaves your device.
            </p>
          </div>

          <button 
            type="submit"
            disabled={status === 'proving' || !value || !walletApi}
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'proving' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating Proof...
              </>
            ) : !walletApi ? (
              'Connect Wallet to Continue'
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

function VerifierFlow() {
  const [commitment, setCommitment] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commitment) return;

    setStatus('verifying');

    try {
      // Mocking the verification process for now
      // This will be replaced with actual Midnight.js ledger lookup
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // We'll simulate success if the hash is somewhat long, else error
      if (commitment.length > 30) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (err) {
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
              disabled={status === 'verifying'}
            />
          </div>

          <button 
            type="submit"
            disabled={status === 'verifying' || !commitment}
            className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 rounded-lg font-medium hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {status === 'verifying' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Querying Ledger...
              </>
            ) : (
              <>
                Verify Record
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
            <div className="w-full">
              <h3 className="font-medium text-green-900">Valid Attestation Found</h3>
              <p className="text-sm text-green-700 mt-1">This commitment exists on-chain and represents a passed threshold for <span className="font-mono text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">rule-1</span>.</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-green-100">
                <div>
                  <div className="text-xs font-medium text-green-800 uppercase tracking-wider">Timestamp</div>
                  <div className="text-sm text-green-900 mt-0.5">{new Date().toLocaleDateString()} (Mock)</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-green-800 uppercase tracking-wider">Status</div>
                  <div className="text-sm text-green-900 mt-0.5">Verified</div>
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
              <h3 className="font-medium text-red-900">Record Not Found</h3>
              <p className="text-sm text-red-700 mt-1">
                The provided hash does not correspond to any valid attestation on the ledger. It may be incorrect, or the proof may not have been submitted yet.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
