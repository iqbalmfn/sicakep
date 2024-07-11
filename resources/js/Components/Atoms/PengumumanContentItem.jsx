import { downloadFile, formatDate, truncate } from "@/Utils/GlobalFunction";
import Icon from "./Icon";
import NameWithAvatar from "./NameWithAvatar";
import clsx from "clsx";

const PengumumanContentItem = ({
    judul,
    dokumen,
    author,
    authorAvatar,
    date,
    isi,
}) => {
    return (
        <div className="border rounded-lg p-2 col-span-1">
            <div className="flex gap-3">
                <a
                    href={`/storage/berita/${dokumen}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                        !dokumen
                            ? "hidden"
                            : "flex flex-col gap-2 items-center cursor-pointer -mt-2"
                    )}
                >
                    <Icon
                        icon="file-earmark-pdf-fill"
                        className="text-danger text-[40px] lg:text-[60px]"
                    />
                    <span className="text-primary text-xs -mt-4">Download</span>
                </a>
                <div className="flex flex-col gap-1">
                    <span className="font-semibold text-lg">{judul}</span>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3">
                        <span className="flex text-xs text-gray-400">
                            <NameWithAvatar
                                name={author}
                                avatar={authorAvatar}
                                avatarSize="xs"
                            />
                        </span>
                        <span className="hidden md:block">|</span>
                        <span className="text-xs text-gray-400">
                            <Icon icon="calendar" me={2} /> {formatDate(date)}
                        </span>
                    </div>
                    {isi ? (
                        <div
                            className="mt-2 text-justify"
                            dangerouslySetInnerHTML={{
                                __html: truncate(isi, 250),
                            }}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PengumumanContentItem;
