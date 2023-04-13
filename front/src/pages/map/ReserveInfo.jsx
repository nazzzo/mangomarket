import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { ReserveInfoForm, AddressInfo, TimeInfo } from "./styled"
import { Button } from "../../common/button"
import { Alert } from "../../common/alert"
import request from "../../utils/request"


export const ReserveInfo = ({ chatState, socket, address, time, chatid, boardid, customer, seller }) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const { user } = useSelector((state) => state.user)
  console.log(chatState)
  const date = new Date(time);
  const formattedTime = date.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric'});

  const handleAccept = async (e) => {
    e.preventDefault()
    try {
      // const response = await request.put(`reservations/${boardid}/state`, {
      //   state: "reserved"
      // });
      socket.current.emit("reserveAccept", { boardState: "reserved", id: boardid, chatid })
      // if (response.data === 1) setIsOpenAlert(true)
    } catch (e) {
      console.error(e)
    }
  }

  const handleReject = async () => {
    try {
      socket.current.emit("reserveAccept", { boardState: "public", id: boardid, chatid })
    } catch (e) {
      console.error(e)
    }
  }

  const handleCloseAlert = () => {
    setIsOpenAlert(false)
  }

  return (
    <>
      <ReserveInfoForm onSubmit={handleAccept}>
        <AddressInfo>{address}</AddressInfo>
        <TimeInfo>예약시간: {formattedTime}</TimeInfo>
        {(chatState === "unread" || chatState === "read") && seller === user.email && (
          <>
            <Button color="green" type="submit">수락</Button>
            <Button color="grey" type="button" onClick={handleReject}>거절</Button>
          </>
        )}
        {chatState === "accepted" && (<span style={{color: "green"}}>예약되었습니다</span>)}
        {chatState === "rejected" && (<span style={{color: "red"}}>예약이 거절되었습니다</span>)}
      </ReserveInfoForm>
      <Alert isOpenAlert={isOpenAlert} onClose={handleCloseAlert} color="green" width="20rem" height="5rem">상품이 예약되었습니다</Alert>
    </>
  );
};
