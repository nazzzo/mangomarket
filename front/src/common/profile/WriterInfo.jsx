import { useState, useEffect } from "react";
import { WriterInfoWrap, UserProfile, UserImg, UserName } from "./styled";
import { Modal } from "../modal";
import { UserHistory, UserPoint } from "./";
import request from "../../utils/request";

export const WriterInfo = ({ email, username, userImg, width, height, imgSize, fontSize, navigate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [chart, setChart] = useState()
    const [sum, setSum] = useState()

  useEffect(() => {
    const getPoint = async () => {
        const response = await request.get(`/users/point/${email}`)
        // console.log(`response:::`, response.data)
        setChart(response.data.chart)
        setSum(response.data.sum)
    }
    getPoint()
  },[])
  // console.log(`sum:::`, sum, `chart::::`, chart)

  return (
    <>
      <WriterInfoWrap width={width} height={height}>
        <UserProfile onClick={()=>{setIsOpen(true)}}>
          <UserImg imgSize={imgSize} src={userImg} />
          <UserName fontSize={fontSize}>{username}</UserName>
        </UserProfile>
        { sum && chart ? <UserPoint username={username} email={email} chart={chart} sum={sum} /> : <></> }
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
