import { formatDate } from "@/Utils/GlobalFunction";
import { Link } from "@inertiajs/react";
import Icon from "./Icon";

const BeritaItem = ({ judul, image, author, date }) => {
    return (
        <div className="flex gap-5">
            <img
                src={image}
                alt={judul}
                className="w-[130px] h-full object-cover rounded-lg"
            />
            <div className="flex flex-col gap-3">
                <Link href="#">
                    <span className="hover:text-primary line-clamp-2">
                        {judul}
                    </span>
                </Link>
                <div className="flex justify-between">
                    <span className="text-[11px] text-gray-400">
                        <Icon icon="person" me={2} /> {author}
                    </span>
                    <span className="text-[11px] text-gray-400">
                        <Icon icon="calendar" me={2} /> {formatDate(date)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default BeritaItem;
