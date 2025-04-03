// src/index.ts
import { html, nothing, render } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { classMap } from "lit-html/directives/class-map.js";
import { ProviderRpcClient as ProviderRpcClient5 } from "everscale-inpage-provider";

// node_modules/@broxus/js-core/dist/esm/AbstractStore.js
import { action, makeObservable, observable, toJS } from "mobx";
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AbstractStore = class {
  /**
   * Store data (e.g. user data, account data, form data etc.)
   * @protected
   */
  _data = {};
  /**
   * Store state (e.g. interface states, notations, errors etc.)
   * @protected
   */
  _state = {};
  constructor(options) {
    makeObservable(this, void 0, options);
  }
  /**
   * Pass `key:value` hash  (one or many keys) of the data.
   * You may also pass individual keys and values to change data.
   * @template {object} T
   * @template {keyof T & string} K
   * @param {Pick<T, K> | ((prevData: Readonly<T>) => Pick<T, K>) | K} keyOrData
   * @param {T[K]} [value]
   */
  setData(keyOrData, value) {
    if (typeof keyOrData === "function") {
      this._data = keyOrData({ ...this._data });
      return this;
    }
    if (typeof keyOrData === "string") {
      this._data = {
        ...this._data,
        [keyOrData]: value
      };
      return this;
    }
    if (typeof keyOrData === "object" && !Array.isArray(keyOrData)) {
      this._data = { ...this._data, ...keyOrData };
    }
    return this;
  }
  /**
   * Pass `key:value` hash  (one or many keys) of the state.
   * You may also pass individual keys and values to change state.
   * @template {object} U
   * @template {keyof U & string} K
   * @param {Pick<U, K> | ((prevState: Readonly<U>) => Pick<U, K>) | K} keyOrState
   * @param {U[K]} [value]
   */
  setState(keyOrState, value) {
    if (typeof keyOrState === "function") {
      this._state = keyOrState({ ...this._state });
      return this;
    }
    if (typeof keyOrState === "string") {
      this._state = {
        ...this._state,
        [keyOrState]: value
      };
      return this;
    }
    if (typeof keyOrState === "object" && !Array.isArray(keyOrState)) {
      this._state = { ...this._state, ...keyOrState };
    }
    return this;
  }
  toJSON() {
    return toJS(this._data);
  }
};
__decorate([
  observable,
  __metadata("design:type", Object)
], AbstractStore.prototype, "_data", void 0);
__decorate([
  observable,
  __metadata("design:type", Object)
], AbstractStore.prototype, "_state", void 0);
__decorate([
  action.bound,
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object, Object]),
  __metadata("design:returntype", Object)
], AbstractStore.prototype, "setData", null);
__decorate([
  action.bound,
  __metadata("design:type", Function),
  __metadata("design:paramtypes", [Object, Object]),
  __metadata("design:returntype", Object)
], AbstractStore.prototype, "setState", null);

// node_modules/@broxus/js-core/dist/esm/types.js
var TvmChains;
(function(TvmChains2) {
  TvmChains2[TvmChains2["EverscaleMainnet"] = 42] = "EverscaleMainnet";
  TvmChains2[TvmChains2["VenomMainnet"] = 1] = "VenomMainnet";
  TvmChains2[TvmChains2["VenomTestnet"] = 1e3] = "VenomTestnet";
  TvmChains2[TvmChains2["TychoTestnet"] = 2e3] = "TychoTestnet";
})(TvmChains || (TvmChains = {}));
var OrderingDirection;
(function(OrderingDirection2) {
  OrderingDirection2["ASCENDING"] = "ASC";
  OrderingDirection2["DESCENDING"] = "DESC";
})(OrderingDirection || (OrderingDirection = {}));

// node_modules/@broxus/js-core/dist/esm/console.js
var successColor = "#3e8c3e";
var warningColor = "#fab254";
var errorColor = "#d33131";
function labelStyle(color = "inherit") {
  return ` background-color: ${color}50; border-left: 3px solid ${color}; border-radius: 2px; display: inline; font-size: 1em; font-weight: bold; line-height: 1rem; padding: 3px 4px 0 4px`;
}
function getScanLink(address, networkId) {
  if (networkId === TvmChains.VenomTestnet.toString()) {
    return `https://testnet.venomscan.com/accounts/${address}`;
  }
  if (networkId === TvmChains.VenomMainnet.toString()) {
    return `https://venomscan.com/accounts/${address}`;
  }
  return `https://everscan.io/accounts/${address}`;
}
var baseLabelStyle = labelStyle("#767676");
var successLabelStyle = labelStyle(successColor);
var warningLabelStyle = labelStyle(warningColor);
var errorLabelStyle = labelStyle(errorColor);
var successTextStyle = `color: ${successColor}; display: inline; font-weight: 400;`;
var warningTextStyle = `color: ${warningColor}; display: inline; font-weight: 400;`;
var errorTextStyle = `color: ${errorColor}; display: inline; font-weight: 400;`;
var inheritTextStyle = "color: inherit; display: inline; font-weight: 400;";

// node_modules/@broxus/js-core/dist/esm/constants.js
import { AddressLiteral } from "everscale-inpage-provider";
var ZeroAddress = new AddressLiteral("0:0000000000000000000000000000000000000000000000000000000000000000");
var DeadAddress = new AddressLiteral("0:000000000000000000000000000000000000000000000000000000000000dead");
var DEFAULT_NATIVE_CURRENCY_DECIMALS = 9;
var SECONDS_IN_YEAR = 3.1536 * 10 ** 7;

// node_modules/@broxus/js-core/dist/esm/utils/get-full-contract-state.js
import { debug, groupCollapsed, groupEnd, sliceAddress } from "@broxus/js-utils";

// node_modules/@broxus/js-core/dist/esm/utils/resolve-tvm-address.js
import { Address as Address2 } from "everscale-inpage-provider";

// node_modules/@broxus/js-core/dist/esm/utils/is-tvm-address.js
import { Address } from "everscale-inpage-provider";
function isTvmAddress(value, allowMasterChain = true) {
  if (value == null) {
    return false;
  }
  if (value instanceof Address) {
    return true;
  }
  if (typeof value === "string") {
    if (allowMasterChain) {
      return /^(?:0|-1):[0-9a-fA-F]{64}$/.test(value);
    }
    return /^0:[0-9a-fA-F]{64}$/.test(value);
  }
  return false;
}

// node_modules/@broxus/js-core/dist/esm/utils/resolve-tvm-address.js
function resolveTvmAddress(address) {
  if (address instanceof Address2) {
    return address;
  }
  if (!isTvmAddress(address)) {
    throw new Error(`${address} is not a TVM-like address`);
  }
  return new Address2(address);
}

// node_modules/@broxus/js-core/dist/esm/utils/get-full-contract-state.js
var cache = /* @__PURE__ */ new Map();
var ttl = 10 * 1e3;
async function getFullContractState(connection, address, options) {
  const addr = address.toString().toLowerCase();
  try {
    const cached = cache.get(addr);
    if (cached && !options?.force) {
      const _ttl = options?.ttl ?? ttl;
      const { state: state2, timestamp } = cached;
      if (Date.now() - timestamp < _ttl && state2) {
        if (true) {
          connection.getProviderState().then((providerState) => {
            groupCollapsed(`%cRPC%c Full contract state [%c${sliceAddress(addr.toString())}%c] retrieved from cache`, baseLabelStyle, inheritTextStyle, successTextStyle, inheritTextStyle);
            debug(`Address: %c${sliceAddress(addr.toString())}%c ${getScanLink(addr.toString(), providerState.networkId.toString())}`, successTextStyle, inheritTextStyle);
            debug(`Last updated at: %c${new Date(timestamp).toLocaleString()}`, inheritTextStyle);
            groupEnd();
          }).catch(() => void 0);
        }
        return await state2;
      }
    }
    const state = connection.getFullContractState({ address: resolveTvmAddress(address) }).then((r) => r.state).catch((e) => {
      cache.delete(addr);
      throw e;
    });
    if (true) {
      connection.getProviderState().then((providerState) => {
        groupCollapsed(`%cRPC%c Request a full contract state [%c${sliceAddress(addr.toString())}%c]`, baseLabelStyle, inheritTextStyle, successTextStyle, inheritTextStyle);
        debug(`Address: %c${sliceAddress(addr.toString())}%c ${getScanLink(addr.toString(), providerState.networkId.toString())}`, successTextStyle, inheritTextStyle);
        groupEnd();
      }).catch(() => void 0);
    }
    cache.set(addr, { state, timestamp: Date.now() });
    return await state;
  } catch (e) {
    cache.delete(addr);
    return void 0;
  }
}

// node_modules/@broxus/js-core/dist/esm/utils/is-addresses-equals.js
function isAddressesEquals(a, b) {
  return a !== void 0 && a?.toString().toLowerCase() === b?.toString().toLowerCase();
}

// node_modules/@broxus/tvm-connect/lib/esm/constants.js
import { AddressLiteral as AddressLiteral2 } from "everscale-inpage-provider";

// node_modules/@broxus/tvm-connect/lib/esm/connectors/EverWallet.js
import { debounce as debounce2, debug as debug3, error as error2, isBrowser, throwException, timeoutPromise as timeoutPromise2 } from "@broxus/js-utils";
import { ProviderRpcClient, StaticProviderAdapter } from "everscale-inpage-provider";
import { action as action3, makeObservable as makeObservable3, runInAction } from "mobx";

