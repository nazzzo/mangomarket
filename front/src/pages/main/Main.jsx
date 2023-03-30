import request from "../../utils/request";
import { useRef, useState, useEffect } from "react";
import { Modal } from "../../common/modal";
import { RefreshBtn } from "../../common/button"
import { CategoryOpener, CategorySelector } from "../../common/category"
import { HomeWrapper, BtnBox, List, ItemWrapper, ItemImage, ItemContent, TextBoxA, TextBoxB, TextBoxC, TextBoxD, Count, PageCounter } from "./styled";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";


export const Main = () => {
  const pageCountRef = useRef(null);
  const [count, setCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("")
  console.log(selectedCategory)
  const navigate = useNavigate();

  const handleIntersection = (entries) => {
    if (entries[0].intersectionRatio === 1) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory) {
          setCount(0)
        }      
        const response = await request.get(`boards/?count=${count}&category=${selectedCategory}`);
        const newBoardList = response.data;
        if (count === 0|| selectedCategory !== "") {
          setBoardList(newBoardList);
        } else {
          setBoardList((prevList) => [...prevList, ...newBoardList]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [count, selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 1,
      root: null,
    });
    if (pageCountRef.current) {
      observer.observe(pageCountRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <HomeWrapper>
      <BtnBox height="2.5rem">
        <CategoryOpener width="8.5rem" height="2.5rem" onClick={()=>{setIsOpen(true)}} />
        <RefreshBtn height="2.5rem" width="3rem"  onClick={()=>{setSelectedCategory("")}} />
      </BtnBox>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategorySelector setSelectedCategory={setSelectedCategory} setIsOpen={setIsOpen} height="20rem" width="20rem" />
      </Modal>
      <List>
        {boardList.map((board) => (
          <ItemWrapper
            height="220px"
            key={board.id}
            onClick={() => {
              navigate(`board/${board.id}`);
            }}
          >
            <ItemImage size="220px" src={board.image} />
            <ItemContent key={board.id}>
              <TextBoxA
                state={board.state}
                category={board.category}
                subject={board.subject}
              />
              <TextBoxB address={board.address} date={board.createdAt} />
              <TextBoxC hashtag={board.tagname} />
              <TextBoxD>
                <Count id="messageCount">
                  <Icon icon="ant-design:message-outlined" />{" "}
                  {board.messageCount}
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
  );
};