import { StyledSlide, ImageSlide } from './styled'

export const MainSlider = ({images}) => {

    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        // centerMode: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        fade: false,
        infinite: true,
        pauseOnHover: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    }

    if (!images) return null;
    const imgSrc = images
        .split(",")
        .map(images => <ImageSlide key={images} src={images} onClick={()=>{}} />);

    return (
        <StyledSlide {...settings}>
            {imgSrc}
        </StyledSlide>
    )
}
