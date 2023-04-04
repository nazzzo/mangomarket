import { forwardRef, useState, useEffect } from "react";
import { HomeWrapper, List, ItemWrapper, ItemImage, ItemContent, TextBoxA, PageCounter } from "./styled";

export const ItemContainer = forwardRef(({ boardList, width, height, setIsOpen, navigate }, ref) => {
  const [list, setList] = useState(boardList);

  useEffect(() => {
    setList(boardList);
  }, [boardList]);



  return (
    <HomeWrapper width={width} height={height}>
      <List>
        {list ? (
          list.map((board) => (
            <ItemWrapper
              height="200px"
              key={board.id}
              onClick={() => {
                navigate(`/board/${board.id}`, { replace: true });
                setIsOpen(false);
              }}
            >
              {(!board.images)? <ItemImage src={board.image} /> : <ItemImage src={board.images.split(',')[0]} />}
              <ItemContent key={board.id}>
                <TextBoxA state={board.state} subject={board.subject} createdAt={board.createdAt} />
              </ItemContent>
            </ItemWrapper>
          ))
        ) : (
          <></>
        )}
      </List>
      <PageCounter ref={ref} />
    </HomeWrapper>
  );
});
