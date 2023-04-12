import { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { GetAddress } from "./GetAddress"
import { GuideText, MarkerImg } from "./styled"

export const MapMessage = ({lat, lng, address, time}) => {
  const [state, setState] = useState({
    center: {
      lat: lat,
      lng: lng,
    },
    errMsg: null,
    isLoading: true,
  });
  const [level, setLevel] = useState();

//   useEffect(() => {
//     if (navigator.geolocation) {
//       // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setState((prev) => ({
//             ...prev,
//             center: {
//               lat: position.coords.latitude, // 위도
//               lng: position.coords.longitude, // 경도
//             },
//             isLoading: false,
//           }));
//         },
//         (err) => {
//           setState((prev) => ({
//             ...prev,
//             errMsg: err.message,
//             isLoading: false,
//           }));
//         }
//       );
//     } else {
//       // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
//       setState((prev) => ({
//         ...prev,
//         errMsg: "현재 위치를 찾을 수 없어요",
//         isLoading: false,
//       }));
//     }
//   }, []);

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
    </>
  );
};
