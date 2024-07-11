import { formatDate } from "@/Utils/GlobalFunction";
import { Link } from "@inertiajs/react";
import Icon from "./Icon";

const ContentBoxSlideshowItem = ({
    image,
    alt,
    category,
    title,
    link,
    date,
    author,
    slideIndex,
    goToPreviousSlide,
    goToNextSlide,
}) => {
    return (
        <div className="relative md:h-[425px] lg:h-[573px] h-[350px]">
            <img
                src={image}
                alt={alt}
                className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 bg-black bg-opacity-60 w-full h-[50%] md:h-[50%] lg:h-[44%] rounded-t-xl backdrop-blur px-7 py-5">
                <div className="flex flex-col gap-2 lg:gap-3">
                    <span className="text-gray-300 uppercase lg:text-sm text-xs">{category}</span>
                    <h3 className="text-white text-carter-one text-base md:text-2xl truncate-2-lines">
                        {title}
                    </h3>
                    <div className="flex gap-5 text-gray-400 lg:text-sm text-xs">
                        <div className="flex gap-2">
                            <Icon icon="calendar" />
                            <span>{formatDate(date)}</span>
                        </div>
                        |
                        <div className="flex gap-2">
                            <Icon icon="person" />
                            <span>{author}</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-1 lg:mt-7">
                        <Link
                            href={link}
                            className="w-full text-center md:w-auto border border-gray-400 text-white rounded-lg px-4 py-2 lg:text-sm text-xs"
                        >
                            Baca Selengkapnya
                        </Link>
                        <div className="hidden md:block">
                            <div className="flex justify-between items-center gap-3 text-white">
                                <button onClick={goToPreviousSlide}>
                                    <Icon
                                        icon="chevron-left"
                                        className="text-xs"
                                    />
                                </button>
                                <div>
                                    <span>{slideIndex + 1}</span>
                                    <span className="text-gray-300">
                                        {" "}
                                        dari 5
                                    </span>
                                </div>
                                <button onClick={goToNextSlide}>
                                    <Icon
                                        icon="chevron-right"
                                        className="text-xs"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentBoxSlideshowItem;
