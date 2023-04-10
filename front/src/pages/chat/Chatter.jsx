import styled from 'styled-components';

const ChatterWrap = styled.div`
    
`

const ChatterList = styled.ul`
    
`

const ChatterItem = styled.li`
    display: flex;
    height: 80px;
`

const ChatterImgWrap = styled.div`
    width: 20%;
`

const ChatterImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`

const ChatterContentWrap = styled.div`
    width: 80%;
    display: flex;
    padding-top: 1rem;
    box-sizing: border-box;
`

const ChatterUserWrap = styled.div`
    width: 40%;
    padding-left: 1.5rem;
    box-sizing: border-box;

    & > div + div {
        margin-top: 0.5rem;
    }
`

const ChatterUserName = styled.div`
`

const ChatterUserAddress = styled.div`
    
`

const ChatterContent = styled.div`
    width: 60%;
`

export const Chatter = ({ isSeller, selectedChatter, customerList, sellerList, handleClick }) => {
    console.log(customerList)
    return (
        <ChatterWrap>
            { customerList && <ChatterList>
                {!isSeller && !selectedChatter ? customerList.map((v, index) =>
                    <Chatter onClick={() => handleClick(v)} key={index}>
                        <ChatterImgWrap>
                            <ChatterImg src={v.userImg}></ChatterImg>
                        </ChatterImgWrap>
                        <ChatterContentWrap>
                            <ChatterUserWrap>
                                <ChatterUserName>{v.username}</ChatterUserName>
                                <ChatterUserAddress>{v.address}</ChatterUserAddress>
                            </ChatterUserWrap>
                            <ChatterContent>최신채팅내역</ChatterContent>
                        </ChatterContentWrap>
                    </Chatter>
                ) : sellerList.map((v) =>
                    <Chatter>
                        <ChatterImgWrap>
                            <ChatterImg src={v.userImg}></ChatterImg>
                        </ChatterImgWrap>
                        <ChatterContentWrap>
                            <ChatterUserWrap>
                                <ChatterUserName>{v.username}</ChatterUserName>
                                <ChatterUserAddress>{v.address}</ChatterUserAddress>
                            </ChatterUserWrap>
                            <ChatterContent>최신채팅내역</ChatterContent>
                        </ChatterContentWrap>
                    </Chatter>
                )}
            </ChatterList>}
        </ChatterWrap>
    )
}