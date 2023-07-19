import { React } from "react";
import { PageWrap, PageNum } from "./styled";
import request from "../../utils/request";
import { Icon } from "@iconify/react";

//paging
export const Pagination = ({
  id,
  setComments,
  pageNumbers,
  setPageNumbers,
  selectedPage,
  setSelectPage,
  totalComments,
  onPageChange,
  }) => {
  const renderComments = 10;
  const limitPage = 5;
  const maxPage = Math.ceil(totalComments / 10);

  // 페이징 '이전' 버튼
  const prevPage = async () => {
    const currentPage = pageNumbers[0] - 1;
    const response = await request.get(`/community/${id}?page=${currentPage}`);
    setComments(response.data.commentList);
    const totalComment = response.data.boardView.CommentCount;
    const maxPage = Math.ceil(totalComment / renderComments);
    const pageGroup = Math.ceil(currentPage / limitPage);
    let lastPage = pageGroup * limitPage;
    if (lastPage > maxPage) lastPage = maxPage;
    let firstPage = pageGroup * limitPage - (limitPage - 1);
    const pages = Array.from(
      { length: lastPage - (firstPage - 1) },
      (v, i) => firstPage + i
    );
    setPageNumbers(pages);
    setSelectPage(currentPage);
  };

  // 페이징 '다음' 버튼
  const nextPage = async () => {
    const currentPage = pageNumbers[4] + 1;
    const response = await request.get(`/community/${id}?page=${currentPage}`);
    setComments(response.data.commentList);
    const totalComment = response.data.boardView.CommentCount;
    const maxPage = Math.ceil(totalComment / renderComments);
    const pageGroup = Math.ceil(currentPage / limitPage);
    let lastPage = pageGroup * limitPage;
    if (lastPage > maxPage) lastPage = maxPage;
    let firstPage = pageGroup * limitPage - (limitPage - 1);
    const pages = Array.from(
      { length: lastPage - (firstPage - 1) },
      (v, i) => firstPage + i
    );
    setPageNumbers(pages);
    setSelectPage(currentPage);
  };

  return (
    <PageWrap>
      {pageNumbers.length === 0 ? (
        <></>
      ) : pageNumbers[0] !== 1 ? (
        <button
          type="button"
          style={{ border: "none", cursor: "pointer", background: "white" }}
          onClick={() => {
            prevPage();
          }}
        >
          <Icon icon="mdi:chevron-right" width="1.5rem" rotate={2} />
        </button>
      ) : null}
      {pageNumbers.map((page) => {
        return (
          <li key={page}>
            <PageNum
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              style={{ background: page === selectedPage ? "pink" : "white" }}
            >
              {page}
            </PageNum>
          </li>
        );
      })}
      {pageNumbers.length === 0 ? (
        <></>
      ) : pageNumbers[pageNumbers.length - 1] !== maxPage ? (
        <button
          type="button"
          onClick={() => {
            nextPage();
          }}
          style={{ border: "none", cursor: "pointer", background: "white" }}
        >
          {" "}
          <Icon icon="mdi:chevron-right" width="1.5rem" />{" "}
        </button>
      ) : (
        <></>
      )}
    </PageWrap>
  );
};
