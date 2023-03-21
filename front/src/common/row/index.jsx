import styled, { css } from "styled-components";

const RowStyled = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  ${(props) => props.align && css`
      margin: 0 auto;
    `}
  & + & {
    margin-top: 10px;
  }

  /** 모바일 */
  @media (min-witdh: 320px) and (max-width: 767px) {
  }
  /** 패드 */
  @media (min-witdh: 768px) and (max-width: 1023px) {
  }
  /** 노트북/데스크탑 */
  @media (min-witdh: 1024px) {
  }
`;

export const Row = ({ width, height, align, children }) => {
  return (
    <RowStyled width={width} height={height} align={align}>
      {children}
    </RowStyled>
  );
};
