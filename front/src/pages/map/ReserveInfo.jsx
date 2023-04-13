import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { ReserveInfoForm, AddressInfo, TimeInfo } from "./styled"
import { Button } from "../../common/button"
import { Alert } from "../../common/alert"
import request from "../../utils/request"


export const ReserveInfo = ({ isReserved, socket, address, time, chatid, boardid, customer, seller }) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [chatState, setChatState] = useState();
  const { user } = useSelector((state) => state.user)
  const date = new Date(time);
  const formattedTime = date.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric'});

  const handleAccept = async (e) => {
    e.preventDefault()
    try {
      // const response = await request.put(`reservations/${boardid}/state`, {
      //   state: "reserved"
      // });
      socket.current.emit("reserveAccept", { state: "reserved", id: boardid })
      // if (response.data === 1) setIsOpenAlert(true)
    } catch (e) {
      console.error(e)
    }
  }

  const handleReject = async () => {
    try {
      socket.current.emit("reserveAccept", { state: "public", id: boardid, chatid })
    } catch (e) {
      console.error(e)
    }
  }
  const getChatState = async (e) => {
    const { data } = await request.get(`/chats/state/${chatid}`)
    console.log(data)
  }

  useEffect(() => {
    getChatState()
  },[])

  const handleCloseAlert = () => {
    setIsOpenAlert(false)
  }

  return (
    <>
      <ReserveInfoForm onSubmit={handleAccept}>
        <AddressInfo>{address}</AddressInfo>
        <TimeInfo>예약시간: {formattedTime}</TimeInfo>
        {user.email === seller && !isReserved && (
          <>
            <Button color="green" type="submit">수락</Button>
            <Button color="grey" type="button" onClick={handleReject}>거절</Button>
          </>
        )}
        {isReserved === "reserved" && (<span style={{color: "green"}}>예약되었습니다</span>)}
        {isReserved === "rejected" && (<span style={{color: "red"}}>예약이 거절되었습니다</span>)}
      </ReserveInfoForm>
      <Alert isOpenAlert={isOpenAlert} onClose={handleCloseAlert} color="green" width="20rem" height="5rem">상품이 예약되었습니다</Alert>
    </>
  );
};
