import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  padding: 2rem;
  z-index: 9;
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  & .iconify {
    width: 2.2rem;
    height: 2.2rem;
    position: absolute;
    top: 2%;
    right: 3%;
    cursor: pointer;    
  }
`;

