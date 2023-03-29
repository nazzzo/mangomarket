import styled from 'styled-components'

const SearchPopUpWrap = styled.div`
    display: none;

    @media screen and (max-width: 480px){
        position: relative;
        top: ${ props => props.visible ? "0rem" : '-5rem'};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 5rem;
        background-color: #cecece;
        transition: all 0.25s;
    }
`

const SearchPopInput = styled.input`
    @media screen and (max-width: 480px){
        width: 80%;
        height: 2rem;
        border: none;
        border-radius: 4px;
        background-color: #efefef;
        box-sizing: border-box;
        padding: 0 0.75rem;
        text-align: center;
    }
`

export const SearchPopUp = ({visible}) => {
    return(
        <SearchPopUpWrap visible={visible}>
            <SearchPopInput placeholder='검색어를 입력해주세요'/>
        </SearchPopUpWrap>
    )
}