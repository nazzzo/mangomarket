import { useState } from "react"
import { MarketImgUpload } from "../../common/upload";
import { Input } from "../../common/input"
import { useInput } from "../../hooks";
import { Subject, Category, WishList, Content, Submit } from "./styled"

export const BoardWrite = () => {
    const subject = useInput("")

  return (
    <>
      <MarketImgUpload width="6rem" height="6rem" />
      <Subject height="3.5rem"><Input height="3rem" type="text" id="subject" name="subject" value={subject.value} onChange={subject.onChange} placeholder="제목" /></Subject>
      <Category height="3.5rem">카테고리 선택</Category>
      <WishList height="3.5rem">위시 리스트</WishList>
      <Content height="16rem">내용</Content>
      <Submit  color="yellow" fontSize="1.2rem">등록하기</Submit>
    </>
  );
};
