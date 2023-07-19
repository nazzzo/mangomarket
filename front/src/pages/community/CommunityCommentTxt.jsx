import {
  CommentWrapper,
  Txt,
  Img,
  CommentInput,
  ContentInput,
  CommentButton,
  ReplyButton,
  ModifyInput,
  MDButtons,
  ButtonMD,
} from "./styled";
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useTimeStamp, useInput } from "../../hooks";
import request from "../../utils/request";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

//각각의 댓글 하나를 가르킴
export const CommentTxt = ({
  idx,
  content,
  createdAt,
  comments,
  setComments,
  email,
  username,
  img,
  parentId,
  isDeleted,
  currentPage,
  setCurrentPage,
  setTotalComments,
  totalComments,
  setPageNumbers,
  setSelectPage,
}) => {
  const [isInput, setIsInput] = useState(false);
  const [modified, setModified] = useState();
  const [reply, setReply] = useState(false);
  const [replyComment, setReplyComment] = useState();
  const timeAgo = useTimeStamp(createdAt);
  const comment = useInput(content);
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const isAuthor = user.email === email;
  const [deleteRender, setDeleteRender] = useState(0);
  const modifyValue = comment.value.replace(/@.+?\s/, "");

  //답글 작성
  const submitReply = async () => {
    let parentIdx;
    if (parentId === 0) parentIdx = idx;
    else parentIdx = parentId;

    let toUser;
    if (parentId === 0) toUser = "";
    else toUser = `@${username}`;

    const toReply = `${toUser} ${replyComment}`;
    if (!replyComment) {
      return alert("내용을입력해주세요");
    }

    try {
      const response = await request.post(`/community/${id}`, {
        content: toReply,
        email: user.email,
        parentId: parentIdx,
        currentPage,
      });
      if (response.status >= 400 || response.data.isError) {
        alert(response.data.message);
      } else {
        setComments(response.data);
        setReply(!reply);
        setTotalComments((prev) => prev + 1);
        setReplyComment(""); // 2번째 답글을 달때 첫번째 답글에 대한 내용을 input박스에 불러오는 문제발생.. 이걸로 해결

        //답글 작성시 페이징처리
        const totalComment = totalComments + 1;
        const limitPage = 5;
        const renderComments = 10;
        const maxPage = Math.ceil(totalComment / renderComments);
        const pageGroup = Math.ceil(currentPage / limitPage);
        let lastPage = pageGroup * limitPage;
        if (lastPage > maxPage) lastPage = maxPage;
        let firstPage = pageGroup * limitPage - (limitPage - 1);
        const pages = Array.from(
          { length: lastPage - firstPage + 1 },
          (v, i) => firstPage + i
        );
        setPageNumbers(pages);
        const lastIndex = comments[9].id

        if(totalComment % 10 === 1 && idx === lastIndex){
          setCurrentPage(currentPage+1)
          setSelectPage(currentPage+1)
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //댓글 삭제
  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("정말 삭제하시겠습니까?");
      if (confirmed) {
        //부모댓글이면 삭제가 아닌 수정로직
        if (!parentId) {
          const response = await request.put(
            `/community/comment/${id}/${idx}`,
            {
              isDeleted: 1,
              content,
            }
          );
          const bool = response.data;
          setDeleteRender(bool);
        } else {
          const response = await request.delete(
            `/community/comment/${id}/${idx}`
          );
          setComments(comments.filter((comment) => comment.id !== idx));
        }
        setTotalComments((prev) => prev - 1);

        //댓글삭제시 페이징처리
        const totalComment = totalComments - 1;
        const limitPage = 5;
        const renderComments = 10;
        const maxPage = Math.ceil(totalComment / renderComments);
        const pageGroup = Math.ceil(currentPage / limitPage);
        let lastPage = pageGroup * limitPage;
        if (lastPage > maxPage) lastPage = maxPage;
        let firstPage = pageGroup * limitPage - (limitPage - 1);
        const pages = Array.from(
          { length: lastPage - firstPage + 1 },
          (v, i) => firstPage + i
        );
        setPageNumbers(pages);
        const initIndex = comments[0].id
        if(totalComment % 10 === 0 && idx === initIndex){
          setCurrentPage(currentPage-1)
          setSelectPage(currentPage-1) 
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //댓글 수정
  const handleModify = async () => {
    if (content === comment.value) setIsInput(false);
    let toUser = `@${username}`;
    try {
      if (content.indexOf("@") === 0) {
        const response = await request.put(`/community/comment/${id}/${idx}`, {
          content: toUser + " " + modifyValue,
        });
        if (response.data === 1) {
          setModified(comment.value);
          setComments(
            comments.map((comment) => {
              if (idx === comment.id) {
                return {
                  ...comment,
                  content: toUser + " " + modifyValue,
                };
              }
              return comment;
            })
          );
          setIsInput(false); // 글을 수정후에 2번쨰 글을 수정할때 내용변화가 없었으면 db에서 수정했다고는 했으나 화면으로는 그려주질못했음 이걸로해결..
        }
      } else {
        const response = await request.put(`/community/comment/${id}/${idx}`, {
          content: comment.value,
        });
        if (response.data === 1) {
          setModified(comment.value);
          setComments(
            comments.map((comment) => {
              if (idx === comment.id) {
                return {
                  ...comment,
                  content: modifyValue,
                };
              }
              return comment;
            })
          );
          setIsInput(false); // 글을 수정후에 2번쨰 글을 수정할때 내용변화가 없었으면 db에서 수정했다고는 했으나 화면으로는 그려주질못했음 이걸로해결..
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //수정 눌렀을 때 inputBox 랜더링
  useEffect(() => {
    if (modified) {
      setIsInput(false);
    }
  }, [modified]);

  return (
    <CommentWrapper
      parentId={parentId}
      isDeleted={isDeleted}
      deleteRender={deleteRender}
    >
      {createdAt && !isInput ? (
        <>
          <Txt idx={idx}>
            <Img src={img} />
            <div>{username}</div>
            <div>{timeAgo}</div>
            <div>
              {!comment.value.indexOf("@") ? (
                <span>
                  <NavLink to="/community">
                    {comment.value.split(" ")[0]}
                  </NavLink>{" "}
                  {comment.value.split(" ")[1]}
                </span>
              ) : (
                <span>
                  {!content.indexOf("@") ? (
                    <>
                      <NavLink>{content.split(" ")[0]}</NavLink>{" "}
                      {content.split(" ")[1]}
                    </>
                  ) : (
                    <>{content}</>
                  )}
                </span>
              )}
            </div>
          </Txt>
          {!reply ? (
            <ReplyButton
              type="button"
              onClick={() => {
                setReply(!reply);
              }}
            >
              답글
            </ReplyButton>
          ) : (
            <>
              <ReplyButton
                type="button"
                onClick={() => {
                  setReply(!reply);
                }}
              >
                답글
              </ReplyButton>
              <Txt idx={idx}>
                <Img src={user.userImg} />
                <div>{user.username}</div>
              </Txt>
              {!parentId ? (
                <CommentInput>
                  <ContentInput
                    placeholder="답글을 입력해주세요"
                    value={replyComment}
                    onChange={(e) => {
                      setReplyComment(e.target.value);
                    }}
                    data-depth="true"
                  />
                  <CommentButton type="button" onClick={submitReply}>
                    <Icon
                      icon="material-symbols:arrow-circle-up"
                      width="3rem"
                      border="none"
                    />
                  </CommentButton>
                </CommentInput>
              ) : (
                <CommentInput>
                  <ContentInput
                    placeholder={`${username}님에게 답글쓰기`}
                    value={replyComment}
                    onChange={(e) => {
                      setReplyComment(e.target.value);
                    }}
                  />
                  <CommentButton type="button" onClick={submitReply}>
                    <Icon
                      icon="material-symbols:arrow-circle-up"
                      width="3rem"
                      border="none"
                    />
                  </CommentButton>
                </CommentInput>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Txt idx={idx}>
            <Img src={img} />
            <div>{username}</div>
            <div>{timeAgo}</div>
          </Txt>
          <ModifyInput
            idx={idx}
            value={modifyValue}
            onChange={comment.onChange}
          />
        </>
      )}
      {isAuthor && (
        <MDButtons>
          {!isInput ? (
            <>
              <ButtonMD
                type="button"
                onClick={() => {
                  setIsInput(true);
                }}
              >
                수정
              </ButtonMD>
              <ButtonMD type="button" onClick={handleDelete}>
                삭제
              </ButtonMD>
            </>
          ) : (
            <>
              <ButtonMD type="button" onClick={handleModify}>
                댓글입력
              </ButtonMD>
            </>
          )}
        </MDButtons>
      )}
    </CommentWrapper>
  );
};
