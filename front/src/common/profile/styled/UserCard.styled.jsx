import styled from 'styled-components'

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
        box-shadow: 0 0 4px #00337c;
        animation: pulse 1.3s infinite;
    }
    @keyframes pulse {
        0% {
            box-shadow: 0 0 4px #00337c;
        }
        50% {
            box-shadow: 0 0 8px #00337c;
        }
        100% {
            box-shadow: 0 0 4px #00337c;
        }
    }
`

export const WriterInfoWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 3% 1.5% 4%;
    margin-bottom: 5%;
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

export const UserInfoLabel = styled.div`
    margin-left: 3%;
`

export const UserName = styled.span`
    font-size: ${(props) => props.fontSize};
`

export const Address = styled.p`
    padding-top: 5%;
    font-size: 0.8rem;
    color: #666;
`

export const ButtonBox = styled.div`
    margin-left: auto;
    display: flex;

    & button {
        border-radius: 6px;
        margin-left: 5%;
        height: 2rem;
        width: 6rem;
        font-size: 0.8rem;
        color: #fff;
    }
`

// export const ProfileEdit = styled.button`
//   outline: none;
//   border: none;
//   margin-left: auto;
//   margin-right: 5%;
//   padding: 1.5%;
//   border-radius: 6px;
//   font-size: ${(props) => props.fontSize};
//   background:  ${({ theme, color }) => theme[color].color};
//   cursor: pointer;
//   transition: all 0.3s ease-out;

//   &:hover {
//     background: ${({ theme, color }) => theme[color].hover};
//     transition: all 0.3s ease-out;
//   }
// `

export const UserHistoryWrap = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`

const TextHeaderWrap = styled.div`
    height: 15%;
    text-align: center;
`

export const TextHeader = ({ children }) => {
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
    justify-content: space-between;
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
                        color: '#666',
                    }}
                >
                    {mangoScore}
                </div>
                {children}
            </div>
        </UserPointStyled>
    )
}

export const TooltipWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding: 8px;
    height: 7rem;
    width: 13rem;
    cursor: pointer;
`

export const TooltipLabel = styled.span`
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    margin-bottom: 4px;
`

const MyPointStyled = styled.div`
    width: 100%;
    height: 7rem;
    border-radius: 6px;
    background-color: #fff;
    margin-right: 1%;
    display: flex;
    justify-items: flex-end;
    justify-content: space-around;
    align-items: center;

    & span {
        display: block;
        font-size: 1rem;
        color: #222;
    }
`

export const MyPointWrapper = ({ children, score, sum, setIsOpen }) => {
    const mangoScore = `${score}점`
    return (
        <MyPointStyled>
            <div
                style={{
                    height: '7rem',
                    width: '13rem',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '6px',
                    boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)',
                }}
            >
                <span style={{ paddingLeft: '15%' }}>활동점수</span>
                <div style={{ width: '50%', position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '63%',
                            left: '57%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            color: '#666',
                        }}
                    >
                        {mangoScore}
                    </div>
                    {children}
                </div>
            </div>
            <TooltipWrapper
                onClick={() => {
                    setIsOpen(true)
                }}
            >
                <TooltipLabel>내 게시글 {sum.boardCount}</TooltipLabel>
                <TooltipLabel>교환내역 {sum.soldCount}건</TooltipLabel>
            </TooltipWrapper>
        </MyPointStyled>
    )
}

export const MyKeywordWrap = styled.div`
    padding: 3% 5%;
    margin: 8% 0 0 0;
    width: 100%;
    height: ${({ height }) => height};
    line-height: 250%;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    cursor: pointer;
    display: flex;
`

export const KeywordContainer = styled.div`
    width: ${({ width }) => width};

    & .input-style {
        height: ${({ height }) => height};
        margin-left: 2%;
        width: 80%;
        border: none;
    }
`

export const KeywordItem = styled.div`
    background: ${({ theme, color }) => theme[color].color};
    color: #fff;
    padding: 0 2%;
    border-radius: 6px;
    margin-top: 0.5rem;
    margin-right: 1rem;
    display: inline-block;
    position: relative;

    &:hover::after {
        content: 'x';
        display: inline-block;
        width: 1.2rem;
        height: 1.2rem;
        font-size: 0.8rem;
        text-align: center;
        line-height: 1.1rem;
        background-color: #555;
        color: #fff;
        z-index: 2;
        top: -5%;
        right: -10%;
        border-radius: 50%;
        position: absolute;
    }
`

export const KeywordText = styled.span``

export const KeywordAlarmWrap = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`

export const HelpDeskHistoryWrap = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 3% 5%;
    margin: 8% 0 0 0;
    width: 100%;
    height: ${({ height }) => height};
    line-height: 250%;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    display: flex;
`
export const HelpDeskMenu = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 75%;
`
export const HelpDeskMyWrite = styled.h3`
    width: 50%;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    margin-bottom: 4px;

    & > span {
        cursor: pointer;
    }
`
export const HelpDeskMyService = styled.h3`
    width: 30%;
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    margin-bottom: 4px;
    & > span {
        cursor: pointer;
    }
`
