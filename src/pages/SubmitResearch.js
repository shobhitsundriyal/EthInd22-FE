import Layout from '../components/Layout'
import { useState } from 'react'
// import { PdfUpload } from 'react-ipfs-uploader'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import { infuraAPIkey } from '../secrects'
import Modal from '../components/Modal'
import { ReviewerContractAddr } from '../RevierContractDetails'
import { ethers } from 'ethers'
import { ChainId } from '@biconomy/core-types'
import SmartAccount from '@biconomy/smart-account'
import { useSocialContext } from '../contexts/SocialContextProvider'

function SubmitResearch() {
	const [pdfUrl, setPdfUrl] = useState('')
	const [file, setFile] = useState()
	const [openModal, setOpenModal] = useState(false)
	const { socialContextState } = useSocialContext()
	const [modalProps, setModalProps] = useState({
		// isOpenModal:false
		headerText: '',
		mainText: '',
		isLoading: false,
		showCloseButton: false,
	})

	const uploadFile = async () => {
		setOpenModal(true)
		setModalProps({
			...modalProps,
			isLoading: true,
			headerText: 'Uploading Your paper',
			mainText: 'Please Wait....',
		})
		try {
			//process env
			const projectId = '2IOgzyIP9wtuF8B4WJEzUtUHN4Z'
			const projectSecret = infuraAPIkey
			const auth =
				'Basic ' +
				Buffer.from(projectId + ':' + projectSecret).toString('base64')
			/* Create an instance of the client */
			const client = create({
				host: 'ipfs.infura.io',
				port: 5001,
				protocol: 'https',
				headers: {
					authorization: auth,
				},
			})

			/* upload the file */
			const added = await client.add(file)
			if (added.path) setOpenModal(false)
			setPdfUrl(`https://infura-ipfs.io/ipfs/${added.path}`)
			console.log(`https://infura-ipfs.io/ipfs/${added.path}`)

			//Now call contract and put it onchain

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
				// first testing erc20 aproval and transfer***
				const dappInterface = new ethers.utils.Interface(ReviewerContractAddr)
				// const data = dappInterface.encodeFunctionData('createAsset', [pdfUrl])
				// const tx1 = {
				// 	to: contractAddr,
				// 	data: data,
				// 	// from: account,
				// }
				// // Gasless
				// const txResponse = await smartAccount.sendGasLessTransaction({
				// 	transaction: tx1,
				// })
			}
		} catch (err) {
			console.log('Error | ', err)
			setOpenModal(false)
		}
	}

	return (
		<Layout>
			<div className='page h-[90vh] flex flex-col justify-center items-center'>
				<Modal isOpenModal={openModal} {...modalProps} />
				<div className='form-container flex'>
					<input
						type='file'
						accept='application/pdf'
						className='file-input file-input-bordered file-input-accent w-full max-w-xs mr-5'
						onChange={(e) => {
							setFile(e.target.files[0])
							console.log(e.target.files[0])
						}}
					/>
					<button className='btn btn-accent' onClick={uploadFile}>
						Upload
					</button>
				</div>
				<br />
				<span className={`${!pdfUrl ? 'opacity-0' : 'opacity-100'}`}>
					Your file uploaded here: <a className='link link-primary'>{pdfUrl}</a>
				</span>
			</div>
		</Layout>
	)
}

export default SubmitResearch
