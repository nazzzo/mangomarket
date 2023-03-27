import styled from "styled-components"
import { ManualText } from '../../sign/styled/FindUser.styled';


const SubjectWrap = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    border-bottom: 1px solid #ddd;

    & > .input-style, input {
        border: none;
        font-size: 1.2rem;
    }
`

export const Subject = ({height, children}) => {
    return <SubjectWrap height={height}>{children}</SubjectWrap>
}


const CategoryOpenerStyled = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    line-height: 250%;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
`


const CategoryBoxStyled = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    width: ${({width}) => width};
    line-height: 250%;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
`


export const CategoryOpener = ({height, onClick, children}) => {
    return <CategoryOpenerStyled height={height} onClick={onClick}>{children}</CategoryOpenerStyled>
}

export const CategoryBox = ({height, width, children}) => {
    console.log(`cccc:::`, children)

    return <CategoryBoxStyled height={height} width={width}>{children}</CategoryBoxStyled>
}




const WishListWrap = styled.ul`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    line-height: 250%;
    border-bottom: 1px solid #ddd;


`


export const WishList = ({height, children}) => {
    return <WishListWrap height={height}><li>{children}</li></WishListWrap>
}




const ContentWrap = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    border-bottom: 1px solid #ddd;
`


export const Content = ({height, text}) => {
    return <ContentWrap height={height}>{text}</ContentWrap>
}


export const Submit = styled.button`
  outline: none;
  border: none;
  margin-left: 79%;
  margin-top: 5%;
  padding: 1.5% 3%;
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