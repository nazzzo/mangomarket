import styled from "styled-components";

export const ImageWrapper = styled.div`
    height: ${({height}) => height};
    width: ${({width}) => width};
    position: relative;
    border-radius: 50%;
    background-color: #eee;
`

export const IconWrap = styled.div`
    height: 2rem;
    width: 2rem;
    background-color: #eee;
    right: -13%;
    top: 83%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    & .iconify {
    font-size: 1.5rem;
    color: #555;
}
`

export const Image = styled.img`
    height: ${({height}) => height};
    width: ${({width}) => width};
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #eee;
    cursor: pointer;
`

export const Input = styled.input`
    display: none;
`
