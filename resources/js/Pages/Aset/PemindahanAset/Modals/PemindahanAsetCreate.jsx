import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";

const PemindahanAsetCreate = ({
    title,
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    rekenings,
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
                {mode === "create" ? "Tambah" : "Update"} Transaksi {title}
            </Modal.Header>
            <form onSubmit={mode === "create" ? submit : update}>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-5 py-5">
                        <div className="col-span-1 flex flex-col gap-4">
                            <FormGroup>
                                <FormLabel
                                    name="Rekening Asal"
                                    htmlFor="initial_rekening_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="initial_rekening_id"
                                    name="initial_rekening_id"
                                    onChange={handleChange}
                                    value={data.initial_rekening_id}
                                    isError={errors?.initial_rekening_id}
                                    required
                                >
                                    <option value="">
                                        Pilih Rekening Asal
                                    </option>
                                    {rekenings.map((rekening) => (
                                        <option
                                            key={rekening.id}
                                            value={rekening.id}
                                        >
                                            {rekening.nama_rekening}{" "}
                                            {rekening.no_rekening
                                                ? `(${rekening.no_rekening})`
                                                : null}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError
                                    message={errors?.initial_rekening_id}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Rekening Tujuan"
                                    htmlFor="destination_rekening_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="destination_rekening_id"
                                    name="destination_rekening_id"
                                    onChange={handleChange}
                                    value={data.destination_rekening_id}
                                    isError={errors?.destination_rekening_id}
                                    required
                                >
                                    <option value="">
                                        Pilih Rekening Tujuan
                                    </option>
                                    {rekenings.map((rekening) => (
                                        <option
                                            key={rekening.id}
                                            value={rekening.id}
                                        >
                                            {rekening.nama_rekening}{" "}
                                            {rekening.no_rekening
                                                ? `(${rekening.no_rekening})`
                                                : null}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError
                                    message={errors?.initial_rekening_id}
                                />
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
                                    name="Biaya Administrasi"
                                    htmlFor="biaya_administrasi"
                                />
                                <FormInput
                                    type="number"
                                    size="sm"
                                    id="biaya_administrasi"
                                    name="biaya_administrasi"
                                    onChange={handleChange}
                                    defaultValue={data.biaya_administrasi}
                                    placeholder="Masukkan Biaya Administrasi"
                                    isError={errors?.biaya_administrasi}
                                />
                                <FormError message={errors?.biaya_administrasi} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Tanggal"
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
                                    placeholder="Masukkan Tanggal"
                                    isError={errors?.tanggal}
                                    required
                                />
                                <FormError message={errors?.tanggal} />
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
                            !data.initial_rekening_id ||
                            !data.destination_rekening_id ||
                            !data.nominal ||
                            !data.tanggal
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PemindahanAsetCreate;
