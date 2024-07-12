import Alert from "@/Components/Atoms/Alert";
import Modal from "@/Components/Atoms/Modal";
import { nl2br } from "@/Utils/GlobalFunction";

const ModalDetailListUsulanHasilPenetapan = ({
    showModal,
    closeModal,
    data,
    mode,
}) => {
    const dataRender = () => {
        if (mode === "administrasi") {
            return data.konfirmasi_administrasi ? (
                <div className="flex flex-col gap-2">
                    <span className="font-semibold">Komentar Reviewer 1 :</span>
                    <div className="border rounded-lg px-4 py-3">
                        {data.konfirmasi_administrasi.catatan}
                    </div>
                </div>
            ) : (
                <Alert
                    color="--color-danger"
                    icon="chat-right-text"
                    message="Belum seleksi administrasi"
                />
            );
        } else if (mode === "substansi") {
            return data.hasil_reviewer ? (
                <div className="flex flex-col gap-7">
                    {data.hasil_reviewer.map((reviewer, i) => (
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">
                                Komentar Reviewer {i + 1} :
                            </span>
                            <div className="border rounded-lg px-4 py-3">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: nl2br(reviewer.catatan),
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <Alert
                    color="--color-danger"
                    icon="chat-right-text"
                    message="Belum seleksi substansi"
                />
            );
        } else {
            return null;
        }
    };

    return (
        <Modal maxWidth="2xl" show={showModal} onClose={closeModal}>
            <Modal.Header onClick={closeModal} className="text-primary">
                {mode === "administrasi" ? "Administrasi" : "Substansi"}
            </Modal.Header>
            <Modal.Body className="p-5">{dataRender()}</Modal.Body>
        </Modal>
    );
};

export default ModalDetailListUsulanHasilPenetapan;
