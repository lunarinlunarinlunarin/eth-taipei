export enum KnownChainId {
  MAINNET = 1,
  GOERLI = 5,

  POLYGON = 137,
  POLYGON_MUMBAI = 80001,

  ARBITRUM_ONE = 42161,
  ARBITRUM_GOERLI = 421613,

  OPTIMISM = 10,
  OPTIMISM_GOERLI = 420,

  AVALANCHE = 43114,

  BSC = 56,
}

export const CHAIN_INFO = {
  [KnownChainId.MAINNET]: {
    chainId: 1,
    docs: "https://ethereum.org/en/developers/docs/",
    explorer: "https://etherscan.io/",
    openSea: "https://opensea.io/assets/ethereum/",
    label: "Ethereum",
    swapLink: "https://app.uniswap.org/#/swap?",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    logo: "/eth_logo.svg",
    chainName: "mainnet",
    disabled: false,
    rpcUrls: ["https://ethereum.publicnode.com"],
  },
  [KnownChainId.AVALANCHE]: {
    chainId: 43114,
    docs: "https://docs.avax.network/",
    explorer: "https://snowtrace.io/",
    label: "Avalanche Network",
    swapLink: "https://traderjoexyz.com/trade?",
    logo: "/avalanche-avax-logo.svg",
    nativeCurrency: { name: "Avalanche", symbol: "AVAX", decimals: 18 },
    disabled: false,
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  },
  [KnownChainId.BSC]: {
    chainId: 56,
    docs: "https://docs.avax.network/",
    explorer: "https://bscscan.com",
    label: "BNB Smart Chain",
    logo: "/bsc.png",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    disabled: true,
    rpcUrls: ["https://bsc-dataseed1.binance.org"],
  },
  [KnownChainId.POLYGON]: {
    chainId: 137,
    bridge: "https://wallet.polygon.technology/bridge",
    docs: "https://polygon.io/",
    logo: "/polygon_matic.svg",
    explorer: "https://polygonscan.com/",
    label: "Polygon",
    swapLink: "https://app.uniswap.org/#/swap?",
    nativeCurrency: { name: "Polygon Matic", symbol: "MATIC", decimals: 18 },
    disabled: true,
    rpcUrls: ["https://polygon-rpc.com", "https://rpc-mainnet.maticvigil.com/"],
  },
  [KnownChainId.POLYGON_MUMBAI]: {
    chainId: 80001,
    bridge: "https://wallet.polygon.technology/bridge",
    docs: "https://polygon.io/",
    logo: "/polygon_matic.svg",
    explorer: "https://mumbai.polygonscan.com/",
    openSea: "https://testnets.opensea.io/assets/mumbai/",
    label: "Polygon Mumbai",
    swapLink: "https://app.uniswap.org/#/swap?",
    chainName: "polygon_mumbai",
    nativeCurrency: {
      name: "Polygon Mumbai Matic",
      symbol: "mMATIC",
      decimals: 18,
    },
    disabled: false,
    rpcUrls: [`https://rpc-mumbai.maticvigil.com`],
  },
  [KnownChainId.GOERLI]: {
    chainId: 5,
    docs: "https://docs.uniswap.org/",
    explorer: "https://goerli.etherscan.io/",
    openSea: "https://testnets.opensea.io/assets/goerli/",
    infoLink: "https://info.uniswap.org/#/",
    label: "Görli",
    swapLink: "https://app.uniswap.org/#/swap?",
    nativeCurrency: { name: "Görli Ether", symbol: "görETH", decimals: 18 },
    logo: "/eth_logo.svg",
    disabled: false,
    rpcUrls: [`https://rpc.ankr.com/eth_goerli`],
  },
  [KnownChainId.ARBITRUM_ONE]: {
    chainId: 42161,
    docs: "https://docs.uniswap.org/",
    explorer: "https://arbiscan.io/",
    infoLink: "https://info.uniswap.org/#/",
    label: "Arbitrum",
    swapLink: "https://app.uniswap.org/#/swap?",
    nativeCurrency: { name: "AEther", symbol: "AETH", decimals: 18 },
    logo: "/arbitrum_logo.svg",
    chainName: "arbitrum_one",
    disabled: false,
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  },
  [KnownChainId.ARBITRUM_GOERLI]: {
    chainId: 421613,
    docs: "https://docs.uniswap.org/",
    explorer: "https://goerli.arbiscan.io/",
    label: "Arbitrum Görli",
    nativeCurrency: { name: "AGörli Ether", symbol: "AgörETH", decimals: 18 },
    logo: "/arbitrum_logo.svg",
    chainName: "arbitrum_one_goerli",
    disabled: false,
    rpcUrls: [`https://goerli-rollup.arbitrum.io/rpc`],
  },
};

export const SALT = "1234567890";
export const USDC_ADDRESS = "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83";

export const TokenList = {
  USDC: {
    address: "0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83",
    logo: "/usdc.webp",
    label: "USDC",
  },
  WETH: {
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    logo: "/eth_logo.svg",
    label: "WETH",
  },
  GNO: {
    address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb",
    logo: "/gnosis.png",
    label: "Gnosis",
  },
};
