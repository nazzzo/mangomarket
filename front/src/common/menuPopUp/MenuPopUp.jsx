import styled from 'styled-components'

const MenuPopUpWrap = styled.div`
    display: none;

    @media screen and (max-width: 520px){
        position: relative;
        top: ${ props => props.visible ? "-8rem" : '-18rem'};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 5rem;
        background-color: #ececec;
        transition: all 0.25s;
        z-index: ${ props => props.visible ? 2 : 0 };
    }
`

const MenuPopUpListWrap = styled.ul`
    @media screen and (max-width: 520px) {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        /* grid-gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr)); */
    }
`

const MenuPopUpList = styled.li`
    @media screen and (max-width: 520px) {
        padding: 0.5rem;
        border: 1px solid rgba(0, 0, 0, 0.138);
        background-color: rgba(0, 0, 0, 0.138);
        border-radius: 0.5rem;

        & > a {
            color: #222;
        }
    }
`

export const MenuPopUp = ({ visible, navigation }) => {
    const menuPopUpList = navigation(MenuPopUpList)
    return(
        <MenuPopUpWrap visible={visible}>
            <MenuPopUpListWrap>
                {menuPopUpList}
            </MenuPopUpListWrap>
        </MenuPopUpWrap>
    )
}