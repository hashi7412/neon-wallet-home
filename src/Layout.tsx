import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import useStore, { config } from './useStore';

import Loading from './components/Loading';
import './layout.scss';
import Icon from './components/Icon';

interface LayoutStatus {
	isOpen: boolean
	dropdownActive: number
	innerHeight: number
}

const onCloseHandle = (onHandle, isOpen, ref) => {
	if (!ref.current) return
	if (!isOpen) return

	const onEscapeHandle = (e) => {
		if (e.key === "Escape") onHandle()
	}

	const onOutsideClickHandle = (e) => {
		if (!ref.current.contains(e.target)) onHandle()
	}

	document.addEventListener("keydown", onEscapeHandle)
	document.addEventListener("mousedown", onOutsideClickHandle)
	ref.current.querySelectorAll("a").forEach(item => {
		item.addEventListener("click", onHandle)
	})

	return () => {
		document.removeEventListener("keydown", onEscapeHandle)
		document.removeEventListener("mousedown", onOutsideClickHandle)
		ref.current.querySelectorAll("a").forEach(item => {
			item.removeEventListener("click", onHandle)
		})
	}
}

const Layout = (props: any) => {
	const location = useLocation();
	const { loading, T, theme, isMenu, update } = useStore()
	const [pathKey, setPathKey] = useState("");

	const [status, setStatus] = React.useState<LayoutStatus>({
		isOpen: false,
		dropdownActive: -1,
		innerHeight: document.body.clientHeight
	});

	const headerContainer = React.useRef(null)

	React.useEffect(() => {
		onCloseHandle(() => update({isMenu: false}), isMenu, headerContainer)
	}, []);

	React.useEffect(() => {
		const pathArr = location.pathname.split("/");
		setPathKey(pathArr[1] || "");
	}, [location]);

	return (
		<>
			<div className={`root${theme}${isMenu ? " open-menu" : ""}`}>
				<div>
					<header ref={headerContainer}>
						<label className='hamburger' htmlFor='hamburger'>
							<Icon icon='Hamburger' size={30} />
						</label>
						<input id='hamburger' type="checkbox" />
						<section className="header container">
							<Link className="logo" to="/">
								{'imageTitle' in config ? (
									<img src={config['imageTitle']} alt="logo"/>
								) : (
									<>
										<img src="/logo.svg" alt="logo" width={32} height={32} />
										<b style={{ fontSize: '2em' }}>{T('title')}</b>
									</>
								)}
							</Link>
							<label className='close' htmlFor='hamburger'></label>
							<menu>
								<button className="hamburger" onClick={() => setStatus({ ...status, isOpen: !status.isOpen })}><span></span></button>
								<ul className="menu">
									<li className={pathKey === "" ? "active" : ""}><Link to="/">Home</Link></li>
									<li className={pathKey === "about" ? "active" : ""}><a href={config.links.about}>About</a></li>
									<li className={pathKey === "link" ? "active" : ""}><a href={config.links.mainscan} target={'_blank'} rel="noreferrer">Neon Link</a></li>
									<li className={pathKey === "dex" ? "active" : ""}><a href={config.links.dex} target={'_blank'} rel="noreferrer">Neon Dex</a></li>
									<li className={pathKey === "token" ? "active" : ""}><Link to={`/token/verified-list`}>Tokens</Link></li>
									<li className={pathKey === "contact" ? "active" : ""}><a href={config.links.contacts}>Contact</a></li>
								</ul>
							</menu>
							<ul className='relations'>
								<li><a href={config.links.instagram} target={'_blank'} rel="noreferrer"><Icon icon='FillInstagram' /></a></li>
								<li><a href={config.links.twitter} target={'_blank'} rel="noreferrer"><Icon icon='Twitter' /></a></li>
								<li><a href={config.links.discord} target={'_blank'} rel="noreferrer"><Icon icon='FillDiscord' /></a></li>
								<li><a href={config.links.telegram} target={'_blank'} rel="noreferrer"><Icon icon='FillTelegram' /></a></li>
							</ul>
							<ul className='links'>
								<li><a href={config.links.facebook} target={'_blank'} rel="noreferrer"><Icon icon='Facebook' /></a></li>
								<li><a href={config.links.instagram} target={'_blank'} rel="noreferrer"><Icon icon='Instagram' /></a></li>
								<li><a href={config.links.dribbble} target={'_blank'} rel="noreferrer"><Icon icon='Dribbble' /></a></li>
								<li><a href={config.links.linkedin} target={'_blank'} rel="noreferrer"><Icon icon='LinkedIn' /></a></li>
								<li><a href={config.links.twitter} target={'_blank'} rel="noreferrer"><Icon icon='Twitter' /></a></li>
							</ul>
						</section>
					</header>
					<main>
						{props.children}
					</main>
				</div>
				{loading && <Loading />}
			</div >
		</>
	)
}

export default Layout;