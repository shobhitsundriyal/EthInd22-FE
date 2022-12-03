import Layout from '../components/Layout'
import { useState } from 'react'
// import { PdfUpload } from 'react-ipfs-uploader'
import { create } from 'ipfs-http-client'
import { Buffer } from 'buffer'
import { infuraAPIkey } from '../secrects'
import Modal from '../components/Modal'
function SubmitResearch() {
	const [pdfUrl, setPdfUrl] = useState('')
	const [file, setFile] = useState()
	const [openModal, setOpenModal] = useState(false)

	const uploadFile = async () => {
		setOpenModal(true)
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
		} catch (err) {
			console.log('Error | ', err)
			setOpenModal(false)
		}
	}

	return (
		<Layout>
			<div className='page h-[90vh] flex flex-col justify-center items-center'>
				<Modal
					isOpenModal={openModal}
					headerText={'Uploading Your paper'}
					mainText={'Please Wait...'}
					isLoading
				/>
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
