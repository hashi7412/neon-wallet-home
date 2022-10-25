import React from "react";
import styled from "styled-components";
// import TabBar, { TabHeader } from "../components/TabBar";

// import DowloadExtension			from "../assets/wallet/download-extension.png";
// import DownloadiPhone			from "../assets/wallet/download-ios.png";
// import DownloadAndroid			from "../assets/wallet/download-android.png";

// const TabBarWrapper = styled.div`
// 	background-color: blue;

// 	.tab {
// 		.tab-links {
// 			margin-bottom: 10px;
// 			button {
// 				padding: 10px 20px;
// 				font-size: 1.2em;
// 				border-top: 1px solid var(--color-hover);
// 				border-bottom: 1px solid var(--color-hover);
// 				border-right: 1px solid var(--color-hover);

// 				&:first-child {
// 					border-left: 1px solid var(--color-hover);
// 					border-radius: 50px 0 0 50px !important;
// 				}

// 				&:last-child {
// 					border-radius: 0 50px 50px 0 !important;
// 				}

// 				&.active {
// 					background: var(--color-hover);
// 					color: var(--bg-body) !important;
// 					font-weight: 400 !important;
// 				}
// 			}
// 		}

// 		.panel-content {
// 			> div {
// 				display: flex;
// 				flex-direction: column;
// 				align-items: center;
// 				background: var(--bg-body) !important;
// 				box-shadow: none !important;

// 				h2 {
// 					font-size: 2.3em;
// 					margin-bottom: 1em;
// 				}

// 				img {
// 					width: 50%;
// 					margin-bottom: 50px;
// 				}
// 			}
// 		}
// 	}
// `

const ButtonWrapper = styled.div`
	margin-top: 7em;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	max-width: 500px;
	gap: 1em;
	margin: auto;

	> div {
		display: flex;
		flex-direction: column;
		align-items: center;

		h3 {
		}

		a {
			font-size: 1.3em;
			padding: 1em 1em;
		}
	}
`

const Download = () => {
	// const [tabKey, setTabKey] = React.useState("chrome");

	// const tabHeader = [
	// 	{ key: "chrome", 			label: "Chrome" },
	// 	{ key: "ios", 				label: "iOS" },
	// 	{ key: "android", 			label: "Android" }
	// ] as TabHeader[];

	return (
		<div className='download'>
			<section className='container'>
				<ButtonWrapper>
					<div>
						<h3>For Browser</h3>
						<a className="btn btn-primary" href={`http://localhost:15003/download-neon-wallet/extension`} target="_blank" rel="noreferrer">Download</a>
					</div>
					<div>
						<h3>For iPhone</h3>
						<a className="btn btn-primary" href={`http://localhost:15003/download-neon-wallet/iphone`} target="_blank" rel="noreferrer">Download</a>
					</div>
					<div>
						<h3>For Android</h3>
						<a className="btn btn-primary" href={`http://localhost:15003/download-neon-wallet/android`} target="_blank" rel="noreferrer">Download</a>
					</div>
				</ButtonWrapper>
				{/* <TabBarWrapper>
					<TabBar 
						headers={tabHeader}
						onChange={(key) => setTabKey(key)}
					>
						{tabKey === "chrome" && (
							<div>
								<h2>Install Neon wallet for your browser</h2>
								<img src={DowloadExtension} alt="ForBrowser" />
								<button className="btn btn-primary">Install Neon wallet for your browser</button>
							</div>
						)}
						{tabKey === "ios" && (
							<div>
								<h2>Install Neon wallet for iPhone</h2>
								<img src={DownloadiPhone} alt="ForIos" />
								<button className="btn btn-primary">Install Neon wallet for iPhone</button>
							</div>
						)}
						{tabKey === "android" && (
							<div>
								<h2>Install Neon wallet for Android</h2>
								<img src={DownloadAndroid} alt="ForAndroid" />
								<button className="btn btn-primary">Install Neon wallet for Android</button>
							</div>
						)}
					</TabBar>
				</TabBarWrapper> */}
			</section>
		</div>
	)
}

export default Download;