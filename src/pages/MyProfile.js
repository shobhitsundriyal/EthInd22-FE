import axios from 'axios'
import { useEffect, useState } from 'react'
import { QRCode } from 'react-qr-svg'
import Layout from '../components/Layout'
import Modal from '../components/Modal'

const deployedContractAddress = '0xAB587C0e6460331E7A528e93D9878e847b27aa15';

const qrProofRequestJson = {
  id: "c811849d-6bfb-4d85-936e-3d9759c7f105",
  typ: "application/iden3comm-plain-json",
  type: "https://iden3-communication.io/proofs/1.0/contract-invoke-request",
  body: {
    transaction_data: {
      contract_address: deployedContractAddress,
      method_id: "b68967e2",
      chain_id: 80001,
      network: "polygon-mumbai"
    },
    reason: "age verification reward",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              dateOfBirth: {
                $lt: 20010101
              }
            },
            schema: {
              url:
                "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/bca5adda-d65e-4076-93ae-318d89219af5.json-ld",
              type: "KYCDOB"
            }
          }
        }
      }
    ]
  }
};

let mainText = (
  <div className='h-50 w-50 bg-white'>
    	<QRCode
        level='Q'
        style={{ width: 256 }}
        value={JSON.stringify(qrProofRequestJson)}
      />
  </div>
)

function MyProfile() {
	const [isOpenModal, setIsOpenModal] = useState(false)
	const [walletBalance, setWalletBalance] = useState(0)

	function verifyAgeModal() {
		setIsOpenModal(true)
	}

  useEffect(() => {
		async function getRWTBalance(address) {
			axios
				.get(
					`https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?key=ckey_74f1c58ea29641c5ac04fee2cfc`
				)
				.then((response) => {
					let tokenBalance = response.data.data.items.filter(
						(item) =>
							item.contract_address ==
							'0xf115ca1ec48b77ee031be4d7e429244cc928d42b'
					)
					console.log(tokenBalance[0].balance)
					setWalletBalance(tokenBalance[0].balance)
				})
		}
		getRWTBalance('0x17b135575639A9B55F7EBb74FbED5f727eD08E8a')
	}, [])

	return (
		<Layout page='My Profile'>
			<div className='h-[90vh]'>
				<Modal
					isOpenModal={isOpenModal}
					headerText={'Use Polygon ID to scan and verify age'}
					mainText={mainText}
					isLoading={false}
					showCloseButton={true}
				/>
				<div className='flex justify-center items-center mt-20'>
					<div className='max-w-[80%] text-lg text-center'>
						<span className='leading-10'>
							Welcome 0x17b135575639A9B55F7EBb74FbED5f727eD08E8a!
						</span>
						<br />
						<span className='leading-10'>
							Your ReviewD Wallet Balance: {walletBalance}{' '}
						</span>
						<br />
						<button className='btn btn-secondary m-20' onClick={verifyAgeModal}>
							Verify my age
						</button>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default MyProfile
