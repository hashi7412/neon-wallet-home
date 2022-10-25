import React from "react";
import styled from "styled-components";
import useStore, { NF } from '../../useStore'
import Table, { TableHeader } from '../../components/Table';
import { Link } from "react-router-dom";
import { useWallet } from "use-wallet";
import WalletDialog from "../../components/WalletDialog";
import Dialog from "../../components/Dialog";
import VerifyContract from "./VerifyContract";

const Wrapper = styled.div`
	h2 {
		font-size: 2.3em;
		margin-bottom: 1em;
	}
`

const mockup = [
	{
		address: "0x123123123",
		name: "Eth",
		symbol: "Eth",
		decimals: 0,
		status: "verified"
	},
	{
		address: "0x123123123",
		name: "Eth",
		symbol: "Eth",
		decimals: 0,
		status: "verified"
	}
]

interface VerifiedListStatus {
	data: any[]
	count: number
	limit: number
	page: number
	total: number
	activeToken: string
}

const VerifiedList = () => {
	const wallet = useWallet();
	const { sendJson, showLoading } = useStore()
	const [status, setStatus] = React.useState<VerifiedListStatus>({
		data: mockup,
		count: 0,
		limit: 10,
		page: 0,
		total: 0,
		activeToken: ""
	});
	const [walletModal, setWalletModal] = React.useState<boolean>(false);
	const [infoModal, setInfoModal] = React.useState<boolean>(false);

	const onData = (page: number, limit: number) => {
		if (limit !== status.limit) setStatus({ ...status, limit })
		showLoading(true)
		sendJson("get-token", wallet.account, page, limit).then(res => {
			if (res.result) {
				const { data, count, total, page, limit } = res.result as { data: any[], count: number, total: number, page: number, limit: number }
				setStatus({
					...status, 
					data,
					count,
					limit,
					page,
					total,
				})
			}
			showLoading(false)
		})
	}

	const fields = [
		{ key: 'contract', label: 'Address', render: (v: string) => (<a href={`https://scan.neonlink.io/address/${v}`}>{v}</a>) },
		{ key: 'tokenName', label: 'Name', render: (v: string) => (<span>{v}</span>) },
		{ key: 'tokenSymbol', label: 'Symbol', render: (v: string) => (<span>{v}</span>) },
		{ key: 'tokenDecimals', label: 'Decimals', render: (v: number) => (<span>{(v)}</span>) },
		{ key: 'status', label: 'Status', render: (v: string) => (<span className={`upper ${v === "verified" ? "success" : v === "rejected" ? "danger" : ""}`}>{(v)}</span>) },
		{ key: 'contract', label: 'Action', render: (v: string, i, k) => (<button className="btn" onClick={() => showDetails(v)}>Show details</button>) }
	] as TableHeader[]

	const showDetails = (contract:string) => {
		setStatus({...status, activeToken: contract});
		setInfoModal(true);
	}

	React.useEffect(() => {
		if (wallet.status !== "connected") {
			setWalletModal(true);
		}
	}, []);

	React.useEffect(() => {
		if (wallet.status === "connected") {
			setWalletModal(false);
			onData(status.page, status.limit);
		}
	}, [wallet.status]);

	return (
		<>
			<div className="VerifiedList">
				<section className="container">
					<Wrapper>
						<h2>Verified Contracts</h2>
						<div className="flex justify-content-end mb-1">
							<Link to="/token/check-address" className="btn btn-primary d-middle p-x-3">Add +</Link>
						</div>
						<Table
							header={(
								<>
									<div>A total of {NF(status.count)} contract(s) found</div>
								</>
							)}
							page={status.page}
							total={status.total}
							fields={fields}
							data={status.data}
							onData={onData}
						/>
					</Wrapper>
				</section>
			</div>
			{walletModal && (<WalletDialog onClose={() => setWalletModal(false)} />)}
			{infoModal && (
				<Dialog onClose={() => setInfoModal(false)} w={"90%"}>
					<VerifyContract flag={true} addr={status.activeToken} onClose={() => setInfoModal(false)} />
				</Dialog>
			)}
		</>
	)
}

export default VerifiedList;