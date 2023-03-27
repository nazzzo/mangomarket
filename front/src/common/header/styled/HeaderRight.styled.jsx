import styled from 'styled-components';

const HeaderRightList = styled.div`
    
    display:flex;
    align-items: center;
    justify-content: space-between;

    input {
        width: 10rem;
        height: 1.5rem;
        margin-right: 2rem;
        border: 1px solid #6e6e6e;
        background-color: #fafafa;
    }

    button {
        width: 4rem;
        height: 1.5rem;
        background-color: #6e6e6e;
        color: #fff;

    }
`

export const HeaderRight = () => {
    return(
        <HeaderRightList>
            <input type="search" />
            <button>로그인</button>
        </HeaderRightList>
    )
}