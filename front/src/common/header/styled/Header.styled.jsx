import styled from 'styled-components'

export const HeaderWrapper = styled.div`
    position: fixed;
    top: 0;
    margin: auto;
    width: 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.header.color};
    border-bottom: 1px solid #d6d6d6;
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
    background-color: #d2bfbf;
`

export const HeaderLogoWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 4rem;
    width: 10%;
    height: inherit;
`

export const HeaderLogoImgWrap = styled.div`
    display: inline-block;
    width: 4rem;
    height: 4rem;
`

export const HeaderLogoImg = styled.img`
    width: 100%;
`

export const HeaderMenuWrap = styled.div`
    width: 60%;
    height: inherit;
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
`

export const HeaderSearchWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 13rem;
    height: 100%;
`

export const HeaderSearchBox = styled.div`
    position: relative;
    width: 90%;
    height: 2rem;
`

export const HeaderSearchInput = styled.input`
    width: 100%;
    height: inherit;
    border: none;
    border-radius: 4px;
    background-color: #efefef;
    box-sizing: border-box;
    padding: 0 0.5rem;
`

export const HeaderSearchIcon = styled.img`
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;
    height: 75%;
`

export const HeaderAlarmWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 100%;
`

export const HeaderAlarm = styled.img`
    height: 35%;
`

export const HeaderUserWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5.5rem;
    height: 100%;
`

export const HeaderUser = styled.img`
    height: 60%;
    border-radius: 50%;
`