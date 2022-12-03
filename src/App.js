import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import { ContractDetails } from './contractDetails.ts'
import { ethers } from 'ethers'
import { Biconomy } from '@biconomy/mexa'
import Web3 from 'web3'
import TopNavBar from './components/TopNavBar'

import { ChainId } from '@biconomy/core-types'

import SmartAccount from '@biconomy/smart-account'
import { useSocialContext } from './contexts/SocialContextProvider'
import Modal from './components/Modal'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import MyProfile from './pages/MyProfile'
import Communities from './pages/Communities'
import Marketplace from './pages/Marketplace'
import Review from './pages/Review'
import SubmitResearch from './pages/SubmitResearch'

function App() {
	// new member 0x1271C74805A95054C987428c75DB1e882c416f7f
	// contract addre 0x10617a4734390dEB037487231BA4E9Ee92E398E8
	const [account, setAccount] = useState()
	const [no, setNo] = useState()
	const { contractAddr, constractAbi } = ContractDetails
	const { socialContextState } = useSocialContext()

	const connectMetamask = async () => {
		try {
			const { ethereum } = window
			if (!ethereum) {
				alert('Please install MetaMask!')
				return
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			})
			console.log('Connected', accounts[0])
			setAccount(accounts[0])
			return accounts[0]
		} catch (err) {
			console.log(err)
		}
	}
	const submitProposal = async () => {
		try {
			const { ethereum } = window
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(
					socialContextState.provider
				)
				const walletProvider = new ethers.providers.Web3Provider(
					provider.provider
				)

				let options = {
					activeNetworkId: ChainId.POLYGON_MUMBAI,
					supportedNetworksIds: [
						ChainId.GOERLI,
						ChainId.POLYGON_MAINNET,
						ChainId.POLYGON_MUMBAI,
					],
					networkConfig: [
						{
							chainId: ChainId.POLYGON_MUMBAI,
							dappAPIKey: '59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3', // Get one from Paymaster Dashboard
							// customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
						},
					],
				}

				let smartAccount = new SmartAccount(walletProvider, options)
				smartAccount = await smartAccount.init()
				const address = smartAccount.address
				console.log('address', address)

				smartAccount.on('txHashGenerated', (response) => {
					console.log('txHashGenerated event received via emitter', response)
				})

				smartAccount.on('txMined', (response) => {
					console.log('txMined event received via emitter', response)
				})

				smartAccount.on('error', (response) => {
					console.log('error event received via emitter', response)
				})

				const dappInterface = new ethers.utils.Interface(constractAbi)
				const data = dappInterface.encodeFunctionData('store', [777])
				const tx1 = {
					to: contractAddr,
					data: data,
					// from: account,
				}
				// Gasless
				const txResponse = await smartAccount.sendGasLessTransaction({
					transaction: tx1,
				})
			}
		} catch (err) {
			console.log(err, 'There is a error')
		}
	}
	const retriveNo = async () => {
		setNo('....')
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const connectedContract = new ethers.Contract(
			contractAddr,
			constractAbi,
			signer
		)
		const retrivedNumber = await connectedContract.retrieve()
		if (retrivedNumber) {
			setNo(parseInt(retrivedNumber._hex, 16))
		}
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MyProfile />} />
				<Route path='my_profile' element={<MyProfile />} />
				<Route path='communities' element={<Communities />} />
				<Route path='marketplace' element={<Marketplace />} />
				<Route path='review' element={<Review />} />
				<Route path='submit_research' element={<SubmitResearch />} />
			</Routes>
			{/* <div className='App h-[100vh] w-[100vw]' data-theme='forest'>
				<TopNavBar />
				<div className='h-[10vh]'>yoyoyo</div>
				<header className='App-header'>
				{!socialContextState?.web3auth?.provider ? (
					<button
					onClick={connectMetamask}
					className='btn btn-outline btn-sm'
					>
							Connect metamask
						</button>
						) : (
							<button
							onClick={retriveNo}
							className='btn btn-outline btn-primary btn-sm'
							>
							submit number{' '}
							</button>
							)}
							{no} the Number
							<Modal isOpenModal={true} />
							</header>
						</div> */}
		</BrowserRouter>
	)
}

export default App
