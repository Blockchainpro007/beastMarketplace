import React from 'react'
import styled from 'styled-components'
import { useWeb3Context } from 'hooks/useWeb3Context'

const StyledConnectButton = styled.button`
  min-width: 180px;
  background: #4d94e8;
  padding: 10px 15px;
  font-size: 20px;
  border-radius: 100px;
  border: none;
  color: white;
  cursor: pointer;
`

const WalletConnectButton = () => {
  const web3Context = useWeb3Context()

  const displayAddress =  `${web3Context?.account.substring(0, 6)}...${web3Context?.account.substring(web3Context?.account.length - 6)}`
  
  return (
    <>
      { web3Context?.account ?
        <StyledConnectButton onClick={web3Context?.disconnect}>
          Disconnect
          <br/>
          {displayAddress}
        </StyledConnectButton>
        :
        <StyledConnectButton onClick={web3Context?.connectWallet}>Connect Wallet</StyledConnectButton>
      }
    </>
  )
}

export default WalletConnectButton