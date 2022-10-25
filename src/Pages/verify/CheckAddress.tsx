import React from "react";
import styled from "styled-components";
import useStore, { tips, validateAddress } from "../../useStore";

const Wrapper = styled.div`
	max-width: 600px;
	margin: auto;

	h2 {
		font-size: 2.3em;
		margin-bottom: 1em;
	}

	label {
		display: block;
		margin-bottom: 1em;

		span {
			display: inline-block;
			margin-bottom: 1em;
		}
	}

	> div {
		text-align: right;
	}
`

interface Status {
	address: string
	loading: boolean
}

const CheckAddress = () => {
	const { history, getError, sendJson, update } = useStore();

	const [status, setStatus] = React.useState<Status>({
		address: '0xB2478cE31511684B81d234DE6Bbfe423DF0874fB',
		loading: false
	});

	const set = (attrs: Partial<Status>) => setStatus({ ...status, ...attrs })

	const submit = async () => {
		const addr = status.address.trim();
		update({ loading: true });
		if (!validateAddress(addr)) {
			tips(getError(20202, "Token"));
		} else {

			try {
				const res = await sendJson("check-address", addr);

				if (res.result) {
					update({address: addr});
					history.push("/token/verify-ownership");
				} else {
					tips("Invalid contract address");
				}
			} catch (err) {
				console.log(err);
			}
		}
		update({ loading: false });
		set({ loading: false });
	}

	return (
		<React.Fragment>
			<div className="token">
				<section className="container">
					<Wrapper>
						<h2>Check contract address</h2>
						<label>
							<span>Token Address</span>
							<input type="text" className="input input-block" value={status.address} onChange={(e) => set({ address: e.target.value })} placeholder="0x..." />
						</label>
						<div>
							<button className="btn btn-primary p-x-5" onClick={submit} disabled={status.loading}>
								Next
							</button>
						</div>
					</Wrapper>
				</section>
			</div>
		</React.Fragment>
	)
}

export default CheckAddress