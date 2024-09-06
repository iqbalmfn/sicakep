import Icon from "@/Components/Atoms/Icon";
import Label from "@/Components/Atoms/Label";
import Modal from "@/Components/Atoms/Modal";
import { formatDateWithDay, formatRupiah } from "@/Utils/GlobalFunction";
import clsx from "clsx";

const PiutangDetail = ({ title, showModal, closeModal, data }) => {
    const totalSudahDibayar = Array.isArray(data.piutang_detail)
        ? data.piutang_detail.reduce(
              (total, detail) => total + detail.nominal,
              0
          )
        : 0;
    return (
        <Modal
            maxWidth="3xl"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>Detail {title}</Modal.Header>

            <Modal.Body>
                <div className="grid grid-cols-2 gap-4 py-5">
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
                                    <th width="40%">Donatur</th>
                                    <td width="3%">:</td>
                                    <td>{data?.user?.name}</td>
                                </tr>
                                <tr>
                                    <th width="40%">Peminjam</th>
                                    <td width="3%">:</td>
                                    <td>{data?.nama}</td>
                                </tr>
                                <tr>
                                    <th width="40%">Nominal</th>
                                    <td width="3%">:</td>
                                    <td>
                                        {data?.nominal
                                            ? formatRupiah(data?.nominal)
                                            : "-"}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="40%">Sudah Dibayar</th>
                                    <td width="3%">:</td>
                                    <td>{formatRupiah(totalSudahDibayar)}</td>
                                </tr>
                                <tr>
                                    <th width="20%">Status</th>
                                    <td width="3%">:</td>
                                    <td>
                                        <Label
                                            variant={
                                                data?.nominal <=
                                                totalSudahDibayar
                                                    ? "success"
                                                    : "danger"
                                            }
                                        >
                                            {data?.nominal <= totalSudahDibayar
                                                ? "Lunas"
                                                : "Belum Lunas"}
                                        </Label>
                                    </td>
                                </tr>
                                <tr>
                                    <th width="20%">Tanggal Meminjam</th>
                                    <td width="3%">:</td>
                                    <td>{formatDateWithDay(data?.tanggal)}</td>
                                </tr>
                                <tr>
                                    <th width="28%">Janji Bayar</th>
                                    <td width="3%">:</td>
                                    <td>
                                        {data?.jatuh_tempo ? (
                                            formatDateWithDay(data.jatuh_tempo)
                                        ) : (
                                            <Label variant="info">
                                                Tidak Ditentukan
                                            </Label>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th width="20%">Deskripsi</th>
                                    <td width="3%">:</td>
                                    <td>
                                        {data?.deskripsi ? data.deskripsi : "-"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="col-span-1 flex flex-col gap-4 border-e">
                        <h3 className="text-center font-bold underline text-lg">
                            Transaksi Pelunasan
                        </h3>
                        {data.piutang_detail?.length > 0 ? (
                            data.piutang_detail.map((detail) => (
                                <div
                                    key={detail.id}
                                    className={clsx(
                                        detail.status == 1
                                            ? "border-success"
                                            : "border-danger",
                                        "border  flex flex-col mx-5"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            detail.status == 1
                                                ? "bg-success"
                                                : "bg-danger",
                                            "flex justify-center items-center w-full p-1 text-xs"
                                        )}
                                    >
                                        {detail.status == 1 ? (
                                            <span className="text-white">
                                                <i className="bi bi-check-circle me-1"></i>{" "}
                                                Lunas
                                            </span>
                                        ) : (
                                            <span className="text-white">
                                                <i className="bi bix-circle me-1"></i>{" "}
                                                Belum Lunas
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1 p-2 text-xs">
                                        <div className="flex gap-3">
                                            <Icon icon="info-circle" />
                                            <span>{detail.judul}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <Icon icon="calendar" />
                                            <span>
                                                {formatDateWithDay(
                                                    detail.jatuh_tempo
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex gap-3">
                                            <Icon icon="currency-dollar" />
                                            <span>
                                                {detail.nominal
                                                    ? formatRupiah(
                                                          detail.nominal
                                                      )
                                                    : "-"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div class="flex items-center justify-center h-[100px] border border-danger rounded-lg mx-5">
                                <div class="text-center text-danger">
                                    Belum ada transaksi
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PiutangDetail;
