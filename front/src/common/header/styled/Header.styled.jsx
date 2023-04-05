import styled from 'styled-components'

export const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    margin: auto;
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: ${(props) => props.theme.header.color}; */
    background-color: #fff;
    opacity: 0.8;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    box-sizing: content-box;
    z-index: 999;
`

export const HeaderWrap = styled.div`
    margin: 0 auto;
    width: 75rem;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 480px){
        width: 30rem;
        background-color: #fff;
    }
`

export const HeaderLogoWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 4rem;
    width: 10%;
    height: inherit;

    @media screen and (max-width: 480px){
        width: 5rem;
    }
`

export const HeaderLogoImgWrap = styled.div`
    display: inline-block;
    width: 90px;
    height: 60px;
`

export const HeaderLogoImg = styled.img`
    width: 100%;
`

export const HeaderMenuWrap = styled.div`
    width: 60%;
    height: inherit;

    @media screen and (max-width: 480px){
        display: none;
        width: 0;
    }
`

export const HeaderMenuul = styled.ul`
    min-width: 30rem;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export const HeaderMenuli = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 1.5rem;
    /* background-color: #ececec; */
    
    /* @media screen and (max-width: 360px) {
        width: 1rem;
    }

    @media screen and (min-width: 360px) and (max-width: 768px) {
        width: 2rem;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
        width: 4rem;
    } */
    
    & > a {
        display: inline-block;
        color: #222;
        font-weight: 700;
        text-shadow:  ${(props) => props.theme.yellow.color} 1px 0;
    }
`

export const HeaderFunctionWrap = styled.div`
    display: flex;
    width: 30%;
    height: inherit;

    @media screen and (max-width: 480px){
        width: 9rem;
    }
`

export const HeaderSearchWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 13rem;
    height: 100%;

    @media screen and (max-width: 480px){
        min-width: 0;
    }
`

export const HeaderSearchBox = styled.div`
    position: relative;
    width: 90%;
    height: 2rem;

        & .iconify {
        position: absolute;
        right: 4%;
        top: 15%;
        font-size: 1.4rem;
        color: #333;
    }
`

export const HeaderSearchInput = styled.input`
    width: 100%;
    height: inherit;
    border: none;
    border-radius: 4px;
    background-color: #efefef;
    box-sizing: border-box;
    outline: none;
    padding: 0 0.5rem;

    @media screen and (max-width: 480px){
        display: none;
    }
`

export const HeaderSearchIcon = styled.img`
    cursor: pointer;
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
    height: 75%;

    @media screen and (max-width: 480px){
        right: 0; 
    }
`

export const HeaderAlarmWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 100%;
    position: relative;

    &.on .snb {
        opacity: 0.8;
        transition: all 0.2s ease-out;
    }

    & .iconify {
        font-size: 1.8rem;
        color: #333;
        cursor: pointer;
        transition: all 0.2s ease-out;

        &:hover {
            color: #999;
            transition: all 0.2s ease-out;
        }
    }

    @media screen and (max-width: 480px){
        width: 5rem; 
    }
`


export const HeaderUserWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 60px;
    height: 60px;
    
    @media screen and (max-width: 480px){
        width: 2.5rem;
    }
`

export const HeaderUser = styled.img`
    cursor: pointer;
    height: 60%;
    width: 60%;
    border-radius: 50%;
    cursor: pointer;

    @media screen and (max-width: 480px){
        display: none;
    }
`

const HeaderAlarmMenuWrapper = styled.div`
    width: 20rem;
    height: 4rem;
    opacity: 0;
    transition: all 0.2s ease-out;
    position: fixed;
    top: 10%;
    right: 10%;
    background: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    border-radius: 6px;
    padding: 2%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    cursor: pointer;
`

export const HeaderAlarmMenu = ({onClick, className, children}) => {
    return <HeaderAlarmMenuWrapper className={className}>
        {children}
        <div onClick={onClick}>알람 키워드</div>
        <div>채팅 내역</div>
    </HeaderAlarmMenuWrapper>
}