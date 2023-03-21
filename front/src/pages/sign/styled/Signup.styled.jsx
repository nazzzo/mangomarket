import styled from "styled-components";

const SignupWrapStyled = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #fff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  margin: 0 auto;
  overflow-y: hidden;
`;

const ImageBox = styled.div`
  width: 100%;
  height: 30%;
  border-radius: 6px 6px 0 0;
  background: url(https://i.ibb.co/JR82YJf/mango-logo3.png)
    no-repeat;
  background-color: #f3ad22;
  background-size: 70%;
  background-position: center 40%;
`;

const FormWrapper = styled.div`
  height: 70%;
  width: 100%;
  overflow-y: scroll;
`;


export const SignupWrap = ({ width, height, children }) => {
  return (
    <SignupWrapStyled width={width} height={height}>
      <ImageBox />
      <FormWrapper>{children}</FormWrapper>
    </SignupWrapStyled>
  );
};

export const SignupForm = styled.form`
  width: 80%;
  height: 130%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1.8rem;

  & > * {
    margin-bottom: 1rem;
  }

  & > .input-style, input {
    border-radius: 4px;
    background: #f5f4f4;
  }
  & > .input-style.focused {
    border: none;
    box-shadow: 0 0 4px #00337C;
    animation: pulse 1.3s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 4px #00337C;
    }
    50% {
      box-shadow: 0 0 8px #00337C;
    }
    100% {
      box-shadow: 0 0 4px #00337C;
    }
  }

  & > button {
    margin-top: 1.3rem;
    border-radius: 4px;
    margin-bottom: 3rem;
  }
`;

export const Label = styled.span`
`