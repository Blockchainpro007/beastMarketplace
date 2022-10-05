import Sidebar from 'components/Sidebar'
import Topbar from 'components/Topbar'
import CollectionCard from './CollectionCard'
import { useEffect, useState } from 'react'
// import { NFTData } from 'state/marketplace'
// import { useMarketplaceDataFromDB } from 'state/marketplace/hooks'
import { useSelector } from 'react-redux'
// import { useStakingData, useStakingDataFromStore } from 'state/staking/hooks'
import { useWeb3Context } from 'hooks/useWeb3Context'
import { useOwnerDataByAccount } from 'state/owners/hooks'
import { OwnerData } from 'state/owners'
import useScore from 'hooks/useScore'
// import { StakingItemData } from 'state/staking'
// import GlobModal from 'components/GlobModal'
// import { ClaimAllModal, StakeAllModal, UnStakeAllModal } from 'views/modals/Modals'
// import { DAY_SECOND, REWARD_PER_DAY } from 'config/nfts'


// const SCROLL_COUNT = 20

const Collection = () => {
  const web3Context = useWeb3Context()
  // const [active, setActive] = useState(true)
  // const [scrollBottomCount, setScrollBottomCount] = useState(1)
  // const [displayNftsOnWallet, setDisplayNftsOnWallet] = useState<OwnerData[]>([])

  // const [stakingAllModal, setStakingAllModal] = useState(false)
  // const [unstakingAllModal, setUnStakingAllModal] = useState(false)
  // const [claimAllModal, setClaimAllModal] = useState(false)
  
  // useStakingData()

  // const nfts: NFTData[] = useMarketplaceDataFromDB()
  // const nftsOnWallet: number[] = useNFT()
  const nftsOnWallet: OwnerData[] = useOwnerDataByAccount(web3Context?.account)
  const score = useScore(web3Context?.account, nftsOnWallet)
  // const nftsOnStaking = useStakedNFT()
  // const nftsOnStaking: StakingItemData[] = useStakingDataFromStore(web3Context?.account)
  
  // const getTotalReward = () => {
  //   const currentTime = Math.floor(Date.now() / 1000)
  //   let totalReward = 0;
  //   for(var i = 0; i < nftsOnStaking.length; i++) {
  //     let _stakingTime = 0
  //     const duration = currentTime - nftsOnStaking[i].startTime + 120
  //     if(duration > 0)
  //       _stakingTime = duration
  //     totalReward += Math.floor(_stakingTime/DAY_SECOND)*REWARD_PER_DAY
  //   }
  //   return totalReward
  // }

  // const totalReward = getTotalReward()

  const loading = useSelector((state: any) => state.owner.status)
  
  // const handleScroll = (e: any) => {
    
  //   var scrollTop = Number(document.scrollingElement?.scrollTop);
  //   var scrollHeight = Number(document.scrollingElement?.scrollHeight); // added
  //   var clientHeight = Number(document.scrollingElement?.clientHeight);
  //   var contentHeight = scrollHeight - clientHeight; // added
  //   if (contentHeight <= scrollTop) // modified
  //   {
  //       let maxCountScroll = nftsOnWallet.length / SCROLL_COUNT
  //       if(nftsOnWallet.length % SCROLL_COUNT != 0) maxCountScroll++
  //       if(scrollBottomCount + 1 <= maxCountScroll)
  //         setScrollBottomCount(scrollBottomCount + 1)
  //   }
  // }

  // useEffect(() => {
  //   // const getDisplayData = () => {
  //   //   const _displayNFTs = nftsOnWallet.slice(0, SCROLL_COUNT * scrollBottomCount)
  //   //   setDisplayNftsOnWallet(_displayNFTs)
  //   // }
  //   // if(loading === 'fulfilled' && nftsOnWallet) getDisplayData()
  //   window.removeEventListener('scroll', handleScroll);
  //   window.addEventListener('scroll', handleScroll, { passive: true })
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [scrollBottomCount])

  return (
    <div className=' w-full flex items-center gap-5'>
      
      <div className='relative z-50'>
        <Sidebar />
      </div>
      <div className=' lg:ml-56 pr-5 w-full'>
        <Topbar />
        <h1 className=' text-5xl pl-8 font-medium text-white mt-16'>My NFT Collection</h1>
        <div className=' my-7 px-8 flex flex-direction-column justify-center'>
          <h6 className=' text-lg text-white font-medium'>{`EpicBeast: ${score}`}</h6>
        </div>
        {loading === 'fulfilled' &&
          <div className=' mt-4 w-full px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-7'>
            {
              nftsOnWallet.map((item: any, ind: any) => (
                <CollectionCard stake={false} data={item} key={ind}/>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Collection