import { ethers } from 'ethers'
import { getRegisterContract } from '../contractHelpers'

export const register = async (provider: any, address: string) => {
  const registerContract = getRegisterContract(provider)
  await registerContract.methods
    .register()
    .send({ from: address })
  // return new Promise(async(resolve, reject) => {
  //   await registerContract.methods
  //     .registerWithoutSponsor()
  //     .send({ from: address, value: ethers.utils.parseEther("0.18") }, (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
}

export const registerWithSponsor = async (provider: any, address: string, sponsor: string) => {
  const stakingContract = getRegisterContract(provider)
  await stakingContract.methods
    .registerWithSponsor(sponsor)
    .send({ from: address, value: ethers.utils.parseEther("0.06") })
  // return new Promise(async(resolve, reject) => {
  //   await stakingContract.methods
  //     .registerWithSponsor(sponsor)
  //     .send({ from: address, value: ethers.utils.parseEther("0.06") }, (err: any, data: any) => {
  //       if (err) {
  //         reject(err)
  //       }
  //       resolve(data)
  //     })
  // })
}
