import { URI } from 'api-control/api'
import axios from 'axios'
import { REWARD_PER_DAY, DAY_SECOND } from "config/nfts";
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { OwnerData } from 'state/owners'
import encryptParams from 'utils/encryption'
import useRefresh from './useRefresh';

const useScore = (account: any, nftsonWallet: any) => {
  const [score, setScore] = useState(0)
  const {fastRefresh} = useRefresh()
  const allHistories = useSelector((state: any) => state.transferHistories.histories)

  useEffect( () => {

    const fetchScore = async (account: string, nftsonWallet: OwnerData[]) => {
        const provider = ethers.providers.getDefaultProvider()
        const currentBlockNumber = await provider.getBlockNumber()
        const currentTimestamp = (await provider.getBlock(currentBlockNumber)).timestamp;
        const body = {
            public_key: (account)
        }  
        axios.post(`${URI}/auth/scoredata`, {params: encryptParams(body)})
            .then(async (res) => {
                const registerTime = Math.floor(res.data.createTime/1000)
                let _score = 0
                for(var i = 0; i < nftsonWallet.length; i++) {
                    const tokenId = nftsonWallet[i].id
                    const transferHistories = allHistories.filter((item: any) => item.tokenId === tokenId)
                    const considerHistories = transferHistories.filter((item: any) => item.timestamp >= registerTime)
                    if(considerHistories.length > 0) {

                    } else {
                        _score += Math.floor((currentTimestamp - registerTime) / DAY_SECOND) * REWARD_PER_DAY
                    }
                }
                setScore(_score)
            })
            .catch((err) => {
                console.log(err)
            })
        // setScore(_score)
    }

    if(account && nftsonWallet) {
        fetchScore(account, nftsonWallet)
    }
  }, [account, allHistories, nftsonWallet, fastRefresh])

  return score
}

export default useScore