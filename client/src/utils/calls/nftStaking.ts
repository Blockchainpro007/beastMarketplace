import { getStakingContract } from '../contractHelpers'

export const callStakeNFT = async (provider: any, address: string, id: number) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  //   await stakingContract.methods
  //     .stake(id)
  //     .send({ from: address }, (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
  return  await stakingContract.methods
      .stake(id)
      .send({ from: address })
}

export const callUnstakeNFT = async (provider: any, address: string, id: number) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  //   await stakingContract.methods
  //     .unstake(id)
  //     .send({ from: address }, (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
  return  await stakingContract.methods
      .unstake(id)
      .send({ from: address })
}

export const callClaim = async (provider: any, address: string, id: number) => {
  const stakingContract = getStakingContract(provider)
  return  await stakingContract.methods
      .claim(id)
      .send({ from: address })
}

export const callStakeAllNFT = async (provider: any, address: string, ids: any[]) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  //   await stakingContract.methods
  //     .stake(id)
  //     .send({ from: address }, (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
  return  await stakingContract.methods
      .stakeAll(ids)
      .send({ from: address })
}

export const callUnstakeAllNFT = async (provider: any, address: string, ids: any[]) => {
  const stakingContract = getStakingContract(provider)
  // return new Promise(async(resolve, reject) => {
  //   await stakingContract.methods
  //     .unstake(id)
  //     .send({ from: address }, (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
  return  await stakingContract.methods
      .unstakeAll(ids)
      .send({ from: address })
}

export const callClaimAll = async (provider: any, address: string, ids: any[]) => {
  const stakingContract = getStakingContract(provider)
  return  await stakingContract.methods
      .claimAll(ids)
      .send({ from: address })
}
