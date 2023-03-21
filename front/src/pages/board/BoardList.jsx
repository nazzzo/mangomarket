import { Button } from "../../common/button";
import { BoardTable } from "../../common/table";
import { Row } from "../../common/row";

export const BoardList = () => {
  return (
    <>
      <Row width="600px" height="auto" align="center">
        <BoardTable />
      </Row>
      <Button color={"green"} fontColor={"white"} width={5} height={3} active>
        글쓰기
      </Button>
    </>
  );
};
