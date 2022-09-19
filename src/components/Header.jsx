import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <Container>
        <Content>
            Header
        </Content>
    </Container>

  )
}

const Content = styled.div``

const Container = styled.div`
background-color: white;
border-bottom: 1px solid rgba(0,0,0,0.8);
left: 0;
padding: 0 24px;
position: fixed;
top: 0;
width: 100vw;
z-index: 99;
`;

export default Header