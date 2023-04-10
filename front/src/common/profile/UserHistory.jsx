import { useState, useEffect, useRef } from "react"
import { UserHistoryWrap, TextHeader } from "./styled";
import { ItemContainer } from "../itemContainer"
import request from "../../utils/request"

export const UserHistory = ({ email, username, width, height, setIsOpen, navigate }) => {
    const [count, setCount] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const pageCountRef = useRef(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await request.get(`boards/?count=${count}&searchType=email&search=${email}&email=${email}`);
            if (!response.data.isError) {
                const newBoardList = response.data;
                if (count === 0) {
                  setBoardList(newBoardList);
                } else {
                  setBoardList((prevList) => [...prevList, ...newBoardList]);
                }
                setIsLoading(false);
                if (newBoardList.length === 0) setIsLoading(true);
            }
          } catch (error) {console.log(error);}
        };
        fetchData();
      }, [count]);
    
      useEffect(() => {
        const options = {
          root: null,
          rootMargin: "0px",
          threshold: 1.0,
        };
    
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isLoading) {
              setIsLoading(true);
              setCount((prevCount) => prevCount + 1);
            }});
        }, options);
    
        if (pageCountRef.current) observer.observe(pageCountRef.current);
        return () => {
          if (pageCountRef.current) observer.unobserve(pageCountRef.current);
        }}, [isLoading]);

return (
    <>
      <UserHistoryWrap width={width} height={height}>
            {username ? <TextHeader>{username}님이 등록한 상품</TextHeader>: <></>}
            {(boardList !== [])
            ? <ItemContainer boardList={boardList} width={width} height={height} setIsOpen={setIsOpen} navigate={navigate} ref={pageCountRef} />
            : <></>}
      </UserHistoryWrap>
    </>
  );
};
