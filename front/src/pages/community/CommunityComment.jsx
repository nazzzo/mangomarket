import {
  CommentForm,
  CommentInput,
  ContentInput,
  CommentButton,
  TotalComments,
} from "./styled";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import request from "../../utils/request";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { Pagination } from "./CommentPagination";
import { CommentTxt } from "./CommunityCommentTxt";
import { useEffect } from "react";

//community 작성글 밑의 전부
export const Comment = ({
  totalComments,
  setTotalComments,
  comments,
  setComments,
  currentPage,
  setCurrentPage,
  pageNumbers,
  setPageNumbers,
}) => {
  const { id } = useParams();
  const [commentValue, setCommentValue] = useState();
  const inputRef = useRef();
  const { user } = useSelector((state) => state.user);
  const [selectedPage, setSelectPage] = useState(currentPage);

  const onPageChange = async (page) => {
    console.log("page::", page);
    const response = await request.get(`/community/${id}?page=${page}`);
    console.log("commentList;:", response.data.commentList);
    setComments(response.data.commentList);
    setCurrentPage(page);
    setSelectPage(page);
    const totalComment = totalComments;
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
  };

  //댓글 작성
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await request.post(`/community/${id}`, {
      content: commentValue,
      email: user.email,
      currentPage,
    });
    if (response.status >= 400 || response.data.isError) {
      alert(response.data.message);
    } else {
      setComments(response.data);
      setCommentValue("");
      setTotalComments((prev) => prev + 1);

      //댓글 작성시 페이징처리
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
      setCurrentPage(maxPage);
      setSelectPage(maxPage);
    }
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage]);

  return (
    <CommentForm onSubmit={submitHandler}>
      {comments ? (
        <TotalComments>
          <Icon icon="mdi:comment-outline" /> 댓글 {totalComments}
        </TotalComments>
      ) : (
        <TotalComments>
          <Icon icon="mdi:comment-outline" /> 댓글{" "}
        </TotalComments>
      )}
      {comments ? (
        comments.map((comment) => (
          <CommentTxt
            key={comment.id}
            idx={comment.id}
            content={comment.content}
            createdAt={comment.createdAt}
            comments={comments}
            setComments={setComments}
            email={comment.email}
            username={comment.username}
            img={comment.userImg}
            parentId={comment.parentId}
            isDeleted={comment.isDeleted}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setTotalComments={setTotalComments}
            totalComments={totalComments}
            setPageNumbers={setPageNumbers}
            setSelectPage={setSelectPage}
          />
        ))
      ) : (
        <></>
      )}
      <CommentInput>
        <ContentInput
          value={commentValue}
          onChange={(e) => {
            if (e.target.value.indexOf("@") === 0) {
              return;
            } else {
              setCommentValue(e.target.value);
            }
          }}
          placeholder="댓글을 입력해주세요."
          ref={inputRef}
        />
        <CommentButton
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <Icon
            icon="material-symbols:arrow-circle-up"
            width="3rem"
            border="none"
          />
        </CommentButton>
      </CommentInput>
      <Pagination
        id={id}
        setComments={setComments}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={pageNumbers}
        selectedPage={selectedPage}
        setSelectPage={setSelectPage}
        totalComments={totalComments}
        setPageNumbers={setPageNumbers}
        onPageChange={onPageChange}
      />
    </CommentForm>
  );
};
