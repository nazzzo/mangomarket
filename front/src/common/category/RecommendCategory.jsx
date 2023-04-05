import { useRef, useState, useEffect } from "react"
import { RecommendContainer } from "../itemContainer"
import { useNavigate } from "react-router-dom";
import { RecommendWrap, TextHeader, PageCounter } from "./styled"
import request from "../../utils/request"

export const RecommendCategory = ({ width, height, category }) => {
    const [boardList, setBoardList] = useState([]);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();


      useEffect(() => {
        const fetchData = async () => {
          try {   
            const response = await request.get(`boards/?count=${count}&category=${category}`);
            const newBoardList = response.data;
            if (count === 0|| category !== "") {
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

    //   console.log(`boardList:::`, category, boardList)


    return (
    <RecommendWrap>
        <TextHeader>이 카테고리의 인기글</TextHeader>
        <RecommendContainer width={width} height={height} boardList={boardList} navigate={navigate} />
    </RecommendWrap>)
}






