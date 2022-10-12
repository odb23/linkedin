import React from "react";
import styled from "styled-components";
import Header from "./Header";
import LeftSide from "./LeftSide";
import Main from "./Main";
import RightSide from "./RightSide";

const Home = () => {
  return (
    <div>
      <Header />

      <Container>
        <Section>
          <h5>
            <a>Hiring in a hurry? </a>{" "}
          </h5>
          <p>
            -Find talented pros in record time with upwoork and keep business
            moving.
          </p>
        </Section>

        <Content>
          <Layout>
            <LeftSide />
            <Main />
            <RightSide />
          </Layout>
        </Content>
      </Container>
    </div>
  );
};

const Container = styled.div`
  padding-top: 22px;
  max-width: 100%;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;

  h5 {
    color: #0a66c2;
    font-size: 14px;

    a {
      font-weight: 700;
    }
  }

  p {
    font-size: 14px;
    color: #434649;
    font-weight: 600;
    padding-left: 4px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftSide main rightSide";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  row-gap: 25px;
  column-gap: 25px;
  grid-template-rows: auto;
  margin: 25px 0;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
  }
`;

export default Home;
