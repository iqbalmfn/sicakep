import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Label from "@/Components/Atoms/Label";
import Modal from "@/Components/Atoms/Modal";
import NameWithAvatar from "@/Components/Atoms/NameWithAvatar";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";
import {
    diffForHumans,
    formatRupiah,
    monthNumberToIndonesian,
} from "@/Utils/GlobalFunction";
import clsx from "clsx";

const PerencanaanConfirm = ({
    title,
    showModal,
    closeModal,
    data,
    formData,
    submit,
    handleChange,
    errors,
    processing
}) => {
    const status = [
        {
            value: 1,
            label: 'Accept'
        },
        {
            value: 0,
            label: 'Reject'
        }
    ];

    return (
        <Modal
            maxWidth="1000px"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>Konfirmasi {title}</Modal.Header>
            <form onSubmit={submit}>
                <Modal.Body>
                    <div className="grid grid-cols-3 gap-4 py-5">
                        <div className="col-span-1 flex flex-col gap-4 border-e">
                            <h3 className="text-center font-bold underline text-lg">
                                Data
                            </h3>
                            <table
                                className="w-full text-left -mt-2"
                                cellPadding={5}
                            >
                                <tbody>
                                    <tr>
                                        <th width="20%">Periode</th>
                                        <td width="3%">:</td>
                                        <td>
                                            {monthNumberToIndonesian(
                                                data?.bulan
                                            )}{" "}
                                            {data?.tahun}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Pengaju</th>
                                        <td width="3%">:</td>
                                        <td>{data?.user?.name}</td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Kategori</th>
                                        <td width="3%">:</td>
                                        <td>{data?.kategori?.nama}</td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Judul</th>
                                        <td width="3%">:</td>
                                        <td>{data?.judul}</td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Nominal</th>
                                        <td width="3%">:</td>
                                        <td>
                                            {data?.nominal
                                                ? formatRupiah(data?.nominal)
                                                : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Tipe</th>
                                        <td width="3%">:</td>
                                        <td>
                                            <Label
                                                variant={
                                                    data?.tipe == "cash"
                                                        ? "info"
                                                        : "success"
                                                }
                                            >
                                                {data?.tipe}
                                            </Label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Status</th>
                                        <td width="3%">:</td>
                                        <td>
                                            <Label
                                                variant={
                                                    data?.status == 0
                                                        ? "danger"
                                                        : data?.status == 1
                                                        ? "success"
                                                        : "warning"
                                                }
                                            >
                                                {data?.status == 0
                                                    ? "reject"
                                                    : data?.status == 1
                                                    ? "accept"
                                                    : "waiting"}
                                            </Label>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th width="20%">Deskripsi</th>
                                        <td width="3%">:</td>
                                        <td>{data?.deskripsi}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-span-1 flex flex-col gap-4 border-e pe-4">
                            <h3 className="text-center font-bold underline text-lg mb-1">
                                Log
                            </h3>
                            {data?.logs ? (
                                data?.logs.map((log) => (
                                    <div
                                        key={log.id}
                                        className={clsx(
                                            log.status == 2
                                                ? "border-warning"
                                                : log.status == 1
                                                ? "border-success"
                                                : "border-danger",
                                            "border flex flex-col"
                                        )}
                                    >
                                        <div
                                            className={clsx(
                                                log.status == 2
                                                    ? "bg-warning"
                                                    : log.status == 1
                                                    ? "bg-success"
                                                    : "bg-danger",
                                                "flex justify-center items-center w-full p-1 text-xs"
                                            )}
                                        >
                                            {log.status == 2 ? (
                                                <span className="text-white">
                                                    <i className="bi bi-clock me-1"></i>{" "}
                                                    Mengajukan
                                                </span>
                                            ) : log.status == 1 ? (
                                                <span className="text-white">
                                                    <i className="bi bi-check-circle me-1"></i>{" "}
                                                    Accept
                                                </span>
                                            ) : (
                                                <span className="text-white">
                                                    <i className="bi bix-circle me-1"></i>{" "}
                                                    Reject
                                                </span>
                                            )}
                                        </div>
                                        <div className="border-warning p-2">
                                            <div className="flex justify-between items-center">
                                                <NameWithAvatar
                                                    avatar={
                                                        log.user.foto
                                                            ? `/images/${log.user.foto}`
                                                            : log.user.foto
                                                    }
                                                    avatarSize="xs"
                                                    name={log.user.name}
                                                    className="text-xs"
                                                />
                                                <span className="text-[10px] text-gray-400">
                                                    {diffForHumans(
                                                        log.created_at
                                                    )}
                                                </span>
                                            </div>
                                            <p className="border-t pt-2 mt-2 text-xs">
                                                {log.pesan}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>Tidak ada log</div>
                            )}
                        </div>
                        <div className="col-span-1 flex flex-col gap-4 ">
                            <h3 className="text-center font-bold underline text-lg mb-1">
                                Konfirmasi
                            </h3>
                            <FormGroup>
                                <FormLabel
                                    name="Status"
                                    htmlFor="status"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="status"
                                    name="status"
                                    onChange={handleChange}
                                    value={formData.status}
                                    isError={errors?.status}
                                    required
                                >
                                    <option value="">Pilih Status</option>
                                    {status.map((stat) => (
                                        <option
                                            key={stat.value}
                                            value={stat.value}
                                        >
                                            {stat.label}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.status} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Pesan"
                                    htmlFor="pesan"
                                />
                                <FormTextarea
                                    size="sm"
                                    id="pesan"
                                    name="pesan"
                                    onChange={handleChange}
                                    defaultValue={formData.pesan}
                                    placeholder="Tulis Pesan..."
                                    isError={errors?.pesan}
                                    rows="3"
                                />
                                <FormError message={errors?.pesan} />
                            </FormGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <RegularSubmitModal
                        closeModal={closeModal}
                        label="Konfirmasi"
                        disabled={processing || !formData.status}
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PerencanaanConfirm;
