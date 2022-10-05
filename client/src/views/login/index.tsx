import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { useWeb3Context } from 'hooks/useWeb3Context'
import { useRegisterState } from 'state/register/hooks'
import Web3 from "web3";
import GlobModal from 'components/GlobModal'
import { VscChromeClose } from "react-icons/vsc"
import { AiFillCheckCircle } from "react-icons/ai"
import { hashPersonalMessage, recoverPersonalSignature, recoverPublicKey } from 'utils/utility';
import { convertUtf8ToHex } from "@walletconnect/utils";
import { toast } from 'react-toastify';
import axios from 'axios';
import { URI } from 'api-control/api';
import encryptParams from 'utils/encryption';
// import { useSelector } from 'react-redux'
// import { URI } from 'api-control/api'
// import axios from 'axios'
// import encryptParams from 'utils/encryption'


const Login = (setLoader: any) => {
    const navigation = useNavigate()
    const web3Context = useWeb3Context()

    // const [cookies, setCookie] = useCookies(['token', 'public_key']);
    
    // const [wallet, setWallet] = useState<string | undefined>("")
    
    const [modalOpen1, setModalOpen1] = useState<any>(false)
    const [modalOpen2, setModalOpen2] = useState<any>(false)
    const [errorModal, setErrorModal] = useState(false)
    const [message, setMessage] = useState<String>("")

    // const registerState = useRegisterState()
    // const loading = useSelector((state: any) => state.register.status)
    

    // const testSignMessage = async (account: string, provider: any) => {
    //     const web3: any = new Web3(provider);

    //     if (!web3) {
    //         return false;
    //     }

    //     // test message
    //     const message = "My email is john@doe.com - 1537836206101";

    //     // hash message
    //     const hash = hashPersonalMessage(message);

    //     try {
    //         // send message
    //         const result = await web3.eth.sign(hash, account);

    //         // verify signature
    //         const signer = recoverPublicKey(result, hash);
    //         const verified = signer.toLowerCase() === account.toLowerCase();
    //         return verified
    //     } catch (error) {
    //         console.error(error); // tslint:disable-line
    //         // this.setState({ web3, pendingRequest: false, result: null });
    //         return false
    //     }
    // };
    

    const testSignPersonalMessage = async (account: string, provider: any) => {
        const web3: any = new Web3(provider);

        if (!web3) {
            return false;
        }

        // test message
        const message = `My wallet is ${account}`

        // encode message (hex)
        const hexMsg = convertUtf8ToHex(message);

        try {
            // send message
            const result = await web3.eth.personal.sign(hexMsg, account);

            // verify signature
            const signer = recoverPersonalSignature(result, message);
            const verified = signer.toLowerCase() === account.toLowerCase();
            return verified
        } catch (error) {
            console.error(error); // tslint:disable-line
            return false
        }
    };
    

    const login = async () => {
        if(web3Context?.provider && web3Context?.account) {
            // const result: boolean = await testSignMessage(web3Context?.account, web3Context?.provider)
            const result: boolean = await testSignPersonalMessage(web3Context?.account, web3Context?.provider)
            
            if(result)
            {
                // setCookie('public_key', web3Context?.account)
                // setModalOpen2(true)
                
                // setTimeout(() => {
                //     navigation("/collection")
                //     // window.location.reload()
                // }, 2000);
                const body = {
                    public_key: web3Context?.account.toLowerCase(),
                }
                axios.post(`${URI}/auth/login`, {params: encryptParams(body)})
                    .then((res) => {
                        setModalOpen2(true)
                        
                        setTimeout(() => {
                            navigation("/collection")
                            // window.location.reload()
                        }, 2000);
                    })
                    .catch((err) => {
                        toast.error('Confirm your network connection', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    })
            }
        } else {
            toast.error('Confirm your wallet connection', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <div className=' w-full'>
            
            <GlobModal size="sm" open={modalOpen1} setOpen={setModalOpen1} >
                <div >
                    <div className=' w-full flex items-center justify-between px-3 py-2 border-b'>
                        <h1 className=' text-xl text-white'>Login</h1> <VscChromeClose onClick={() => setModalOpen1(false)} className=' w-5 h-5 cursor-pointer text-white ' />
                    </div>
                    <div className=' flex items-center justify-center w-full pt-10 pb-5'>
                        <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pr" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                    </div>
                    <p className=' text-sm text-center text-white py-2'>{message}</p>

                    <div className=' flex items-center justify-center py-3'>
                        <button onClick={() => setModalOpen1(false)} className=' px-16 py-2 text-sm rounded-3xl text-pr border-2 border-pr'>Cancel</button>
                    </div>
                </div>
            </GlobModal>
            <GlobModal size="sm" open={errorModal} setOpen={setErrorModal} >
                <div >
                    <div className=' w-full flex items-center justify-between px-3 py-2 border-b'>
                        <h1 className=' text-xl text-white'>Login</h1> <VscChromeClose onClick={() => setErrorModal(false)} className=' w-5 h-5 cursor-pointer text-white ' />
                    </div>

                    <p className=' text-sm text-center text-white py-8'>{message}</p>

                    <div className=' flex items-center justify-center'>
                        <button onClick={() => setErrorModal(false)} className=' px-16 py-2 text-sm rounded-3xl text-pr border-2 border-pr'>Close</button>

                    </div>
                </div>
            </GlobModal>
            <GlobModal size="sm" open={modalOpen2} setOpen={setModalOpen2} >
                <div >
                    <div className=' w-full flex items-center justify-between px-3 py-2 border-b'>
                        <h1 className=' text-xl text-white'>Login</h1> <VscChromeClose onClick={() => setModalOpen2(false)} className=' w-5 h-5 cursor-pointer text-white ' />
                    </div>
                    <div className=' mt-8 flex items-center justify-center'>
                        <AiFillCheckCircle className=' text-green-500 w-7 h-7' />
                    </div>
                    <p className=' text-sm text-center text-white pt-3 pb-8'>Login Successfully!</p>

                    <div className=' flex items-center justify-center gap-2 py-3'>
                        <button onClick={() => setModalOpen2(false)} className=' px-16 py-2 text-sm rounded-3xl text-pr border-2 border-pr'>OK</button>

                    </div>
                </div>
            </GlobModal>

            <div className=' container '>
                {/* <div className=' w-full flex flex-col lg:flex-row justify-center items-center lg:justify-between'>
                    <Link to="/">  <img src="/images/main-logo.png" className=' -ml-5 lg:-ml-0' alt="" /></Link>
                    <p className=' text-white hidden lg:block'>I’m new to  NFT Lambo Club?  <Link to="/signup" className=' text-pr'>Register now</Link></p>
                </div> */}
                <div className=' w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-5 pt-5'>

                    <img className=' hidden lg:block w-full h-full object-cover mt-32' src="/images/Illustration.png" alt="" />
                    <div>
                        <h1 className=' text-4xl font-medium text-white mt-20 hidden lg:block'>Welcome back!</h1>
                        <h1 className=' text-4xl font-medium text-white mt-20 block lg:hidden'>Welcome <br /> back!</h1>
                        <p className=' text-white w-full lg:w-5/6 py-2 '>To keep connected with us please login with your personal information by email and password.</p>

                        <div className=' mt-5'>
                            <p className=' text-white text-sm pb-2'>My Public Key</p>
                            <input value={web3Context?.account} readOnly type="text" placeholder='Public key here' className=' text-sm w-full lg:w-5/6 rounded-xl  bg-br p-4 outline-none  border-sr' />
                        </div>
                        <div className=' mt-5 w-full lg:w-5/6 grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <button onClick={web3Context?.connectWallet} className=' w-full hover:bg-hr hover:text-br border-2 text-pr border-pr bg-br py-3 text-sm rounded-3xl flex items-center justify-center'>
                                {web3Context?.account ? "Wallet Connected" : "Connect Wallet"}
                            </button>
                                {!web3Context?.account ? <button className=' w-full border-2 text-gray-400 border-dr bg-dr py-3 text-sm rounded-3xl flex items-center justify-center'>
                                Login
                            </button>
                                :
                                <button onClick={login} className=' w-full border-2 hover:bg-hr text-br bg-pr border-pr  py-3 text-sm rounded-3xl flex items-center justify-center'>
                                    Login
                                </button>
                            }


                        </div>
                        <div className='w-full lg:w-5/6  mt-16 lg:mt-28'>
                            <p className=' w-full text-center text-sm text-white'>Registering for a NFT Lambo club account means you agree to the <Link to="/privacy-policy" className="text-pr">Privacy Policy</Link> and <Link to="/tos" className="text-pr">Terms of Service.</Link></p>
                        </div>
                       
                    </div>
                </div>
                {/* <p className=' text-white block text-center lg:hidden mt-20'>I’m new to  NFT Lambo Club?  <Link to="/signup" className=' text-pr'>Register now</Link></p> */}
                <div className=' hidden lg:flex items-center justify-center gap-10 flex-wrap w-full mt-28 lg:mt-40'>
                    <img src="/images/metamask.png" alt="" />
                    <img src="/images/wallet-connect.png" alt="" />
                    <img src="/images/Panckake.png" alt="" />
                    <img src="/images/Mask group.png" alt="" />
                    <img src="/images/Binance.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Login