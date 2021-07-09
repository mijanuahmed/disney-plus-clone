import React from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 70px);
  display: flex;
  align-items: top;
  justify-content: center;

  &:before {
    background-image: url("/images/login-background.jpg");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
    z-index: -1;
  }
`;

const CTA = styled.div`
  max-width: 650px;
  width: 90%;
  padding: 80px 40px;
  //   margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  //   justify-content: center;
`;

const CTALogoOne = styled.img``;
const CTALogoTwo = styled.img`
  width: 90%;
`;

const SignUp = styled.a`
  width: 100%;
  background-color: #0063e5;
  font-weight: bold;
  text-align: center;
  color: #f9f9f9;
  padding: 12px 0px;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  letter-spacing: 1.5px;
  transition: all 250ms;
  margin-top: 8px;
  margin-bottom: 12px;
  text-transform: uppercase;

  &:hover {
    background: #0483ee;
  }
`;

const Description = styled.p`
  font-size: 11px;
  letter-spacing: 1.5px;
  text-align: center;
  line-height: 1.5;
`;

const Login = () => {
  return (
    <Container>
      <CTA>
        <CTALogoOne src="/images/cta-logo-one.svg" />

        <SignUp>Get All There</SignUp>
        <Description>
          ​Get Premier Access to Raya and the Last Dragon for an additional fee
          with a Disney+ subscription. As of 03/26/21, the price of Disney+ and
          The Disney Bundle will increase by $1.
        </Description>
        <CTALogoTwo src="/images/cta-logo-two.png" />
      </CTA>
    </Container>
  );
};

export default Login;
