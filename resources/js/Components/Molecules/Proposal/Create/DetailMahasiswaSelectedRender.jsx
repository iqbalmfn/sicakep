import Icon from "@/Components/Atoms/Icon";
import { Tooltip } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import DetailMahasiswaSelectedModal from "./DetailMahasiswaSelectedModal";

const DetailMahasiswaSelectedRender = ({
    students,
    removeStudent,
    handleBidangTugasStudent,
    handleStudentDisabled,
    proposalStatus,
}) => {
    const [initialStudents, setInitialStudents] = useState([]);
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
        const list = [...initialStudents];
        list[index][name] = value;
        setInitialStudents(list);
    };

    useEffect(() => {
        setInitialStudents(students);
        handleBidangTugasStudent(students);
    }, [students]);

    useEffect(() => {
        const studentsDisabled = students.some((student) => !student.bidang_tugas)
        handleStudentDisabled(studentsDisabled)
    }, [initialStudents])

    return (
        <div className="grid grid-cols-2 gap-2">
            {students.map((student, index) => (
                <div
                    key={student.id}
                    className="col-span-2 xl:col-span-1 border rounded-lg overflow-hidden"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3 p-2">
                            <div className="border border-white rounded-lg w-[57px] h-[57px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden">
                                <img
                                    src={student.foto}
                                    alt={student.nama}
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-extrabold">
                                    {student.nama}
                                </span>
                                <span className="text-xs">{`NIM : ${student.nim}`}</span>
                                <span className="text-xs">{`Program Studi ${student.studyprogram}`}</span>
                            </div>
                        </div>
                        {!proposalStatus || proposalStatus === 0 ? (
                            <div className="flex flex-col">
                                <Tooltip title="Uraian Tugas">
                                    <button
                                        type="button"
                                        className={clsx(
                                            student.bidang_tugas
                                                ? "bg-success hover:bg-success-hover"
                                                : "bg-info hover:bg-info-hover",
                                            "h-[36.5px] w-10 flex items-center justify-center text-white"
                                        )}
                                        onClick={() =>
                                            handleShowModal(student, index)
                                        }
                                    >
                                        <Icon icon="pencil-square" />
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    title="Hapus Mahasiswa"
                                    placement="bottom"
                                >
                                    <button
                                        type="button"
                                        className="bg-red-700 hover:bg-red-800 h-[36.5px] w-10 flex items-center justify-center text-white"
                                        onClick={() =>
                                            removeStudent(student.id)
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
            <DetailMahasiswaSelectedModal
                showModal={showModalBidangTugas}
                closeModal={handleCloseModal}
                data={dataModal}
                index={dataIndex}
                handleChange={handleChange}
            />
        </div>
    );
};

export default DetailMahasiswaSelectedRender;
