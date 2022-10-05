import { createContext, useState, CSSProperties, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import './App.css'
// import Signup from 'views/signup'
import Login from 'views/login'
// import ReferralProgramme from 'views/referral'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Marketplace from 'views/marketplace'
// import Detail from 'views/Detail/Detail'
import Collection from 'views/collection/Collection'
// import { useMarketplaceData } from 'state/marketplace/hooks'
// import { useSelector } from 'react-redux'
// import BarLoader from "react-spinners/BarLoader";
// import Notifications from 'views/notifications/Notifications'
// import BuyTaurus from 'views/swap/BuyTaurus'
// import { useStakingData } from 'state/staking/hooks'
import { useOwnerData } from 'state/owners/hooks'
// import { useIsRegistered, useRegisterState } from 'state/register/hooks'
import { useWeb3Context } from 'hooks/useWeb3Context'
// import { useCookies } from 'react-cookie';
import axios from 'axios'
import encryptParams from 'utils/encryption'
import { URI } from 'api-control/api'
import { useTransferHistories } from 'state/transferHistories/hooks'
// import useIsLogin from 'hooks/useIsLogin'

export const MainContext = createContext({})

// const override: CSSProperties = {
//   display: "block",
//   position: 'fixed',
//   left: '0',
//   top: '0',
//   width: '100vw',
//   height: '100vh',
//   margin: "0 auto",
//   borderColor: "red",
// };

const App = () => {
  // useNFTUserData(web3Context?.account)
  const web3Context = useWeb3Context()
  // const [cookies, setCookie] = useCookies(['token', 'public_key'])
  
  // useMarketplaceData()
  // useStakingData()
  useOwnerData() 
  useTransferHistories() 
  // useIsRegistered(web3Context?.account)

  const [isLogin, setIsLogin] = useState(true)
  // const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const fetchIsLogin = async () => {
        const body = {
            public_key: web3Context?.account.toLowerCase(),
        }
        axios.post(`${URI}/auth/islogin`, {params: encryptParams(body)})
            .then((res) => {
              console.log("sniper: res.data.login: ", res.data.login)
              if(res.data.login) {
                setIsLogin(true)
              } else {
                setIsLogin(false)
              }
              // setLoading(false)
            })
            .catch((err) => {
              setIsLogin(false)
              // setLoading(false)
            })
    }
    if(web3Context?.account) {
        // setLoading(true)
        fetchIsLogin()
    }
}, [web3Context?.account])


  // const isLogin = useIsLogin(web3Context?.account, cookies?.token)
  // const isLogin = web3Context?.account == cookies?.public_key
  // console.log("sniper: web3Context?.account: ", web3Context?.account)
  // console.log("sniper: wcookies?.token: ", cookies?.token)
  // console.log("sniper: cookies?.public_key: ", cookies?.public_key)
  
  // const loadingRegister = useSelector((state: any) => state.register.status)
  
  // const loadingMarketplaceData = useSelector((state: any) => state.marketplace.status)
  // const loadingStakingData = useSelector((state: any) => state.staking.status)
  // const loadingOwnerData = useSelector((state: any) => state.owner.status)

  const [toggle, setToggle] = useState(false)
  const [loader, setLoader] = useState(false)

  return (
    <RefreshContextProvider>
      <MainContext.Provider value={{toggle, setToggle}}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route path="/" element={<Login setLoader={setLoader}/>} />
            {/* protected routes */}
            {/* <Route path="/referral-Program" element={isLogin? <ReferralProgramme /> : <Navigate to='/' />} /> */}
            {/* <Route path="/notifications" element={isLogin? <Notifications /> : <Navigate to='/' />} /> */}
            {/* <Route path="/swap" element={isLogin? <BuyTaurus /> : <Navigate to='/' />} /> */}
            <Route path="/marketplace" element={isLogin? <Marketplace /> : <Navigate to='/' />} />
            <Route path="/collection" element={isLogin? <Collection /> : <Navigate to='/' />} />
            {/* <Route path="/marketplace/:id" element={isLogin? <Detail setLoader={setLoader}/> : <Navigate to='/' />} /> */}
            {/* <Route path="/collection/:id" element={isLogin? <Detail setLoader={setLoader}/> : <Navigate to='/' />} /> */}
            {/* <Route path="/collection-nft/:id" element={<CollectionNft />} /> */}


          </Routes>
          
          {/* <BarLoader color="#ffffff" loading={loader || loading === true} cssOverride={override} /> */}
          {/* <BarLoader color="#ffffff" loading={loader || loadingMarketplaceData === 'loading' || loadingStakingData === 'loading' || loadingOwnerData === 'loading'} cssOverride={override} /> */}
        </BrowserRouter>
      </MainContext.Provider>
    </RefreshContextProvider>
  );
}

export default App;
