import { useRef } from "react";
import request from "../../utils/request";
import { ImageWrapper, IconWrap, Image, Input } from "./styled";
import { Icon } from "@iconify/react";
import config from "../../config"


export const ProfileImg = ({ width, height, src, setState }) => {
  const fileInputRef = useRef(null);
  console.log(config)

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
        const responseData = `http://${config.HOST}:${config.IMGPORT}/${response.data.filename}`;
        setState(responseData);
      } catch (e) {
        console.error(e);
      }
  };

  return (
    <ImageWrapper width={width} height={height}>
      <Image
        width={width}
        height={height}
        onClick={handleImageClick}
        src={src || `http://${config.HOST}:${config.IMGPORT}/default-image.png`}
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
