import styled from "styled-components"


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


const CategoryWrap = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    line-height: 250%;
    border-bottom: 1px solid #ddd;
`


export const Category = ({height, children}) => {
    return <CategoryWrap height={height}>{children}</CategoryWrap>
}



const WishListWrap = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    line-height: 250%;
    border-bottom: 1px solid #ddd;
`


export const WishList = ({height, children}) => {
    return <WishListWrap height={height}>{children}</WishListWrap>
}




const ContentWrap = styled.div`
    margin-top: 2%;
    width: 100%;
    height: ${({height}) => height};
    border-bottom: 1px solid #ddd;
`


export const Content = ({height, children}) => {
    return <ContentWrap height={height}>{children}</ContentWrap>
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