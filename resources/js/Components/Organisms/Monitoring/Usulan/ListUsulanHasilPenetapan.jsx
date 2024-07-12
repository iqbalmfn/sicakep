import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import MonitoringUsulanDataItem from "@/Components/Atoms/MonitoringUsulanDataItem";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import { getSerialNumber, ucwords } from "@/Utils/GlobalFunction";
import DataTable from "../../DataTable";
import Table from "../../Table";
import UseUsulanListHasilPenetapan from "@/Hooks/Pengawasan/UseUsulanListHasilPenetapan";
import ModalDetailListUsulanHasilPenetapan from "./Modals/ModalDetailListUsulanHasilPenetapan";

const ListUsulanHasilPenetapan = ({
    datas,
    filtered,
    setParams,
    setFetching,
    onHandleFilter,
}) => {

    const { mode, showModal, handleShowModal, handleCloseModal, data } =
        UseUsulanListHasilPenetapan();

    const dataHeader = () => {
        return (
            <Table.TrHead>
                <Table.Th width="3">no</Table.Th>
                <Table.Th width="20">Pengusul</Table.Th>
                <Table.Th width="47">Usulan Penelitian</Table.Th>
                <Table.Th align="center" width="15">
                    seleksi administrasi
                </Table.Th>
                <Table.Th align="center" width="15">
                    seleksi substansi
                </Table.Th>
            </Table.TrHead>
        );
    };

    const dataRender = () => {
        return datas.total > 0 ? (
            datas.data.map((data, i) => {
                const jumlahAnggota =
                    data.anggota_dosen.length +
                    data.anggota_mahasiswa.length +
                    data.anggota_eksternals.length;

                const seleksiAdminstrasiLabel = (data) => {
                    let color, label;
                    if (data == 1) {
                        color = "success";
                        label = "Lolos";
                    } else if (data == 0) {
                        color = "danger";
                        label = "Tidak Lolos";
                    } else {
                        color = "gray-400";
                        label = "Belum Diseleksi";
                    }

                    return (
                        <span
                            className={`px-3 py-1 bg-${color} text-xs text-white rounded-lg`}
                        >
                            {label}
                        </span>
                    );
                };

                const seleksiSubstansiLabel = (data) => {
                    let color, label;
                    if ([7, 73].includes(data)) {
                        color = "success";
                        label = "Didanai";
                    } else if ([71].includes(data)) {
                        color = "danger";
                        label = "Tidak Didanai";
                    } else {
                        color = "gray-400";
                        label = "Belum Penetapan";
                    }

                    return (
                        <span
                            className={`px-3 py-1 bg-${color} text-xs text-white rounded-lg`}
                        >
                            {label}
                        </span>
                    );
                };

                return (
                    <Table.TrBody key={data.id}>
                        <Table.Td>
                            {getSerialNumber(
                                datas.current_page,
                                datas.per_page,
                                i
                            )}
                        </Table.Td>
                        <Table.Td>
                            <div className="flex flex-col">
                                <MonitoringUsulanDataItem
                                    label="Jenis"
                                    value={ucwords(data.jenis)}
                                />
                                <MonitoringUsulanDataItem
                                    label="Ketua"
                                    value={data.lecturer_name.nama_lengkap}
                                />
                                <MonitoringUsulanDataItem
                                    label="Lama Kegiatan"
                                    value={`${data.skema_name.tahun} Tahun`}
                                />
                                <MonitoringUsulanDataItem
                                    label="Jumlah Anggota"
                                    value={`${jumlahAnggota} Orang`}
                                />
                            </div>
                        </Table.Td>
                        <Table.Td>
                            <div className="flex flex-col">
                                <span className="font-semibold text-primary">
                                    {data.judul}
                                </span>
                                <span className="text-secondary">
                                    {data.skema_name.nama}
                                </span>
                                <div className="mt-1">
                                    {seleksiSubstansiLabel(data.status)}
                                </div>
                            </div>
                        </Table.Td>
                        <Table.Td align="center">
                            <div className="flex flex-col gap-2">
                                <div>
                                    {seleksiAdminstrasiLabel(
                                        data.konfirmasi_administrasi
                                            ?.is_approved
                                    )}
                                </div>
                                <div>
                                    <Button
                                        variant="primary"
                                        size="xs"
                                        onClick={() =>
                                            handleShowModal(
                                                "administrasi",
                                                data
                                            )
                                        }
                                    >
                                        <Icon icon="search" me={2} /> Detail
                                    </Button>
                                </div>
                            </div>
                        </Table.Td>
                        <Table.Td align="center">
                            <div className="flex flex-col gap-2">
                                <div>{seleksiSubstansiLabel(data.status)}</div>
                                <div>
                                    <Button
                                        variant="primary"
                                        size="xs"
                                        onClick={() =>
                                            handleShowModal("substansi", data)
                                        }
                                    >
                                        <Icon icon="search" me={2} /> Detail
                                    </Button>
                                </div>
                            </div>
                        </Table.Td>
                    </Table.TrBody>
                );
            })
        ) : (
            <TableEmpty colSpan={5} />
        );
    };

    return (
        <>
            <DataTable>
                <Table>
                    <Table.Thead>{dataHeader()}</Table.Thead>
                    <Table.Tbody>{dataRender()}</Table.Tbody>
                </Table>
                <DataTable.Footer
                    data={datas}
                    params={filtered}
                    setParams={setParams}
                    setFetching={setFetching}
                    onChange={onHandleFilter}
                />
            </DataTable>

            <ModalDetailListUsulanHasilPenetapan
                showModal={showModal}
                closeModal={handleCloseModal}
                data={data}
                mode={mode}
            />
        </>
    );
};

export default ListUsulanHasilPenetapan;
