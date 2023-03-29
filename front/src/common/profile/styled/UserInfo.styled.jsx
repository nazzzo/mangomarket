import styled from "styled-components";

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
    box-shadow: 0 0 4px #00337C;
    animation: pulse 1.3s infinite;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 4px #00337C;
    }
    50% {
      box-shadow: 0 0 8px #00337C;
    }
    100% {
      box-shadow: 0 0 4px #00337C;
    }
  }
`

export const WriterInfoWrap = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2%;
  padding-bottom: 4%;
  border-bottom: 1px solid #ccc;
`

export const UserImg = styled.img`
  width: ${(props) => props.imgSize};
  height: ${(props) => props.imgSize};
  border-radius: 50%;
`

export const UserName = styled.span`
  font-size: ${(props) => props.fontSize};
  margin-left: 2%;
`


export const ProfileEdit = styled.button`
  outline: none;
  border: none;
  margin-left: auto;
  margin-right: 5%;
  padding: 1.5%;
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