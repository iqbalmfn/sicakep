import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";

const PiutangCreate = ({
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
                                    name="Donatur"
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
                                        Pilih Donatur
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
                                    name="Peminjam"
                                    htmlFor="nama"
                                    required
                                />
                                <FormInput
                                    size="sm"
                                    id="nama"
                                    name="nama"
                                    onChange={handleChange}
                                    defaultValue={data.nama}
                                    placeholder="Masukkan Nama Peminjam"
                                    isError={errors?.nama}
                                    required
                                />
                                <FormError message={errors?.nama} />
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
                                    name="Tanggal Meminjam"
                                    htmlFor="tanggal"
                                    required
                                />
                                <FormInput
                                    type="date"
                                    size="sm"
                                    id="tanggal"
                                    name="tanggal"
                                    onChange={handleChange}
                                    defaultValue={data.tanggal}
                                    placeholder="Masukkan Tanggal Meminjam"
                                    isError={errors?.tanggal}
                                    required
                                />
                                <FormError message={errors?.tanggal} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Tanggal Jatuh Tempo"
                                    htmlFor="jatuh_tempo"
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
                            !data.nama ||
                            !data.nominal ||
                            !data.tanggal
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PiutangCreate;
