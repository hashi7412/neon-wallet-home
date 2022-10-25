import React from "react";
import styled from "styled-components";
import { useWallet } from "use-wallet";
import useStore, { tips, validateEmail, validatePhone, validateUrl } from "../../useStore";

import FileInput from "../../components/FileInput";
import Upload from "../../utils/upload";

const Form = styled.div`
	max-width: 960px;
	margin: auto;

	h2 {
		font-size: 2.3em;
		margin-bottom: 1em;
	}

	.form-content {
		display: flex;
		flex-wrap: wrap;

		> div {
			width: 50%;
			padding-left: 2em;
			padding-right: 2em;

			@media (max-width: 767px) {
				width: 100%;
			}
		}
	}
`

const InputControl = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.5em;

	.form-label {
		display: block;
		margin-bottom: 0.5em;
		font-weight: 700;
	}

	input, select {
		display: block;
	}

	.form-label2 {
		display: inline-block;
		width: 120px;
		line-height: 41px;
	}

	p {
		line-height: 41px;
	}
`

const InputControl1 = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
	margin-bottom: 1em;

	@media (max-width: 767px) {
		flex-direction: column;
		padding-left: 2em;
		padding-right: 2em;
		gap: 5px;
	}

	.form-label {
		display: inline-block;
		min-width: 150px;
		width: 150px;
		text-align: right;
		font-weight: 700;

		@media (max-width: 767px) {
			text-align: left;
			width: auto;
		}
	}

	code {
		display: inline-block;
		font-size: 1.1em;

		@media (max-width: 767px) {
			font-size: 1em;
		}
	}

	input, div, select {
		flex: 1;
	}
`

interface TokenStatus {
	companyName:					string
	officialWebsite:				string
	twitterHandle:					string
	companyresidentialaddress:		string
	phonenumber:					string
	businessEmail:					string
	businesslicensescreenshot:		string
	tokenName:						string
	tokenSymbol:					string
	tokenDecimals:					string
	tokenTotalSupply:				string
	tokenimage:						string
	tokentype:						string
	totalmarketcap:					string
	marketpair:						string
	socialUrl:						string[]
	status:							string
}

