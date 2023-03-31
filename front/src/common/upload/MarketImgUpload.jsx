import { useState, useRef } from "react";
import request from "../../utils/request";
import { MarketImageWrapper, MarketImageUploader, ImageCount, MarketImage, Input, } from "./styled";
import { Icon } from "@iconify/react";
import config from "../../config";

export const MarketImgUpload = ({ width, height, uploadedImages, setUploadedImages, thumbnailIndex, setThumbnailIndex }) => {
  // const [uploadedImages, setUploadedImages] = useState([]);
    // const [thumbnailIndex, setThumbnailIndex] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleThumbnailClick = (index) => {
    setThumbnailIndex(index);
  };
  console.log(`thumb:::`, thumbnailIndex);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const response = await request.post("/boards/array", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      const responseData = response.data.images.map(
        (filename) =>
          `${config.PT}://${config.HOST}:${config.IMG_PORT}/board/${filename}`
      );
      setUploadedImages((prevImages) => {
        const maxImages = 5;
        const remainImages = maxImages - imageCount;
        const imagesToUpload = responseData.slice(0, remainImages);
        return [...prevImages, ...imagesToUpload];
      });
      setImageCount((prevCount) => prevCount + responseData.length);

      if (imageCount >= 5) {
        fileInputRef.current.value = "";
        setImageCount(5);
        alert("사진은 최대 5장까지 업로드할 수 있습니다.");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MarketImageWrapper>
      <MarketImageUploader
        width={width}
        height={height}
        onClick={handleImageClick}
      >
        <Icon icon="bxs:camera-plus" />
        <ImageCount>{imageCount} / 5</ImageCount>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
          />
        </form>
      </MarketImageUploader>
      {uploadedImages.map((imageSrc, index) => (
        <MarketImage
          key={index}
          width={width}
          height={height}
          src={imageSrc}
          onClick={() => handleThumbnailClick(index)}
          className={index === thumbnailIndex ? "thumbnail" : ""}
        />
      ))}
    </MarketImageWrapper>
  );
};
