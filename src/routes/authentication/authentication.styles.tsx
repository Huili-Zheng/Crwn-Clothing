import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 900px;
  margin: 30px auto;
  height: 100vh;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const SignInSignUpContainer = styled.div`
  width: 48%;

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 10px;
    margin-right: 0px;
    margin-left: 0px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
