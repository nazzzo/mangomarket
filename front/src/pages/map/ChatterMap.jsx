import { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { SetLocation } from "./SetLocation"
import { GuideText, MarkerImg } from "./styled"

export const ChatterMap = ({ setIsOpen, setIsReserved, boardid, customer }) => {
  const [state, setState] = useState({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });
  const [level, setLevel] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: "현재 위치를 찾을 수 없어요",
        isLoading: false,
      }));
    }
  }, []);


  return (
    <>
      <GuideText>
        <MarkerImg src="https://cdn1.iconfinder.com/data/icons/vibrancie-map/30/map_016-location-marker-pin-paper-512.png" />
        마커를 움직여서 약속장소를 설정하세요
      </GuideText>  
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: "20rem",
          height: "15rem",
        }}
        level={3} // 지도의 확대 레벨
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
            draggable={true}
            position={state.center}
            image={{
              src: "https://cdn1.iconfinder.com/data/icons/vibrancie-map/30/map_028-location-marker-checkmark-pin-512.png",
              size: {
                width: 64,
                height: 69,
              }, // 마커이미지의 크기입니다
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              },
            }}
          >
            <div style={{ padding: "5px 10px", color: "#000", fontSize: "1rem" }}>
              {state.errMsg ? state.errMsg : "여기서 만날래요?"}
            </div>
          </MapMarker>
        )}
      </Map>
      { state.center && <SetLocation lat={state.center.lat} lng={state.center.lng} setIsOpen={setIsOpen} boardid={boardid} customer={customer} />}
    </>
  );
};
