import request from '../../utils/request'
import { useRef, useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { Modal } from '../../common/modal'
import { RefreshBtn } from '../../common/button'
import { CategoryOpener, CategorySelector } from '../../common/category'
import { HomeWrapper, BtnBox, List, ItemWrapper, ItemImage, ItemContent, TextBoxA, TextBoxB, TextBoxC, TextBoxD, Count, PageCounter, } from './styled'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'



export const Main = () => {
  const { isLogin, user } = useSelector((state) => state.user);
    const pageCountRef = useRef(null)
    const [count, setCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [boardList, setBoardList] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request.get(
                    `boards/?count=${count}&category=${selectedCategory}&email=${user.email}`
                )
                const newBoardList = response.data
                if (count === 0 || selectedCategory !== '') {
                    setBoardList(newBoardList)
                } else {
                    setBoardList((prevList) => [...prevList, ...newBoardList])
                }
                setIsLoading(false)
                if (newBoardList.length === 0) setIsLoading(true)
            } catch (error) {
                console.log(error)
            }
        }

        if (selectedCategory !== '') setCount(0)
        fetchData()
    }, [count, selectedCategory])

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0,
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isLoading) {
                    setIsLoading(true)
                    setCount((prevCount) => prevCount + 1)
                }
            })
        }, options)
        if (pageCountRef.current) observer.observe(pageCountRef.current)
        return () => {
            if (pageCountRef.current) observer.unobserve(pageCountRef.current)
        }
    }, [isLoading])
    const TextList = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 1,
            },
        },
    }

    const TextItem = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    }
    // console.log(count)

    return (
        <HomeWrapper>
            <BtnBox height="2.5rem">
                <CategoryOpener
                    width="8.5rem"
                    height="2.5rem"
                    onClick={() => {
                        setIsOpen(true)
                    }}
                />
                <RefreshBtn
                    height="2.5rem"
                    width="3rem"
                    onClick={() => {
                        setSelectedCategory('')
                    }}
                />
            </BtnBox>
            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                <CategorySelector
                    setSelectedCategory={setSelectedCategory}
                    setIsOpen={setIsOpen}
                    height="20rem"
                    width="20rem"
                />
            </Modal>
            <List variants={TextList} initial="hidden" animate="visible">
                {boardList.map((board) => (
                    <ItemWrapper
                        height="220px"
                        key={board.id}
                        onClick={() => {
                            navigate(`board/${board.id}`)
                        }}
                        variants={TextItem}
                    >
                        <ItemImage size="220px" src={board.image} state={board.state} />
                        <ItemContent key={board.id}>
                            <TextBoxA
                                category={board.category}
                                subject={board.subject}
                            />
                            <TextBoxB address={board.address} date={board.createdAt} />
                            <TextBoxC hashtag={board.tagname} />
                            <TextBoxD>
                                <Count id="messageCount">
                                    <Icon icon="ant-design:message-outlined" /> {board.messageCount}
                                </Count>
                                <Count id="likeCount">
                                    <Icon icon="mdi:cards-heart-outline" /> {board.likeCount}
                                </Count>
                            </TextBoxD>
                        </ItemContent>
                    </ItemWrapper>
                ))}
            </List>
            <PageCounter ref={pageCountRef} />
        </HomeWrapper>
    )
}
