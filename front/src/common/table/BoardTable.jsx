import {Table, TableHeader, TableRow, TableData } from "./styled/Table.styled"

export const BoardTable = ({ data }) => {

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableData>번호</TableData>
                    <TableData>제목</TableData>
                    <TableData>작성자</TableData>
                    <TableData>작성일</TableData>
                    <TableData>조회수</TableData>
                </TableRow>
            </TableHeader>
            <TableRow>
            <TableData>1</TableData>
                    <TableData>제목ㅇㅇ</TableData>
                    <TableData>web7777</TableData>
                    <TableData>2023-03-16</TableData>
                    <TableData>0</TableData>
            </TableRow>
            <TableRow>
            <TableData>1</TableData>
                    <TableData>제목ㅇㅇ</TableData>
                    <TableData>web7777</TableData>
                    <TableData>2023-03-16</TableData>
                    <TableData>0</TableData>
            </TableRow>
            <TableRow>
            <TableData>1</TableData>
                    <TableData>제목ㅇㅇ</TableData>
                    <TableData>web7777</TableData>
                    <TableData>2023-03-16</TableData>
                    <TableData>0</TableData>
            </TableRow>
            <TableRow>
            <TableData>1</TableData>
                    <TableData>제목ㅇㅇ</TableData>
                    <TableData>web7777</TableData>
                    <TableData>2023-03-16</TableData>
                    <TableData>0</TableData>
            </TableRow>
            <TableRow>
            <TableData>1</TableData>
                    <TableData>제목ㅇㅇ</TableData>
                    <TableData>web7777</TableData>
                    <TableData>2023-03-16</TableData>
                    <TableData>0</TableData>
            </TableRow>
        </Table>
    )
 }