import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";
import { formatDateWithDay, formatRupiah } from "@/Utils/GlobalFunction";

const UtangBayar = ({
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    users,
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
            <Modal.Header onClick={closeModal}>Bayar Utang</Modal.Header>
            <form onSubmit={mode === "create" ? submit : update}>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-5 py-5">
                        <div className="col-span-1 flex flex-col gap-4">
                            <FormGroup>
                                <FormLabel name="Judul" htmlFor="judul" />
                                <FormInput
                                    size="sm"
                                    id="judul"
                                    name="judul"
                                    value={data.judul}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel name="Nominal" htmlFor="nominal" />
                                <FormInput
                                    size="sm"
                                    id="nominal"
                                    name="nominal"
                                    value={
                                        data.nominal ? formatRupiah(data.nominal) : 0
                                    }
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Tanggal Jatuh Tempo"
                                    htmlFor="jatuh_tempo"
                                />
                                <FormInput
                                    size="sm"
                                    id="jatuh_tempo"
                                    name="jatuh_tempo"
                                    value={
                                        data
                                            ? formatDateWithDay(
                                                  data.jatuh_tempo
                                              )
                                            : "-"
                                    }
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Pembayar"
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
                                    <option value="">Pilih Pembayar</option>
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
                                    name="Rekening Yang Digunakan"
                                    htmlFor="rekening_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="rekening_id"
                                    name="rekening_id"
                                    onChange={handleChange}
                                    value={data.rekening_id}
                                    isError={errors?.rekening_id}
                                    required
                                >
                                    <option value="">
                                        Pilih Rekening Yang Digunakan
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
                                <FormError message={errors?.rekening_id} />
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

export default UtangBayar;
