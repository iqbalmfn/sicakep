import Icon from "@/Components/Atoms/Icon";
import { Tooltip } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import DetailDosenSelectedModal from "./DetailDosenSelectedModal";

const DetailDosenSelectedRender = ({
    lecturers,
    removeLecturer,
    handleBidangTugasLecturer,
    handleLecturerDisabled,
    proposalStatus,
}) => {
    const [initialLecturers, setInitialLecturers] = useState();
    const [showModalBidangTugas, setShowModalBidangTugas] = useState(false);
    const [dataModal, setDataModal] = useState({});
    const [dataIndex, setDataIndex] = useState(null);

    const handleShowModal = (data, index) => {
        setShowModalBidangTugas(true);
        setDataModal(data);
        setDataIndex(index);
    };

    const handleCloseModal = () => {
        setShowModalBidangTugas(false);
        setDataModal({});
    };

    const handleChange = (name, value, index) => {
        const list = [...initialLecturers];
        list[index][name] = value;
        setInitialLecturers(list);
    };

    useEffect(() => {
        setInitialLecturers(lecturers);
        handleBidangTugasLecturer(lecturers);
    }, [lecturers]);

    useEffect(() => {
        const lecturersDisabled = lecturers.some(
            (lecturer) => !lecturer.bidang_tugas
        );
        handleLecturerDisabled(lecturersDisabled);
    }, [initialLecturers]);

    return (
        <div className="grid grid-cols-2 gap-2">
            {lecturers.map((lecturer, index) => (
                <div
                    key={lecturer.id}
                    className="col-span-2 xl:col-span-1 border rounded-lg overflow-hidden"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 p-2">
                            <div className="border border-white rounded-lg w-[57px] h-[57px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden">
                                <img
                                    src={lecturer.foto}
                                    alt={lecturer.nama}
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex gap-2 text-xs items-center">
                                    <span className="text-xs font-extrabold">
                                        {lecturer.nama}
                                    </span>
                                    <Tooltip
                                        title={
                                            lecturer.is_approved === 0
                                                ? "Menunggu persetujuan"
                                                : lecturer.is_approved == 1
                                                ? "Menyetujui"
                                                : "Menolak"
                                        }
                                        className="cursor-pointer"
                                    >
                                        <Icon
                                            className={clsx(
                                                lecturer.is_approved === 0
                                                    ? "text-warning"
                                                    : lecturer.is_approved == 1
                                                    ? "text-success"
                                                    : "text-danger"
                                            )}
                                            icon={
                                                lecturer.is_approved == 0
                                                    ? "clock"
                                                    : lecturer.is_approved == 1
                                                    ? "check-circle"
                                                    : "x-circle"
                                            }
                                        />
                                    </Tooltip>
                                </div>
                                <span className="text-xs">{`NIDN : ${lecturer.nidn}`}</span>
                                <span className="text-xs">{`Program Studi ${lecturer.studyprogram}`}</span>
                            </div>
                        </div>
                        {!proposalStatus || proposalStatus === 0 ? (
                            <div className="flex flex-col">
                                <Tooltip title="Uraian Tugas">
                                    <button
                                        type="button"
                                        className={clsx(
                                            lecturer.bidang_tugas
                                                ? "bg-success hover:bg-success-hover"
                                                : "bg-info hover:bg-info-hover",
                                            "h-[36.5px] w-10 flex items-center justify-center text-white"
                                        )}
                                        onClick={() =>
                                            handleShowModal(lecturer, index)
                                        }
                                    >
                                        <Icon icon="pencil-square" />
                                    </button>
                                </Tooltip>
                                <Tooltip title="Hapus Dosen" placement="bottom">
                                    <button
                                        type="button"
                                        className="bg-red-700 hover:bg-red-800 h-[36.5px] w-10 flex items-center justify-center text-white"
                                        onClick={() =>
                                            removeLecturer(lecturer.id)
                                        }
                                    >
                                        <Icon icon="trash" />
                                    </button>
                                </Tooltip>
                            </div>
                        ) : null}
                    </div>
                </div>
            ))}

            {/* modal input uraian tugas */}
            <DetailDosenSelectedModal
                showModal={showModalBidangTugas}
                closeModal={handleCloseModal}
                data={dataModal}
                index={dataIndex}
                handleChange={handleChange}
            />
        </div>
    );
};

export default DetailDosenSelectedRender;
