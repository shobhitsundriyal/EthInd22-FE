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

function App() {
	// new member 0x1271C74805A95054C987428c75DB1e882c416f7f
	// contract addre 0x10617a4734390dEB037487231BA4E9Ee92E398E8
	const [account, setAccount] = useState()
	const { contractAddr, constractAbi } = ContractDetails

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
				// const biconomy = new Biconomy(ethereum, {
				// 	apiKey: 'iEV_I2aTD.2907b6e0-196f-4d07-bfcd-47d17cfaf11b',
				// 	debug: true,
				// 	contractAddresses: [contractAddr],
				// })
				// // console.log(biconomy, 88)
				// await biconomy.init()
				// let web3 = new Web3(biconomy.provider)
				// let myContract = new web3.eth.Contract(
				// 	constractAbi,
				// 	contractAddr
				// )
				// console.log(myContract, 10000)
				// await myContract.methods.store(6969).send({ from: account })
				const provider = new ethers.providers.Web3Provider(ethereum)
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
							dappAPIKey:
								'59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3', // Get one from Paymaster Dashboard
							// customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
						},
					],
				}

				let smartAccount = new SmartAccount(walletProvider, options)
				smartAccount = await smartAccount.init()
				const address = smartAccount.address
				console.log('address', address)

				smartAccount.on('txHashGenerated', (response) => {
					console.log(
						'txHashGenerated event received via emitter',
						response
					)
				})

				smartAccount.on('txMined', (response) => {
					console.log('txMined event received via emitter', response)
				})

				smartAccount.on('error', (response) => {
					console.log('error event received via emitter', response)
				})

				const dappInterface = new ethers.utils.Interface(constractAbi)
				const data = dappInterface.encodeFunctionData('store', [5555])
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
	return (
		<div className='App h-[100vh] w-[100vw]' data-theme='forest'>
			<TopNavBar />
			<div className='h-[10vh]'>yoyoyo</div>
			<header className='App-header'>
				{!account ? (
					<button
						onClick={connectMetamask}
						className='btn btn-outline btn-sm'
					>
						Connect metamask
					</button>
				) : (
					<button
						onClick={submitProposal}
						className='btn btn-outline btn-primary btn-sm'
					>
						submit number{' '}
					</button>
				)}
			</header>
		</div>
	)
}

export default App
