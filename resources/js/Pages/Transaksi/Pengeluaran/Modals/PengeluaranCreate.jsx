import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import FormToggle from "@/Components/Atoms/FormToggle";
import Modal from "@/Components/Atoms/Modal";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";
import { formatRupiah } from "@/Utils/GlobalFunction";
import clsx from "clsx";

const PengeluaranCreate = ({
    title,
    submit,
    update,
    showModal,
    closeModal,
    mode,
    data,
    categories,
    users,
    rekenings,
    perencanaans,
    pengeluaranData,
    handleChange,
    handleCheckboxChange,
    errors,
    processing,
}) => {
    const types = ["online", "cash"];

    let subKategoris = [];
    subKategoris = perencanaans.filter(
        (item) => item.kategori_id == data.kategori_id
    );

    let sumberAnggaran = {};
    sumberAnggaran = subKategoris.find(
        (item) => item.id == data.perencanaan_id
    );

    let anggaranTerpakai = 0;
    anggaranTerpakai = pengeluaranData
        .filter((item) => item.perencanaan_id == data.perencanaan_id)
        .reduce((total, item) => {
            return parseInt(total) + parseInt(item.nominal);
        }, 0);

    if (mode == "edit") {
        anggaranTerpakai = anggaranTerpakai - data.nominal_strict;
    }

    let anggaranTerpakaiSum = 0;
    if (data.nominal) {
        anggaranTerpakaiSum =
            parseInt(anggaranTerpakai) + parseInt(data.nominal);
    } else {
        anggaranTerpakaiSum = parseInt(anggaranTerpakai);
    }

    return (
        <Modal
            maxWidth="3xl"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>
                {mode === "create" ? "Tambah" : "Update"} {title}
            </Modal.Header>
            <form onSubmit={mode === "create" ? submit : update}>
                <Modal.Body>
                    <div className="grid grid-cols-2 gap-5 py-5">
                        {data.perencanaan_id ? (
                            <div className="col-span-2 flex flex-col border rounded-lg border-info px-3 py-2 text-info bg-blue-50">
                                <div className="flex gap-2">
                                    <span className="font-bold">
                                        Alokasi Anggaran
                                    </span>
                                    <span>:</span>
                                    <span>
                                        {formatRupiah(sumberAnggaran?.nominal)}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="font-bold">
                                        Anggaran Terpakai
                                    </span>
                                    <span>:</span>
                                    <span
                                        className={clsx(
                                            parseInt(sumberAnggaran?.nominal) <
                                                anggaranTerpakaiSum
                                                ? "text-danger"
                                                : ""
                                        )}
                                    >
                                        {formatRupiah(
                                            data.nominal
                                                ? anggaranTerpakaiSum
                                                : parseInt(anggaranTerpakai)
                                        )}
                                    </span>
                                </div>
                            </div>
                        ) : null}
                        <div className="col-span-1 flex flex-col gap-4">
                            <FormGroup>
                                <FormLabel
                                    name="Kategori"
                                    htmlFor="kategori_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="kategori_id"
                                    name="kategori_id"
                                    onChange={handleChange}
                                    value={data.kategori_id}
                                    isError={errors?.kategori_id}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {categories.map((category) => (
                                        <option
                                            key={category.value}
                                            value={category.value}
                                        >
                                            {category.label}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.kategori_id} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Sumber Anggaran"
                                    htmlFor="perencanaan_id"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="perencanaan_id"
                                    name="perencanaan_id"
                                    onChange={handleChange}
                                    value={data.perencanaan_id}
                                    isError={errors?.perencanaan_id}
                                    required
                                    disabled={!data.kategori_id}
                                >
                                    <option value="">
                                        Pilih Sumber Anggaran
                                    </option>
                                    {subKategoris.map((subKategori) => (
                                        <option
                                            key={subKategori.id}
                                            value={subKategori.id}
                                        >
                                            {subKategori.judul}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.perencanaan_id} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Pengguna Dana"
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
                                    disabled={!data.perencanaan_id}
                                >
                                    <option value="">
                                        Pilih Pengguna Dana
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
                                    name="Rekening Yang Digunakanan"
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
                                    disabled={!data.perencanaan_id}
                                >
                                    <option value="">
                                        Pilih Rekening Yang Digunakanan
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
                                    disabled={!data.perencanaan_id}
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
                                    disabled={!data.perencanaan_id}
                                />
                                <FormError message={errors?.nominal} />
                            </FormGroup>
                        </div>
                        <div className="col-span-1 flex flex-col gap-4">
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
                                    disabled={!data.perencanaan_id}
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
                                    disabled={!data.perencanaan_id}
                                />
                                <FormError message={errors?.tanggal} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Sesuai Anggaran"
                                    htmlFor="is_sesuai"
                                    required
                                />
                                <div className="flex items-center gap-3 mt-1 mb-2">
                                    <span>Tidak Sesuai</span>
                                    <FormToggle
                                        variant="success"
                                        name="is_sesuai"
                                        onChange={handleCheckboxChange}
                                        checked={data.is_sesuai == "1"}
                                    />
                                    <span>Sesuai</span>
                                </div>
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
                                    disabled={!data.perencanaan_id}
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
                            !data.kategori_id ||
                            !data.judul ||
                            !data.nominal ||
                            !data.jenis ||
                            !data.tanggal
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PengeluaranCreate;
