import { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { ReserveInfoForm, AddressInfo, TimeInfo } from "./styled"
import { Button } from "../../common/button"
import { Alert } from "../../common/alert"
import request from "../../utils/request"


export const ReserveInfo = ({ address, time, chatid, boardid, customer, seller }) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const { user } = useSelector((state) => state.user)

  console.log(`user-customer-seller-boardid-chatid:::`, user.email, customer, seller, boardid, chatid )

  const date = new Date(time);
  const formattedTime = date.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric'});

  useEffect(() => {
    const checkReserved = async () => {
      try {
        const response = await request.get(`reservations/${boardid}/state`);
        console.log(`response.data:::`, response)
        setIsReserved(response.data === 'reserved')
      } catch (e) {
        console.error(e)
      }
    }
    checkReserved()
  }, [boardid])

  const handleAccept = async (e) => {
    e.preventDefault()
    try {
      const response = await request.put(`reservations/${boardid}/state`, {
        state: "reserved"
      });
      console.log(`response.data:::`, response.data)
      if (response.data === 1) setIsOpenAlert(true)
    } catch (e) {
      console.error(e)
    }
  }

  const handleReject = async () => {
    try {
      const response = await request.put(`chats/${chatid}`, {
        content: "예약이 거절되었습니다"
      });
      console.log(`response.data:::`, response.data)
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
        {user.email === seller && !isReserved && (
          <>
            <Button color="green" type="submit">수락</Button>
            <Button color="grey" type="button" onClick={handleReject}>거절</Button>
          </>
        )}
        {isReserved && (
          <span>예약되었습니다</span>
        )}
      </ReserveInfoForm>
      <Alert isOpenAlert={isOpenAlert} onClose={handleCloseAlert} color="green" width="20rem" height="5rem">상품이 예약되었습니다</Alert>
    </>
  );
};
