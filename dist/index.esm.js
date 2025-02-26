// src/index.ts
import { html, nothing, render } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { classMap } from "lit-html/directives/class-map.js";
import { ProviderRpcClient } from "everscale-inpage-provider";
import { getRecentConnectionMeta, getTvmProviderPlatformLink, storeRecentConnectionMeta, TvmWalletService } from "@broxus/tvm-connect/lib";
import { autorun, makeAutoObservable, reaction, runInAction } from "mobx";
import { getUserAgent, isMobile } from "@broxus/js-utils";

// src/providers.ts
import { paramsSerializer } from "@broxus/js-utils";
import { EverWallet, SparXWallet, VenomWallet } from "@broxus/tvm-connect/lib";

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
    const providers = params.providers && params.providers.length > 0 ? params.providers : [sparxWallet()];
    this.tvmWallet = new TvmWalletService({
      autoInit: true,
      providers,
      providerId: providers.length === 1 ? providers[0].id : meta?.providerId
    });
    this.hasProvider = Object.fromEntries(this.tvmWallet.providers.map((item) => [item.id, false]));
    makeAutoObservable(this, {}, { autoBind: true });
    reaction(
      () => this.tvmWallet.providers.map((item) => item.connector.provider),
      this.syncHasProvider,
      { fireImmediately: true }
    );
    reaction(
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
    reaction(
      () => this.tvmWallet.chainId,
      this.syncNetworkId,
      {
        fireImmediately: true
      }
    );
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
    })} >${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">${provider.info.name}</div><div class="tvm-connect-ui-item-desc"> Initializing... </div></div></button>` : this.isMobile && !hasProvider && universalLink ? html`<a target="_blank" rel="noopener noreferrer" class="tvm-connect-ui-item" href=${universalLink} >${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">${provider.info.name}</div>${provider.info.description ? html`<div class="tvm-connect-ui-item-desc">${provider.info.description}</div>` : null}</div></a>` : !hasProvider ? html`<a target="_blank" rel="noopener noreferrer" class=${classMap({ "tvm-connect-ui-item-disabled": !uri && !homepage, "tvm-connect-ui-item": true })} href=${ifDefined(uri ?? homepage)} >${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name"> Install ${provider.info.name}</div>${provider.info.description ? html`<div class="tvm-connect-ui-item-desc">${provider.info.description}</div>` : null}</div></a>` : html`<button class="tvm-connect-ui-item" @click=${this.selectProvider.bind(this, provider.id)} >${provider.info.icon ? html`<img class="tvm-connect-ui-item-icon" src=${provider.info.icon} alt="" />` : null}<div class="tvm-connect-ui-item-info"><div class="tvm-connect-ui-item-name">${provider.info.name}</div>${provider.info.description ? html`<div class="tvm-connect-ui-item-desc">${provider.info.description}</div>` : null}</div>${this.providerId === provider.id ? html`<div class="tvm-connect-ui-item-label"> Connected </div>` : meta && meta.providerId === provider.id ? html`<div class="tvm-connect-ui-item-label"> Recent </div>` : null}</button>`} `;
  };
  providerTemplate = () => {
    if (!this.selectedProvider) {
      return nothing;
    }
    const disconnect = () => {
      this.disconnect();
      this.resetselectedProvider();
    };
    return html`<button tabIndex="0" class="tvm-connect-ui-back" @click=${this.resetselectedProvider} ><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m289.18-445.54 214.05 213.8q9.85 10.15 10.23 24.19.39 14.04-9.43 24.41-10.49 10.73-24.7 10.66-14.2-.06-24.02-10.55L186.87-451.47q-6.23-5.56-9-12.54-2.77-6.98-2.77-15.69 0-8.04 2.77-14.99 2.77-6.95 9-12.51l269.77-269.77q10.23-10.23 24.18-10.43 13.95-.19 24.54 10.43 9.82 10.59 9.82 24.34 0 13.76-9.82 23.32L289.18-513.13h478.69q13.87 0 23.66 9.8 9.8 9.8 9.8 23.67 0 14.53-9.8 24.33-9.79 9.79-23.66 9.79H289.18Z"/></svg></button><div class="tvm-connect-ui-provider"><div class="tvm-connect-ui-provider-info">${this.selectedProvider.info.icon ? html`<img class="tvm-connect-ui-provider-icon" src=${this.selectedProvider.info.icon} alt="" />` : null} ${this.selectedProvider.info.description ? html`<div class="tvm-connect-ui-provider-desc">${this.selectedProvider.info.description}</div>` : null}</div>${this.providerId === this.selectedProvider.id ? html`<div class="tvm-connect-ui-provider-status"><div class="tvm-connect-ui-provider-hint">${this.selectedProvider.info.name} is connected </div><button class="tvm-connect-ui-provider-btn" @click=${disconnect}> Disconnect </button></div>` : this.selectedProviderError ? html`<div class="tvm-connect-ui-provider-status"><div class="tvm-connect-ui-provider-error"> Connection failed </div><div class="tvm-connect-ui-provider-text"> The request was rejected, please try again </div><button class="tvm-connect-ui-provider-btn" @click=${this.selectProvider.bind(this, this.selectedProvider.id)}> Try again </button></div>` : html`<div class="tvm-connect-ui-provider-status"><div class="tvm-connect-ui-provider-hint"> Continue in ${this.selectedProvider.info.name}</div><div class="tvm-connect-ui-provider-text"> Accept connection request in the wallet </div></div>`}</div>`;
  };
  rootTemplate = () => {
    const meta = getRecentConnectionMeta();
    return html`<div class="tvm-connect-ui-overlay" @click=${this.hide}></div><div class="tvm-connect-ui-popup"><button class="tvm-connect-ui-close" tabIndex="0" @click=${this.hide}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-437.85 277.08-234.92q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08L437.85-480 234.92-682.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-522.15l202.92-202.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L522.15-480l202.93 202.92q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L480-437.85Z"/></svg></button><div class="tvm-connect-ui-title">Connect a wallet</div>${this.selectedProvider ? this.providerTemplate() : html`<div class="tvm-connect-ui-list">${Array.from(this.tvmWallet.providers).sort((a, b) => a.id === meta?.providerId ? -1 : b.id === meta?.providerId ? 1 : 0).map((provider) => this.itemTemplate(provider))}</div>`}</div>`;
  };
  tvmWallet;
  root;
  visible = false;
  selectedProviderId = void 0;
  selectedNetwork = void 0;
  hasProvider;
  isMobile = isMobile(getUserAgent());
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
          if (item.connector.provider instanceof ProviderRpcClient && typeof item.connector.provider?.hasProvider === "function") {
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
    runInAction(() => {
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
    runInAction(() => {
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
    return Object.fromEntries(this.tvmWallet.providers.map((item) => [item.id, item.connector.isInitializing === void 0 || item.connector.isInitializing]));
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
    return !!this.tvmWallet.isInitializing || !!this.tvmWallet.isConnecting;
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
