import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MainSlider } from "../../common/slide";
import { WriterInfo } from "../../common/profile";
import { Selector } from "../../common/select"
import { RecommendCategory } from "../../common/category"
import { ViewContent, ViewFooter } from './';
import request from "../../utils/request";

export const BoardView = () => {
  const { isLogin, user } = useSelector((state) => state.user);
  const userLikes = useSelector((state) => state.user.like);
  const [viewData, setViewData] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const selectOptions = [
    { value: 'public', label: '교환가능' },
    { value: 'reserved', label: '예약중' },
    { value: 'sold', label: '교환완료' },
    { value: 'blind', label: '숨기기' },
  ]

  useEffect(() => {
    const getView = async () => {
      try {
        const idx = (!user.email) ? "guest" : user.email
        const response = await request.get(`boards/${id}/${idx}`);
        setViewData(response.data);
        selectOptions.forEach(v => {
          response.data.state === v.value && setSelectedOption(v)
        })
      } catch (error) {
        console.log(error);
      }
    };
    getView();
  }, [userLikes, navigate]);

  useEffect(() => {
    const putState = async () => {
      try {
        const response = await request.put(`reservations/${id}/state`, {
          state: selectedOption?.value
        })
        // console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    putState()
  }, [selectedOption]);

  return (
    viewData
      ? (<>
        <MainSlider images={viewData.images} />
        <WriterInfo
          navigate={navigate}
          email={viewData.email}
          username={viewData.username}
          userImg={viewData.userImg}
          address={viewData.address}
          width="100%"
          height="12rem"
          imgSize="7rem"
          fontSize="1.1rem"
        />
        {(user.email === viewData.email)
          && <Selector
            options={selectOptions}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            width="30%"
          />}
        <ViewContent
          category={viewData.category}
          subject={viewData.subject}
          state={selectedOption.label}
          content={viewData.content}
          likeCount={viewData.likeCount}
          hit={viewData.hit}
          date={viewData.createdAt}
        />
        <RecommendCategory
          height="30rem"
          width="25rem"
          category={viewData.category}
          email={user.email}
        />
        {isLogin && (user.email !== viewData.email)
          ? <ViewFooter
            isLogin={isLogin}
            user={user}
            writerEmail={viewData.email}
            writerName={viewData.username}
            writerImg={viewData.userImg}
            chatter={viewData}
            size="3rem"
            boardId={id}
            footerHeight="4.5rem"
            footerWidth="30rem" />
          : <></>}
      </>) : <></>
  );
};
