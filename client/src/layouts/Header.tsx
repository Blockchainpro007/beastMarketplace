import React from 'react'
import styled from 'styled-components'
import WalletConnectButton from 'components/WalletConnectButton'

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
  max-width: 1400px;
  align-items: center;
  justify-content: space-between;
  margin: auto;
`

const StyledLogo = styled.img`
  height: 90px;
`

const Header = () => {
  
  return (
    <StyledHeader>
      <a href="/">
        <StyledLogo src="images/logo.png" alt="logo" />
      </a>
      <WalletConnectButton />
    </StyledHeader>
  )
}

export default Header