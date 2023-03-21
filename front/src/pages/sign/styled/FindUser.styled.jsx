import styled from "styled-components";

const FindUserWrapStyled = styled.div`
    position: absolute;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: #fff;
    box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`
const ImageBox = styled.div`
  width: 100%;
  height: 12%;
  border-radius: 6px 6px 0 0;
  background: url(https://i.ibb.co/JR82YJf/mango-logo3.png)
    no-repeat;
    background-color: #f3ad22;
  background-size: 70%;
  background-position: center 84%;
`;

const Switch = styled.div`
`
export const ManualText = styled.span`
    font-size: ${({ fontSize }) => fontSize};
    color: #333;
    text-align: center;
    margin-top: 20px;
`

export const ResultText = styled.span`
    font-size: ${({ fontSize }) => fontSize};
    color: #333;
    text-align: center;
`

export const FindUserWrap = ({ width, height, children }) => {
    return (
      <FindUserWrapStyled width={width} height={height}>
        <ImageBox />
        <ManualText />
        <Switch />
        {children}
      </FindUserWrapStyled>
    );
  };

export const FindUserForm = styled.form`
  width: ${({ width }) => width};
  margin: 0 auto;
  display: flex;
  flex-direction: column;

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
    border-radius: 4px;
  }
  `