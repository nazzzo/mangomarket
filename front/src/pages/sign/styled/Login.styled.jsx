import styled from "styled-components";

const SigninWrapStyled = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: #fff;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.7);
  border-radius: 6px;
  margin: 0 auto;
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

const Logo = styled.h2`
  width: 100%;
  text-align: center;
  margin: 1.5rem 0;
`;

export const SigninWrap = ({ width, height, children }) => {
  return (
    <SigninWrapStyled width={width} height={height}>
      <ImageBox />
      <Logo>로그인</Logo>
      {children}
    </SigninWrapStyled>
  );
};

export const SigninForm = styled.form`
  width: ${({ width }) => width};
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
  }
`;

export const SigninOption = styled.div`
  font-size: ${({ fontSize }) => fontSize};
  width: ${({ width }) => width};
  margin: 0 auto;

  & > ul {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    cursor: pointer;
  }

  & > p {
    text-align: center;
  }

  & > p > a {
    color: #d67900;
    cursor: pointer;
  }
`