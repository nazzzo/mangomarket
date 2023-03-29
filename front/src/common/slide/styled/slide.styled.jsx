import styled from 'styled-components'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"



export const StyledSlide = styled(Slider)`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -3rem;
    height: 32rem;


    .slick-list {
        position: absolute;
        width: 100%;
        height: 23rem;
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
        bottom : 20%;
    }
`


export const ImageSlide = styled.img`
`