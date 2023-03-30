import { useState } from "react";
import { WriterInfoWrap, UserImg, UserName } from "./styled";
import { Modal } from "../modal";
import { UserHistory } from "./";

export const WriterInfo = ({ email, username, userImg, width, height, imgSize, fontSize, navigate }) => {
    const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <WriterInfoWrap width={width} height={height} onClick={()=>{setIsOpen(true)}}>
        <UserImg imgSize={imgSize} src={userImg} />
        <UserName fontSize={fontSize}>{username}</UserName>
      </WriterInfoWrap>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <UserHistory
          height="30rem"
          width="25rem"
          email={email}
          username={username}
          setIsOpen={setIsOpen}
          navigate={navigate}
        />
      </Modal>
    </>
  );
};
