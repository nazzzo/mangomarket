import { useEffect, useState, useRef } from "react";

export const GetAddress = (lat, lng) => {
  const [address, setAddress] = useState(null);

  const geocoder = new kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
  const coord = new kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
  const callback = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      setAddress(result[0].address);
    }
  };
  geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

  return (
    <>
      <button onClick={getAddress}>현재 좌표의 주소 얻기</button>
      {address && (
        <div>
          현재 좌표의 주소는
          <p>address_name: {address.address_name}</p>
          <p>region_1depth_name: {address.region_1depth_name}</p>
          <p>region_2depth_name: {address.region_2depth_name}</p>
          <p>region_3depth_name: {address.region_3depth_name}</p>
        </div>
      )}
    </>
  );
};



// export const GetAddress = (props) => {
//     const { markerPositions, size } = props;
//     const [kakaoMap, setKakaoMap] = useState(null);
//     const [, setMarkers] = useState([]);

//     const container = useRef();

//     useEffect(() => {
//       const script = document.createElement("script");
//       script.src =
//         "https://dapi.kakao.com/v2/maps/sdk.js?appkey=326e38503f420e1f0088dab1f46dc0c7&autoload=false";
//       document.head.appendChild(script);

//       script.onload = () => {
//         kakao.maps.load(() => {
//           const center = new kakao.maps.LatLng(37.50802, 127.062835);
//           const options = {
//             center,
//             level: 3
//           };
//           const map = new kakao.maps.Map(container.current, options);
//           //setMapCenter(center);
//           setKakaoMap(map);
//         });
//       };
//     }, [container]);

//     useEffect(() => {
//       if (kakaoMap === null) {
//         return;
//       }

//       // save center position
//       const center = kakaoMap.getCenter();

//       // change viewport size
//       const [width, height] = size;
//       container.current.style.width = `${width}px`;
//       container.current.style.height = `${height}px`;

//       // relayout and...
//       kakaoMap.relayout();
//       // restore
//       kakaoMap.setCenter(center);
//     }, [kakaoMap, size]);

//     useEffect(() => {
//       if (kakaoMap === null) {
//         return;
//       }

//       const positions = markerPositions.map(pos => new kakao.maps.LatLng(...pos));

//       setMarkers(markers => {
//         // clear prev markers
//         markers.forEach(marker => marker.setMap(null));

//         // assign new markers
//         return positions.map(
//           position => new kakao.maps.Marker({ map: kakaoMap, position })
//         );
//       });

//       if (positions.length > 0) {
//         const bounds = positions.reduce(
//           (bounds, latlng) => bounds.extend(latlng),
//           new kakao.maps.LatLngBounds()
//         );

//         kakaoMap.setBounds(bounds);
//       }
//     }, [kakaoMap, markerPositions]);

//     return <div id="container" ref={container} />;
//   }
