import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { MarketImgUpload } from '../../common/upload'
import { Input } from '../../common/input'
import { Modal } from '../../common/modal'
import { HashTag } from '../../common/hashtag'
import { CategorySelector } from './CategorySelector'
import { useInput } from '../../hooks'
import { Subject, CategoryOpener, Category, WishList, Content, Submit } from './styled'
import request from '../../utils/request'

export const BoardWrite = () => {
    const { user } = useSelector((state) => state.user)
    const [isOpen, setIsOpen] = useState(false)
    const [uploadedImages, setUploadedImages] = useState([])
    const [thumbnailIndex, setThumbnailIndex] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [tags, setTags] = useState([])
    const subject = useInput('')
    const contentRef = useRef(null)

    console.log(`tags:::`, tags, `category:::`, selectedCategory)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await request.post(`/boards`, {
            email: user.email,
            subject: subject.value,
            content: contentRef.current.value,
            category: selectedCategory,
            hashtag: tags,
            images: uploadedImages,
            thumbnail: thumbnailIndex,
        })
    }

  return (
    <>
      <MarketImgUpload uploadedImages={uploadedImages} setUploadedImages={setUploadedImages} thumbnailIndex={thumbnailIndex} setThumbnailIndex={setThumbnailIndex} width="6rem" height="6rem" />
    <form onSubmit={handleSubmit}>
    <Subject height="3.5rem">
        <Input
          height="3rem"
          type="text"
          id="subject"
          name="subject"
          value={subject.value}
          onChange={subject.onChange}
          placeholder="제목을 입력해주세요"
        />
      </Subject>
      <CategoryOpener height="3.5rem" onClick={()=>{setIsOpen(true)}}>
        카테고리
        {selectedCategory
        ? <Category id="category" name="category" value={selectedCategory} height="3rem" fontSize="1rem" readOnly />
        : ""
        }
      </CategoryOpener>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <CategorySelector height="20rem" width="20rem" setSelectedCategory={setSelectedCategory} setIsOpen={setIsOpen} />
      </Modal>
      <WishList height="7rem">
        해시태그
        <HashTag tags={tags} setTags={setTags} height="3rem" width="80%" color="green" placeholder="상품에 대한 태그를 등록할 수 있어요 (최대 3개)" />
      </WishList>
      <Content id="content" name="content" ref={contentRef} placeholder="교환할 상품에 대한 자세한 정보를 입력해주세요 &#10;(모델명, 수리여부, 사용감 등)" height="16rem" />
      <Submit color="yellow" fontSize="1.2rem">등록하기</Submit>
    </form>
    </>
  );
};
