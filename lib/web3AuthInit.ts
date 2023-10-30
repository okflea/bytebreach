import { WalletConnectModal } from "@walletconnect/modal";
import { getWalletConnectV2Settings, WalletConnectV2Adapter } from "@web3auth/wallet-connect-v2-adapter";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTHCLIENT_ID || ""

// const addWalletConnectV2Adapter = async () => {
//
//   const defaultWcSettings = await getWalletConnectV2Settings("eip155", [1], "04309ed1007e77d1f119b85205bb779d");
//   const walletConnectModal = new WalletConnectModal({ projectId: "04309ed1007e77d1f119b85205bb779d" });
//   const walletConnectV2Adapter = new WalletConnectV2Adapter({
//     adapterSettings: { qrcodeModal: walletConnectModal, ...defaultWcSettings.adapterSettings },
//     loginSettings: { ...defaultWcSettings.loginSettings },
//   });
//
//   web3auth.configureAdapter(walletConnectV2Adapter);
// }
// addWalletConnectV2Adapter();

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorer: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};
export const web3auth = new Web3AuthNoModal({
  clientId: clientId,
  web3AuthNetwork: "sapphire_mainnet", // Web3Auth Network
  chainConfig,
});

const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

const openloginAdapter = new OpenloginAdapter({
  privateKeyProvider,
});

web3auth.configureAdapter(openloginAdapter);