// node_modules/@broxus/tvm-connect/lib/esm/core/NekotonConnector.js
import { debounce, debug as debug2, error, groupCollapsed as groupCollapsed2, groupEnd as groupEnd2, timeoutPromise } from "@broxus/js-utils";
import { action as action2, computed, makeObservable as makeObservable2, observable as observable2 } from "mobx";
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata2 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NekotonConnector = class extends AbstractStore {
  params;
  provider;
  constructor(params) {
    super();
    this.params = params;
    makeObservable2(this);
  }
  async connect(networkIdOParams) {
    if (!this.provider) {
      throw new Error("Provider is not defined");
    }
    try {
      this.setState("isConnecting", true);
      await this.provider.hasProvider();
      let state = await timeoutPromise(this.provider.getProviderState(), 2e3).catch(() => void 0);
      if (state?.permissions.accountInteraction) {
        this.setData({
          account: state.permissions.accountInteraction,
          chainId: Math.abs(state.networkId),
          version: state.version
        });
        this.setState({ isConnecting: false, isInitialized: true });
        return;
      }
      await this.stopSubscriptions();
      await this.runSubscriptions();
      const request = await this.provider.requestPermissions({
        permissions: ["basic", "accountInteraction"]
      });
      this.setData("account", request.accountInteraction);
      state = await timeoutPromise(this.provider.getProviderState(), 2e3);
      const receivedNetworkId = Math.abs(state.networkId);
      const desiredNetworkId = typeof networkIdOParams === "number" ? networkIdOParams : networkIdOParams?.networkId;
      const name = this.params?.info?.name ?? this.constructor.name ?? this.constructor.prototype.name;
      if (!desiredNetworkId || receivedNetworkId === desiredNetworkId) {
        this.setData({ chainId: Math.abs(state.networkId), version: state.version });
        this.setState({ isConnecting: false, isInitialized: true });
        debug2(`${name} connection has skipped network switching.`);
        return;
      }
      if (!networkIdOParams) {
        debug2(`${name} connection has skipped network switching. Chain params or chainId is not provided.`);
        return;
      }
      debug2(`${name} connection trying to switch network.`);
      await this.switchNetwork(networkIdOParams).then(async () => {
        await this.connect(networkIdOParams);
      }).catch(async () => {
        await this.connect();
      });
    } catch (e) {
      this.setState("isConnecting", false);
      await this.stopSubscriptions();
      throw e;
    }
  }
  async disconnect(force) {
    if ((this.isConnecting || this.isDisconnecting) && !force) {
      return;
    }
    try {
      this.setState("isDisconnecting", true);
      await this.provider?.disconnect();
      await this.stopSubscriptions();
      this.setData(() => ({}));
    } catch (e) {
      groupCollapsed2(`%c${this.constructor.name}%c Wallet disconnecting error`, errorLabelStyle, inheritTextStyle);
      error(e);
      groupEnd2();
    } finally {
      this.setState("isDisconnecting", false);
    }
  }
  async addAsset(address, type = "tip3_token") {
    if (!this.provider) {
      throw new Error("Provider is not defined");
    }
    if (!this.account?.address) {
      throw new Error("No connected account");
    }
    const result = await this.provider.addAsset({
      account: this.account.address,
      params: { rootContract: resolveTvmAddress(address) },
      type
    });
    return result.newAsset;
  }
  async addNetwork(network, switchNetwork) {
    if (!this.provider) {
      throw new Error("Provider is not defined");
    }
    const result = await this.provider.addNetwork({
      network,
      switchNetwork
    });
    return result.network;
  }
  async switchNetwork(networkIdOParams) {
    if (!this.provider) {
      throw new Error("Provider is not defined");
    }
    const networkId = typeof networkIdOParams === "number" ? networkIdOParams : networkIdOParams.networkId;
    const result = await this.provider.changeNetwork({ networkId });
    if (result.network == null && typeof networkIdOParams !== "number") {
      result.network = await this.addNetwork(networkIdOParams, true);
    }
    return result.network;
  }
  get account() {
    return this._data.account;
  }
  get chainId() {
    return this._data.chainId;
  }
  get version() {
    return this._data.version;
  }
  get isConnecting() {
    return this._state.isConnecting;
  }
  get isDisconnecting() {
    return this._state.isDisconnecting;
  }
  get isInitialized() {
    return this._state.isInitialized;
  }
  get isInitializing() {
    return this._state.isInitializing;
  }
  async handlePermissionsChanged(event) {
    const account = event.permissions.accountInteraction;
    if (!account) {
      debug2(`%c${this.constructor.name}%c Permissions have been revoked. Disconnect dApp!`, warningLabelStyle, inheritTextStyle);
      await this.disconnect();
      return;
    }
    if (isAddressesEquals(this.account?.address, account.address)) {
      return;
    }
    this.setData("account", account);
    debug2(`%c${this.constructor.name}%c Permissions have been changed`, warningLabelStyle, inheritTextStyle);
  }
  async handleNetworkChanged(event) {
    const chainId = Math.abs(event.networkId);
    if (this.chainId === chainId) {
      return;
    }
    debug2(`%c${this.constructor.name}%c Network has been changed from ${this.chainId} to ${chainId}`, warningLabelStyle, inheritTextStyle);
    this.setData("chainId", chainId);
  }
  handleDisconnected(err) {
    this.setData(() => ({}));
    this.params?.onDisconnect?.(err);
  }
  async runSubscriptions() {
    debug2("runSubscriptions", this.constructor.name);
    const [networkChangeSubscription, permissionsSubscription] = await Promise.all([
      this.provider?.subscribe("networkChanged"),
      this.provider?.subscribe("permissionsChanged")
    ]);
    this.networkChangeSubscription = networkChangeSubscription;
    this.permissionsSubscription = permissionsSubscription;
    this.networkChangeSubscription?.on("data", debounce(this.handleNetworkChanged, 400));
    this.permissionsSubscription?.on("data", debounce(this.handlePermissionsChanged, 400));
  }
  async stopSubscriptions() {
    await Promise.allSettled([
      this.networkChangeSubscription?.unsubscribe(),
      this.permissionsSubscription?.unsubscribe()
    ]);
    this.networkChangeSubscription = void 0;
    this.permissionsSubscription = void 0;
  }
  networkChangeSubscription;
  permissionsSubscription;
};
__decorate2([
  observable2,
  __metadata2("design:type", Function)
], NekotonConnector.prototype, "provider", void 0);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Object]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "connect", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Boolean]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "disconnect", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Object, String]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "addAsset", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Object, Boolean]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "addNetwork", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Object]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "switchNetwork", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "account", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "chainId", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "version", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "isConnecting", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "isDisconnecting", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "isInitialized", null);
__decorate2([
  computed,
  __metadata2("design:type", Object),
  __metadata2("design:paramtypes", [])
], NekotonConnector.prototype, "isInitializing", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Object]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "handlePermissionsChanged", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Object]),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "handleNetworkChanged", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", [Error]),
  __metadata2("design:returntype", void 0)
], NekotonConnector.prototype, "handleDisconnected", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", []),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "runSubscriptions", null);
__decorate2([
  action2.bound,
  __metadata2("design:type", Function),
  __metadata2("design:paramtypes", []),
  __metadata2("design:returntype", Promise)
], NekotonConnector.prototype, "stopSubscriptions", null);

// node_modules/@broxus/tvm-connect/lib/esm/types.js
var ConnectionType;
(function(ConnectionType2) {
  ConnectionType2["NEKOTON_WALLET"] = "NEKOTON_WALLET";
  ConnectionType2["NEKOTON_ADAPTER"] = "NEKOTON_ADAPTER";
  ConnectionType2["EXTERNAL_APP"] = "EXTERNAL_APP";
})(ConnectionType || (ConnectionType = {}));
var TvmWalletRdnsList;
(function(TvmWalletRdnsList2) {
  TvmWalletRdnsList2["SPARX_WALLET"] = "com.sparxwallet";
  TvmWalletRdnsList2["SPARX_WALLET_MOBILE"] = "com.broxus.sparx.app";
  TvmWalletRdnsList2["EVER_WALLET"] = "net.everwallet";
  TvmWalletRdnsList2["EVER_WALLET_MOBILE"] = "com.broxus.crystal.app";
  TvmWalletRdnsList2["VENOM_WALLET"] = "com.venomwallet";
  TvmWalletRdnsList2["VENOM_WALLET_MOBILE"] = "com.venom.wallet";
})(TvmWalletRdnsList || (TvmWalletRdnsList = {}));
var TvmProviderEvent;
(function(TvmProviderEvent2) {
  TvmProviderEvent2["REQUEST_PROVIDER"] = "tvm:requestProvider";
  TvmProviderEvent2["ANNOUNCE_PROVIDER"] = "tvm:announceProvider";
})(TvmProviderEvent || (TvmProviderEvent = {}));

