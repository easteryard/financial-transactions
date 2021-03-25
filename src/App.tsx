import React, { ReactNode } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { LIGHT_THEME } from './theme';
import { Transactions } from './pages/Transactions/Transactions';
import logo from './logo.svg';
import SideNavBar from './components/SideNavBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserTokenProvider from './components/providers/UserTokenProvider';

interface IGlobalProviders {
  children: ReactNode
}

export const App = () => {
  return (
    <GlobalProviders>
      <Router>
        <SideNavBar logo={logo} />
        <StyledMain>
          <Switch>
            <Route exact path='/' component={Transactions} />
          </Switch>
        </StyledMain>
      </Router>
    </GlobalProviders>
  );
};

const GlobalProviders = ({ children }: IGlobalProviders) => {
  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <UserTokenProvider>
          <StyledApp>
            {children}
          </StyledApp>
        <ToastContainer />
      </UserTokenProvider>
    </ThemeProvider>
  )
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
