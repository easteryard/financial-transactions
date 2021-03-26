import React from 'react'
import styled from "styled-components";

interface IProps {
  logo: string
}

export default function SideNavBar ({ logo }: IProps) {
    return (
      <StyledNavigation>
        <StyledLogo src={logo} />
      </StyledNavigation>
    )
}

const StyledNavigation = styled.nav`
  background-color: ${({ theme }) => theme.surface};
  color: white;
  height: 100vh;
  width: 80px;
  max-width: 80px;
  flex: 0 0 80px;
  padding-top: 16px;
  border-right: 1px solid ${({ theme }) => theme.surfaceStroke};
`;

const StyledLogo = styled.img`
  width: 100%;
`;
