import Home 						from "./Pages/home/Index";
import Download 					from "./Pages/download/Index";
import CheckAddress 				from "./Pages/verify/CheckAddress";
import VerifiedList 				from "./Pages/verify/VerifiedList";
import VerifyContract 				from "./Pages/verify/VerifyContract";
import VerifyOwnership 				from "./Pages/verify/VerifyOwnership";
import Contact						from "./Pages/Contact";

const mapping = {
	"/":								Home,							// Home page

	"/download":						Download,						// Download wallet

	"/token/verified-list":				VerifiedList,					// Verified contract list
	"/token/check-address":				CheckAddress,					// Check contract address
	"/token/verify-ownership":			VerifyOwnership,				// Verify contract ownership
	"/token/verify-contract":			VerifyContract,					// Verify contract
	"/contact":							Contact,						// Verify contract
}

export default mapping;