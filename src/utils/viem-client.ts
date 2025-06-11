import {
  createPublicClient,
  createWalletClient,
  createTestClient,
  publicActions,
  walletActions,
  http
} from 'viem';
import { defineChain } from 'viem';
import { hardhat } from 'viem/chains';
const { DESCI_NETWORK_NAME, DESCI_RPC_URL, DESCI_CHAIN_ID, DESCI_CURRENCY_SYMBOL, DESCI_CLIENT } =
  import.meta.env;

// 自定义 Hardhat 本地链配置（chainId 默认为 31337）
const chain = defineChain({
  id: DESCI_CHAIN_ID,
  name: DESCI_NETWORK_NAME,
  nativeCurrency: {
    name: 'Ether',
    symbol: DESCI_CURRENCY_SYMBOL,
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [DESCI_RPC_URL]
    },
    public: {
      http: [DESCI_RPC_URL]
    }
  }
});

export const publicClient = DESCI_CLIENT
  ? createTestClient({
      chain: hardhat,
      mode: 'hardhat',
      transport: http()
    }).extend(publicActions)
  : createPublicClient({
      chain,
      transport: http()
    });

export const walletClient = DESCI_CLIENT
  ? createTestClient({
      chain: hardhat,
      mode: 'hardhat',
      transport: http()
    }).extend(walletActions)
  : createWalletClient({
      chain,
      transport: http()
    });
