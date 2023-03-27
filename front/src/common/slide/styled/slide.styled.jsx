import styled from 'styled-components'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export const ImageSlide = styled.img`
    width: 32.5rem;
    height: 32.5rem;
`

export const StyledSlide = styled(Slider)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    margin-bottom: -3rem;
    width: 100%;
    height: 32rem;
    .slick-list {
        position: absolute;
        width: 55.6rem;
        height: 23.1rem;
        overflow: hidden;
    }

    .slick-slide {
        padding: 0 0.5rem;
    }

    .slick-track {
        display: flex;
        height: 100%;
    }

    .slick-dots {
        position: absolute;
        margin: 70px;
    }

    .slick-arrow {
        padding: 4px 6px;
        transform: translate(15rem, 15rem);
        background-color: transparent;
        color: black;
        border-radius: 3px;
        cursor: pointer;
    }

    .slick-prev {
        position: absolute;
        top: -1.2rem;
        right: -500rem;
        cursor: pointer;
    }
    .slick-next {
        position: absolute;
        top: -1.2rem;
        left: 970px;
        cursor: pointer;
    }
    .slick-prev:before,
    .slick-next:before {
        color: black;
    }
`
