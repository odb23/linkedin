import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router-dom"


const Login = (props) => {
 
  return (
    <Container>
      {props.user && <Navigate to="/home" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>

        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>

      <Section>
        <Hero>
          <h1>Welcome to your professional community</h1>
          <img src="/images/login-hero.svg" alt="" />
        </Hero>

        <Form>
          <Google onClick={() => props.signIn()}>
            <img src="/images/google.svg" alt="" />
            Sign In with Google
          </Google>
        </Form>
      </Section>
    </Container>
  );
};

const Google = styled.button`
  display: flex;
  justify-content: center;
  background-color: white;
  width: 100%;
  align-items: center;
  height: 56px;
  cursor: pointer;
  border-radius: 24px;
  outline: none;
  border: none;
  gap: 12px;
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%), inset 0 0 02px rgb(0 0 0 / 0%),
    inset 0 0 0 1px rgb(0 0 0 / 0%);
  vertical-align: middle;
  transition-duration: 200ms;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);

  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.8);
  }
`;

const Form = styled.div`
  margin-top: 100px;
  width: 408px;
  z-index: 2;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Hero = styled.div`
  z-index: 1;
  width: 100%;
  h1 {
    z-index: 10;
    padding-bottom: 0;
    width: 55%;
    font-size: 56px;
    color: #2977c9;
    font-weight: 200;
    line-height: 70px;

    @media (max-width: 768px) {
      text-align: center;
      font-size: 20px;
      width: 100%;
      line-height: 2;
    }
  }

  img {
    width: 700px;
    height: 670px;
    position: absolute;
    bottom: -2px;
    right: -150px;
    z-index: -1;

    @media (max-width: 768px) {
      top: 230px;
      width: initial;
      position: initial;
      height: initial;
    }
  }
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding-top: 40px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    min-height: 0px;
  }
`;

const SignIn = styled.a`
  box-shadow: inset 0 0 0 1px #0a66c2;
  color: #0a66c2;
  border-radius: 20px;
  transition-duration: 200ms;
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  padding: 10px 24px;
  cursor: pointer;

  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }
`;

const Join = styled.a`
  font-size: 16px;
  padding: 10px 12px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.66);
  margin-right: 12px;
  cursor: pointer;
  transition-duration: 200ms;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
  }
`;

const Container = styled.div`
  padding: 0 8px;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: auto;
  padding: 12px 0px 16px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: space-between;
  flex-wrap: nowrap;

  & > a {
    width: 135px;
    height: 34px;
  }
`;

const mapStateToProps = (state) => ({
  user: state.userState.user,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
