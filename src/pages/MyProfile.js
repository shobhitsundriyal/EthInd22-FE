import axios from "axios";
import { useEffect, useState } from "react";
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

// async function getRWTBalance(address) {
//     let response = await axios.get(
//         `https://api.covalenthq.com/v1/80001/address/0x17b135575639A9B55F7EBb74FbED5f727eD08E8a/balances_v2/?key=ckey_74f1c58ea29641c5ac04fee2cfc`,
//     );
//     return <>{JSON.stringify(response)}</>
// }

function MyProfile() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);

    function verifyAgeModal() {
        setIsOpenModal(true);
    }

    async function getRWTBalance(address) {
        axios.get(
            `https://api.covalenthq.com/v1/80001/address/0x17b135575639A9B55F7EBb74FbED5f727eD08E8a/balances_v2/?key=ckey_74f1c58ea29641c5ac04fee2cfc`,
        ).then((response) => {
            console.log(response.data.data.items.filter((item) => item.contract_address == "0xf115ca1ec48b77ee031be4d7e429244cc928d42b"));
        });
    }

    useEffect(() => {
        async function getRWTBalance(address) {
            axios.get(
                `https://api.covalenthq.com/v1/80001/address/${address}/balances_v2/?key=ckey_74f1c58ea29641c5ac04fee2cfc`,
            ).then((response) => {
                let tokenBalance = response.data.data.items.filter((item) => item.contract_address == "0xf115ca1ec48b77ee031be4d7e429244cc928d42b");
                console.log(tokenBalance[0].balance);
                setWalletBalance(tokenBalance[0].balance);
            });
        }
        getRWTBalance("0x17b135575639A9B55F7EBb74FbED5f727eD08E8a");
    }, []);
    
    return(
        <Layout page = "My Profile">
            <Modal
                isOpenModal={isOpenModal}
                headerText={"Use Polygon ID to scan and verify age"}
                mainText={mainText}
                isLoading={false}
                showCloseButton={true}
            />
            <div className="flex justify-center items-center mt-20">
                <div className="max-w-[80%] text-lg text-center">
                    <span className="leading-10">Welcome 0x17b135575639A9B55F7EBb74FbED5f727eD08E8a!</span><br/>
                    <span className="leading-10">Your ReviewD Wallet Balance: {walletBalance} </span><br/>
                    <button className="btn btn-secondary m-20" onClick={verifyAgeModal}>Verify my age</button>
                </div>
            </div>
        </Layout>
    )
}

export default MyProfile;