import React from "react";
import { useWallet } from "use-wallet";
import Dialog from "./Dialog";

import NeonwalletIcon from "../assets/wallet-icons/metamask.png";
import WalletConnectIcon from "../assets/wallet-icons/walletConnectIcon.svg";
import CoinbaseIcon from "../assets/wallet-icons/coinbaseWalletIcon.svg";

interface Props {
    onClose:                any
}

interface Wallet {
    status: string,
    account: string | null,
    balance: string
}

const WalletDialog = ({
    onClose
}:Props) => {
    const wallet = useWallet();

	const onConnect = (key?: string) => async () => {
		await wallet.connect(key);
	}

    return (
        <>
            <Dialog
                onClose={onClose}
            >
                <div className="p-x-5">
                    <button className="btn btn-block flex d-middle gap2 pl-5 mb-1" onClick={onConnect()}>
                        <img src={NeonwalletIcon} style={{ width: "50px", height: "50px" }} alt="Neon wallet" />
                        <h4>Neon wallet</h4>
                    </button>
                    <button className="btn btn-block flex d-middle gap2 pl-5 mb-1" onClick={onConnect('walletconnect')}>
                        <img src={WalletConnectIcon} style={{ width: "50px", height: "50px" }} alt="walletconnect" />
                        <h4>Wallet Connect</h4>
                    </button>
                    <button className="btn btn-block flex d-middle gap2 pl-5 mb-1" onClick={onConnect('walletlink')}>
                        <img src={CoinbaseIcon} style={{ width: "50px", height: "50px" }} alt="coinbase" />
                        <h4>Coinbase Wallet</h4>
                    </button>
                </div>
            </Dialog>
        </>
    )
}

export default WalletDialog;