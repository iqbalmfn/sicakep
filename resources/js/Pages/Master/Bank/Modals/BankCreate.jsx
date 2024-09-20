import FormError from "@/Components/Atoms/FormError";
import FormFile from "@/Components/Atoms/FormFile";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";

const BankCreate = ({
    title,
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    handleChange,
    errors,
    processing,
}) => {
    const types = ["bank", "e-wallet", "cash"];
    
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
                                    name="Nama"
                                    htmlFor="nama"
                                    required
                                />
                                <FormInput
                                    size="sm"
                                    id="nama"
                                    name="nama"
                                    onChange={handleChange}
                                    defaultValue={data.nama}
                                    placeholder="Masukkan Nama"
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
                                    name="Logo"
                                    htmlFor="logo"
                                />
                                <FormFile
                                    size="sm"
                                    id="logo"
                                    name="logo"
                                    onChange={handleChange}
                                    isError={errors?.logo}
                                    className="uppercase"
                                />
                                {data.logo ? (
                                    <img
                                        src={URL.createObjectURL(data.logo)}
                                        className="img-fluid w-[200px]"
                                    />
                                ) : data.previewLogo && mode == "create" ? (
                                    <img
                                        src={`/bank/${data.previewLogo}`}
                                        className="img-fluid w-[200px]"
                                    />
                                ) :  data.previewLogo && mode == "edit" ? (
                                    <img
                                        src={`/storage/bank/${data.previewLogo}`}
                                        className="img-fluid w-[200px]"
                                    />
                                ) : null}

                                <FormError message={errors?.logo} />
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

export default BankCreate;
