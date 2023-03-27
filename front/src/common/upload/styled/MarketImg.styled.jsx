import styled from "styled-components";

export const MarketImageWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;

  & > div:first-child {
    margin-right: 20px;
  }
`;

export const MarketImageUploader = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  position: relative;
  border-radius: 6px;
  background-color: #eee;
  cursor: pointer;

  & .iconify {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: #555;
  }
`;

export const ImageCount = styled.span`
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  color: #333;
`;

const ImageWrapper = styled.div`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #eee;
  cursor: pointer;
  margin-right: 5px;
  position: relative;

  & img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 3px;
  }

  &.thumbnail {
    border: 5px solid #333;

    &:before {
    content: "썸네일 선택";
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    text-align: center;
    width: 95%;
    font-weight: bold;
    background-color: #333;
    color: #fff;
    padding: 4px;
    z-index: 5;
  }

  }
`;

export const MarketImage = ({ src, width, height, className, onClick }) => {
    return <ImageWrapper width={width} height={height} className={className} onClick={onClick}>
        <img src={src} />
        </ImageWrapper>
}
