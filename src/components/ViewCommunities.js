import { useState } from "react";

import { QRCode } from 'react-qr-svg'
import Modal from '../components/Modal'


const deployedContractAddress = '0x3228647198E56B5B5fCf90638F1425e11885938d';

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
    reason: "",
    scope: [
      {
        id: 1,
        circuit_id: "credentialAtomicQuerySig",
        rules: {
          query: {
            allowed_issuers: ["*"],
            req: {
              DegreeLevel: {
                $gt: 2
              }
            },
            schema: {
              url:
                "https://s3.eu-west-1.amazonaws.com/polygonid-schemas/65a1d174-ef7d-4416-b2c7-791cff1b842f.json-ld",
              type: "InstitutionCertificate"
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

function ViewCommunities() {
	const [isOpenModal, setIsOpenModal] = useState(false)

    function verifyCriteriaModal() {
        setIsOpenModal(true);
    }

    return(
        <>
            <Modal
                isOpenModal={isOpenModal}
                headerText={'Use Polygon ID to scan and verify whether you satisfy the membership criteria'}
                mainText={mainText}
                isLoading={false}
                showCloseButton={true}
            />
            <div className="overflow-x-auto  flex justify-center mt-20">
                <table className="table w-[90%]">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Community Name</th>
                        <th>Members</th>
                        <th>Tags</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th>1</th>
                        <td>Indian Medical Association</td>
                        <td>56</td>
                        <td>Biology</td>
                        <td><button className="btn btn-secondary m-20" onClick={verifyCriteriaModal}>Join</button></td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>Indian Institute of Science Chemistry R&D</td>
                        <td>10</td>
                        <td>Chemistry</td>
                        <td><button className="btn btn-secondary m-20" onClick={verifyCriteriaModal}>Join</button></td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Computer Science Education Society</td>
                        <td>45</td>
                        <td>Computer Science</td>
                        <td><button className="btn btn-secondary m-20" onClick={verifyCriteriaModal}>Join</button></td>
                    </tr>
                    </tbody>
                </table>
            </div>        
        </>
    )
}

export default ViewCommunities;