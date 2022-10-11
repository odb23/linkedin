import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <Container>
      <Content>
        <Logo>
          <a href="home">
            <img src="/images/home-logo.svg" alt="" />
          </a>
        </Logo>

        <Search>
          <div>
            <input type="text" placeholder='Search' />
          </div>
          <SearchIcon>
            <img src="/images/search-icon.svg" alt="" />
          </SearchIcon>
        </Search>

        <Nav>
          <NavListWrap>
            <NavList className="active">
              <a>
                <img src="/images/nav-home.svg" alt='' />
                <span>Home</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-network.svg" alt='' />
                <span>My Network</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-jobs.svg" alt='' />
                <span>Jobs</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-messaging.svg" alt='' />
                <span>Messaging</span>
              </a>
            </NavList>

            <NavList>
              <a>
                <img src="/images/nav-notifications.svg" alt='' />
                <span>Notifications</span>
              </a>
            </NavList>

            <User>
              <a>
                <img src='/images/user.svg' alt='' />

                <span>Me  <img src='/images/down-icon.svg' alt='' /> </span>
              </a>

              <SignOut>
                <a>Sign out</a>
              </SignOut>
            </User>

            <Work>
              <a>
                <img src='/images/nav-work.svg' alt='' />
                <span>Work <img src='/images/down-icon.svg' alt='' /></span>
              
              </a>
            </Work>
          </NavListWrap>
        </Nav>

      </Content>
    </Container>

  )
}

const NavList = styled.li`
display: flex;
align-items: center;

a {
  align-items: center;
  background: transparent;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  min-width: 80px;
  min-height: 52px;
  line-height: 1.5;
  position: relative;
  text-decoration: none;

  span {
    color: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
  }

  @media( max-width: 768px) {
    
  min-width: 70px;
  }
}

&:hover, &:active {
  a {
    span{
      color: rgba(0,0,0,0.9);
    }
  }
}
`
const SignOut = styled.div`
position: absolute;
top: 45px;
background: white;
border-radius: 0 0 5px 5px;
width: 100px;
height: 40px;
font-size: 16px;
transition-duration: 200ms;
text-align: center;
display: none;
`

const User = styled(NavList)`
a > img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

span {
  display: flex-inline;
  
}

&:hover{
  ${SignOut}{
    align-items: center;
    display: flex;
    justify-content-center;
  }
}
`

const Work = styled(User)`
border-left: 1px solid rgbsa(0,0,0,0.08);
`



const NavListWrap = styled.ul`
display: flex;
flex-wrap: nowrap;
list-style: none;

.active {
  span:after{
    content: '';
    transform: scaleX(1);
    border-bottom: 2px solid var(--white, #fff);
    bottom: 0;
    left: 0;
    position: absolute;
    transition: transform .2s ease-in-out;
    width: 100%;
    border-color: rgba(0,0,0,0.9);
  }
}
`;

const Nav = styled.nav`
margin-left: auto;
display: block;

@media (max-width: 768px) {
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  width: 100%
}
`

const SearchIcon = styled.div`
width: 40px;
position: absolute;
z-index: 1;
top: 10px;
left: 1px;
border-radius: 0 2px 2px 0;
margin: 0;
pointer-events: none;
display: flex;
justify-content: center;
align-items: center;
`

const Search = styled.div`
opacity: 1;
flex-grow: 1;
position: relative;

& > div {
  max-width : 280px;

  input {
    border: none;
    box-shadow: none;
    background-color: #eef3f8;
    border-radius: 2px;
    color: rgba(0,0,0,0.9);
    width: 218px;
    padding: 0 8px 0 40px;
    line-height: 1.75;
    font-weight: 400;
    font-size: 14px;
    height: 34px;
    border-color: #dce6f1;
    vertical-align: text-top;
  }
}
`;

const Logo = styled.span`
margin-right: 8px;
font-size: 0px;
`
const Content = styled.div`
display: flex;
align-items: center;
margin 0 auto;
min-height: 100%;
max-width: 1200px;
`

const Container = styled.div`
background-color: white;
border-bottom: 1px solid rgba(0,0,0,0.8);
left: 0;
padding: 0 24px;
position: sticky;
top: 0;
width: 100vw;
z-index: 99;
`;

export default Header