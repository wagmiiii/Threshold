import type * as __compactRuntime from '@midnight-ntwrk/compact-runtime';

export type ThresholdRule = { thresholdValue: bigint; description: Uint8Array };

export type AttestationRecord = { passed: boolean;
                                  ruleId: bigint;
                                  issuedAt: bigint;
                                  expiresAt: bigint
                                };

export type Witnesses<PS> = {
  getPrivateValue(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, bigint];
  getSalt(context: __compactRuntime.WitnessContext<Ledger, PS>): [PS, Uint8Array];
}

export type ImpureCircuits<PS> = {
  attest(context: __compactRuntime.CircuitContext<PS>, ruleId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  verify(context: __compactRuntime.CircuitContext<PS>,
         commitment_0: Uint8Array,
         ruleId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, AttestationRecord>>;
}

export type ProvableCircuits<PS> = {
  attest(context: __compactRuntime.CircuitContext<PS>, ruleId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  verify(context: __compactRuntime.CircuitContext<PS>,
         commitment_0: Uint8Array,
         ruleId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, AttestationRecord>>;
}

export type PureCircuits = {
}

export type Circuits<PS> = {
  attest(context: __compactRuntime.CircuitContext<PS>, ruleId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, Uint8Array>>;
  verify(context: __compactRuntime.CircuitContext<PS>,
         commitment_0: Uint8Array,
         ruleId_0: bigint): Promise<__compactRuntime.CircuitResults<PS, AttestationRecord>>;
}

export type Ledger = {
  rules: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: bigint): boolean;
    lookup(key_0: bigint): ThresholdRule;
    [Symbol.iterator](): Iterator<[bigint, ThresholdRule]>
  };
  attestations: {
    isEmpty(): boolean;
    size(): bigint;
    member(key_0: Uint8Array): boolean;
    lookup(key_0: Uint8Array): AttestationRecord;
    [Symbol.iterator](): Iterator<[Uint8Array, AttestationRecord]>
  };
}

export type ContractReferenceLocations = any;

export declare const contractReferenceLocations : ContractReferenceLocations;

export declare class Contract<PS = any, W extends Witnesses<PS> = Witnesses<PS>> {
  witnesses: W;
  circuits: Circuits<PS>;
  impureCircuits: ImpureCircuits<PS>;
  provableCircuits: ProvableCircuits<PS>;
  constructor(witnesses: W);
  initialState(context: __compactRuntime.ConstructorContext<PS>): Promise<__compactRuntime.ConstructorResult<PS>>;
}

export declare function ledger(state: __compactRuntime.StateValue | __compactRuntime.ChargedState): Ledger;
export declare const pureCircuits: PureCircuits;
export declare const expectedVk: Record<string, string>;