// node_modules/@broxus/tvm-connect/lib/esm/connectors/EverWallet.js
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata3 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var everRpcFallback = (opts) => async (client) => new Promise((resolve, reject) => {
  if (client) {
    resolve(client);
  } else {
    const fallbackAttempts = opts?.fallbackAttempts ?? 5;
    let attempts = 0;
    const tryToResolve = debounce2(() => {
      if (attempts >= fallbackAttempts) {
        reject(new Error(`Max attempts (${fallbackAttempts}) is reached.`));
        return;
      }
      if (isBrowser() && window.__ever) {
        debug3("EVER Wallet provider was found with fallback", window.__ever);
        resolve(window.__ever);
        return;
      }
      attempts += 1;
      tryToResolve();
    }, 1e3);
    tryToResolve();
  }
});
var rdnsList = [TvmWalletRdnsList.EVER_WALLET.toString(), TvmWalletRdnsList.EVER_WALLET_MOBILE.toString()];
var EverWallet = class extends NekotonConnector {
  params;
  name = "EverWallet";
  type = ConnectionType.NEKOTON_WALLET;
  constructor(params) {
    super(params);
    this.params = params;
    makeObservable3(this);
    if (params?.autoInit ?? true) {
      this.init().catch(error2);
    }
  }
  async init() {
    let provider;
    const onAnnouncement = async (event) => {
      const { name, rdns } = event.detail.info;
      if (name === "EVER Wallet" || rdns && rdnsList.includes(rdns)) {
        window.removeEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        provider = new ProviderRpcClient({
          provider: new StaticProviderAdapter(event.detail.provider)
        });
        debug3("EVER Wallet provider event was captured", event);
      }
    };
    try {
      this.setState("isInitializing", true);
      if (isBrowser()) {
        window.addEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        window.dispatchEvent(new Event(TvmProviderEvent.REQUEST_PROVIDER));
      }
      if (!provider) {
        if (this.params?.fallbackProviderFactory) {
          provider = await this.params.fallbackProviderFactory();
        } else {
          const fallback = await this.params?.options?.provider ?? await everRpcFallback({
            fallbackAttempts: this.params?.fallbackAttempts
          })();
          if (!fallback) {
            throwException("No provider found");
          }
          provider = new ProviderRpcClient({ provider: fallback });
        }
      }
      const hasProvider = await provider.hasProvider();
      if (!hasProvider) {
        throwException("No provider found");
      }
      runInAction(() => {
        this.provider = provider;
        if (isBrowser()) {
          window.removeEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        }
      });
      const state = await timeoutPromise2(provider.getProviderState(), 2e3);
      if (!state.permissions.accountInteraction) {
        throwException("No permissions returned");
      }
      this.setData({
        account: state.permissions.accountInteraction,
        chainId: Math.abs(state.networkId),
        version: state.version
      });
      this.setState({ isInitialized: true, isInitializing: false });
      await this.runSubscriptions();
    } catch (e) {
      debug3("Ever Wallet could not be pre-connected", e);
      this.setState({ isInitialized: false, isInitializing: false });
      await this.stopSubscriptions();
    }
    return this.provider;
  }
};
__decorate3([
  action3.bound,
  __metadata3("design:type", Function),
  __metadata3("design:paramtypes", []),
  __metadata3("design:returntype", Promise)
], EverWallet.prototype, "init", null);

