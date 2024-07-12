import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import ActionButton from "../ActionButton";
import { handleDeleteWithParams } from "@/Utils/GlobalFunction";
import { usePage } from "@inertiajs/react";

const ProfilDataHki = ({ datas }) => {
    const { auth } = usePage().props;

    const dataRender = () => {
        return datas.length > 0 ? (
            datas.map((data, i) => (
                <Table.TrBody key={i} className="text-xs">
                    <Table.Td>{data.judul}</Table.Td>
                    <Table.Td>{data.jenis}</Table.Td>
                    <Table.Td>{data.tahun}</Table.Td>
                    <Table.Td>{data.nomor}</Table.Td>
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
                                            jenis: "hki",
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
            <TableEmpty colSpan={4} />
        );
    };
    return (
        <Table>
            <Table.Thead>
                <Table.TrHead>
                    <Table.Th height={25} width={65}>
                        judul
                    </Table.Th>
                    <Table.Th height={25} width={15}>
                        jenis
                    </Table.Th>
                    <Table.Th height={25} width={5}>
                        tahun
                    </Table.Th>
                    <Table.Th height={25} width={15} nowrap>
                        nomor paten
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

export default ProfilDataHki;
