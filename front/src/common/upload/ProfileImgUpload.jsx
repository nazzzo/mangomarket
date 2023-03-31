import { useRef } from "react";
import request from "../../utils/request";
import { ImageWrapper, IconWrap, Image, Input } from "./styled";
import { Icon } from "@iconify/react";
import config from "../../config"


export const ProfileImgUpload = ({ width, height, src, setState }) => {
  if (!src) src = `${config.PT}://${config.HOST}:${config.IMG_PORT}/default-image.png`
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const body = new FormData();
    body.append("image", file);

    try {
        const response = await request.post("/users/single", body, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const responseData = `${config.PT}://${config.HOST}:${config.IMG_PORT}/${response.data.filename}`; 
        setState(responseData);
      } catch (e) {
        console.error(e);
      }
  };

  console.log(src)

  return (
    <ImageWrapper width={width} height={height}>
      <Image
        width={width}
        height={height}
        onClick={handleImageClick}
        src={src}
      />
      <IconWrap><Icon icon="bxs:camera-plus" /></IconWrap>
      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </form>
    </ImageWrapper>
  );
};
