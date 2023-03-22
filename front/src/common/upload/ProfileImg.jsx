import { useRef, useState } from "react";
import request from "../../utils/request";
import { ImageWrapper, IconWrap, Image, Input } from "./styled";
import { Icon } from "@iconify/react";


export const ProfileImg = ({ width, height, src, setState }) => {
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
        const responseData = `http://localhost:3005/${response.data.filename}`;
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
