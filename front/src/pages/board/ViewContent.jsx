import { TextBoxA, TextBoxB } from "./styled/BoardView.styled"
import { useTimeStamp } from '../../hooks';

export const ViewContent = ({category, subject, content, likeCount, hit, date }) => {
    return (
        <>
            <TextBoxA subject={subject} category={category} date={useTimeStamp(date)} />
            <TextBoxB content={content} likeCount={likeCount} hit={hit} />
        </>
    )
}