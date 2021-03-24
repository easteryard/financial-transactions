import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { LIGHT_THEME } from './theme';
import { Transactions } from './pages/Transactions/Transactions';
import logo from './logo.svg';
import SideNavBar from "./components/SideNavBar";

export const App = () => {
  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <StyledApp>
        <SideNavBar logo={logo} />
        <StyledMain>
          <StyledCard>
            <Transactions userId="Fake-ID" />
          </StyledCard>
        </StyledMain>
      </StyledApp>
    </ThemeProvider>
  );
};

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  color: ${({ theme }) => theme.text};
  font-family: sans-serif;
`;

const StyledMain = styled.main`
  background-color: ${({ theme }) => theme.background};
  padding: 32px;
  flex: 1 0 auto;
  display: flex;
  align-items: flex-start;
  overflow: scroll;
`;

const StyledCard = styled.div`
  background-color: ${({ theme }) => theme.surface};
  padding: 32px;
  flex: 1 0 auto;
  border: 1px solid ${({ theme }) => theme.surfaceStroke};
  border-radius: 24px;

  flex: 1 0 auto;
`;
