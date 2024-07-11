import { downloadFile, formatDate, truncate } from "@/Utils/GlobalFunction";
import ActionButton from "../Molecules/ActionButton";
import Icon from "./Icon";

const PengumumanItem = ({
    author,
    date,
    judul,
    isi,
    dokumen,
    link = null,
    isBima = false,
    dir = null,
}) => {
    return (
        <div className="border rounded-lg p-2 col-span-1">
            <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                    <span className="text-[11px] text-gray-400">
                        {!isBima ? <Icon icon="person" me={2} /> : null}{" "}
                        {author}
                    </span>
                    {dir ? (
                        <span className="uppercase text-[11px] text-gray-400">
                            ({dir})
                        </span>
                    ) : null}
                </div>
                <span className="text-[11px] text-gray-400">
                    <Icon icon="calendar" me={2} /> {formatDate(date)}
                </span>
            </div>
            <div className="flex justify-between items-start">
                <div className="flex items-start">
                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="font-semibold hover:text-primary">
                                {judul}
                            </span>
                        </a>
                    ) : (
                        <span className="font-semibold">{judul}</span>
                    )}
                    {isi ? (
                        <div
                            className="text-[11px]"
                            dangerouslySetInnerHTML={{
                                __html: truncate(isi, 250),
                            }}
                        />
                    ) : null}
                </div>
                <div className="flex items-start gap-1">
                    {isBima ? (
                        dokumen.length > 0 ? (
                            dokumen.map((doc) => (
                                <div key={doc.id} className="mt-2">
                                    <a
                                        href={doc.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ActionButton
                                            icon="file-earmark-pdf"
                                            label="Unduh Dokumen"
                                            variant="danger"
                                        />
                                    </a>
                                </div>
                            ))
                        ) : null
                    ) : dokumen ? (
                        <div className="flex flex-col gap-2">
                            <span className="text-[11px] text-gray-400">
                                Unduh Dokumen :
                            </span>
                            <div>
                                <ActionButton
                                    icon="file-earmark-pdf"
                                    label="Unduh Dokumen"
                                    variant="danger"
                                    onClick={() =>
                                        downloadFile(
                                            `/storage/berita/${dokumen}`,
                                            dokumen
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PengumumanItem;
