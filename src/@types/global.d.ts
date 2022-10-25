declare interface Window {
	connector: 			IConnector
	ethereum: 			any
	ethers: 			any
	soljsonReleases: 	any
	PR: 				any
}

declare interface NetworkType {
	bridge: string
	chainId: number
	confirmations: number 
	blocktime: number
	rpc: string
	explorer: string
	erc20: string
	tokens: {[symbol:string]:TokenObjectType}
}

declare interface RpcRequestType {
	jsonrpc: 		"2.0"
	method: 		string
	params: 		Array<any>
	id: 			string|number
}

declare interface RpcResponseType {
	jsonrpc: 		"2.0"
	id: 			string|number
	result?: 		any
	error?: 		number
}

declare interface ServerResponse {
	result?:    		any
	error?:     		number
}

declare interface ContractObject {
	name?:				string
	symbol?:			string
	decimals?:			string
	totalSupply?:		string
}

declare interface AuthObject {
	address:			string | null
}

declare interface StoreObject {
	lang:				string
	theme:				string
	cookie?:			string
	chain:				string
	account:			AuthObject|null
	token:				string | null
	tokenIcons:			{[address: string]: string}
	verify:				VerifyContractObject|null
	loading:			boolean
	address:			string | null
	isMenu:				boolean
	owner:				{
		balance:			string | number
		signer:				any
	} | null
}