const VerifyContract = ({flag, addr, onClose}: {flag?: boolean, addr?: string, onClose?: any}) => {
	const wallet = useWallet();
	const { address, account, getError, history, sendJson, update } = useStore();

	const [status, setStatus] = React.useState<TokenStatus>({
		companyName:					"",
		officialWebsite:				"",
		twitterHandle:					"",
		companyresidentialaddress:		"",
		phonenumber:					"",
		businessEmail:					"",
		businesslicensescreenshot:		"",
		tokenName:						"",
		tokenSymbol:					"",
		tokenDecimals:					"",
		tokenTotalSupply:				"",
		tokenimage:						"",
		tokentype:						"",
		totalmarketcap:					"",
		marketpair:						"",
		socialUrl:						["", "", ""],
		status:							"pending"
	});
	const set = (attr: Partial<TokenStatus>) => {
		setStatus({...status, ...attr});
	}

	const [screenshot, setScreenshot] = React.useState<any>(null);
	const [tokenimg, setTokenimg] = React.useState<any>(null);

	const submit = async () => {
		if (status.companyName === "") 						{ tips(getError(20200, "Company name"));}
		else if (status.officialWebsite === "") 			{ tips(getError(20200, "Official Website")); }
		else if (!validateUrl(status.officialWebsite))		{ tips(getError(20203, "Official Website")); }
		else if (status.twitterHandle === "") 				{ tips(getError(20200, "Official Twitter Handle")); }
		else if (!validateUrl(status.twitterHandle))		{ tips(getError(20203, "Official Twitter Handle")); }
		else if (status.companyresidentialaddress === "") 	{ tips(getError(20200, "Company residential address")); }
		else if (status.phonenumber === "") 				{ tips(getError(20205, "")); }
		else if (!validatePhone(status.phonenumber))		{ tips(getError(20200, "Phone number")); }
		else if (status.businessEmail === "") 				{ tips(getError(20200, "Business Email")); }
		else if (!validateEmail(status.businessEmail)) 		{ tips(getError(20201, "Business")); }
		else if (status.businesslicensescreenshot === "") 	{ tips(getError(20200, "Business license screenshot")); }
		else if (status.tokenimage === "") 					{ tips(getError(20200, "Token image")); }
		else if (status.tokentype === "") 					{ tips(getError(20200, "Token type")); }
		else if (status.totalmarketcap === "") 				{ tips(getError(20200, "Token marketcap")); }
		else if (status.marketpair === "") 					{ tips(getError(20200, "Market pair")); }
		else if (!validateUrl(status.marketpair))			{ tips(getError(20203, "Market pair")); }
		else if (status.socialUrl[0] === "" || status.socialUrl[1] === "" || status.socialUrl[2] === "") { tips("Social urls must have three"); }
		else {
			for(let i in status.socialUrl) {
				if (status.socialUrl[i] === "") {
					tips(getError(20203, "Social url"));
					return;
				}
				if (!validateUrl(status.socialUrl[i])) {
					tips(getError(20200, "Social urls"));
					return;
				}
			}

			if (!flag) {
				const res = await sendJson("insert-token", 
					address,
					wallet.account,
					status.companyName,
					status.officialWebsite,
					status.twitterHandle,
					status.companyresidentialaddress,
					status.phonenumber,
					status.businessEmail,
					status.businesslicensescreenshot,
					status.tokenName,
					status.tokenSymbol,
					status.tokenDecimals,
					status.tokenTotalSupply,
					status.tokenimage,
					status.tokentype,
					status.totalmarketcap,
					status.marketpair,
					status.socialUrl
				);

				if (res.result) {
					await Upload({file: screenshot, filename: res.result[0], send: sendJson});
					await Upload({file: tokenimg, filename: res.result[1], send: sendJson});
					tips("Token verified successful");
					history.push("/verifiedlist");
					if(onClose) onClose();
				} else {
					console.log(res.error);
					return;
				}
			} else {
				const res = await sendJson("update-token", 
					addr,
					account,
					status.companyName,
					status.officialWebsite,
					status.twitterHandle,
					status.companyresidentialaddress,
					status.phonenumber,
					status.businessEmail,
					status.businesslicensescreenshot,
					status.tokenName,
					status.tokenSymbol,
					status.tokenDecimals,
					status.tokenTotalSupply,
					status.tokenimage,
					status.tokentype,
					status.totalmarketcap,
					status.marketpair,
					status.socialUrl
				);

				if (res.result) {
					if (screenshot !== null) {
						await Upload({file: screenshot, filename: res.result[0], send: sendJson, opt: {contract: address || "", key: "license"}});
					}
					if(tokenimg !== null) {
						await Upload({file: tokenimg, filename: res.result[1], send: sendJson, opt: {contract: address || "", key: "tokenimage"}});
					}
					tips("Token verified successful");
					history.push("/verifiedlist");
					if(onClose) onClose();
				} else {
					console.log(res.error);
					return;
				}
			}
		}
	}

	const onInputChangeHandle = (e:any) => {
		setStatus({ ...status, [e.target.name]: e.target.value });
	}

	const changeState = (key:string, value:any) => {
		set({[key]: value});
	}

	const onInputSocialUrl = (value, index) => {
		let urls = [...status.socialUrl];
		urls[index] = value;
		set({socialUrl: urls});
	}

	const addSocialurlInput = () => {
		let urls = [...status.socialUrl];
		urls.push("");
		set({socialUrl: urls});
	}

	const removeSocialurlInput = (index) => {
		let urls = [...status.socialUrl];
		for (let i = index; i < status.socialUrl.length; i++) {
			urls[i] = urls[i + 1];
		}
		urls.pop();
		set({socialUrl: urls});
	}

	const getContractInfo = async () => {
		update({loading: true});
		if (!flag) {
			const res = await sendJson("get-contractinfo", address);

			if(res.result) {
				const [ name, symbol, decimals, totalSupply ] = res.result;

				set({
					tokenName: name || "",
					tokenSymbol: symbol || "",
					tokenDecimals: decimals || "",
					tokenTotalSupply: totalSupply || ""
				});
			} else {
				console.log(res.error);
			}
		} else {
			const res = await sendJson("get-token-one", addr);

			if(res.result) {
				const result = res.result;
				set({
					companyName:					result.companyName,
					officialWebsite:				result.officialWebsite,
					twitterHandle:					result.twitterHandle,
					companyresidentialaddress:		result.companyresidentialaddress,
					phonenumber:					result.phonenumber,
					businessEmail:					result.businessEmail,
					businesslicensescreenshot:		result.businesslicensescreenshot,
					tokenName:						result.tokenName,
					tokenSymbol:					result.tokenSymbol,
					tokenDecimals:					result.tokenDecimals,
					tokenTotalSupply:				result.tokenTotalSupply,
					tokenimage:						result.tokenimage,
					tokentype:						result.tokentype,
					totalmarketcap:					result.totalmarketcap,
					marketpair:						result.marketpair,
					socialUrl:						result.socialUrl,
					status:							result.status
				})
			}
		}
		update({loading: false});
	}

	React.useEffect(() => {
		getContractInfo();
	}, [])

	return (
		<Form action="">
			<h2 className="text-center">Token verify</h2>
			<div className="mb-3">
				<InputControl1>
					<span className="form-label"><strong>Contract Owner:</strong></span>
					<code>{ wallet.account }</code>
				</InputControl1>
				<InputControl1>
					<span className="form-label"><strong>Contract Address:</strong></span>
					<code>{ flag ? address : addr }</code>
				</InputControl1>
			</div>
			<div className="form-content">
				<div>
					<InputControl>
						<span className="form-label">Company Name:</span>
						<input className="input" value={status.companyName} name="companyName" onChange={onInputChangeHandle} type="text" placeholder="Walmart" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Official website:</span>
						<input className="input" value={status.officialWebsite} name="officialWebsite" onChange={onInputChangeHandle} type="url" placeholder="https://www.walmart.com/" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Official twitter handle:</span>
						<input className="input" value={status.twitterHandle} name="twitterHandle" onChange={onInputChangeHandle} type="url" placeholder="https://www.twitter.com/" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Company residential address:</span>
						<input className="input" value={status.companyresidentialaddress} name="companyresidentialaddress" onChange={onInputChangeHandle} type="text" placeholder="Bentonville, Arkansas" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Phone number:</span>
						<input className="input" value={status.phonenumber} name="phonenumber" onChange={onInputChangeHandle} type="tel" placeholder="+208 883 8828" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Business Email:</span>
						<input className="input" value={status.businessEmail} name="businessEmail" onChange={onInputChangeHandle} type="email" placeholder="bussiness@email.com" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Business license screenshot:</span>
						<FileInput 
							defaultLabel="Upload File" 
							label={status.businesslicensescreenshot || ""} 
							onChange={(filename:string, file) => {
								changeState("businesslicensescreenshot", filename); 
								setScreenshot(file);
							}} 
						/>
					</InputControl>
				</div>
				<div>
					<InputControl>
						<fieldset>
							<legend className="form-label">Token information:</legend>
							<div className="p-x-5 p-y-3">
								<div className="d-middle">
									<span className="form-label2">Name: </span>
									<input className="input input-block mb-1" type="text" value={status.tokenName} name="tokenName" onChange={onInputChangeHandle} placeholder="Token Name" required disabled />
								</div>
								<div className="d-middle">
									<span className="form-label2">Symbol: </span>
									<input className="input input-block mb-1" type="text" value={status.tokenSymbol} name="tokenSymbol" onChange={onInputChangeHandle} placeholder="Token Symbol" required disabled />
								</div>
								<div className="d-middle">
									<span className="form-label2">Decimals: </span>
									<input className="input input-block mb-1" type="text" value={status.tokenDecimals} name="tokenDecimals" onChange={onInputChangeHandle} placeholder="Token Decimals" required disabled />
								</div>
								<div className="d-middle">
									<span className="form-label2">totalSupply: </span>
									<input className="input input-block" type="text" value={status.tokenTotalSupply} name="tokenTotalSupply" onChange={onInputChangeHandle} placeholder="Token Totalsupply" required disabled />
								</div>
							</div>
						</fieldset>
					</InputControl>
					<InputControl>
						<span className="form-label">Token image:</span>
						<FileInput 
							defaultLabel="Upload File" 
							label={status.tokenimage || ""} 
							onChange={(filename:string, file) => {
								changeState("tokenimage", filename); 
								setTokenimg(file);
							}} 
						/>
					</InputControl>
					<InputControl>
						<span className="form-label">Token type:</span>
						<input className="input" value={status.tokentype} name="tokentype" onChange={onInputChangeHandle} type="text" placeholder="Token type" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Total marketcap:</span>
						<input className="input" value={status.totalmarketcap} name="totalmarketcap" onChange={onInputChangeHandle} type="text" placeholder="Total marketcap" required />
					</InputControl>
					<InputControl>
						<span className="form-label">Market pair:</span>
						<input className="input" value={status.marketpair} name="marketpair" onChange={onInputChangeHandle} type="text" placeholder="Market pair" required />
					</InputControl>
					<InputControl>
						<fieldset>
							<legend className="form-label">Social Url:</legend>
							<div className="p-x-5 p-y-3">
								{(
									<>
										{new Array(status.socialUrl.length).fill(0).map((i:any, k:number) => (
											<div key={k} className="mb-1" style={{position: "relative"}}>
												<input className="input input-block" type="url" value={status.socialUrl[k]} name="" onChange={(e) => onInputSocialUrl(e.target.value, k)} placeholder={`Social url ${k}`} required />
												{k > 2 && (
													<span 
														style={{
															position: "absolute",
															top: "50%",
															transform: "translateY(-55%)",
															display: "inline-block",
															right: "10px",
															fontSize: "2em",
															cursor: "pointer"
														}}
														onClick={() => removeSocialurlInput(k)}
													> - </span>
												)}
											</div>
										))}
									</>
								)}
								<div className="flex align-items-end tx-box ">
									<button className="btn mb-1" onClick={addSocialurlInput}> + </button>
								</div>
							</div>
						</fieldset>
					</InputControl>
				</div>
			</div>
			<div className="text-center">
				{((flag && status.status === "rejected") || !flag) && (
					<button className="btn btn-primary p-x-5 mr" onClick={submit}>Save</button>
				)}
				{!flag && (
					<button className="btn btn-primary p-x-5" onClick={() => history.push("/token/verified-list")}>Back</button>
				)}
				{flag && (
					<button className="btn btn-primary p-x-5" onClick={onClose}>Cancel</button>
				)}
			</div>
		</Form>
	)
}

export default VerifyContract;