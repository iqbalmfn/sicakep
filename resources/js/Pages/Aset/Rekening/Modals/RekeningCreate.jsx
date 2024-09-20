import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";

const RekeningCreate = ({
    title,
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    banks,
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
                                    name="Pemilik Rekening"
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
                                        Pilih Pemilik Rekening
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
                                    name="Nama Bank/E-Wallet"
                                    htmlFor="bank_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="bank_id"
                                    name="bank_id"
                                    onChange={handleChange}
                                    value={data.bank_id}
                                    isError={errors?.bank_id}
                                    required
                                >
                                    <option value="">Pilih Nama Bank</option>
                                    {banks.map((bank) => (
                                        <option
                                            key={bank.value}
                                            value={bank.value}
                                        >
                                            {bank.label}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.bank_id} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Nama Rekening"
                                    htmlFor="nama_rekening"
                                    required
                                />
                                <FormInput
                                    size="sm"
                                    id="nama_rekening"
                                    name="nama_rekening"
                                    onChange={handleChange}
                                    defaultValue={data.nama_rekening}
                                    placeholder="Masukkan Nama Rekening"
                                    isError={errors?.nama_rekening}
                                    required
                                />
                                <FormError message={errors?.nama_rekening} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Nomor Rekening"
                                    htmlFor="no_rekening"
                                />
                                <FormInput
                                    size="sm"
                                    id="no_rekening"
                                    name="no_rekening"
                                    onChange={handleChange}
                                    defaultValue={data.no_rekening}
                                    placeholder="Masukkan Nomor Rekening"
                                    isError={errors?.no_rekening}
                                />
                                <FormError message={errors?.no_rekening} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Saldo Awal"
                                    htmlFor="saldo"
                                    required
                                />
                                <FormInput
                                    type="number"
                                    size="sm"
                                    id="saldo"
                                    name="saldo"
                                    onChange={handleChange}
                                    defaultValue={data.saldo}
                                    placeholder="Masukkan Saldo Awal"
                                    isError={errors?.saldo}
                                    disabled={mode == "edit"}
                                    required
                                />
                                <FormError message={errors?.saldo} />
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
                            !data.bank_id ||
                            !data.nama_rekening ||
                            !data.saldo
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default RekeningCreate;
