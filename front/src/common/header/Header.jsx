import { useState } from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { HeaderWrapper, HeaderWrap, HeaderLogoWrap, HeaderLogoImgWrap, HeaderLogoImg, HeaderMenuWrap, HeaderMenuul, HeaderMenuli, HeaderFunctionWrap, HeaderSearchWrap, HeaderSearchBox, HeaderSearchInput, HeaderSearchIcon, HeaderAlarmWrap, HeaderAlarm, HeaderUserWrap, HeaderUser } from "./styled"
import { Hamburger, SearchPopUp, MenuPopUp } from '../index';

export const Header = (({ categories, isLogin, user }) => {
    const [ searchBox, setSearchBox ] = useState(false)
    const [ menuBox, setMenuBox ] = useState(false)

    const navigate = useNavigate()

    const loginFilter = categories.filter( v => v.isLogin === null || v.isLogin === isLogin )

    const navigation = (styledComponent) => loginFilter.map( v => {
        const Component = styledComponent
        return(
                <Component key={v.id}>
                    <NavLink to={v.path}>
                        {v.name}
                    </NavLink>
                </Component>
            )})

    const headerMenuList = navigation(HeaderMenuli)

    const searchClickHandler = () => {
        if(menuBox) {
            setMenuBox(!menuBox)
            setSearchBox(!searchBox)}
        else {
            setSearchBox(!searchBox) 
        }
    }

    const menuClickHandler = () => {
        console.log(1)
        if(searchBox) {
            setSearchBox(!searchBox)
            setMenuBox(!menuBox)}
        else {
            setMenuBox(!menuBox) 
        }
    }

    return(
            <>
                <HeaderWrapper>
                    <HeaderWrap>
                        {/*  */}
                        <HeaderLogoWrap>
                            <HeaderLogoImgWrap onClick={() => {navigate("/")}}>
                                <HeaderLogoImg src='./mango.png'/>
                            </HeaderLogoImgWrap>
                        </HeaderLogoWrap>
                        {/*  */}
                        <HeaderMenuWrap>
                            <HeaderMenuul>
                                {headerMenuList}
                            </HeaderMenuul>
                        </HeaderMenuWrap>
                        {/*  */}
                        <HeaderFunctionWrap>
                            <HeaderSearchWrap>
                                <HeaderSearchBox>
                                    <HeaderSearchInput placeholder='검색어를 입력해주세요' type={'search'}/>
                                    <HeaderSearchIcon src='./search.png' onClick={searchClickHandler}/>
                                </HeaderSearchBox>
                            </HeaderSearchWrap>
                            <HeaderAlarmWrap>
                            <HeaderAlarm src='./alarm.png'/>
                            </HeaderAlarmWrap>
                            <HeaderUserWrap onClick={menuClickHandler}>
                                <HeaderUser src='./user.png'/>
                                <Hamburger />
                            </HeaderUserWrap>
                        </HeaderFunctionWrap>
                        {/*  */}
                    </HeaderWrap>
                </HeaderWrapper>
                <SearchPopUp visible={searchBox}/>
                <MenuPopUp visible={menuBox} navigation={navigation}/>
            </>
        )
    }
);