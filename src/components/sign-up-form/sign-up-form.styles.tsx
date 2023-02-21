import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;
