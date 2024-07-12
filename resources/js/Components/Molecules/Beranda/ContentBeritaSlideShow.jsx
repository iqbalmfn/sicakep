import ContentBoxSlideshowItem from "@/Components/Atoms/ContentBoxSlideshowItem";
import { useRef, useState } from "react";
import Slider from "react-slick";

const ContentBeritaSlideshow = ({ beritas }) => {
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

    const goToPreviousSlide = () => {
        sliderRef.current.slickPrev();
    };

    const goToNextSlide = () => {
        sliderRef.current.slickNext();
    };
    return (
        <div className="rounded-lg overflow-hidden">
            <Slider ref={sliderRef} {...settings}>
                {beritas.length > 0
                    ? beritas.map((berita) => (
                          <ContentBoxSlideshowItem
                              key={berita.id}
                              image={berita.files[0].url}
                              alt={berita.judul}
                              category="Berita BIMA"
                              title={berita.judul}
                              link="#"
                              date={berita.tgl_pemberitaan}
                              author={berita.no_surat}
                              slideIndex={slideIndex}
                              goToPreviousSlide={goToPreviousSlide}
                              goToNextSlide={goToNextSlide}
                          />
                      ))
                    : null}
            </Slider>
        </div>
    );
};

export default ContentBeritaSlideshow;
