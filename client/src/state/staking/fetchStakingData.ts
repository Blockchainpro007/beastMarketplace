import { GRAPH_API_URL, NFT_NUM, NULL_ADDRESS } from "config/nfts"
import { getStakingAddress } from "utils/addressHelpers"
import stakingABI from 'config/abis/nftStaking.json'
import {multicall3} from "utils/multicall"
import BigNumber from "bignumber.js"

// export const fetchStakingData = async () => {
//     const calls = []
//     const stakingAddress = getStakingAddress()
//     for (let i = 0; i < NFT_NUM; i ++) {
//       const callData =  {
//         address: stakingAddress,
//         name: 'stakeInfo',
//         params: [i],
//       }
//       calls.push(callData)
//     }
    
//     const rawStakingData = await multicall3(stakingABI, calls)
//     const parsedStakingData = rawStakingData.map((item: any, ind: number) => {
//       return {
//         id: ind,
//         owner: item[0], 
//         startTime: Number(new BigNumber(item[1]._hex).toJSON()),
//         stakedDays: Number(new BigNumber(item[2]._hex).toJSON()),
//     }
//     })
//     return parsedStakingData
// }


// import { createClient } from 'urql'
// import { getStakingInfo } from 'queries/query'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
export const fetchStakingData = async () => {
  const usersQuery = `
    query {
      stakings {
        tokenId
        owner
        startTime
        stakedDays
      }
    }
  `
  const client = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/seniorblockchaindev/epicbeast',
    cache: new InMemoryCache(),
  })

  const data = await client.query({query: gql(usersQuery),})
  let stakinglists = data.data.stakings.map((item: any, ind: number) => {
      return {
        id: item.tokenId,
        owner: item.owner,
        startTime: Number(item.startTime),
        stakedDays: Number(item.stakedDays)
      }
    })

  for(var i = 0; i < NFT_NUM; i++) {
    const validate = stakinglists.filter((item: any) => item.id == i)
    if(validate.length > 0) continue
    const newItem = {
      id: i,
      owner: NULL_ADDRESS,
      startTime: 0,
      stakedDays: 0
    }
    stakinglists = [...stakinglists, newItem]
  }
  stakinglists.sort((a: any, b: any) => Number(a.id) - Number(b.id))
  return stakinglists
}
