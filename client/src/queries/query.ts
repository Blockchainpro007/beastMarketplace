
export const getStakingInfo = `query($first: Int, $skip: Int) {
    stakings(first: $first, skip: $skip, orderBy: tokenId) {
      tokenId
      owner
      startTime
      stakedDays
    }
  }`

export const getEpicNFTHolders = `query($first: Int, $skip: Int) {
  epicNFTHolders(first: $first, skip: $skip, orderBy: tokenId) {
    tokenId
    owner
    approved
  }
}`

export const getSaleLists = `query($first: Int, $skip: Int) {
    saleLists(first: $first, skip: $skip, orderBy: tokenId) {
      id
      tokenId
      price
      totalVolume
    }
  }`