// node_modules/@broxus/tvm-connect/lib/esm/connectors/SparXWallet.js
import { debounce as debounce3, debug as debug4, error as error3, isBrowser as isBrowser2, throwException as throwException2, timeoutPromise as timeoutPromise3 } from "@broxus/js-utils";
import { ProviderRpcClient as ProviderRpcClient2, StaticProviderAdapter as StaticProviderAdapter2 } from "everscale-inpage-provider";
import { action as action4, makeObservable as makeObservable4, runInAction as runInAction2 } from "mobx";
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata4 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var sparxRpcFallback = (opts) => async (client) => new Promise((resolve, reject) => {
  if (client) {
    resolve(client);
  } else {
    const fallbackAttempts = opts?.fallbackAttempts ?? 5;
    let attempts = 0;
    const tryToResolve = debounce3(() => {
      if (attempts >= fallbackAttempts) {
        reject(new Error(`Max attempts (${fallbackAttempts}) is reached.`));
        return;
      }
      if (isBrowser2() && window.__sparx) {
        debug4("SparX Wallet provider was found with fallback", window.__sparx);
        resolve(window.__sparx);
        return;
      }
      attempts += 1;
      tryToResolve();
    }, 1e3);
    tryToResolve();
  }
});
var rdnsList2 = [TvmWalletRdnsList.SPARX_WALLET.toString(), TvmWalletRdnsList.SPARX_WALLET_MOBILE.toString()];
var SparXWallet = class extends NekotonConnector {
  params;
  name = "SparXWallet";
  type = ConnectionType.NEKOTON_WALLET;
  constructor(params) {
    super(params);
    this.params = params;
    makeObservable4(this);
    if (params?.autoInit ?? true) {
      this.init().catch(error3);
    }
  }
  async init() {
    let provider;
    const onAnnouncement = async (event) => {
      const { name, rdns } = event.detail.info;
      if (name === "SparX Wallet" || rdns && rdnsList2.includes(rdns)) {
        window.removeEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        provider = new ProviderRpcClient2({
          provider: new StaticProviderAdapter2(event.detail.provider)
        });
        console.log('1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        debug4("SparX Wallet provider event was captured", event);
      }
    };
    try {
      this.setState("isInitializing", true);
      if (isBrowser2()) {
        window.addEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        window.dispatchEvent(new Event(TvmProviderEvent.REQUEST_PROVIDER));
      }
      if (!provider) {
        console.log('2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
        if (this.params?.fallbackProviderFactory) {
          console.log('3!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          provider = await this.params.fallbackProviderFactory();
        } else {
          console.log('4!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          const fallback = await this.params?.options?.provider ?? await sparxRpcFallback({
            fallbackAttempts: this.params?.fallbackAttempts
          })();
          if (!fallback) {
            throwException2("No provider found");
          }
          console.log('5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
          provider = new ProviderRpcClient2({ provider: fallback });
        }
      }
      console.log('6!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      const hasProvider = await provider.hasProvider();
      if (!hasProvider) {
        throwException2("No provider found");
      }
      console.log('7!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      runInAction2(() => {
        this.provider = provider;
        if (isBrowser2()) {
          window.removeEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        }
      });
      const state = await timeoutPromise3(provider.getProviderState(), 2e3);
      if (!state.permissions.accountInteraction) {
        throwException2("No permissions returned");
      }
      this.setData({
        account: state.permissions.accountInteraction,
        chainId: Math.abs(state.networkId),
        version: state.version
      });
      this.setState({ isInitialized: true, isInitializing: false });
      await this.runSubscriptions();
    } catch (e) {
      debug4("SparX Wallet could not be pre-connected", e);
      this.setState({ isInitialized: false, isInitializing: false });
      await this.stopSubscriptions();
    }
    return this.provider;
  }
};
__decorate4([
  action4.bound,
  __metadata4("design:type", Function),
  __metadata4("design:paramtypes", []),
  __metadata4("design:returntype", Promise)
], SparXWallet.prototype, "init", null);

// node_modules/@broxus/tvm-connect/lib/esm/connectors/VenomWallet.js
import { debounce as debounce4, debug as debug5, error as error4, isBrowser as isBrowser3, throwException as throwException3, timeoutPromise as timeoutPromise4 } from "@broxus/js-utils";
import { ProviderRpcClient as ProviderRpcClient3, StaticProviderAdapter as StaticProviderAdapter3 } from "everscale-inpage-provider";
import { action as action5, makeObservable as makeObservable5, runInAction as runInAction3 } from "mobx";
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata5 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var venomRpcFallback = (opts) => async (client) => new Promise((resolve, reject) => {
  if (client) {
    resolve(client);
  } else {
    const fallbackAttempts = opts?.fallbackAttempts ?? 5;
    let attempts = 0;
    const tryToResolve = debounce4(() => {
      if (attempts >= fallbackAttempts) {
        reject(new Error(`Max attempts (${fallbackAttempts}) is reached.`));
        return;
      }
      if (isBrowser3() && window.__venom) {
        debug5("Venom Wallet provider was found with fallback", window.__venom);
        resolve(window.__venom);
        return;
      }
      attempts += 1;
      tryToResolve();
    }, 1e3);
    tryToResolve();
  }
});
var rdnsList3 = [TvmWalletRdnsList.VENOM_WALLET.toString(), TvmWalletRdnsList.VENOM_WALLET_MOBILE.toString()];
var VenomWallet = class extends NekotonConnector {
  params;
  name = "VenomWallet";
  type = ConnectionType.NEKOTON_WALLET;
  constructor(params) {
    super(params);
    this.params = params;
    makeObservable5(this);
    if (params?.autoInit ?? true) {
      this.init().catch(error4);
    }
  }
  async init() {
    let provider;
    const onAnnouncement = async (event) => {
      const { name, rdns } = event.detail.info;
      if (name === "Venom Wallet" || rdns && rdnsList3.includes(rdns)) {
        window.removeEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        provider = new ProviderRpcClient3({
          provider: new StaticProviderAdapter3(event.detail.provider)
        });
        debug5("Venom Wallet provider event was captured", event);
      }
    };
    try {
      this.setState("isInitializing", true);
      if (isBrowser3()) {
        window.addEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        window.dispatchEvent(new Event(TvmProviderEvent.REQUEST_PROVIDER));
      }
      if (!provider) {
        if (this.params?.fallbackProviderFactory) {
          provider = await this.params.fallbackProviderFactory();
        } else {
          const fallback = await this.params?.options?.provider ?? await venomRpcFallback({
            fallbackAttempts: this.params?.fallbackAttempts
          })();
          if (!fallback) {
            throwException3("No provider found");
          }
          provider = new ProviderRpcClient3({
            provider: fallback
          });
        }
      }
      const hasProvider = await provider.hasProvider();
      if (!hasProvider) {
        throwException3("No provider found");
      }
      runInAction3(() => {
        this.provider = provider;
        if (isBrowser3()) {
          window.removeEventListener(TvmProviderEvent.ANNOUNCE_PROVIDER, onAnnouncement);
        }
      });
      const state = await timeoutPromise4(provider.getProviderState(), 2e3);
      if (!state.permissions.accountInteraction) {
        throwException3("No permissions returned");
      }
      this.setData({
        account: state.permissions.accountInteraction,
        chainId: Math.abs(state.networkId),
        version: state.version
      });
      this.setState({ isInitialized: true, isInitializing: false });
      await this.runSubscriptions();
    } catch (e) {
      debug5("Venom Wallet could not be pre-connected", e);
      this.setState({ isInitialized: false, isInitializing: false });
      await this.stopSubscriptions();
    }
    return this.provider;
  }
};
__decorate5([
  action5.bound,
  __metadata5("design:type", Function),
  __metadata5("design:paramtypes", []),
  __metadata5("design:returntype", Promise)
], VenomWallet.prototype, "init", null);

// node_modules/@broxus/tvm-connect/lib/esm/constants.js
var TVM_RECENT_CONNECTION = "TVM_RECENT_CONNECTION";
var everscaleIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIxMjAwIiB2aWV3Qm94PSIwIDAgMTIwMCAxMjAwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPHBhdGggZD0iTTAgNjAwQzAgMjY4LjYyOSAyNjguNjMgMCA2MDAgMEM5MzEuMzczIDAgMTIwMCAyNjguNjI5IDEyMDAgNjAwQzEyMDAgOTMxLjM3MyA5MzEuMzczIDEyMDAgNjAwIDEyMDBDMjY4LjYzIDEyMDAgMCA5MzEuMzczIDAgNjAwWiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzQyNF8zKSIvPgogICAgPHBhdGggZD0iTTQ1OS4zIDMwMEwxODcuNSA1NzQuNzkySDYyOS4zMjFWMTAxMi41TDkwMCA3NDEuNjM0VjMwMEg0NTkuM1oiIGZpbGw9IndoaXRlIi8+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfNDI0XzMiIHgxPSIxMjAwIiB5MT0iLTAuMDAwMTI5NTI5IiB4Mj0iMTA5LjEyMyIgeTI9IjEwODIuMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0ZGNjkyMiIvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2MzQ3RjUiLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPC9kZWZzPgo8L3N2Zz4K";
var DEFAULT_NETWORK = {
  chainId: TvmChains.EverscaleMainnet.toString(),
  currency: {
    decimals: DEFAULT_NATIVE_CURRENCY_DECIMALS,
    icon: everscaleIcon,
    name: "Native currency",
    symbol: "EVER",
    wrappedCurrencyAddress: new AddressLiteral2("0:a49cd4e158a9a15555e624759e2e4e766d22600b7800d891e46f9291f044a93d")
  },
  explorer: {
    accountsSubPath: "accounts",
    baseUrl: "https://everscan.io",
    title: "EVERScan",
    transactionsSubPath: "transactions"
  },
  icon: everscaleIcon,
  id: `tvm-${TvmChains.EverscaleMainnet.toString()}`,
  name: "Everscale",
  rpcUrl: "https://jrpc.everwallet.net",
  shortName: "Everscale",
  type: "tvm"
};

// node_modules/@broxus/tvm-connect/lib/esm/hooks/useRecentConnectionMeta.js
import { debug as debug6, isBrowser as isBrowser4, storage } from "@broxus/js-utils";
import * as React from "react";
function isRecentConnectionMeta(value) {
  const meta = { providerId: value.providerId, type: value.type };
  return Boolean(meta.type && ConnectionType[meta.type] && !!meta.providerId);
}
function storeRecentConnectionMeta(meta) {
  if (!meta) {
    storage.remove(TVM_RECENT_CONNECTION);
    return;
  }
  debug6("Store TVM recent connection", meta);
  storage.set(TVM_RECENT_CONNECTION, JSON.stringify(meta));
}
function getRecentConnectionMeta() {
  const value = storage.get(TVM_RECENT_CONNECTION);
  if (!value) {
    return void 0;
  }
  try {
    const json = JSON.parse(value);
    if (isRecentConnectionMeta(json)) {
      return json;
    }
  } catch (e) {
    debug6(e);
  }
  storeRecentConnectionMeta(void 0);
  return void 0;
}

// node_modules/@broxus/tvm-connect/lib/esm/utils/convert-network-to-chain-params.js
function convertNetworkToChainParams(network) {
  return {
    config: {
      explorerBaseUrl: network.explorer.baseUrl,
      symbol: network.currency.symbol
    },
    connection: {
      data: {
        endpoint: network.rpcUrl
      },
      type: "proto"
    },
    name: network.name,
    networkId: Number(network.chainId)
  };
}

// node_modules/@broxus/tvm-connect/lib/esm/utils/get-tvm-provider-platform-link.js
import { getUserAgent, isAndroid, isBrowser as isBrowser5, isChrome, isFirefox, isIos, isMobile } from "@broxus/js-utils";
function getTvmProviderPlatformLink(links) {
  const [platform] = Array.from(/* @__PURE__ */ new Map([
    ["android", isMobile(getUserAgent()) && isAndroid(getUserAgent())],
    ["ios", isMobile(getUserAgent()) && isIos(getUserAgent())],
    ["chromeExtension", isBrowser5() && isChrome(getUserAgent())],
    ["firefoxExtension", isBrowser5() && isFirefox(getUserAgent())]
  ])).find(([, enabled]) => enabled) ?? [];
  return platform ? [platform, links[platform]] : void 0;
}

// node_modules/@broxus/tvm-connect/lib/esm/utils/is-ever-wallet-browser.js
function isEverWalletBrowser(ua) {
  return /(EverWalletBrowser|EverWallet)/g.test(ua);
}

// node_modules/@broxus/tvm-connect/lib/esm/utils/is-sparx-wallet-browser.js
function isSparXWalletBrowser(ua) {
  return /(SparXWalletBrowser|SparXWallet)/g.test(ua);
}

// node_modules/@broxus/tvm-connect/lib/esm/utils/is-venom-wallet-browser.js
function isVenomWalletBrowser(ua) {
  return /(VenomWalletBrowser|VenomWallet)/g.test(ua);
}

// node_modules/@broxus/tvm-connect/lib/esm/services/TvmWalletService.js
import { debug as debug7, error as error5, groupCollapsed as groupCollapsed3, groupEnd as groupEnd3, sliceAddress as sliceAddress2 } from "@broxus/js-utils";
import { ProviderRpcClient as ProviderRpcClient4 } from "everscale-inpage-provider";
import { action as action6, comparer, computed as computed2, makeObservable as makeObservable6, reaction } from "mobx";
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata6 = function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TvmWalletService = class extends AbstractStore {
  params;
  name = "TvmWalletService";
  constructor(params) {
    super();
    this.params = params;
    this.setData(() => ({
      networks: params?.networks || []
    }));
    const hasProvider = params?.providers?.some((provider) => provider.id === params.providerId);
    this.setState(() => ({
      isSyncing: void 0,
      providerId: hasProvider ? params?.providerId : void 0
    }));
    makeObservable6(this);
    if (params?.autoInit ?? true) {
      this._init().catch((reason) => {
        error5("Wallet init failed with an error", reason);
      });
    }
  }
  /**
   * Define current provider connector
   * @returns {NekotonConnector|undefined}
   */
  get connector() {
    return this.providers?.find((config) => config.id === this.providerId)?.connector;
  }
  /**
   * Initialize the wallet connection manually
   * @returns {Promise<ProviderRpcClient | undefined>}
   */
  async init() {
    const provider = await this.connector?.init();
    await this._init();
    return provider;
  }
  /**
   * Manually connect to the wallet
   * @returns {Promise<void>}
   */
  async connect(networkIdOParams) {
    if (this.isConnecting || this.isDisconnecting) {
      return;
    }
    try {
      const defaultNetworkId = typeof networkIdOParams === "number" ? networkIdOParams : networkIdOParams?.networkId ?? this.params?.defaultNetworkId ?? this.network?.chainId ?? TvmChains.EverscaleMainnet;
      const network = this.networks.find((_network) => _network.chainId === defaultNetworkId?.toString());
      const networkParams = typeof networkIdOParams === "object" ? networkIdOParams : network ? convertNetworkToChainParams(network) : void 0;
      await this.connector?.connect(networkParams ?? TvmChains.EverscaleMainnet);
    } catch (e) {
      error5("Tvm Wallet connect error", e);
      throw e;
    }
  }
  /**
   * Manually disconnect from the wallet
   * @param {boolean} force
   * @returns {Promise<void>}
   */
  async disconnect(force) {
    if ((this.isConnecting || this.isDisconnecting) && !force) {
      return;
    }
    try {
      await this.connector?.disconnect();
      this.setData("contractState", void 0);
    } catch (e) {
      error5("TVM Wallet disconnect error", e);
    }
  }
  /**
   * Add custom token asset to the TVM Wallet
   * @param {Address | string} address
   * @param {AssetType} [type]
   */
  async addAsset(address, type = "tip3_token") {
    return this.connector?.addAsset(address, type);
  }
  /**
   * Add new network to the wallet.
   * Supported since version `0.3.40` of the `everscale-inpage-provider`
   * @param {AddNetwork} network
   * @param {boolean} switchNetwork
   * @returns {Promise<Network | null>}
   */
  async addNetwork(network, switchNetwork) {
    if (!this.connector) {
      throw new Error("Provider is not defined");
    }
    return this.connector.addNetwork(network, switchNetwork);
  }
  /**
   * Switch to network by the given networkId or network params.
   * Supported since version `0.3.40` of the `everscale-inpage-provider`
   * @param {number | AddNetwork} networkIdOParams
   * @returns {Promise<Network | null>}
   */
  async switchNetwork(networkIdOParams) {
    if (!this.connector) {
      throw new Error("Provider is not defined");
    }
    return this.connector.switchNetwork(networkIdOParams);
  }
  /**
   * An independent RPC connection that allows you to receive data from the blockchain without being
   * able to send transactions.
   *
   * This connection does not require `accountInteraction` permissions.
   * @returns {ProviderRpcClient}
   */
  get connection() {
    const params = this.params?.connectionParams;
    return params?.factory?.(this.network) ?? new ProviderRpcClient4({
      provider: params?.provider
    });
  }
  /**
   * A Provider that requires a `basic` and `accountInteraction` permissions for the ability to send transactions.
   * @returns {ProviderRpcClient|undefined}
   */
  get provider() {
    return this.connector?.provider;
  }
  /**
   * Returns computed wallet contract state
   * @returns {TvmWalletServiceData["contractState"]}
   */
  get contract() {
    return this._data.contractState;
  }
  /**
   * The list of the supported networks
   * @returns {TvmWalletServiceData["networks"]}
   */
  get networks() {
    return this._data.networks;
  }
  /**
   * Returns `true` if wallet contract is updating
   * @returns {TvmWalletServiceState["isSyncing"]}
   */
  get isSyncing() {
    return this._state.isSyncing;
  }
  /**
   * A unique identifier of the connected wallet (provider)
   * @returns {TvmWalletServiceState["providerId"]}
   */
  get providerId() {
    return this._state.providerId;
  }
  /**
   * Returns computed wallet address value
   * @returns {Address|undefined}
   */
  get address() {
    return this.account?.address;
  }
  /**
   * Returns computed wallet normalized balance value
   * @returns {FullContractState["balance"]}
   */
  get balance() {
    return this.contract?.balance ?? "0";
  }
  /**
   * Returns network native currency
   * @returns {NativeCurrency<Address>}
   */
  get currency() {
    return {
      decimals: this.network?.currency.decimals ?? DEFAULT_NATIVE_CURRENCY_DECIMALS,
      icon: this.network?.currency.icon,
      name: this.network?.currency.name,
      symbol: this.network?.currency.symbol || "EVER",
      wrappedCurrencyAddress: this.network?.currency.wrappedCurrencyAddress ? resolveTvmAddress(this.network.currency.wrappedCurrencyAddress) : void 0
    };
  }
  /**
   * Whether provider is available.
   *
   * That means extension is installed and activated, else `false`
   * @returns {boolean}
   */
  get hasProvider() {
    return this.connector?.provider != null;
  }
  /**
   * Returns `true` if wallet is connected
   * @returns {boolean}
   */
  get isConnected() {
    return this.address !== void 0;
  }
  /**
   * Returns `true` if installed wallet has outdated version
   */
  get isOutdated() {
    const providerConfig = this.params?.providers?.find((config) => config.id === this.providerId);
    if (this.connector?.version === void 0 || providerConfig?.minVersion === void 0) {
      return false;
    }
    const [currentMajorVersion = "0", currentMinorVersion = "0", currentPatchVersion = "0"] = this.connector.version.split(".");
    const [minMajorVersion, minMinorVersion, minPatchVersion] = providerConfig.minVersion.split(".");
    return currentMajorVersion < minMajorVersion || currentMajorVersion <= minMajorVersion && currentMinorVersion < minMinorVersion || currentMajorVersion <= minMajorVersion && currentMinorVersion <= minMinorVersion && currentPatchVersion < minPatchVersion;
  }
  /**
   * Returns `true` if connection to RPC is initialized and connected
   * @returns {boolean}
   */
  get isReady() {
    return !this.isInitializing && !this.isConnecting && !this.isDisconnecting && this.isInitialized === true && this.isConnected;
  }
  /**
   * Checks for supported network
   * @returns {boolean}
   */
  get isUnsupportedNetwork() {
    if (this.chainId == null) {
      return false;
    }
    return !(this.networks?.map((network) => network.chainId)?.includes(this.chainId?.toString()) ?? false);
  }
  /**
   * Returns current network configuration
   * @returns {TvmNetworkConfig|undefined}
   */
  get network() {
    const chainId = this.chainId?.toString() ?? this.params?.defaultNetworkId?.toString();
    return this.networks?.find((network) => network.type === "tvm" && network.chainId === chainId);
  }
  /**
   * Returns details about current connected provider
   * @returns {TvmWalletProviderConfig["info"]|undefined}
   */
  get providerInfo() {
    return this.providers?.find((config) => config.id === this.providerId)?.info;
  }
  /**
   * The list of the supported providers
   * @returns {Readonly<TvmWalletServiceCtorParams["providers"]>}
   */
  get providers() {
    return this.params?.providers ?? [];
  }
  /**
   * Returns computed account
   * @returns {NekotonConnector["account"]}
   */
  get account() {
    return this.connector?.account;
  }
  /**
   * Returns current network chain id
   * @returns {NekotonConnector["chainId"]}
   */
  get chainId() {
    return this.connector?.chainId;
  }
  /**
   * Returns `true` if wallet is connecting
   * @returns {NekotonConnector["isConnecting"]}
   */
  get isConnecting() {
    return this.connector?.isConnecting;
  }
  /**
   * Returns `true` if wallet is disconnecting
   * @returns {NekotonConnector["isDisconnecting"]}
   */
  get isDisconnecting() {
    return this.connector?.isDisconnecting;
  }
  /**
   * Returns `true` if wallet is initialized
   * @returns {NekotonConnector["isInitialized"]}
   */
  get isInitialized() {
    return this.connector?.isInitialized;
  }
  /**
   * Returns `true` if wallet is initializing
   * @returns {NekotonConnector["isInitializing"]}
   */
  get isInitializing() {
    return this.connector?.isInitializing;
  }
  async syncContractState(options) {
    if (!this.provider || !options?.force && this.isSyncing) {
      return;
    }
    try {
      if (this.account?.address) {
        this.setState("isSyncing", this.isSyncing === void 0);
        const state = await getFullContractState(this.provider, this.account.address, { force: options?.force });
        this.setData("contractState", state);
      }
    } catch (e) {
      groupCollapsed3(`%c${this.constructor.name}%c get account full contract state error`, errorLabelStyle, inheritTextStyle);
      error5(e);
      groupEnd3();
      throw e;
    } finally {
      this.setState("isSyncing", false);
    }
  }
  /**
   * Trying to resolve TVM Wallet connection
   * @protected
   */
  async _init() {
    this.accountDisposer = reaction(() => this.address, async (address, prevAddress) => {
      if (!isAddressesEquals(address, prevAddress)) {
        this.setState("isSyncing", void 0);
      }
      if (address) {
        try {
          await this.watch();
        } catch (e) {
          await this.unwatch();
        }
        await this.syncContractState({ force: !this.isSyncing });
      }
    }, { equals: comparer.shallow });
    this.networkDisposer = reaction(() => this.chainId, async (chainId, prevChainId) => {
      if (chainId !== prevChainId || !prevChainId) {
        this.setState("isSyncing", void 0);
        if (this.address) {
          try {
            await this.watch();
          } catch (e) {
            await this.unwatch();
          }
          await this.syncContractState({ force: true });
        }
      }
    });
  }
  async watch() {
    if (!this.provider || !this.address) {
      await this.unwatch();
      return;
    }
    await this.unwatch();
    this.contractSubscriber = new this.provider.Subscriber();
    await this.contractSubscriber.states(this.address).delayed((stream) => {
      debug7(`%c${this.constructor.name}%c subscribes to the user wallet [%c${sliceAddress2(this.address?.toString())}%c] contract updates`, successLabelStyle, inheritTextStyle, successTextStyle, inheritTextStyle);
      return stream.on(async (e) => {
        debug7(`%c${this.constructor.name}%c %ccontractStateChanged%c event was captured for current connected wallet %c${sliceAddress2(this.address?.toString())}`, successLabelStyle, inheritTextStyle, successTextStyle, inheritTextStyle, successTextStyle, e);
        if (isAddressesEquals(this.address, e.address)) {
          await this.syncContractState({ force: !this.isSyncing });
        } else {
          await this.contractSubscriber?.unsubscribe();
          this.contractSubscriber = void 0;
        }
      });
    });
  }
  async unwatch() {
    try {
      await this.contractSubscriber?.unsubscribe();
      debug7(`%c${this.constructor.name}%c unsubscribe from the user wallet [%c${sliceAddress2(this.address?.toString())}%c] contract updates`, successLabelStyle, inheritTextStyle, successTextStyle, inheritTextStyle);
      this.contractSubscriber = void 0;
    } catch (e) {
      this.contractSubscriber = void 0;
    }
  }
  accountDisposer;
  contractSubscriber;
  networkDisposer;
};
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "connector", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", []),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "init", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", [Object]),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "connect", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", [Boolean]),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "disconnect", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", [Object, String]),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "addAsset", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", [Object, Boolean]),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "addNetwork", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", [Object]),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "switchNetwork", null);
__decorate6([
  computed2,
  __metadata6("design:type", ProviderRpcClient4),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "connection", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "provider", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "contract", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "networks", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isSyncing", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "providerId", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "address", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "balance", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "currency", null);
__decorate6([
  computed2,
  __metadata6("design:type", Boolean),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "hasProvider", null);
__decorate6([
  computed2,
  __metadata6("design:type", Boolean),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isConnected", null);
__decorate6([
  computed2,
  __metadata6("design:type", Boolean),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isOutdated", null);
__decorate6([
  computed2,
  __metadata6("design:type", Boolean),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isReady", null);
__decorate6([
  computed2,
  __metadata6("design:type", Boolean),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isUnsupportedNetwork", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "network", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "providerInfo", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "providers", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "account", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "chainId", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isConnecting", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isDisconnecting", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isInitialized", null);
__decorate6([
  computed2,
  __metadata6("design:type", Object),
  __metadata6("design:paramtypes", [])
], TvmWalletService.prototype, "isInitializing", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", [Object]),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "syncContractState", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", []),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "_init", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", []),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "watch", null);
__decorate6([
  action6.bound,
  __metadata6("design:type", Function),
  __metadata6("design:paramtypes", []),
  __metadata6("design:returntype", Promise)
], TvmWalletService.prototype, "unwatch", null);

// src/index.ts
import { autorun, makeAutoObservable, reaction as reaction2, runInAction as runInAction4 } from "mobx";
import { getUserAgent as getUserAgent2, isMobile as isMobile2 } from "@broxus/js-utils";

// src/providers.ts
import { paramsSerializer } from "@broxus/js-utils";

// src/icons/EverWallet.svg
var EverWallet_default = 'data:image/svg+xml,<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">%0A    <path d="M1200 600C1200 268.629 931.371 0 600 0C268.629 0 0 268.629 0 600C0 931.371 268.629 1200 600 1200C931.371 1200 1200 931.371 1200 600Z" fill="%23050B2E"/>%0A    <path d="M459.298 300L187.5 574.793H629.323V1012.5L900 741.632V300H459.298Z" fill="%23C5E4F3"/>%0A</svg>%0A';

// src/icons/SparXWallet.svg
var SparXWallet_default = 'data:image/svg+xml,<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">%0A    <g clip-path="url(%23clip0_465_2)">%0A        <g filter="url(%23filter0_d_465_2)">%0A            <rect x="20" y="20" width="1160" height="1160" rx="580" fill="%230F1224"/>%0A            <path d="M309.86 842.504L267.058 799.702L377.252 689.508C426.589 640.172 426.589 559.884 377.252 510.548L267 400.296L309.802 357.494L420.054 467.746C492.995 540.687 492.995 659.369 420.054 732.31L309.86 842.504Z" fill="url(%23paint0_linear_465_2)"/>%0A            <path d="M799.702 933L689.508 822.806C640.172 773.47 559.885 773.47 510.549 822.806L400.354 933L357.552 890.198L467.747 780.004C540.688 707.063 659.369 707.063 732.31 780.004L842.504 890.198L799.702 933Z" fill="url(%23paint1_linear_465_2)"/>%0A            <path d="M890.198 842.504L780.004 732.31C707.063 659.369 707.063 540.688 780.004 467.747L890.198 357.552L933 400.354L822.806 510.549C773.47 559.885 773.47 640.172 822.806 689.508L933 799.702L890.198 842.504Z" fill="url(%23paint2_linear_465_2)"/>%0A            <path d="M600.019 474.765C552.114 474.765 504.208 456.535 467.747 420.055L357.495 309.802L400.297 267L510.549 377.253C559.885 426.589 640.173 426.589 689.509 377.253L799.703 267.058L842.505 309.86L732.311 420.055C695.83 456.515 647.944 474.765 600.039 474.765H600.019Z" fill="url(%23paint3_linear_465_2)"/>%0A        </g>%0A    </g>%0A    <defs>%0A        <filter id="filter0_d_465_2" x="-25" y="-25" width="1250" height="1250" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">%0A            <feFlood flood-opacity="0" result="BackgroundImageFix"/>%0A            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>%0A            <feOffset/>%0A            <feGaussianBlur stdDeviation="22.5"/>%0A            <feComposite in2="hardAlpha" operator="out"/>%0A            <feColorMatrix type="matrix" values="0 0 0 0 0.164706 0 0 0 0 0.741176 0 0 0 0 0.894118 0 0 0 0.1 0"/>%0A            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_465_2"/>%0A            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_465_2" result="shape"/>%0A        </filter>%0A        <linearGradient id="paint0_linear_465_2" x1="370.873" y1="839.875" x2="370.873" y2="360.955" gradientUnits="userSpaceOnUse">%0A            <stop stop-color="%2300B2E3" stop-opacity="0"/>%0A            <stop offset="0.07" stop-color="%2305B3E3" stop-opacity="0.03"/>%0A            <stop offset="0.19" stop-color="%2313B7E3" stop-opacity="0.13"/>%0A            <stop offset="0.33" stop-color="%232ABDE4" stop-opacity="0.28"/>%0A            <stop offset="0.49" stop-color="%234AC5E5" stop-opacity="0.49"/>%0A            <stop offset="0.66" stop-color="%2373D0E6" stop-opacity="0.75"/>%0A            <stop offset="0.81" stop-color="%239ADBE8"/>%0A        </linearGradient>%0A        <linearGradient id="paint1_linear_465_2" x1="840.687" y1="829.147" x2="358.461" y2="829.147" gradientUnits="userSpaceOnUse">%0A            <stop stop-color="%2300B2E3" stop-opacity="0"/>%0A            <stop offset="0.07" stop-color="%2305B3E3" stop-opacity="0.03"/>%0A            <stop offset="0.19" stop-color="%2313B7E3" stop-opacity="0.13"/>%0A            <stop offset="0.33" stop-color="%232ABDE4" stop-opacity="0.28"/>%0A            <stop offset="0.49" stop-color="%234AC5E5" stop-opacity="0.49"/>%0A            <stop offset="0.66" stop-color="%2373D0E6" stop-opacity="0.75"/>%0A            <stop offset="0.81" stop-color="%239ADBE8"/>%0A        </linearGradient>%0A        <linearGradient id="paint2_linear_465_2" x1="829.147" y1="358.326" x2="829.147" y2="837.033" gradientUnits="userSpaceOnUse">%0A            <stop stop-color="%2300B2E3" stop-opacity="0"/>%0A            <stop offset="0.07" stop-color="%2305B3E3" stop-opacity="0.03"/>%0A            <stop offset="0.19" stop-color="%2313B7E3" stop-opacity="0.13"/>%0A            <stop offset="0.33" stop-color="%232ABDE4" stop-opacity="0.28"/>%0A            <stop offset="0.49" stop-color="%234AC5E5" stop-opacity="0.49"/>%0A            <stop offset="0.66" stop-color="%2373D0E6" stop-opacity="0.75"/>%0A            <stop offset="0.81" stop-color="%239ADBE8"/>%0A        </linearGradient>%0A        <linearGradient id="paint3_linear_465_2" x1="356.296" y1="370.873" x2="842.776" y2="370.873" gradientUnits="userSpaceOnUse">%0A            <stop stop-color="%2300B2E3" stop-opacity="0"/>%0A            <stop offset="0.07" stop-color="%2305B3E3" stop-opacity="0.03"/>%0A            <stop offset="0.19" stop-color="%2313B7E3" stop-opacity="0.13"/>%0A            <stop offset="0.33" stop-color="%232ABDE4" stop-opacity="0.28"/>%0A            <stop offset="0.49" stop-color="%234AC5E5" stop-opacity="0.49"/>%0A            <stop offset="0.66" stop-color="%2373D0E6" stop-opacity="0.75"/>%0A            <stop offset="0.81" stop-color="%239ADBE8"/>%0A        </linearGradient>%0A        <clipPath id="clip0_465_2">%0A            <rect width="1200" height="1200" fill="white"/>%0A        </clipPath>%0A    </defs>%0A</svg>%0A';

// src/icons/VenomWallet.svg
var VenomWallet_default = 'data:image/svg+xml,<svg width="1200" height="1200" viewBox="0 0 1200 1200" fill="none" xmlns="http://www.w3.org/2000/svg">%0A    <path d="M600 1200C931.371 1200 1200 931.371 1200 600C1200 268.629 931.371 0 600 0C268.629 0 0 268.629 0 600C0 931.371 268.629 1200 600 1200Z" fill="%234C5AF5"/>%0A    <path d="M878.122 238.043C855.787 234.439 832.901 236.491 811.575 244.007C790.245 251.525 771.157 264.266 756.071 281.058C727.275 313.2 718.316 355.045 725.231 396.979C731.494 434.794 739.804 473.175 741.675 509.606C744.289 564.476 735.904 619.313 717.011 670.924C699.915 717.619 675.559 753.833 623.362 761.846C619.492 762.454 605.4 762.885 601.395 763.103C597.394 763.32 584.737 762.495 580.822 761.891C528.626 753.878 504.052 717.664 487.001 670.661C468.105 619.054 459.724 564.214 462.337 509.344C464.209 473.044 472.515 434.621 478.777 396.716C485.696 354.785 476.734 312.94 447.941 280.798C432.806 264.018 413.67 251.306 392.302 243.833C370.932 236.361 348.017 234.369 325.671 238.043C258.729 248.916 214.145 308.088 213.754 370.163C213.567 394.08 220.09 417.574 232.588 438C253.423 472.223 287.611 497.171 317.45 523.076C337.197 540.405 371.343 589.571 388.087 642.851C398.224 675.124 406.489 707.828 414.664 740.839C426.15 786.84 441.937 888.465 452.332 934.601C473.081 1026.96 536.587 1047.88 600.221 1050H602.482C666.12 1047.88 730.669 1026.91 751.417 934.556C761.767 888.424 777.514 786.754 789.086 740.794C797.306 707.959 805.526 675.079 815.662 642.81C832.406 589.526 866.554 540.188 886.301 523.035C916.14 497.044 950.284 472.178 971.164 437.955C983.659 417.533 990.184 394.039 989.996 370.12C989.647 307.915 945.236 248.699 878.122 238.043Z" fill="white"/>%0A</svg>%0A';

// src/providers.ts
var sparxWallet = () => ({
  connector: new SparXWallet(),
  id: "SparXWallet",
  info: {
    description: "Your universal tool for TVM",
    icon: SparXWallet_default,
    links: {
      android: "https://play.google.com/store/apps/details?id=com.broxus.sparx.app",
      homepage: "https://sparxwallet.com/",
      chromeExtension: "https://chrome.google.com/webstore/detail/sparx-wallet/aijecocmefcagpmbpjcfjjbcclfmobgf",
      ios: "https://apps.apple.com/us/app/sparx-tvm-wallet/id6670219321",
      universalLink: useUniversalLink("https://l.sparxwallet.com", {
        apn: "com.broxus.sparx.app",
        ibi: "app.sparx.broxus.com",
        isi: "6670219321"
      })
    },
    name: "SparX Wallet"
  }
});
var everWallet = () => ({
  connector: new EverWallet(),
  id: "EverWallet",
  info: {
    description: "Premier wallet for the Everscale",
    icon: EverWallet_default,
    links: {
      android: "https://play.google.com/store/apps/details?id=com.broxus.crystal.app",
      chromeExtension: "https://chrome.google.com/webstore/detail/ever-wallet/cgeeodpfagjceefieflmdfphplkenlfk",
      firefoxExtension: "https://addons.mozilla.org/en-GB/firefox/addon/ever-wallet/",
      homepage: "https://everwallet.net/",
      ios: "https://apps.apple.com/us/app/ever-wallet-everscale/id1581310780"
    },
    name: "Ever Wallet"
  }
});
var venomWallet = () => ({
  connector: new VenomWallet(),
  id: "VenomWallet",
  info: {
    description: "Safe, reliable, and 100% yours",
    icon: VenomWallet_default,
    links: {
      android: "https://play.google.com/store/apps/details?id=com.venom.wallet",
      chromeExtension: "https://chrome.google.com/webstore/detail/venom-wallet/ojggmchlghnjlapmfbnjholfjkiidbch",
      homepage: "https://venomwallet.com/",
      ios: "https://apps.apple.com/app/venom-blockchain-wallet/id1622970889",
      universalLink: useUniversalLink("https://venomwallet.page.link", {
        apn: "com.venom.wallet",
        ibi: "foundation.venom.wallet",
        isi: "1622970889"
      })
    },
    name: "Venom Wallet"
  }
});
function useUniversalLink(basePath, params) {
  return [
    basePath,
    paramsSerializer({
      apn: params.apn,
      ibi: params.ibi,
      isi: params.isi,
      link: params.link || encodeURIComponent(window.location.href)
    })
  ].join("?");
}

// src/networks.ts
var everscaleNetwork = {
  connection: {
    type: "jrpc",
    data: {
      endpoint: "https://jrpc.everwallet.net"
    }
  },
  name: "Everscale",
  networkId: 42,
  config: {
    symbol: "EVER",
    explorerBaseUrl: "https://everscan.io",
    tokensManifestUrl: "https://raw.githubusercontent.com/broxus/ton-assets/master/manifest.json"
  }
};
var venomNetwork = {
  connection: {
    type: "jrpc",
    data: {
      endpoint: "https://jrpc.venom.foundation"
    }
  },
  name: "Everscale",
  networkId: 1,
  config: {
    symbol: "VENOM",
    explorerBaseUrl: "https://venomscan.com",
    tokensManifestUrl: "https://cdn.venom.foundation/assets/mainnet/manifest.json"
  }
};
var hamsterNetwork = {
  connection: {
    type: "proto",
    data: {
      endpoint: "https://rpc.hamster.network"
    }
  },
  name: "Hamster Network",
  networkId: 7,
  config: {
    explorerBaseUrl: "http://hamsterscan.io",
    tokensManifestUrl: "https://raw.githubusercontent.com/broxus/ton-assets/refs/heads/hmstr/manifest.json",
    symbol: "HMSTR"
  }
};
var tychoTestnetNetwork = {
  connection: {
    type: "proto",
    data: {
      endpoint: "https://rpc-testnet.tychoprotocol.com/proto"
    }
  },
  name: "Tycho Testnet",
  networkId: 2e3,
  config: {
    explorerBaseUrl: "https://testnet.tychoprotocol.com",
    tokensManifestUrl: "https://raw.githubusercontent.com/broxus/ton-assets/refs/heads/tychotestnet/manifest.json",
    symbol: "TYCHO"
  }
};
var tonNetwork = {
  connection: {
    type: "jrpc",
    data: {
      endpoint: "https://jrpc-ton.broxus.com"
    }
  },
  name: "TON",
  networkId: -239,
  config: {
    explorerBaseUrl: "https://tonviewer.com",
    tokensManifestUrl: "https://raw.githubusercontent.com/broxus/ton-assets/refs/heads/ton-prod/manifest.json",
    symbol: "TON"
  }
};

// src/connections.ts
var everscaleConnection = {
  id: 42,
  type: "jrpc",
  data: {
    endpoint: "https://jrpc.everwallet.net"
  }
};
var venomConnection = {
  id: 1,
  type: "jrpc",
  data: {
    endpoint: "https://jrpc.venom.foundation"
  }
};
var hamsterConnection = {
  id: 7,
  type: "jrpc",
  data: {
    endpoint: "https://rpc.hamster.network"
  }
};
var tychoTestnetConnection = {
  id: 2e3,
  type: "jrpc",
  data: {
    endpoint: "https://rpc-testnet.tychoprotocol.com"
  }
};
var tonConnection = {
  id: -239,
  type: "jrpc",
  data: {
    endpoint: "https://jrpc-ton.broxus.com"
  }
};

// src/index.ts
var TvmConnectUI = class {
  constructor(params) {
    this.params = params;
    this.root = document.createElement("div");
    this.root.classList.add("tvm-connect-ui-root");
    document.body.append(this.root);
    const meta = getRecentConnectionMeta();
    let providers = [];
    let providerId = "";
    const userAgent = getUserAgent2();
    if (isEverWalletBrowser(userAgent)) {
      const everWalletInstance = everWallet();
      providerId = everWalletInstance.id;
      providers.push(everWalletInstance);
    }
    if (isSparXWalletBrowser(userAgent)) {
      const sparxWalletInstance = sparxWallet();
      providerId = sparxWalletInstance.id;
      providers.push(sparxWalletInstance);
    }
    if (isVenomWalletBrowser(userAgent)) {
      const venomWalletInstance = venomWallet();
      providerId = venomWalletInstance.id;
      providers.push(venomWalletInstance);
    }
    if (!providers.length) {
      const paramsProviders = params.providers;
      providerId = paramsProviders?.length === 1 ? paramsProviders[0].id : meta?.providerId;
      providers = paramsProviders?.length ? paramsProviders : [sparxWallet()];
    }
    this.tvmWallet = new TvmWalletService({
      autoInit: true,
      providers,
      providerId
    });
    this.hasProvider = Object.fromEntries(this.tvmWallet.providers.map((item) => [item.id, false]));
    makeAutoObservable(this, {}, { autoBind: true });
    reaction2(() => this.tvmWallet.providers.map((item) => item.connector.provider), this.syncHasProvider, {
      fireImmediately: true
    });
    reaction2(
      () => this.state,
      () => {
        this.subscribers.forEach((callback) => {
          callback(this.state);
        });
      },
      {
        fireImmediately: true
      }
    );
    reaction2(() => this.tvmWallet.chainId, this.syncNetworkId, {
      fireImmediately: true
    });
    autorun(() => {
      this.render();
    });
  }
  itemTemplate = (provider) => {
    const hasProvider = this.hasProvider[provider.id];
    const isInitializing = this.isInitializing[provider.id];
    const homepage = provider.info.links?.homepage;
    const universalLink = provider.info.links?.universalLink;
    const [_, uri] = getTvmProviderPlatformLink({ ...provider.info.links }) ?? [];
    const meta = getRecentConnectionMeta();
    return html` ${!hasProvider && isInitializing ? html`<button class=${classMap({
      "tvm-connect-ui-item": true,
      "tvm-connect-ui-item-disabled": true
    })} >${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">${provider.info.name}</div><div class="tvm-connect-ui-item-desc">Initializing...</div></div></button>` : this.isMobile && !hasProvider && universalLink ? html`<a target="_blank" rel="noopener noreferrer" class="tvm-connect-ui-item" href=${universalLink}>${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">${provider.info.name}</div>${provider.info.description ? html`<div class="tvm-connect-ui-item-desc">${provider.info.description}</div>` : null}</div></a>` : !hasProvider ? html`<a target="_blank" rel="noopener noreferrer" class=${classMap({
      "tvm-connect-ui-item-disabled": !uri && !homepage,
      "tvm-connect-ui-item": true
    })} href=${ifDefined(uri ?? homepage)} >${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">Install ${provider.info.name}</div>${provider.info.description ? html`<div class="tvm-connect-ui-item-desc">${provider.info.description}</div>` : null}</div></a>` : html`<button class="tvm-connect-ui-item" @click=${this.selectProvider.bind(this, provider.id)}>${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">${provider.info.name}</div>${provider.info.description ? html`<div class="tvm-connect-ui-item-desc">${provider.info.description}</div>` : null}</div>${this.providerId === provider.id ? html`<div class="tvm-connect-ui-item-label">Connected</div>` : meta && meta.providerId === provider.id ? html`<div class="tvm-connect-ui-item-label">Recent</div>` : null}</button>`} `;
  };
  providerTemplate = () => {
    if (!this.selectedProvider) {
      return nothing;
    }
    const disconnect = () => {
      this.disconnect();
      this.resetselectedProvider();
    };
    return html`<button tabindex="0" class="tvm-connect-ui-back" @click=${this.resetselectedProvider}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" ><path d="m289.18-445.54 214.05 213.8q9.85 10.15 10.23 24.19.39 14.04-9.43 24.41-10.49 10.73-24.7 10.66-14.2-.06-24.02-10.55L186.87-451.47q-6.23-5.56-9-12.54-2.77-6.98-2.77-15.69 0-8.04 2.77-14.99 2.77-6.95 9-12.51l269.77-269.77q10.23-10.23 24.18-10.43 13.95-.19 24.54 10.43 9.82 10.59 9.82 24.34 0 13.76-9.82 23.32L289.18-513.13h478.69q13.87 0 23.66 9.8 9.8 9.8 9.8 23.67 0 14.53-9.8 24.33-9.79 9.79-23.66 9.79H289.18Z" /></svg></button><div class="tvm-connect-ui-provider"><div class="tvm-connect-ui-provider-info">${this.selectedProvider.info.icon ? html`<img class="tvm-connect-ui-provider-icon" src=${this.selectedProvider.info.icon} alt="" />` : null} ${this.selectedProvider.info.description ? html`<div class="tvm-connect-ui-provider-desc">${this.selectedProvider.info.description}</div>` : null}</div>${this.providerId === this.selectedProvider.id ? html`<div class="tvm-connect-ui-provider-status"><div class="tvm-connect-ui-provider-hint">${this.selectedProvider.info.name} is connected </div><button class="tvm-connect-ui-provider-btn" @click=${disconnect}>Disconnect</button></div>` : this.selectedProviderError ? html`<div class="tvm-connect-ui-provider-status"><div class="tvm-connect-ui-provider-error">Connection failed</div><div class="tvm-connect-ui-provider-text"> The request was rejected, please try again </div><button class="tvm-connect-ui-provider-btn" @click=${this.selectProvider.bind(this, this.selectedProvider.id)} > Try again </button></div>` : html`<div class="tvm-connect-ui-provider-status"><div class="tvm-connect-ui-provider-hint"> Continue in ${this.selectedProvider.info.name}</div><div class="tvm-connect-ui-provider-text">Accept connection request in the wallet</div></div>`}</div>`;
  };
  rootTemplate = () => {
    const meta = getRecentConnectionMeta();
    return html`<div class="tvm-connect-ui-overlay" @click=${this.hide}></div><div class="tvm-connect-ui-popup"><button class="tvm-connect-ui-close" tabindex="0" @click=${this.hide}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" ><path d="M480-437.85 277.08-234.92q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08L437.85-480 234.92-682.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-522.15l202.92-202.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L522.15-480l202.93 202.92q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L480-437.85Z" /></svg></button><div class="tvm-connect-ui-title">Connect a wallet</div>${this.selectedProvider ? this.providerTemplate() : html`<div class="tvm-connect-ui-list">${Array.from(this.tvmWallet.providers).sort((a, b) => a.id === meta?.providerId ? -1 : b.id === meta?.providerId ? 1 : 0).map((provider) => this.itemTemplate(provider))}</div>`}</div>`;
  };
  tvmWallet;
  root;
  visible = false;
  selectedProviderId = void 0;
  selectedNetwork = void 0;
  hasProvider;
  isMobile = isMobile2(getUserAgent2());
  subscribers = [];
  networkId = void 0;
  selectedProviderError = void 0;
  providers = [];
  resetselectedProvider() {
    this.selectedProviderId = void 0;
    this.selectedProviderError = void 0;
  }
  async selectProvider(providerId) {
    try {
      this.selectedProviderId = providerId;
      if (this.providerId === providerId) {
        return;
      }
      const prevConnector = this.tvmWallet.connector;
      const provider = this.tvmWallet.providers.find((item) => item.id === providerId);
      if (!provider) {
        throw new Error("Provider not founded");
      }
      await provider.connector.connect(this.selectedNetwork);
      if (this.tvmWallet.providerId && providerId !== this.tvmWallet.providerId) {
        await prevConnector?.disconnect(true);
      }
      storeRecentConnectionMeta({
        providerId,
        type: provider.connector.type
      });
      this.tvmWallet.setState("providerId", providerId);
      this.hide();
    } catch (e) {
      this.selectedProviderError = e;
      console.error(e);
    }
  }
  async syncHasProvider() {
    const entries = await Promise.all(
      this.tvmWallet.providers.map(async (item) => {
        try {
          if (item.connector.provider instanceof ProviderRpcClient5 && typeof item.connector.provider?.hasProvider === "function") {
            const hasProvider = await item.connector.provider.hasProvider();
            return [item.id, hasProvider];
          } else {
            return [item.id, item.connector.provider != null];
          }
        } catch (e) {
          console.error(e);
          return [item.id, false];
        }
      })
    );
    runInAction4(() => {
      this.hasProvider = Object.fromEntries(entries);
    });
  }
  async syncNetworkId() {
    let networkId;
    try {
      const provider = this.getProvider();
      const state = await provider?.getProviderState();
      networkId = state?.networkId;
    } catch (e) {
      console.error(e);
    }
    runInAction4(() => {
      this.networkId = networkId;
    });
  }
  render() {
    render(this.rootTemplate(), this.root);
    this.root.classList.toggle("tvm-connect-ui-root-active", this.visible);
  }
  show() {
    this.resetselectedProvider();
    this.visible = true;
  }
  hide() {
    this.visible = false;
  }
  get selectedProvider() {
    return this.tvmWallet.providers.find((item) => item.id === this.selectedProviderId);
  }
  get isInitializing() {
    return Object.fromEntries(
      this.tvmWallet.providers.map((item) => [
        item.id,
        item.connector.isInitializing === void 0 || item.connector.isInitializing
      ])
    );
  }
  get balance() {
    return this.tvmWallet.balance;
  }
  get providerId() {
    return this.isReady ? this.tvmWallet.providerId : void 0;
  }
  get address() {
    return this.tvmWallet.address?.toString();
  }
  get account() {
    return this.tvmWallet.account;
  }
  get isReady() {
    return this.tvmWallet.isReady;
  }
  get isUnsupportedNetwork() {
    if (this.params.networks && this.params.networks.length > 0 && this.networkId !== void 0) {
      return this.params.networks.every((item) => item.networkId !== this.networkId);
    }
    return false;
  }
  get isLoading() {
    return !!this.tvmWallet.isInitializing || !!this.tvmWallet.isConnecting || !!this.tvmWallet.isDisconnecting;
  }
  get state() {
    return {
      providerId: this.providerId,
      networkId: this.networkId,
      account: this.account,
      address: this.address,
      balance: this.balance,
      isReady: this.isReady,
      isLoading: this.isLoading,
      isUnsupportedNetwork: this.isUnsupportedNetwork,
      isPopupVisible: this.visible,
      isInitializing: this.tvmWallet.isInitializing === true,
      isNotInstalled: Object.values(this.isInitializing).every((item) => item === false) && Object.values(this.hasProvider).every((item) => item === false)
    };
  }
  connect(network) {
    this.selectedNetwork = network;
    if (this.tvmWallet.providers.length > 1) {
      this.show();
    } else {
      const provider = this.tvmWallet.providers.at(0);
      if (provider) {
        this.selectProvider(provider.id);
      } else {
        console.warn("Provider must be defined");
      }
    }
  }
  disconnect() {
    this.tvmWallet.disconnect(true);
  }
  switchNetwork(params) {
    return this.tvmWallet.switchNetwork(params);
  }
  addNetwork(params) {
    return this.tvmWallet.addNetwork(params);
  }
  changeAccount() {
    return this.tvmWallet.provider?.changeAccount();
  }
  getProvider() {
    return this.tvmWallet.provider;
  }
  getState() {
    return { ...this.state };
  }
  subscribe(callback) {
    const length = this.subscribers.push(callback);
    callback(this.getState());
    return () => {
      this.subscribers.splice(length - 1, 1);
    };
  }
};
export {
  TvmConnectUI,
  everWallet,
  everscaleConnection,
  everscaleNetwork,
  hamsterConnection,
  hamsterNetwork,
  sparxWallet,
  tonConnection,
  tonNetwork,
  tychoTestnetConnection,
  tychoTestnetNetwork,
  venomConnection,
  venomNetwork,
  venomWallet
};
