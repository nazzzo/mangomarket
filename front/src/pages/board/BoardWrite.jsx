import { useState } from "react";
import { MarketImgUpload } from "../../common/upload";
import { Input } from "../../common/input";
import { Modal } from "../../common/modal";
import { CategorySelector } from "./CategorySelector"
import { useInput } from "../../hooks";
import { Subject, CategoryOpener, WishList, Content, Submit } from "./styled";

export const BoardWrite = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMode, setInputMode] = useState(false);
  const subject = useInput("");

  console.log(inputMode)

  return (
    <>
      <MarketImgUpload width="6rem" height="6rem" />
      <Subject height="3.5rem">
        <Input
          height="3rem"
          type="text"
          id="subject"
          name="subject"
          value={subject.value}
          onChange={subject.onChange}
          placeholder="제목"
        />
      </Subject>
      <CategoryOpener height="3.5rem" onClick={()=>{setIsOpen(true)}}>카테고리 선택</CategoryOpener>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategorySelector height="24rem" width="24rem" />
      </Modal>
      <WishList height="3.5rem" onClick={()=>{setInputMode(true)}}>위시 리스트
      {
        inputMode
        ? <Input
        height="3rem"
        type="text"
        id="hashtag"
        name="hashtag"
        value={subject.value}
        onChange={subject.onChange}
        placeholder="희망 아이템"
      />
      : ""
      }
      </WishList>
      <Content height="16rem">내용</Content>
      <Submit color="yellow" fontSize="1.2rem">
        등록하기
      </Submit>
    </>
  );
};
