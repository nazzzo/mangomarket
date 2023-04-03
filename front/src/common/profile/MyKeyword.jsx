import { useState, useCallback } from "react";
import { Input } from "../input";
import { useInput } from "../../hooks";
import { useDispatch, useSelector } from "react-redux"
import { userKeywordAdd, userKeywordRemove } from "../../store/user";
import { MyKeywordWrap, KeywordContainer, KeywordItem, KeywordText } from "./styled";
import request from "../../utils/request"

export const MyKeyword = ({ email, width, height, color }) => {
    const dispatch = useDispatch()
    const userKeywords = useSelector((state) => state.user.keyword);
    const [keys, setKeys] = useState([]);
    const keyword = useInput("");
  
    const handleKeyDown = useCallback(async (e) => {
      if (e.keyCode === 13) {
        const newKey = keyword.value;
        if (newKey && !userKeywords.map(v => v.keyword.includes(newKey) && userKeywords.length < 3)) {
        // if (newKey && !keys.includes(newKey) && keys.length < 3) {
          const response = await request.post(`/users/keyword`, {
            email: email,
            keyword: newKey
          })
          console.log(response.data)
          if (response.data.keyword)
          dispatch(userKeywordAdd([{id: response.data.id, keyword: response.data.keyword}]))
          keyword.clear();
        }
      }
    },[keyword, userKeywords, dispatch]);
  
    console.log(userKeywords)
  
    const handleDeleteKeys = async (key) => {
        const response = await request.delete(`/users/keyword/${email}`, {
            data: {
                email: email,
                keyword: key
            }
        })
      if (response.data === 1) {
      const newKeys = userKeywords.filter((v) => v.keyword !== key);
      console.log(`newKeys:::`, newKeys)
      dispatch(userKeywordRemove(newKeys));
        }
    };
  
    return (
      <MyKeywordWrap width={width} height={height}>알림 키워드
        <KeywordContainer height="3rem" width="70%">
          <Input
            type="text"
            id="keyword"
            name="keyword"
            value={keyword.value}
            onChange={keyword.onChange}
            onKeyDown={handleKeyDown}
            placeholder="알림 키워드를 등록해주세요"
          />
          {userKeywords.map((item) => (
            <KeywordItem key={item.keyword} color={color} onClick={() => handleDeleteKeys(item.keyword)}>
              <KeywordText color={color}>{`${item.keyword}`}</KeywordText>
            </KeywordItem>
          ))}
        </KeywordContainer>
      </MyKeywordWrap>
    );
  };
  
