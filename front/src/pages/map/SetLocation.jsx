import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSetReservation } from "../../store/user";
import { GetAddressForm, MyAddress, Result } from "./styled"
import { Button } from "../../common/button"
import { TimerBtn } from "../../common/button"
import { Alert } from "../../common/alert"
import request from "../../utils/request"

export const SetLocation = ({ setIsOpen, setIsReserved, lat, lng, boardid, customer }) => {
    const [address, setAddress] = useState(null);
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [selectedTime, setSelectedTime] = useState('')
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()
  
    const handleGetAddress= () => {
        const geocoder = new window.kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
        const coord = new window.kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
        const callback = function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            setAddress(result[0].address['address_name']);
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await request.post("/reservations", {
                address: address,
                latitude : lat, 
                longitude : lng,
                reservation : selectedTime.value,
                boardid : boardid,
                email : customer,
              });
              
              if (response.data.email) {
                dispatch(
                    userSetReservation({
                        email: customer,
                        boardid: boardid,
                        address: address,
                        latitude : lat, 
                        longitude : lng,
                        reservation: response.data.reservation,
                    })
                  );
                  setIsOpenAlert(true)
                  setIsReserved(true)
                }
        } catch (e) {
            console.error(e)
        }
      }

      const handleCloseAlert = () => {
        setIsOpenAlert(false)
        setIsOpen(false)
    }

  return (
    <>
        <GetAddressForm onSubmit={handleSubmit} >
        {address && (<MyAddress>어디서 만날까요? <Result>{address}</Result></MyAddress>)}
        {!address
        ? <Button type="button" onClick={handleGetAddress} color="yellow">주소 찾기</Button>
        : 
          <>
            <TimerBtn 
              height="1rem"
              width="6rem"
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <Button type="submit" color="yellow">예약 신청</Button>
          </>
        }
        </GetAddressForm>
        <Alert isOpenAlert={isOpenAlert} onClose={handleCloseAlert} color="green" width="20rem" height="5rem">예약신청 성공</Alert>
    </>
  );
};