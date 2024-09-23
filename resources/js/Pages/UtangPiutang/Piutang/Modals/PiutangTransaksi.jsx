import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";
import { formatRupiah } from "@/Utils/GlobalFunction";

const PiutangTransaksi = ({
    submit,
    showModal,
    closeModal,
    mode,
    data,
    rekenings,
    dataTransaksi,
    handleChange,
    errors,
    processing,
}) => {
    const types = ["transfer", "cash"];

    // Menghitung total sudah dibayar
    const totalSudahDibayar = Array.isArray(dataTransaksi.piutang_detail)
        ? dataTransaksi.piutang_detail.reduce((total, detail) => total + detail.nominal, 0)
        : 0;
    
    return (
        <Modal
            maxWidth="md"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>
                Transaksi Pelunasan
            </Modal.Header>
            <form onSubmit={submit}>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-5 py-5">
                        <div className="col-span-1 flex flex-col gap-4">
                            <div className="bg-blue-50 border border-info rounded-lg text-info p-3">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th width="33%" className="text-left">Peminjam</th>
                                            <td>:</td>
                                            <td>{dataTransaksi.nama}</td>
                                        </tr>
                                        <tr>
                                            <th width="33%" className="text-left">Donatur</th>
                                            <td>:</td>
                                            <td>{dataTransaksi?.user?.name}</td>
                                        </tr>
                                        <tr>
                                            <th width="33%" className="text-left">Total Meminjam</th>
                                            <td>:</td>
                                            <td>{formatRupiah(dataTransaksi.nominal ? dataTransaksi.nominal : 0)}</td>
                                        </tr>
                                        <tr>
                                            <th width="33%" className="text-left">Sudah Dibayar</th>
                                            <td>:</td>
                                            <td className="font-bold">{formatRupiah(totalSudahDibayar)}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
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
                                    name="Tanggal Pembayaran"
                                    htmlFor="jatuh_tempo"
                                    required
                                />
                                <FormInput
                                    type="date"
                                    size="sm"
                                    id="jatuh_tempo"
                                    name="jatuh_tempo"
                                    onChange={handleChange}
                                    placeholder="Masukkan Tanggal Pembayaran"
                                    isError={errors?.jatuh_tempo}
                                    required
                                />
                                <FormError message={errors?.jatuh_tempo} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Rekening Tujuan"
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
                                <FormError message={errors?.rekening_id} />
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
                            !data.jatuh_tempo ||
                            !data.rekening_id
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PiutangTransaksi;
