import { useState, useEffect } from "react";
import { HomeWrapper, List, ItemWrapper, RecommendItemImage, ItemContent, TextBoxA } from "./styled";

export const RecommendContainer = ({ boardList, width, height, navigate }) => {
    const [list, setList] = useState(boardList);

    useEffect(() => {
        setList((prevList) => [...prevList, ...boardList]);
    }, [boardList]);

    return (
        <HomeWrapper width={width} height={height}>
            <List>
               { list ? (list.map((board) => (
                    <ItemWrapper
                        height="240px"
                        key={board.id}
                        onClick={() => {
                            navigate(`/board/${board.id}`, { replace: true });
                            window.scrollTo(0, 0);
                        }}
                    >
                        <RecommendItemImage src={board.image} state={board.state} />
                        <ItemContent key={board.id}>
                            <TextBoxA
                                subject={board.subject}
                            />
                        </ItemContent>
                    </ItemWrapper>
                ))) : <></> }
            </List>
        </HomeWrapper>
    );
};
