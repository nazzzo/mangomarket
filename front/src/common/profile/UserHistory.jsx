import { useState, useEffect } from "react"
import { UserHistoryWrap, TextHeader } from "./styled";
import { ItemContainer } from "../itemContainer"
import request from "../../utils/request"

export const UserHistory = ({ email, username, width, height, setIsOpen, navigate }) => {
    const [boardList, setBoardList] = useState([]);

    console.log(email)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await request.get(`boards/?searchType=email&search=${email}`);
              setBoardList(response.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData()
      }, []);

      console.log(boardList)

return (
    <>
      <UserHistoryWrap width={width} height={height}>
            <TextHeader>{username}님이 등록한 상품</TextHeader>
            {(boardList !== [])? <ItemContainer boardList={boardList} width={width} height={height} setIsOpen={setIsOpen} navigate={navigate} /> : <></>}
      </UserHistoryWrap>
    </>
  );
};
