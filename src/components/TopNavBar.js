import React from 'react'
import SocialLogin from '@biconomy/web3-auth'
import { ethers } from 'ethers'
import { useSocialContext } from '../contexts/SocialContextProvider'

const TopNavBar = () => {
	const { setSocialContextState } = useSocialContext()
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
		<div className='h-16 bg-transparent rounded-b-lg flex backdrop:blur-sm text-white px-6 border-b-[1px] sticky top-0 backdrop-blur-sm'>
			<div className='flex justify-center items-center space-x-20 pl-7'>
				<span>Home</span>
				<span>Submit Paper</span>
				<span>kk</span>
				<span>Marketplace</span>
			</div>
			<div className='flex justify-end items-center flex-grow'>
				<button className='btn btn-accent btn-sm' onClick={login}>
					Login
				</button>
			</div>
		</div>
	)
}

export default TopNavBar
