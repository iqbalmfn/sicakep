import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormToggle from "@/Components/Atoms/FormToggle";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";

const KategoriCreate = ({
    title,
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    handleChange,
    handleCheckboxChange,
    errors,
    processing,
}) => {
    const types = ["pengeluaran", "pemasukan"];

    return (
        <Modal
            maxWidth="md"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>
                {mode === "create" ? "Tambah" : "Update"} {title}
            </Modal.Header>
            <form onSubmit={mode === "create" ? submit : update}>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-5 py-5">
                        <div className="col-span-1 flex flex-col gap-4">
                            <FormGroup>
                                <FormLabel
                                    name="Nama Kategori"
                                    htmlFor="nama"
                                    required
                                />
                                <FormInput
                                    size="sm"
                                    id="nama"
                                    name="nama"
                                    onChange={handleChange}
                                    defaultValue={data.nama}
                                    placeholder="Masukkan Nama Kategori"
                                    isError={errors?.nama}
                                    required
                                />
                                <FormError message={errors?.nama} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Jenis"
                                    htmlFor="jenis"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="jenis"
                                    name="jenis"
                                    onChange={handleChange}
                                    value={data.jenis}
                                    isError={errors?.jenis}
                                    required
                                    className="uppercase"
                                >
                                    <option value="">Pilih Jenis</option>
                                    {types.map((item, index) => (
                                        <option
                                            key={index}
                                            value={item}
                                            className="uppercase"
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.jenis} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Status"
                                    htmlFor="status"
                                    required
                                />
                                <div className="flex items-center gap-3">
                                    <span>Non Aktif</span>
                                    <FormToggle
                                        variant="success"
                                        name="status"
                                        onChange={handleCheckboxChange}
                                        checked={data.status == "1"}
                                    />
                                    <span>Aktif</span>
                                </div>
                            </FormGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <RegularSubmitModal
                        closeModal={closeModal}
                        label={mode === "create" ? "Simpan" : "Update"}
                        disabled={processing || !data.nama || !data.jenis}
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default KategoriCreate;
