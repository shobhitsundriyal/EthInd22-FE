import React from 'react'
import SocialLogin from '@biconomy/web3-auth'
import { ethers } from 'ethers'
import { useSocialContext } from '../contexts/SocialContextProvider'
import { Outlet, Link } from 'react-router-dom'

const TopNavBar = (props) => {
	const { socialContextState, setSocialContextState } = useSocialContext()
	const login = async () => {
		// init wallet
		const socialLoginSDK = new SocialLogin()
		await socialLoginSDK.init('0x13881') // Enter the network id in hex) parameter
		socialLoginSDK.showConnectModal()

		// show connect modal
		socialLoginSDK.showWallet()
		setSocialContextState(socialLoginSDK)
		if (!socialLoginSDK?.web3auth?.provider) return
		const provider = new ethers.providers.Web3Provider(
			socialLoginSDK.web3auth.provider
		)
		const accounts = await provider.listAccounts()
		console.log('EOA address', accounts)
		console.log('SCW address', socialLoginSDK)
	}

	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost btn-circle'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h7'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						<li>
							<Link to='/'>My Profile</Link>
						</li>
						<li>
							<Link to='/submit_research'>Submit Research</Link>
						</li>
						<li>
							<Link to='/communities'>Communities</Link>
						</li>
						<li>
							<Link to='/review'>Review</Link>
						</li>
						<li>
							<Link to='/marketplace'>Marketplace</Link>
						</li>
					</ul>
				</div>
				<Outlet />
			</div>
			<div className='navbar-center'>
				<a className='btn btn-ghost normal-case text-xl'>
					ReviewD / {props.page}
				</a>
			</div>
			<div className='navbar-end'>
				{/* <button className="btn btn-ghost btn-circle">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
				</button> */}
				<button
					className='btn btn-ghost btn-circle'
					onClick={!socialContextState && login}
				>
					{socialContextState ? (
						<div className='indicator'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
								/>
							</svg>
							<span className='badge badge-xs badge-primary indicator-item'></span>
						</div>
					) : (
						'Login'
					)}
				</button>
			</div>
		</div>
	)
}

export default TopNavBar
