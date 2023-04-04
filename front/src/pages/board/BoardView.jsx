import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { MainSlider } from "../../common/slide";
import { WriterInfo } from "../../common/profile";
import { RecommendCategory } from "../../common/category"
import request from "../../utils/request";
import { ViewContent, ViewFooter } from './';


export const BoardView = () => {
  const { isLogin, user } = useSelector((state) => state.user);
  const userLikes = useSelector((state) => state.user.like);
  const [viewData, setViewData] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
//   console.log(user)


  useEffect(() => {
    const getView = async () => {
      try {
        const idx = (!user.email) ? "guest" : user.email
        const response = await request.get(`boards/${id}/${idx}`);
        setViewData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getView();
  }, [userLikes, navigate]);

   if (!viewData) return null;
  return (
    viewData
    ? (<>
      <MainSlider images={viewData.images} />
      <WriterInfo
        navigate={navigate}
        email={viewData.email}
        username={viewData.username}
        userImg={viewData.userImg}
        width="100%"
        height="12rem"
        imgSize="7rem"
        fontSize="1.1rem"
      />
      <ViewContent
        category={viewData.category}
        subject={viewData.subject}
        content={viewData.content}
        likeCount={viewData.likeCount}
        hit={viewData.hit}
        date={viewData.createdAt}
      />
      <RecommendCategory
            height="30rem"
            width="25rem"
            category={viewData.category}
      />
      {isLogin 
        ? <ViewFooter 
            isLogin={isLogin} 
            user={user}
            writerEmail={viewData.email}
            writerName={viewData.username}
            writerImg={viewData.userImg}              
            size="3rem" 
            footerHeight="4.5rem" 
            footerWidth="30rem" /> 
        : <></>} 
    </>) : <></>
  );
};
