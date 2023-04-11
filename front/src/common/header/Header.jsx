import { useState, useEffect } from "react"
import { useInput } from "../../hooks"
import { useDispatch } from "react-redux"
import { userSetAlarm, userSetSearch } from "../../store"
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { HeaderWrapper, HeaderWrap, HeaderLogoWrap, HeaderLogoImgWrap, HeaderLogoImg, HeaderMenuWrap, HeaderMenuul, HeaderMenuli, HeaderFunctionWrap, HeaderSearchWrap, HeaderSearchBox, HeaderSearchInput, HeaderAlarmWrap, HeaderUserWrap, HeaderUser, HeaderAlarmMenu } from "./styled"
import { Hamburger, SearchPopUp, MenuPopUp } from '../index';
import { Modal } from "../../common/modal";
import { AlarmDot } from "../../common/button"
import { KeywordAlarm } from "../../common/profile"
import { Icon } from '@iconify/react';
import request from "../../utils/request"

export const Header = (({ categories, isLogin, user, keywords, isAlarm }) => {
    const search = useInput("")
    const dispatch = useDispatch()
    const [searchBox, setSearchBox] = useState(false)
    const [menuBox, setMenuBox] = useState(false)
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const [alarmData, setAlarmData] = useState([])


    const getAlarm = async () => {
        const query = keywords.map(v => v.id).join(',');
        const response = await request.get(`boards/keywords?id=${query}&email=${user.email}`);
        if (!response.data.isError) setAlarmData(response.data);
    };

    useEffect(() => {
        getAlarm();
        const interval = setInterval(() => { getAlarm();}, 3 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (alarmData.length > 0) dispatch(userSetAlarm(true))
    }, [alarmData]);

    useEffect(() => {
        if (isOpen) dispatch(userSetAlarm(false))
    }, [isOpen]);


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

    const handleSearchClick = (e) => {
        e.preventDefault();
        if(menuBox) {
            setMenuBox(!menuBox)
            setSearchBox(!searchBox)}
        else {
            setSearchBox(!searchBox) 
        }
        dispatch(userSetSearch(search.value))
        search.clear()
    }

    const handleMenuClick = () => {
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
                                <HeaderLogoImg src='https://i.ibb.co/BNxzrWN/mangomarket3.png'/>
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
                                    <HeaderSearchInput placeholder='검색어를 입력해주세요' type="search" id="search" name="search" value={search.value} onChange={search.onChange} />
                                    <Icon icon="material-symbols:search" onClick={handleSearchClick} />
                                </HeaderSearchBox>
                            </HeaderSearchWrap>
                            <HeaderAlarmWrap onClick={()=>{setIsActive(!isActive)}} className={isActive ? 'on' : ''}>
                                <Icon icon="mdi:bell" />
                                {isAlarm && <AlarmDot top="27%" right="27%" />}
                                <HeaderAlarmMenu onClick={
                                     ()=> {setIsOpen(true)
                                     dispatch(userSetAlarm(false))}} 
                                     className="snb"
                                >
                                    {isAlarm && <AlarmDot top="20%" left="14%" />}
                                </HeaderAlarmMenu>
                            </HeaderAlarmWrap>
                            <HeaderUserWrap onClick={handleMenuClick}>
                                { user.userImg ? <HeaderUser src={user.userImg} onClick={() => {navigate("/profile")}}/> : <></>}
                                <Hamburger />
                            </HeaderUserWrap>
                        </HeaderFunctionWrap>
                        {/*  */}
                    </HeaderWrap>
                </HeaderWrapper>
                <SearchPopUp visible={searchBox}/>
                <MenuPopUp visible={menuBox} navigation={navigation}/>                
                <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <KeywordAlarm height="30rem" width="25rem" setIsOpen={setIsOpen} alarmData={alarmData} navigate={navigate} />
                </Modal>
            </>
        )
    }
);