import Label from "@/Components/Atoms/Label";
import Modal from "@/Components/Atoms/Modal";
import { formatDateWithDay, formatRupiah } from "@/Utils/GlobalFunction";

const UtangDetail = ({ title, showModal, closeModal, data }) => {
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
                                    <th width="25%">Jatuh Tempo</th>
                                    <td width="3%">:</td>
                                    <td>
                                        {formatDateWithDay(data?.jatuh_tempo)}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="25%">Donatur</th>
                                    <td width="3%">:</td>
                                    <td>{data?.user?.name}</td>
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
                                                data?.tipe == "utang"
                                                    ? "danger"
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
                                    <th width="20%">Status</th>
                                    <td width="3%">:</td>
                                    <td>
                                        <Label
                                            variant={
                                                data.status == 0
                                                    ? "danger"
                                                    : "success"
                                            }
                                        >
                                            {data?.status == 0
                                                ? "Belum Lunas"
                                                : "Lunas"}
                                        </Label>
                                    </td>
                                </tr>
                                {data?.status == 1 ? (
                                    <tr>
                                        <th width="20%">Tanggal Pelunasan</th>
                                        <td width="3%">:</td>
                                        <td>
                                            {formatDateWithDay(data?.updated_at)}
                                        </td>
                                    </tr>
                                ) : null}
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

export default UtangDetail;
