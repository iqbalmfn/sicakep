import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";

const UtangCreate = ({
    title,
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    users,
    handleChange,
    errors,
    processing,
}) => {
    const types = ["transfer", "cash"];

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
                                    name="Peminjam"
                                    htmlFor="user_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="user_id"
                                    name="user_id"
                                    onChange={handleChange}
                                    value={data.user_id}
                                    isError={errors?.user_id}
                                    required
                                >
                                    <option value="">
                                        Pilih Peminjam
                                    </option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.user_id} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Judul"
                                    htmlFor="judul"
                                    required
                                />
                                <FormInput
                                    size="sm"
                                    id="judul"
                                    name="judul"
                                    onChange={handleChange}
                                    defaultValue={data.judul}
                                    placeholder="Masukkan Judul"
                                    isError={errors?.judul}
                                    required
                                />
                                <FormError message={errors?.judul} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Nominal"
                                    htmlFor="nominal"
                                    required
                                />
                                <FormInput
                                    type="number"
                                    size="sm"
                                    id="nominal"
                                    name="nominal"
                                    onChange={handleChange}
                                    defaultValue={data.nominal}
                                    placeholder="Masukkan Nominal"
                                    isError={errors?.nominal}
                                    required
                                />
                                <FormError message={errors?.nominal} />
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
                                >
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.jenis} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Tanggal Jatuh Tempo"
                                    htmlFor="jatuh_tempo"
                                    required
                                />
                                <FormInput
                                    type="date"
                                    size="sm"
                                    id="jatuh_tempo"
                                    name="jatuh_tempo"
                                    onChange={handleChange}
                                    defaultValue={data.jatuh_tempo}
                                    placeholder="Masukkan Tanggal Jatuh Tempo"
                                    isError={errors?.jatuh_tempo}
                                    required
                                />
                                <FormError message={errors?.jatuh_tempo} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Deskripsi"
                                    htmlFor="deskripsi"
                                />
                                <FormTextarea
                                    size="sm"
                                    id="deskripsi"
                                    name="deskripsi"
                                    onChange={handleChange}
                                    defaultValue={data.deskripsi}
                                    placeholder="Tulis Deskripsi..."
                                    isError={errors?.deskripsi}
                                    rows="3"
                                />
                                <FormError message={errors?.deskripsi} />
                            </FormGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <RegularSubmitModal
                        closeModal={closeModal}
                        label={mode === "create" ? "Simpan" : "Update"}
                        disabled={
                            processing ||
                            !data.user_id ||
                            !data.judul ||
                            !data.nominal ||
                            !data.jenis ||
                            !data.jatuh_tempo
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default UtangCreate;
