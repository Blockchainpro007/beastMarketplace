import nftABI from 'config/abis/nft.json'
import { getNFTAddress } from 'utils/addressHelpers'
import {multicall2} from 'utils/multicall'
import { GRAPH_API_URL, NFT_NUM, NULL_ADDRESS } from 'config/nfts'


// export const fetchOwnerData = async () => {
//   const calls = []
//   const nftAddress = getNFTAddress()
//   for (let i = 0; i < NFT_NUM; i ++) {
//     const callData =  {
//       address: nftAddress,
//       name: '_ownerships',
//       params: [i],
//     }
//     calls.push(callData)
//   }
//   const rawOwners = await multicall2(nftABI, calls)
  
//   let count = 0;
//   type TypeValidater = {
//       [key: string]: boolean
//   }
//   let validater: TypeValidater = {}
//   let startOwner = ''
//   const parsedOwners = rawOwners.map((item: any, ind: number) => {
//     let owner = item[0].toLowerCase()
//     if(owner != NULL_ADDRESS) {
//       if(!validater[owner]) {
//         validater[owner] = true
//         count++;
//       }
//       startOwner = owner;
//     } else 
//       owner = startOwner
//     return {id: ind, owner: owner}
//   })
//   return {owners: parsedOwners, count: count}
// }

// import { createClient } from 'urql'
// import { getEpicNFTHolders } from 'queries/query'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export const fetchOwnerData = async () => {

    const usersQuery = `
      query {
        epicNFTHolders {
          tokenId
          owner
          approved
        }
      }
    `
    const client = new ApolloClient({
      uri: 'https://api.studio.thegraph.com/query/34591/epicbeast/0.0.7',
      cache: new InMemoryCache(),
    })

    const data = await client.query({query: gql(usersQuery),})
    const owners = data.data.epicNFTHolders.map((item: any, ind: number) => {
        return {
          id: item.tokenId,
          owner: item.owner
        }
      })
  
  let count = 0
  type TypeValidater = {
      [key: string]: boolean
  }
  let validater: TypeValidater = {}
  owners.map((item: any, ind: number) => {
    let owner = item.owner.toLowerCase()
    if(owner !== NULL_ADDRESS) {
      if(!validater[owner]) {
        validater[owner] = true
        count++;
      }
    } 
  })
  return {owners: owners, count: count}
}
