import { nothing } from 'lit-html';
import { type AddNetwork, type Network, type Permissions, ProviderRpcClient } from 'everscale-inpage-provider';
import { type TvmWalletProviderConfig, TvmWalletService } from '@broxus/tvm-connect/lib';
export * from './networks';
export * from './providers';
export * from './connections';
type Params = {
    providers?: TvmWalletProviderConfig[];
    networks?: AddNetwork[];
};
export type TvmConnectState = {
    providerId?: string;
    networkId?: number;
    address?: string;
    account?: Permissions['accountInteraction'];
    balance?: string;
    isReady: boolean;
    isLoading: boolean;
    isUnsupportedNetwork: boolean;
    isPopupVisible: boolean;
    isNotInstalled: boolean;
    isInitializing: boolean;
};
export declare class TvmConnectUI {
    protected params: Params;
    protected itemTemplate: (provider: TvmWalletProviderConfig) => import("lit-html").TemplateResult<1>;
    protected providerTemplate: () => typeof nothing | import("lit-html").TemplateResult<1>;
    protected rootTemplate: () => import("lit-html").TemplateResult<1>;
    protected tvmWallet: TvmWalletService;
    protected root: HTMLDivElement;
    protected visible: boolean;
    protected selectedProviderId?: string;
    protected selectedNetwork?: AddNetwork;
    protected hasProvider: {
        [providerId: string]: boolean | undefined;
    };
    protected isMobile: boolean;
    protected subscribers: ((state: TvmConnectState) => void)[];
    protected networkId?: number;
    protected selectedProviderError?: unknown;
    protected providers: TvmWalletProviderConfig[];
    constructor(params: Params);
    protected resetselectedProvider(): void;
    protected selectProvider(providerId: string): Promise<void>;
    protected syncHasProvider(): Promise<void>;
    protected syncNetworkId(): Promise<void>;
    protected render(): void;
    protected show(): void;
    protected hide(): void;
    protected get selectedProvider(): TvmWalletProviderConfig | undefined;
    protected get isInitializing(): {
        [providerId: string]: boolean | undefined;
    };
    protected get balance(): string | undefined;
    protected get providerId(): string | undefined;
    protected get address(): string | undefined;
    protected get account(): Permissions['accountInteraction'] | undefined;
    protected get isReady(): boolean;
    protected get isUnsupportedNetwork(): boolean;
    protected get isLoading(): boolean;
    protected get state(): TvmConnectState;
    connect(network?: AddNetwork): void;
    disconnect(): void;
    switchNetwork(params: AddNetwork): Promise<Network | null>;
    addNetwork(params: AddNetwork): Promise<Network | null>;
    changeAccount(): Promise<void> | undefined;
    getProvider(): ProviderRpcClient | undefined;
    getState(): TvmConnectState;
    subscribe(callback: (state: TvmConnectState) => void): () => void;
}
