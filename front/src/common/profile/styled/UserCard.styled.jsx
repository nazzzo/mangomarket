import styled from "styled-components";

export const UserInfoWrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  & > form {
  display: flex;
  align-items: center;
  }

  & .input-style {
    margin-left: 10px;
    border-radius: 4px;
  }
  & .input-style > input {
    padding-left: 10px;
    border-radius: 4px;
    background: #f5f4f4;
  }
  & .input-style.focused {
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
`

export const WriterInfoWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 3% 1.5% 4%;
  background-color: #f3f3f3;
  border-radius: 8px;
  cursor: pointer;
`
export const UserProfile = styled.div`
  padding-left: 2%;
  width: 50%;
  display: flex;
  align-items: center;
`

export const UserImg = styled.img`
  width: ${(props) => props.imgSize};
  height: ${(props) => props.imgSize};
  border-radius: 50%;
`

export const UserName = styled.span`
  font-size: ${(props) => props.fontSize};
  margin-left: 9%;
`


export const ProfileEdit = styled.button`
  outline: none;
  border: none;
  margin-left: auto;
  margin-right: 5%;
  padding: 1.5%;
  border-radius: 6px;
  font-size: ${(props) => props.fontSize};
  background:  ${({ theme, color }) => theme[color].color};
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    background: ${({ theme, color }) => theme[color].hover};
    transition: all 0.3s ease-out;
  }
`



export const UserHistoryWrap = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`

const TextHeaderWrap = styled.div`
  height: 15%;
  text-align: center;
`

export const TextHeader = ({children}) => {
  return (
    <TextHeaderWrap>
      <h2>{children}</h2>
    </TextHeaderWrap>
  )
}


export const PageCounter = styled.button`
    width: 100%;
    height: 30px;
    opacity: 0;
`


const UserPointStyled = styled.div`
  width: 12rem;
  height: 7rem;
  border-radius: 6px;
  background-color: #fff;
  margin-right: 1%;
  display: flex;
  justify-items: flex-end;
  justify-content:space-between;
  align-items: center;
  
  
  & span {
    display: block;
    font-size: 1rem;
    color: #222;
    padding-left: 15.5%;
  }
`

export const UserPointWrapper = ({ children, score }) => {
  const mangoScore = `${score}점`
  return (
    <UserPointStyled>
      <span>활동점수</span>
      <div style={{ width: '50%', position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '63%',
            left: '61%',
            transform: 'translate(-50%, -50%)',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            color: "#666",
          }}
        >
          {mangoScore}
        </div>
        {children}
      </div>
    </UserPointStyled>
  );
};

export const TooltipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  padding: 8px;
`;

export const TooltipLabel = styled.span`
  font-size: 14px;
  line-height: 1.5;
  color: black;
  margin-bottom: 4px;
`;




const MyPointStyled = styled.div`
  width: 100%;
  height: 7rem;
  border-radius: 6px;
  background-color: #fff;
  margin-right: 1%;
  display: flex;
  justify-items: flex-end;
  justify-content:space-between;
  align-items: center;
  
  
  & span {
    display: block;
    font-size: 1rem;
    color: #222;
  }
`


export const MyPointWrapper = ({ children, score, sum }) => {
  const mangoScore = `${score}점`
  return (
    <MyPointStyled>
      <div style={{ width: '40%', display: "flex", alignItems: "center"}}>
        <span>내 활동점수</span>
        <div style={{ width: '40%', position: 'relative',  }}>
          <div
            style={{
              position: 'absolute',
              top: '63%',
              left: '61%',
              transform: 'translate(-50%, -50%)',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              color: "#666",
            }}
          >
            {mangoScore}
          </div>
          {children}
        </div>
      </div>
      <TooltipWrapper>
          <TooltipLabel>내 게시글 {sum.boardCount}</TooltipLabel>
          <TooltipLabel>성사된 교환내역 {sum.soldCount}건</TooltipLabel>
        </TooltipWrapper>
    </MyPointStyled>
  );
};