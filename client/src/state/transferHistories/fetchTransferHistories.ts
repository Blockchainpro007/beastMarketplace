import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

export const fetchTransferHistories = async () => {

    const usersQuery = `
        query {
            transferHistories {
                tokenId
                from
                to
                blockNumber
                timestamp
            }
        }
    `
    const client = new ApolloClient({
      uri: 'https://api.studio.thegraph.com/query/34591/epicbeast/0.0.7',
      cache: new InMemoryCache(),
    })

    const data = await client.query({query: gql(usersQuery),})
    const histories = data.data.transferHistories.map((item: any, ind: number) => {
        return {
            id: item.tokenId,
            from: item.from,
            to: item.to,
            blockNumber: item.blockNumber,
            timestamp: item.timestamp
        }
      })
  
    return histories
}
