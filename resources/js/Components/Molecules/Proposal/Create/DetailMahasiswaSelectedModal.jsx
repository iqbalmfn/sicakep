import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Icon from "@/Components/Atoms/Icon";
import Modal from "@/Components/Atoms/Modal";

const DetailMahasiswaSelectedModal = ({
    showModal,
    closeModal,
    data,
    index,
    handleChange,
}) => {
    return (
        <Modal maxWidth="xl" show={showModal} onClose={closeModal}>
            <Modal.Header onClick={closeModal} isShowModalClose={false}>
                Uraian Tugas
            </Modal.Header>
            <form>
                <Modal.Body className="my-5">
                    <div className="flex flex-col gap-3">
                        <FormGroup>
                            <FormInput
                                prefix={<Icon icon="123" className="text-xl" />}
                                size="sm"
                                value={data.nim}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormInput
                                prefix={
                                    <Icon icon="person" className="text-xl" />
                                }
                                size="sm"
                                value={data.nama}
                                disabled
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormInput
                                prefix={
                                    <Icon
                                        icon="briefcase"
                                        className="text-xl"
                                    />
                                }
                                size="sm"
                                value={data.studyprogram}
                                disabled
                            />
                        </FormGroup>
                    </div>
                    <hr className="my-5" />
                    <FormGroup>
                        <FormTextarea
                            placeholder="Tulis uraian tugas..."
                            rows="5"
                            defaultValue={data.bidang_tugas}
                            name="bidang_tugas"
                            onChange={(e) =>
                                handleChange(
                                    e.target.name,
                                    e.target.value,
                                    index
                                )
                            }
                        />
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <div className="flex justify-end">
                        <Button size="sm" onClick={closeModal}>
                            <Icon icon="save" me={2} /> Tutup & Simpan
                        </Button>
                    </div>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default DetailMahasiswaSelectedModal;
