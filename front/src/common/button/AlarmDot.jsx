import { DotStyled } from "./styled"

export const AlarmDot = ({ top, left, right }) => {
    return <DotStyled className="dot" top={top} left={left} right={right} />
}