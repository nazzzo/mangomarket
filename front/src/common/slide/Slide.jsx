import { StyledSlide, ImageSlide } from './styled'

export const MainSlider = () => {
    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        // centerMode: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        fade: false,
        infinite: true,
        pauseOnHover: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
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

    return (
        <StyledSlide {...settings}>
            <ImageSlide src="https://dnvefa72aowie.cloudfront.net/origin/article/202303/f06dd879fa1ae60159a229f5a96e5a433493f9a5d52df640f4a354e9aee25137.webp?q=95&s=1440x1440&t=inside" />
            <ImageSlide src="https://dnvefa72aowie.cloudfront.net/origin/article/202303/7eea4a88f47cac7923d880632fed6e069cc99284878010be300d2c89df4b71c2.webp?q=95&s=1440x1440&t=inside" />
            <ImageSlide src="https://dnvefa72aowie.cloudfront.net/origin/article/202302/589ffa152ecdbbe40dc7a87e6eb3894f9ab30fe49c5584161c6c53c48ababb15.jpg?q=82&s=300x300&t=crop" />
            <ImageSlide src="https://dnvefa72aowie.cloudfront.net/origin/article/202303/310d468724ec258f9789738e8bcde61767284c80c621e14e2fa419d4012e0800.jpg?q=82&s=300x300&t=crop" />
            <ImageSlide src="https://dnvefa72aowie.cloudfront.net/origin/article/202303/fe8b5f9adb5f93a5759af599d985f6d4d3f30a55e232452d0cb011bfd57b6ea4.jpg?q=82&s=300x300&t=crop" />
            <ImageSlide src="https://dnvefa72aowie.cloudfront.net/origin/article/202202/61330e36cf80e9be21bc05760f199f537aa7980cc6a28ae3e80b1ed8b46270dd.webp?q=82&s=300x300&t=crop" />
        </StyledSlide>
    )
}
