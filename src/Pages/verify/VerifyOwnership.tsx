import { ethers } from "ethers";
import React, { useState } from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import useStore, { tips } from "../../useStore";
import VerifyContract from "./VerifyContract";

const Wrapper = styled.div`
	max-width: 600px;
	margin: auto;

	h2 {
		font-size: 2.3em;
		margin-bottom: 1em;
	}

	> div {
		margin-bottom: 1em;

		> *{
			margin-bottom: 1em;
			> label {
				display: flex;
				align-items: center;
				margin-bottom: 0.5em;
			}
		}

		.msg {
			margin-bottom: 1em;
			span {
				display: block;
				margin-bottom: 0.5em;
			}

			> p {
				padding: 1em;
				background-color: #412FAA;
				color: var(--color);
				border-radius: 0.3em;
			}
		}

		label.input-form {
			display: flex;
			flex-direction: column;
			span {
				margin-bottom: 0.5em;
			}
		}
		
		&:last-child {
			text-align: right;
		}
	}
`

interface Status {
	// creator:            string
	owner:              string
	// isCreator:          boolean
	page:               0 | 1
	signHash:           null | string
	isOwnership:        boolean
	msgToSign:          string
	isWalletModal:		boolean
	walletAddress:		string | null
	walletStatus:		string
	loading:			boolean
}

const VerifyOwnership = () => {
	const wallet = useWallet();
	const { address, sendJson, update, history } = useStore();

	const [status, setStatus] = React.useState<Status>({
		// creator:            "",
		owner:              "",
		// isCreator:          true,
		page:               0,
		signHash:           null,
		isOwnership:        false,
		msgToSign:          "",
		isWalletModal:		false,
		walletAddress:		wallet.account,
		walletStatus:		wallet.status,
		loading:			false
	});


	const set = (attr: Partial<Status>) => {
		setStatus({ ...status, ...attr });
	}

	const getContractData = async () => {
		if (address === "") {
			history.push("/token/check-address");
		} else {
			update({ loading: true });
			const res = await sendJson("get-contractdata", address);

			if (res.result) {
				const [creator, owner, msg] = res.result;

				set({
					// creator: creator,
					owner: owner,
					msgToSign: msg
				});
			} else {
				console.log(res.error);
			}
			update({loading: false});
		}
	}

	const connectWeb3 = async () => {
		// if (status.walletStatus !== "connected") {
		// 	set({ isWalletModal: true });
		// } else {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();

			const signature = await signer.signMessage(status.msgToSign);

			set({ signHash: signature, page: 1 });
		// }
	}

	const verifyOwnership = async () => {
		update({loading: true});

		const res = await sendJson("verify-ownership", address, status.owner, status.signHash, status.msgToSign);

		if (res.error) {
			console.log(res.error);
		} else {
			if (res.result) {
				set({ isOwnership: true });
			} else {
				tips("Invalid address");
			}
		}
		update({loading: false});
	}

	const closeModal = () => {
		if (wallet.status === "connected") {
			set({ isWalletModal: false, walletAddress: wallet.account, walletStatus: wallet.status });
		}
	}

	const back = () => {
		set({ page: 0 });
	}

	React.useEffect(() => {
		set({ walletAddress: wallet.account, walletStatus: wallet.status });
		getContractData();
	}, [])

	React.useEffect(() => {
		set({ walletAddress: wallet.account, walletStatus: wallet.status });
		if (wallet.status === "connected") {
			closeModal();
		}

	}, [wallet])

	return (
		<div className="verify-ownership">
			{!status.isOwnership && (
				<Wrapper>
					<h2>Verify Ownership</h2>
					{status.page === 0 && (
						<>
							<div>
								<p>Copy the message below and sign it using the Binance sign message provider of your choice.</p>
								<div>
									<label>
										<span>Contract Owner: {status.owner}</span>
									</label>
								</div>
								<div className="msg">
									<span>Message To Sign</span>
									<p>{status.msgToSign}</p>
								</div>
							</div>
							<div>
								<button className="btn btn-primary p-x-5 mr" onClick={() => set({page: 1})}>
									Sign message manually
								</button>
								<button className="btn btn-primary p-x-5" onClick={connectWeb3}>
									{/* { status.walletStatus === "connected" ? "Sign message" : status.walletStatus === "connecting" ? "Connecting..." : "Connect to web3" } */}
									Sign message
								</button>
							</div>
						</>
					)}
					{status.page === 1 && (
						<>
							<div>
								<div className="msg">
									<span>Contract Owner Address *</span>
									<p>{status.owner}</p>
								</div>
								<div className="msg">
									<span>Signed Message *</span>
									<p>{status.msgToSign}</p>
								</div>
								<label className="input-form">
									<span>Message Signature Hash *</span>
									<input type="text" className="input" value={ status.signHash || "" } onChange={(e) => set({ signHash: e.target.value })} />
								</label>
							</div>
							<div>
								<button className="btn btn-primary p-x-5 mr" onClick={back}>
									Back
								</button>
								<button className="btn btn-primary p-x-5" onClick={verifyOwnership} disabled={status.loading}>
									Verify Ownership
								</button>
							</div>
						</>
					)}
				</Wrapper>
			)}
			{status.isOwnership && (
				<VerifyContract />
			)}
		</div>
	)
}

export default VerifyOwnership;