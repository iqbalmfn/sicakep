import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import MonitoringUsulanDataItem from "@/Components/Atoms/MonitoringUsulanDataItem";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import { getSerialNumber, ucwords } from "@/Utils/GlobalFunction";
import DataTable from "../../DataTable";
import Table from "../../Table";

const ListUsulanRegular = ({
    datas,
    filtered,
    setParams,
    setFetching,
    onHandleFilter,
}) => {
    const dataHeader = () => {
        return (
            <Table.TrHead>
                <Table.Th width="3">no</Table.Th>
                <Table.Th width="30">Pengusul</Table.Th>
                <Table.Th width="52">Usulan</Table.Th>
                <Table.Th align="center" width="15">
                    berkas
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
                            </div>
                        </Table.Td>
                        <Table.Td align="center">
                            <a
                                href={route("proposal.usulan.detail", {
                                    id: data.id,
                                    jenis: data.jenis,
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="primary" size="xs">
                                    <Icon icon="search" me={2} /> Detail
                                </Button>
                            </a>
                        </Table.Td>
                    </Table.TrBody>
                );
            })
        ) : (
            <TableEmpty colSpan={4} />
        );
    };

    return (
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
    );
};

export default ListUsulanRegular;
