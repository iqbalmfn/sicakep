import SectionTitle from "@/Components/Atoms/SectionTitle";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import { formatDate, formatRupiah } from "@/Utils/GlobalFunction";
import Table from "../../Table";

const CatatanHarian = ({ datas }) => {
    const logs = datas.catatan_harian.find(
        (log) => log.tahun_pelaksanaan == datas.tahun_pelaksanaan
    ).lists;

    const dataRender = () => {
        return logs.length > 0 ? (
            logs.map((data, i) => (
                <Table.TrBody key={i}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{formatDate(data.tanggal)}</Table.Td>
                    <Table.Td>{data.uraian_kegiatan}</Table.Td>
                    <Table.Td align="center">{data.persentase}%</Table.Td>
                    {/* <Table.Td align="center">{data.documents.length}</Table.Td>
                    <Table.Td align="center">{data.no_berkas}</Table.Td> */}
                    <Table.Td>{data.kelompok_anggaran.kelompok}</Table.Td>
                    <Table.Td>{formatRupiah(data.nominal, true)}</Table.Td>
                    {/* <Table.Td className="text-end pe-3" nowrap>
                        <ActionButton
                            variant="info"
                            icon="pencil"
                            label="Edit"
                            // onClick={() => handleEditModal(data)}
                        />
                    </Table.Td> */}
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={9} />
        );
    };

    return (
        <div>
            <div className="mb-8">
                <SectionTitle title="Catatan Harian" />
            </div>

            <Table className="text-xs">
                <Table.Thead>
                    <Table.TrHead>
                        <Table.Th width="3">no</Table.Th>
                        <Table.Th width="10">tanggal</Table.Th>
                        <Table.Th width="27">kegiatan</Table.Th>
                        <Table.Th width="5" align="center">
                            persentase
                        </Table.Th>
                        {/* <Table.Th width="8" align="center">
                            total berkas
                        </Table.Th>
                        <Table.Th width="6" align="center">
                            no berkas
                        </Table.Th> */}
                        <Table.Th width="15">kelompok biaya</Table.Th>
                        <Table.Th width="10">nominal</Table.Th>
                        {/* <Table.Th align="end" width="5">
                            <span className="me-3">detail</span>
                        </Table.Th> */}
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default CatatanHarian;
