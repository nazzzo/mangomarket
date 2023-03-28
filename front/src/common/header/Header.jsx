import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { HeaderWrapper, HeaderWrap, HeaderLogoWrap, HeaderLogoImgWrap, HeaderLogoImg, HeaderMenuWrap, HeaderMenuul, HeaderMenuli, HeaderFunctionWrap, HeaderSearchWrap, HeaderSearchBox, HeaderSearchInput, HeaderSearchIcon, HeaderAlarmWrap, HeaderAlarm, HeaderUserWrap, HeaderHamburger, HeaderUser } from "./styled"
import { Hamburger } from '../hamburger';

import styled from 'styled-components';

const SearchPopUp = styled.div`
    display: none;

    @media screen and (max-width: 480px){
        display: block;
        width: 30rem;
        height: 10rem;
        background-color: #cecece;
    }
`

const SearchPopInput = styled.input`
    @media screen and (max-width: 480px){
        width: 100%;
        height: inherit;
        border: none;
        border-radius: 4px;
        background-color: #efefef;
        box-sizing: border-box;
        padding: 0 0.5rem;
    }
`

export const Header = (({ categories, isLogin, user }) => {
    const navigate = useNavigate()

    const loginFilter = categories.filter( v => v.isLogin === null || v.isLogin === isLogin )

    const navigation = loginFilter.map( v => { return(
                <HeaderMenuli key={v.id}>
                    <NavLink to={v.path}>
                        {v.name}
                    </NavLink>
                </HeaderMenuli>
            )})

    return(
            <>
                <HeaderWrapper>
                    <HeaderWrap>
                        <HeaderLogoWrap>
                            <HeaderLogoImgWrap onClick={() => {navigate("/")}}>
                                <HeaderLogoImg src='./mango.png'/>
                            </HeaderLogoImgWrap>
                        </HeaderLogoWrap>
                        <HeaderMenuWrap>
                            <HeaderMenuul>
                                {navigation}
                            </HeaderMenuul>
                        </HeaderMenuWrap>
                        <HeaderFunctionWrap>
                            <HeaderSearchWrap>
                                <HeaderSearchBox>
                                    <HeaderSearchInput placeholder='검색어를 입력해주세요' type={'search'}/>
                                    <HeaderSearchIcon src='./search.png'/>
                                </HeaderSearchBox>
                            </HeaderSearchWrap>
                            <HeaderAlarmWrap>
                            <HeaderAlarm src='./alarm.png'/>
                            </HeaderAlarmWrap>
                            <HeaderUserWrap>
                                <HeaderUser src='./user.png'/>
                                <Hamburger />
                            </HeaderUserWrap>
                        </HeaderFunctionWrap>
                    </HeaderWrap>
                </HeaderWrapper>
                <SearchPopUp>
                    <SearchPopInput />
                </SearchPopUp>
            </>
        )
    }
);