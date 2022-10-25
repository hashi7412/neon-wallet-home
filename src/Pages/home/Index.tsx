import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

import "./home.scss";

import BannerImage from "../../assets/home/banner.webp";
import Mockup2 from "../../assets/home/mobile.webp";
import Av1 from "../../assets/home/av-1.webp";
import Av2 from "../../assets/home/av-2.webp";
import Av3 from "../../assets/home/av-3.webp";
import Icon from '../../components/Icon';
import { Link } from 'react-router-dom';
import useStore, { config } from '../../useStore';

const Home = () => {
	const { T, sendJson } = useStore();
	const [url, setUrl] = React.useState({
		extension: "",
		iphone: "",
		android: ""
	});

	const fetchUrl = async () => {
		const res = await sendJson("get-wallet-links");
		if (res.result) {
			setUrl({...res.result});
		}
	}

	React.useLayoutEffect(() => {
		fetchUrl();
	}, [])

	return (
		<div className='home'>
			<div className='banner'>
				<div>
					<Link className="logo" to="/">
						{'imageTitle' in config ? (
							<img src={config['imageTitle']} alt="logo" width={50} />
						) : (
							<>
								<img src="/logo.svg" alt="logo" width={32} height={32} />
								<b style={{ fontSize: '2em' }}>{T('title')}</b>
							</>
						)}
					</Link>
					<ScrollAnimation animateIn="slideInUp" animateOut="fadeOutUp" duration={1} animateOnce={true}>
					<h1 className='bold'>Neon wallet, your affable everyday crypto accessory</h1>
					</ScrollAnimation>
					<ScrollAnimation animateIn='fadeIn' delay={700} animateOnce={true}>
					<p>A safe and secure place to store and hold your digital assets and essential game items. The Neon wallet is compatible with any EVM.</p>
					</ScrollAnimation>
					<ScrollAnimation animateIn='fadeIn' delay={1200} animateOnce={true}>
					<p className='text-2'>Simply enter the chain ID, native token and explorer details to gain access to any network and interact with your favorite dApps on any chain.</p>
					</ScrollAnimation>
					<div className='down'>
						<div></div>
						<span>scroll</span>
					</div>
				</div>
				<ScrollAnimation animateIn='slideInRight' delay={0} duration={1} animateOnce={true}>
				<div>
					<img src={BannerImage} alt="BannerImage" />
				</div>
				</ScrollAnimation>
			</div>
			<div className="hero-section">
				<div className='section-1'>
					<div>
						<div>
							<ScrollAnimation animateIn='flipInX' delay={0} duration={1} animateOnce={true}>
							<h2 className='bold'>The multi chain wallet for gamers and blockchain enthusiasts alike</h2>
							</ScrollAnimation>
							<ScrollAnimation animateIn='fadeIn' delay={300} duration={1} animateOnce={true}>
							<p>The perfect place to house your in-game assets and NFTs, earn NEON and take advantage of our lightning fast network and low fees.</p>
							</ScrollAnimation>
						</div>
					</div>
					<div className="row">
						<div className="col4">
							<ScrollAnimation animateIn="bounceInLeft" animateOut="fadeOutUp" duration={1} animateOnce={true}>
							<div>
								<img src={Av1} alt="AvImage1" />
							</div>
							<div>
								<h4>Buy, sell, send, swap</h4>
								<p>Available on Android, iOS and as a browser extension, the Neon wallet ensures secure login, token and in-game asset storage and easy access to exchange services.</p>
							</div>
							</ScrollAnimation>
						</div>
						<div className="col4">
							<ScrollAnimation animateIn="zoomIn" animateOut="fadeOutUp" duration={0.6} delay={150} animateOnce={true}>
							<div>
								<img src={Av2} alt="AvImage2" />
							</div>
							<div>
								<h4>Embrace gaming, blockchain and defi</h4>
								<p>Neon wallet provides a simple and secure way to enjoy blockchain-based games, access dApps and fulfill your defi needs . Take charge and be in control whether gaming or interacting across the decentralized world.</p>
							</div>
							</ScrollAnimation>
						</div>
						<div className="col4">
							<ScrollAnimation animateIn="bounceInRight" animateOut="fadeOutUp" duration={1} delay={400} animateOnce={true}>
							<div>
								<img src={Av3} alt="AvImage3" />
							</div>
							<div>
								<h4>Secure ownership</h4>
								<p>Neon wallet’s seed phrase and private keys are generated on your device. You alone have access to your wallet accounts and data. Privacy and security are yours.</p>
							</div>
							</ScrollAnimation>
						</div>
					</div>
				</div>
				<div className='section-2'>
					<div>
						<div>
							<ScrollAnimation animateIn="flipInX" duration={1} animateOnce={true}>
							<h1 className='bold ' style={{color: 'var(--color-light)'}}>Download the Neon wallet now</h1>
							</ScrollAnimation>
							<ScrollAnimation animateIn='fadeIn' delay={300} animateOnce={true}>
							<p>The Neon wallet is available on Android, iOS and as a Chrome extension. Protect your assets on the go or from the comfort of your web browser.</p>
							</ScrollAnimation>
							<ScrollAnimation animateIn='fadeIn' delay={500} animateOnce={true}>
							<div className='download-btn-group'>
								<a href={url.extension} target={'_blank'} rel="noreferrer">
									<Icon className='btn-icon' icon='GooglePlay' />
									<div>
										<span>Get it on</span>
										<h5 className='bold'>Google Play</h5>
									</div>
								</a>
								<a href={url.iphone} target={'_blank'} rel="noreferrer">
									<Icon className='btn-icon' icon='App' />
									<div>
										<span>Download on the</span>
										<h5 className='bold'>App Store</h5>
									</div>
								</a>
								<a href={url.android} target={'_blank'} rel="noreferrer">
									<Icon className='btn-icon' icon='Chrome' />
									<div>
										<span>Download</span>
										<h5 className='bold'>Chrome Extension</h5>
									</div>
								</a>
							</div>
							</ScrollAnimation>
						</div>
						<div>
							<ScrollAnimation animateIn="bounceInRight" duration={1} delay={700} animateOnce={true}>
								<img src={Mockup2} alt="" />
							</ScrollAnimation>
						</div>
					</div>
				</div>
				<div className='logo-ef'>
				</div>
				<footer>
					<section className='container'>
						<div className="footer-content">
							<div>
								<ul className='links'>
									<li><a href={config.links.facebook} target={'_blank'} rel="noreferrer"><Icon icon='Facebook' /></a></li>
									<li><a href={config.links.instagram} target={'_blank'} rel="noreferrer"><Icon icon='Instagram' /></a></li>
									<li><a href={config.links.dribbble} target={'_blank'} rel="noreferrer"><Icon icon='Dribbble' /></a></li>
									<li><a href={config.links.linkedin} target={'_blank'} rel="noreferrer"><Icon icon='LinkedIn' /></a></li>
									<li><a href={config.links.twitter} target={'_blank'} rel="noreferrer"><Icon icon='Twitter' /></a></li>
								</ul>
							</div>
							<div>
								<Link className="logo" to="/">
									{'imageTitle' in config ? (
										<img src={config['imageTitle']} alt="logo" width={50} />
									) : (
										<>
											<img src="/logo.svg" alt="logo" width={32} height={32} />
											<b style={{ fontSize: '2em' }}>{T('title')}</b>
										</>
									)}
								</Link>
							</div>
							<div>
								<span>@2022 NeonWallet - powered by NeonLink</span>
							</div>
						</div>
					</section>
				</footer>
			</div>
		</div >
	)
};

export default Home;