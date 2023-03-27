import { NavLink } from "react-router-dom";
import { HeaderWrapper, HeaderWrap, HeaderLogo, HeaderMenu, HeaderRight } from "./styled"
// import { memo } from "react";

export const Header = (({ categories, isLogin, user }) => {
  // const loginFiltered = categories.filter(
  //   (v) => v.isLogin === null || v.isLogin === isLogin
  // );
  // const navigation = loginFiltered.map((category) => {
  //   return (
  //     <li key={category.id}>
  //       <NavLink to={category.path}>{category.name}</NavLink>
  //     </li>
  //   );
  // });
  // return <ul>{navigation}</ul>;
  const category = [
    {
        name: "Products",
        path: "/products"
    },
    {
        name: "Documents",
        path: "/documents"
    },
    {
        name: "Application",
        path: "/application"
    },
    {
        name: "Suppport",
        path: "/support"
    },
    {
        name: "Forum",
        path: "/forum"
    }
  ]

  const categoryList = (category) => {
      return category.map((item) => {
          return (
          <li key={item.path}>
              <NavLink to={item.path}>{item.name}</NavLink>
          </li>
          )
      })
  }

  return(
      <HeaderWrapper>
          <HeaderWrap>
              <HeaderLogo>Logo</HeaderLogo>
              {/* <HeaderMenu category={category} categoryList={categoryList}></HeaderMenu> */}
              <HeaderRight></HeaderRight>
          </HeaderWrap>
      </HeaderWrapper>
  )

});
