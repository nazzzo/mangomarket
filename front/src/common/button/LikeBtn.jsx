import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { userLikeAdd, userLikeRemove } from "../../store/user";
import { useParams } from "react-router-dom";
import request from "../../utils/request";
import { LikeBtnStyled } from "./styled"

export const LikeBtn = ({ isLogin, user, size }) => {
  const dispatch = useDispatch();
  const userLikes = useSelector((state) => state.user.like);
  const { id } = useParams();

  const handleClick = async () => {
    if (isLogin) {
      const response = await request.post(`boards/${id}/${user}/likes`, {
        email: user,
      });
      console.log(response.data);
      if (response.data) {
        userLikes.email === user
          ? dispatch(userLikeRemove({ email: user, boardid: id }))
          : dispatch(userLikeAdd({ email: user, boardid: id }));
      }
    }
  };

    // console.log(`eee::`, userLikes)
  return (
    <>
      <LikeBtnStyled size={size} onClick={handleClick} disabled={!isLogin}>
        {user === userLikes.email && id === userLikes.boardid ? (
          <Icon icon="mdi:cards-heart" color="#dc3545" />
        ) : (
          <Icon icon="mdi:cards-heart-outline" />
        )}
      </LikeBtnStyled>
    </>
  );
};
