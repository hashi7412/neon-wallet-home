import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useWallet, UseWalletProvider } from 'use-wallet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import mapping from './RouterMapping';
import useStore, { networks } from './useStore';
import Layout from './Layout';

import "./assets/animate.min.css";
import Home from './Pages/home/Index';

function Routers() {
	const wallet = useWallet();
	const { chain } = useStore();

	const chainId = networks[chain].chainId
	const rpcUrl = networks[chain].rpc

	React.useEffect(() => {
		// (async () => {
		// 	const provider = new ethers.providers.Web3Provider(
		// 		wallet.ethereum
		// 	);
		// 	const signer = await provider.getSigner();
		// 	update({
		// 		owner: {balance: wallet.balance, signer: signer}
		// 	});
		// })();
	}, [wallet.status]);

	return (
		<BrowserRouter>
			<Switch>
				<Layout>
					{Object.keys(mapping).map((url, k) => (<Route exact key={k} path={url} component={mapping[url]} />))}
				</Layout>
			</Switch>
			<ToastContainer />
		</BrowserRouter>
	);
}

const App = () => {
	const { chain } = useStore()

	const chainId = networks[chain].chainId
	const rpcUrl = networks[chain].rpc

	return (

		<UseWalletProvider
			connectors={{
				portis: { dAppId: 'my-dapp-id-123-xyz' },

				// injected: {
				// 	chainId,
				// 	supportedChainIds: [chainId], //, NETWORK_CHAIN_IDS.mainnet
				// },

				walletlink: {
					chainId: 1,
					url: rpcUrl,
					appName: "AxisChain Bridge",
				},

				walletconnect: {
					rpc: {
						1: 'https://testnet.neonlink.io',
					}
				}
			}}
		>
			<Routers />
		</UseWalletProvider>
	)
}

export default App;
