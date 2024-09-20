import Label from "@/Components/Atoms/Label";
import Modal from "@/Components/Atoms/Modal";
import { formatDateWithDay, formatRupiah } from "@/Utils/GlobalFunction";

const PengeluaranDetail = ({ title, showModal, closeModal, data }) => {
    return (
        <Modal
            maxWidth="xl"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>Detail {title}</Modal.Header>

            <Modal.Body>
                <div className="grid grid-cols1 gap-4 py-5">
                    <div className="col-span-1 flex flex-col gap-4">
                        <table
                            className="w-full text-left -mt-2"
                            cellPadding={5}
                        >
                            <tbody>
                                <tr>
                                    <th width="25%">Tanggal</th>
                                    <td width="3%">:</td>
                                    <td>{formatDateWithDay(data?.tanggal)}</td>
                                </tr>
                                <tr>
                                    <th width="25%">Pengguna Dana</th>
                                    <td width="3%">:</td>
                                    <td>{data?.user?.name}</td>
                                </tr>
                                <tr>
                                    <th width="25%">Kategori</th>
                                    <td width="3%">:</td>
                                    <td>{data?.kategori?.nama}</td>
                                </tr>
                                <tr>
                                    <th width="25%">Sub Kategori</th>
                                    <td width="3%">:</td>
                                    <td>{data?.perencanaan?.judul}</td>
                                </tr>
                                <tr>
                                    <th width="25%">Judul</th>
                                    <td width="3%">:</td>
                                    <td>{data?.judul}</td>
                                </tr>
                                <tr>
                                    <th width="25%">Nominal</th>
                                    <td width="3%">:</td>
                                    <td>
                                        {data?.nominal
                                            ? formatRupiah(data?.nominal)
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="25%">Tipe</th>
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
                                    <th width="20%">Jenis</th>
                                    <td width="3%">:</td>
                                    <td>
                                        <Label
                                            variant={
                                                data.jenis == "cash"
                                                    ? "info"
                                                    : "success"
                                            }
                                        >
                                            {data?.jenis}
                                        </Label>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="20%">Sesuai Anggaran</th>
                                    <td width="3%">:</td>
                                    <td>
                                        <Label
                                            variant={
                                                data.is_sesuai == 1
                                                    ? "success"
                                                    : "danger"
                                            }
                                        >
                                            {data?.is_sesuai
                                                ? "sesuai"
                                                : "tidak sesuai"}
                                        </Label>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="20%">Sumber</th>
                                    <td width="3%">:</td>
                                    <td>
                                        {data.rekening ? (
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`/storage/bank/${data.rekening?.bank?.logo}`}
                                                    alt="logo"
                                                    className="w-[50px]"
                                                />
                                                <span>
                                                    {
                                                        data.rekening
                                                            ?.nama_rekening
                                                    }
                                                </span>
                                            </div>
                                        ) : (
                                            "-"
                                        )}
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
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PengeluaranDetail;
