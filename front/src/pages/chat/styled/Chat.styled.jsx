import styled from "styled-components"

export const GlobalChatWrap = styled.div`
    width: 100%;
    height: 100%;
`


export const ChatterWrap = styled.div`
    
`

export const ChatterList = styled.ul`
    
`

export const ChatterItem = styled.li`
    display: flex;
    height: 80px;
`

export const ChatterImgWrap = styled.div`
    width: 20%;
`

export const ChatterImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`

export const ChatterContentWrap = styled.div`
    width: 80%;
    display: flex;
    padding-top: 1rem;
    box-sizing: border-box;
`

export const ChatterUserWrap = styled.div`
    width: 40%;
    padding-left: 1.5rem;
    box-sizing: border-box;

    & > div + div {
        margin-top: 0.5rem;
    }
`

export const ChatterUserName = styled.div`
`

export const ChatterUserAddress = styled.div`
    
`

export const ChatterContent = styled.div`
    width: 60%;
`