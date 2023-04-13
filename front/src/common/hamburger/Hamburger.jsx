import styled from 'styled-components'

const HamburgerWrap = styled.div`
    display: none;

    @media screen and (max-width: 520px){
        cursor: pointer;
        display: block;
        float: right;
        transition: all 0.5s;

        &:hover {
            transform: translateY(0.3rem);
        }

        &:hover > span {
            background-color: ${(props) => props.theme.beige.color};
            transition: all 0.5s;
        }

        & > span {
            transition: all 0.5s;
            background-color: #453a33;
        }

        &:hover > span:nth-child(1) {
            width: 2rem;
            transform: rotate(90deg);
        }
        &:hover > span:nth-child(2) {
            width: 1rem;
            transform: rotate(45deg) translateX(0.25rem);
        }
        &:hover > span:nth-child(3) {
            width: 1rem;
            transform: rotate(-45deg) translateX(0.8rem) translateY(0.3rem);
        }
    }
`

const HamburgerStick = styled.span`
    display: none;

    @media screen and (max-width: 520px){        
        display: block;
        margin: 0.3rem;
        width: 2rem;
        height: 0.25rem;
        border-radius: 0.125rem;
        background-color: #453a33;
    }
`

export const Hamburger = () => {
    return(
        <HamburgerWrap>
            <HamburgerStick></HamburgerStick>
            <HamburgerStick></HamburgerStick>
            <HamburgerStick></HamburgerStick>
        </HamburgerWrap>
    )
}