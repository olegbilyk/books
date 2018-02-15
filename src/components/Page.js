import React from 'react'
import styled, { injectGlobal } from 'react-emotion'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter as Router } from 'react-router-redux'
import history from '../history'
import routers from '../routerConfig'

injectGlobal`
  :root {
    --color-default: #858585;
    --color-white: #fff;
    --color-primary: #333;
    --color-primary-2: #f14814;
    --color-primary-3: #ffad1e;
    --color-link: #333;
    --color-link-hover: #8970da;
    --color-link-active: #6355aa;
    --font: 'Raleway', sans-serif;
    --font-primary: 'Dancing Script', cursive;
  }
  
  @font-face {
    font-family: 'Dancing Script';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Dancing Script Bold'), local('DancingScript-Bold'), url(https://fonts.gstatic.com/s/dancingscript/v9/If2SXTr6YS-zF4S-kcSWSVi_szpbr_QqqiM8rebB.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('Raleway'), local('Raleway-Regular'), url(https://fonts.gstatic.com/s/raleway/v12/1Ptug8zYS_SKggPNyC0IT4ttDfA.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  body {
    margin: 0;
  }
  
  a {
    display: inline-block;
    text-decoration: none;
    transition: all 0.2s ease;
    color: var(--color-link);
    outline: none;
    
    :hover,
    :focus {
      color: var(--color-link-hover);
    }
    
    :active {
      color: var(--color-link-active);
    }
  }
`

const Content = styled('div')`
  display: grid;
  padding-bottom: 50px;
  font-family: var(--font);
  font-size: 20px;
  line-height: 1.6;
  font-weight: 400;
  color: var(--color-default);
`

const Header = styled('header')`
  position: relative;
  padding-top: 30px;
  padding-bottom: 30px;

  @media (min-width: 800px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`

const Body = styled('main')`
  padding: 0 30px 30px;
`

const HeaderTitle = styled('h1')`
  margin-top: 0;
  margin-bottom: 0;
  font-family: var(--font-primary);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.125;
  text-align: center;
  color: var(--color-primary);

  ::after {
    content: '';
    display: block;
    margin: 27px auto 34px;
    width: 60px;
    height: 3px;
    background: var(--color-primary-2) linear-gradient(90deg, var(--color-primary-2) 0%, var(--color-primary-3) 100%);
  }

  @media (min-width: 800px) {
    font-size: 60px;
  }
`

function Page (props) {
  const routesTitle = routers.map((route, i) => (
    <Route path={route.path} render={() => <HeaderTitle>{route.title}</HeaderTitle>} exact={route.isExact} key={i} />
  ))

  const routesContent = routers.map((route, i) => (
    <Route path={route.path} component={route.component} exact={route.isExact} key={i} />
  ))

  return (
    <Router history={history}>
      <Content>
        <Header>
          <Switch>
            {routesTitle}
          </Switch>
        </Header>
        <Body>
          <Switch>
            <Redirect exact from='/' to='/books' />
            {routesContent}
          </Switch>
        </Body>
      </Content>
    </Router>
  )
}

export default Page
