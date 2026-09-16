import {
  require_browser_ponyfill
} from "./chunk-FOQ6H5BO.js";
import {
  InvalidProtocolSchemeError,
  ZKConfigProvider,
  createProverKey,
  createVerifierKey,
  createZKIR
} from "./chunk-6CV5TO3V.js";
import "./chunk-EEG6CRW3.js";
import {
  assertSafeName
} from "./chunk-ND4UDMAS.js";
import "./chunk-HYB3KTMB.js";
import "./chunk-C2ENP623.js";
import {
  __toESM
} from "./chunk-UIK2IKUR.js";

// node_modules/@midnight-ntwrk/midnight-js-fetch-zk-config-provider/dist/index.mjs
var import_cross_fetch = __toESM(require_browser_ponyfill(), 1);
var KEY_PATH = "keys";
var PROVER_EXT = ".prover";
var VERIFIER_EXT = ".verifier";
var ZKIR_PATH = "zkir";
var ZKIR_EXT = ".bzkir";
var FetchZkConfigProvider = class extends ZKConfigProvider {
  baseURL;
  fetchFunc;
  /**
   * @param baseURL The endpoint to query for ZK artifacts.
   * @param fetchFunc The function to use to execute queries.
   */
  constructor(baseURL, fetchFunc = import_cross_fetch.fetch) {
    super();
    this.baseURL = baseURL;
    this.fetchFunc = fetchFunc;
    const urlObject = new URL(baseURL);
    if (urlObject.protocol !== "http:" && urlObject.protocol !== "https:") {
      throw new InvalidProtocolSchemeError(urlObject.protocol, ["http:", "https:"]);
    }
  }
  async sendRequest(url, circuitId, ext, responseType) {
    assertSafeName(circuitId, "circuitId");
    const base = this.baseURL.endsWith("/") ? this.baseURL : `${this.baseURL}/`;
    const fullUrl = new URL(`${url}/${encodeURIComponent(circuitId)}${ext}`, base).toString();
    const response = await this.fetchFunc(fullUrl, {
      method: "GET"
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch ZK artifact from ${fullUrl}: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("text/html")) {
      throw new Error(`Expected ZK artifact, but received text/html from ${fullUrl}. This usually means the file does not exist and the server returned an SPA fallback page.`);
    }
    return responseType === "text" ? await response.text() : await response.arrayBuffer().then((arrayBuffer) => new Uint8Array(arrayBuffer));
  }
  getProverKey(circuitId) {
    return this.sendRequest(KEY_PATH, circuitId, PROVER_EXT, "arraybuffer").then(createProverKey);
  }
  getVerifierKey(circuitId) {
    return this.sendRequest(KEY_PATH, circuitId, VERIFIER_EXT, "arraybuffer").then(createVerifierKey);
  }
  getZKIR(circuitId) {
    return this.sendRequest(ZKIR_PATH, circuitId, ZKIR_EXT, "arraybuffer").then(createZKIR);
  }
};
export {
  FetchZkConfigProvider
};
//# sourceMappingURL=@midnight-ntwrk_midnight-js-fetch-zk-config-provider.js.map
