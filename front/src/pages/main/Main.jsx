import request from "../../utils/request";
import { useRef, useState, useEffect } from "react";
import { HomeWrapper, List, ItemWrapper, ItemImage, ItemContent, TextBoxA, TextBoxB, TextBoxC, TextBoxD, Count, PageCounter } from "./styled";
import { Icon } from "@iconify/react";
import { navigation } from "react-router-dom"

export const Main = () => {
  const pageCountRef = useRef(null);
  const [count, setCount] = useState(0);
  const [boardList, setBoardList] = useState([]);

  const handleIntersection = (entries) => {
    if (entries[0].intersectionRatio === 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request.get(`boards/?count=${count}`);
        const newBoardList = response.data;
        if (count === 0) {
          setBoardList(newBoardList);
        } else {
          setBoardList((prevList) => [...prevList, ...newBoardList]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 1, root: null });
    if (pageCountRef.current) {
      observer.observe(pageCountRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = () => {

  }

    return (
        <HomeWrapper>
            <List>
                {boardList.map((board) => (
                    <ItemWrapper height="220px" key={board.id} onClick={handleClick}>
                        <ItemImage size="220px" src={board.image} />
                        <ItemContent key={board.id}>
                            <TextBoxA
                                state={board.state}
                                category={board.category}
                                subject={board.subject}
                            />
                            <TextBoxB address={board.address} date={board.createdAt} />
                            <TextBoxC hashtag={board.tagname}/>
                            <TextBoxD>
                                <Count id="messageCount">
                                    <Icon icon="ant-design:message-outlined" /> {board.messageCount}
                                </Count>
                                <Count id="likeCount">
                                    <Icon icon="mdi:cards-heart-outline" /> {board.likeCount}
                                </Count>
                            </TextBoxD>
                        </ItemContent>
                    </ItemWrapper>
                ))}
                <PageCounter ref={pageCountRef} />
            </List>
        </HomeWrapper>
    )
}
