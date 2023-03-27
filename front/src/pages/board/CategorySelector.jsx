import { useState, useEffect } from "react";
import { CategoryBox } from "./styled/BoardWrite.styled"
import request from "../../utils/request"

export const CategorySelector = ({height, width}) => {
    const [categoryList, setCategoryList] = useState()

    const getCategory = async () => {
        const response = await request.get("/categories/board")
        console.log(`response:::`, response.data)

        return setCategoryList(response.data)
    }
    
    useEffect(() => {
        getCategory()
    },[])

    return <CategoryBox height={height} width={width}>{categoryList}</CategoryBox>
}