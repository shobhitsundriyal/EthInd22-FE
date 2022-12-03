import { useState } from "react";
import { QRCode } from "react-qr-svg";
import Layout from "../components/Layout";
import Modal from "../components/Modal";

const deployedContractAddress = "0xf115cA1eC48B77EE031BE4d7E429244cC928d42B";

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
      reason: "age verification reward claim",
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
                  "https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v2.json-ld",
                type: "KYCDOB"
              }
            }
          }
        }
      ]
    }
  };

let mainText = <QRCode
    level="Q"
    style={{ width: 256 }}
    value={JSON.stringify(qrProofRequestJson)}
/>

function MyProfile() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    
    function verifyAgeModal() {
        setIsOpenModal(true);
    }
    
    return(
        <Layout page = "My Profile">
            <Modal
                isOpenModal={isOpenModal}
                headerText={"Use Polygon ID to scan and verify age"}
                mainText={mainText}
                isLoading={false}
                showCloseButton={true}
            />
            <div className="flex justify-center items-center">
                <div className="max-w-[80%] text-lg text-center">
                    <span className="leading-10">Welcome 0x17b135575639A9B55F7EBb74FbED5f727eD08E8a!</span><br/>
                    <span className="leading-10">Your ReviewD Wallet Balance: 100000000000</span><br/>
                    <button className="btn btn-secondary m-20" onClick={verifyAgeModal}>Verify my age</button>
                </div>
            </div>
        </Layout>
    )
}

export default MyProfile;