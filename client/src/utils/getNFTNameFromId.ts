import { NFT_NUM } from "config/nfts"

const getNFTNameFromId = (id: number) => {
    return `#${Math.floor(id + 1)} NFT of ${NFT_NUM}`
}

export default getNFTNameFromId