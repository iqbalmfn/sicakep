import ShapeDivider from "@/Components/Atoms/ShapeDivider";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";

const HeroSection = ({ sliders }) => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [updateCount, setUpdateCount] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        fade: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        afterChange: () => setUpdateCount((prev) => prev + 1),
        beforeChange: (current, next) => setSlideIndex(next),
    };

    return (
        <div className={`relative md:h-[500px] lg:h-[600px] h-[350px] overflow-hidden`}>
            <Slider ref={sliderRef} {...settings}>
                {sliders.map((slide, index) => (
                    <img key={index} src={`/storage/slider/${slide.image}`} alt={index} className="bg-center object-cover md:h-[500px] lg:h-[600px] h-[350px]" />
                ))}
            </Slider>
            <div className="absolute inset-0 bg-primary opacity-75 mix-blend-multiply" />
            <div
                id="hero-content"
                className={`text-white text-3xl z-50 absolute top-[350px] text-transparent opacity-0`}
            >
                tes
            </div>
            <ShapeDivider />
        </div>
    );
};

export default HeroSection;
