// import React, { useState } from 'react'
import { AiFillCheckCircle } from "react-icons/ai"
// import { Link } from 'react-router-dom'
// import GlobModal from 'components/GlobModal'
// import { CancelListingModal, ClaimModal, EditModal, SellModal, StakeModal, UnStakeModal } from '../modals/Modals'
import { AUTHOR, getIpfsUrl } from 'config/nfts'
// import { useDetailDataById } from 'state/detail/hooks'
// import { NFTData } from 'state/detail'

interface EmployeeProps {
    stake: boolean;
    data: any
}

function CollectionCard({ stake, data }: EmployeeProps) {
    // const [claimModal, setclaimModal] = useState(false)
    // const [unstake, setUnstake] = useState(false)
    // const [stakemodal, setStakemodal] = useState(false)
    // const [sellModal, setSellModal] = useState(false)
    // const [cancelListingModal, setCancelListingModal] = useState(false)
    // const[editModal, setEditModal] = useState(false)

    // const detail: NFTData | undefined = useDetailDataById(Number(data.id))

    return (
        <div className=' bg-br  rounded-2xl overflow-hidden relative ani_parent'>
            {/* <GlobModal size="xl" open={sellModal} setOpen={setSellModal} >
                <SellModal setSellModal={setSellModal} data={detail}/>
            </GlobModal> */}
            {/* <GlobModal size="xl" open={claimModal} setOpen={setclaimModal} >
                <ClaimModal  setclaimModal={setclaimModal} data={detail} />
            </GlobModal>
            <GlobModal size="xl" open={unstake} setOpen={setUnstake} >
                <UnStakeModal  setUnstake={setUnstake} data={detail} />
            </GlobModal>
            <GlobModal size="xl" open={stakemodal} setOpen={setStakemodal} >
                <StakeModal  setStake={setStakemodal} data={detail}/>
            </GlobModal> */}
            {/* <GlobModal size="xl" open={cancelListingModal} setOpen={setCancelListingModal} >
                <CancelListingModal  setCancelListingModal={setCancelListingModal} data={detail}/>
            </GlobModal> */}
            {/* <GlobModal size="xl" open={editModal} setOpen={setEditModal} >
                <EditModal  setEditModal={setEditModal} data={detail}/>
            </GlobModal> */}

            
            <div>
                <div className="p-3 w-full">
                    <div className=' w-full rounded-2xl overflow-hidden'>
                        <img src={getIpfsUrl(data.id)} className=' h-72 w-full object-cover' alt="" />
                    </div>
                </div>
                <div className=' py-2 px-3'>
                    <h6 className=' text-lg text-white font-medium'>{`Token Id: ${data.id}`}</h6>
                    <div className='w-full flex items-center justify-between'>
                        <p className=' text-gray-500 text-sm pt-1 flex items-center gap-1'>{AUTHOR} <AiFillCheckCircle className='text-pr' /></p>
                        {/* <p className=' text-gray-500 text-sm pt-1 flex items-center gap-1'>{`Token Id: ${data.id}`}</p> */}
                    </div>
                </div>
                {/* <div className=' w-full bg-sr py-3 px-3 flex items-center justify-between'>
                    <p className=' text-xs text-gray-500'>Claimable Tokens</p>
                    {stake && <div className=' flex items-center gap-1 text-white '>
                        <img src="/images/BNB.png" className='w-5 h-5 object-contain' alt="" />
                        {data ? `${Math.floor(detail.stakingTime/DAY_SECOND)*REWARD_PER_DAY} $TT` : `0 $TT`}
                    </div>}
                </div> */}
            </div>
        </div>
    )
}

export default CollectionCard