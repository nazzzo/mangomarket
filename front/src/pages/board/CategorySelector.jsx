import { useState, useEffect } from "react";
import { CategoryBox } from "./styled/BoardWrite.styled"
import request from "../../utils/request"

export const CategorySelector = ({ height, width, setSelectedCategory, setIsOpen }) => {
    const [categoryList, setCategoryList] = useState([])


    const getCategory = async () => {
        const response = await request.get("/categories/board")
        return setCategoryList(response.data)
    }
    
    useEffect(() => {
        getCategory()
    },[])

    const handleClick = (category) => {
        setSelectedCategory(category)

        setTimeout(() => {
            setIsOpen(false)
          }, 200);
      };

    
      return (
        <CategoryBox height={height} width={width}>
          {categoryList.map((category, index) => (
            <li key={index} onClick={() => handleClick(category)}>
              {category}
            </li>
          ))}
        </CategoryBox>
      );
    };