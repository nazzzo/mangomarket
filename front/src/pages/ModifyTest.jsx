import { useParams } from "react-router-dom";
import { Button } from "../../common/button";
import request from "../../utils/request";
import { useEffect, useState } from "react";
import { ViewWrapper, Profile, ViewContent, Comment, Buttons, UpdateWrapper, UpdateContent, UpdateSubject,
} from "./styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useInput, useTextArea } from "../../hooks";
import { TextArea } from "../../common/textarea";


export const CommunityView = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [view, setView] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();
  console.log(id);

  console.log("view:::", view, subject, content);

  useEffect(() => {
    const getWriting = async () => {
      try {
        const response = await request.get(`/community/${id}`);
        console.log(response.data);
        setView(response.data);
        console.log("view:::", response.data);
      } catch (e) {
        throw new Error(e);
      }
    };
    getWriting();
  }, []);


  return (
    <ViewWrapper>
        {view? <><Profile username={view.username} date={view.createdAt} /><ViewContent subject={view?.subject} content={view?.content} /></>
: <></>}
    </ViewWrapper>
  );
};







return (
    <ViewWrapper>
      <form onSubmit={handleUpdate}>
        {view ? (
          <>
            <Profile username={view.username} date={view.createdAt} />
            {isEditMode ? (
              <UpdateWrapper>
                <UpdateContent>
                  <UpdateSubject
                    value={subjectInput.value}
                    onChange={subjectInput.onChange}
                    id="subject"
                    name="subject"
                  />
                  <TextArea
                    value={contentTextArea.value}
                    onChange={contentTextArea.onChange}
                    id="content"
                    name="content"
                    type="text-area"
                  />
                </UpdateContent>
              </UpdateWrapper>
            ) : (
              <ViewContent subject={view?.subject} content={view?.content} />
            )}
            {user.email === view.email ? (
              <Buttons>
                {!isEditMode ? (
                  <Button
                    color="yellow"
                    fontColor="#fff"
                    fontSize="1.1rem"
                    height="3rem"
                    width="7rem"
                    onClick={() => {
                      setIsEditMode(!isEditMode);
                    }}
                    type="button"
                  >
                    수정하기
                  </Button>
                ) : (
                  <Button
                    color="yellow"
                    fontColor="#fff"
                    fontSize="1.1rem"
                    height="3rem"
                    width="7rem"
                    onClick={() => {
                      setIsEditMode((prevState) => !prevState);
                    }}
                  >
                    수정완료
                  </Button>
                )}
                <Button
                  color="yellow"
                  fontColor="#fff"
                  fontSize="1.1rem"
                  height="3rem"
                  width="7rem"
                  type="button"
                >
                  삭제
                </Button>
              </Buttons>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
      </form>
      <Comment />
    </ViewWrapper>
  );