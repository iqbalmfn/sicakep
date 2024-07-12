import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import { formatRupiah, handleDeleteWithParams } from "@/Utils/GlobalFunction";
import { usePage } from "@inertiajs/react";
import ActionButton from "../ActionButton";

const ProfilDataPenelitian = ({ datas }) => {
    const { auth } = usePage().props;

    const dataRender = () => {
        const personils = (lists) => {
            return lists ? lists.split(";") : null;
        };

        const personilsRender = (lists) => {
            return (
                <ol>
                    {lists && lists.length > 0
                        ? personils(lists).map((personil, i) => (
                              <li key={i}>
                                  {i + 1}. {personil}
                              </li>
                          ))
                        : null}
                </ol>
            );
        };
        return datas.length > 0 ? (
            datas.map((data, i) => (
                <Table.TrBody key={i} className="text-xs">
                    <Table.Td>{data.judul}</Table.Td>
                    <Table.Td>{data.tahun}</Table.Td>
                    <Table.Td>
                        {data.personil_ketua == auth.user.name
                            ? "Ketua"
                            : "Anggota"}
                    </Table.Td>
                    <Table.Td>{data.personil_ketua}</Table.Td>
                    <Table.Td>
                        {personilsRender(data.personil_anggota)}
                    </Table.Td>
                    <Table.Td>{data.sumber_dana}</Table.Td>
                    <Table.Td align="end" className="pe-2">
                        {formatRupiah(data.jumlah_dana)}
                    </Table.Td>
                    {auth.user.lecturer?.id === data.lecturer_id ? (
                        <Table.Td>
                            <ActionButton
                                variant="danger"
                                icon="trash"
                                label="Hapus"
                                className="py-1.5"
                                onClick={() =>
                                    handleDeleteWithParams(
                                        "profil.delete-data",
                                        {
                                            jenis: "penelitian",
                                            id: data.id,
                                        },
                                        "Data berhasil dihapus",
                                        true
                                    )
                                }
                            />
                        </Table.Td>
                    ) : null}
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={5} />
        );
    };
    return (
        <Table>
            <Table.Thead>
                <Table.TrHead>
                    <Table.Th height={25} width={30}>
                        judul
                    </Table.Th>
                    <Table.Th height={25} width={5}>
                        tahun
                    </Table.Th>
                    <Table.Th height={25} width={5}>
                        posisi
                    </Table.Th>
                    <Table.Th height={25} width={15}>
                        ketua
                    </Table.Th>
                    <Table.Th height={25} width={15}>
                        anggota
                    </Table.Th>
                    <Table.Th height={25} width={10} nowrap>
                        sumber dana
                    </Table.Th>
                    <Table.Th
                        height={15}
                        width={15}
                        align="end"
                        className="pe-2"
                        nowrap
                    >
                        jumlah dana
                    </Table.Th>
                    {auth.user.lecturer?.id === datas[0]?.lecturer_id ? (
                        <Table.Th></Table.Th>
                    ) : null}
                </Table.TrHead>
            </Table.Thead>
            <Table.Tbody>{dataRender()}</Table.Tbody>
        </Table>
    );
};

export default ProfilDataPenelitian;
