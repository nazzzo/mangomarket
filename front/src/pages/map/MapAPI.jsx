import { useState, useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";

export const MapAPI = () => {
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

  console.log(`마커 위치::`, state.center)

  // useEffect(() => {
  //   const waitForKakao = setInterval(() => {
  //     if (window.kakao && window.kakao.maps) {
  //       clearInterval(waitForKakao)
  //       const geocoder = new window.kakao.maps.services.Geocoder()
  //       geocoder.coord2Address(
  //         state.center.lng,
  //         state.center.lat,
  //         (result, status) => {
  //           if (status === window.kakao.maps.services.Status.OK) {
  //             const address = result[0].address
  //             console.log(
  //               address.region_1depth_name + " " + address.region_2depth_name
  //             )
  //           }
  //         }
  //       )
  //     }
  //   }, 10000)
  //   return () => clearInterval(waitForKakao)
  // }, [state.center])


  return (
    <>
      <MapAPI
        center={state.center}
        style={{
          width: "3rem",
          height: "3rem",
        }}
        level={3}
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
              },
              options: {
                offset: {
                  x: 27,
                  y: 69,
                }, 
              },
            }}
          >
            <div style={{ padding: "5px", color: "#000", fontSize: "1rem" }}>
              {state.errMsg ? state.errMsg : "여기에 계신가요?"}
            </div>
          </MapMarker>
        )}
      </MapAPI>
    </>
  );
};
