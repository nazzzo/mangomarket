import { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { ReserveInfo } from "./ReserveInfo"

export const MapMessage = ({isReserved, socket, lat, lng, address, time, chatid, boardid, customer, seller}) => {
  const [state, setState] = useState({
    center: {
      lat: lat,
      lng: lng,
    },
    errMsg: null,
    isLoading: true,
  });
  const [level, setLevel] = useState();

  useEffect(() => {
    if ( lat && lng ) {
        setState((prev) => ({...prev, center: { lat, lng,}, isLoading: false,}));
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 찾을 수 없어요",
        isLoading: false,
      }));
    }
  }, []);

  return (
    <>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "15rem",
          height: "12rem",
        }}
        level={4} // 지도의 확대 레벨
        onZoomChanged={(map) => setLevel(map.getLevel())}
        onDragEnd={(map) => setState((prev) => ({
          ...prev,
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
          isLoading: false,
        }))}
      >
        <ZoomControl />
        {!state.isLoading && (
          <MapMarker
            position={state.center}
            image={{
              src: "https://cdn1.iconfinder.com/data/icons/vibrancie-map/30/map_028-location-marker-checkmark-pin-512.png",
              size: {
                width: 55,
                height: 59,
              }, 
              options: {
                offset: {
                  x: 27,
                  y: 40,
                },
              },
            }}
          >
            <div style={{ padding: "5px 15px", color: "#000", fontSize: "0.9rem" }}>
              {state.errMsg ? state.errMsg : "여기서 만날래요?"}
            </div>
          </MapMarker>
        )}
      </Map>
      <ReserveInfo seller={seller} socket={socket} isReserved={isReserved} address={address} time={time} chatid={chatid} boardid={boardid} customer={customer} />
    </>
  );
};
