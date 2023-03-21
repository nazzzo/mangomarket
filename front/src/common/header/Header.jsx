import { NavLink } from "react-router-dom";
import { memo } from "react";

export const Header = memo(({ categories, isLogin, user }) => {
  // console.log(`data::::`, categories)
  console.log(`로그인 상태:::`, isLogin, `유저:::`, user);
  const loginFiltered = categories.filter(
    (v) => v.isLogin === null || v.isLogin === isLogin
  );

  const navigation = loginFiltered.map((category) => {
    return (
      <li key={category.id}>
        <NavLink to={category.path}>{category.name}</NavLink>
      </li>
    );
  });
  return <ul>{navigation}</ul>;
});
