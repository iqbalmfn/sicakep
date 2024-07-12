import AlertContent from "@/Components/Atoms/AlertContent";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import { formatText } from "@/Utils/GlobalFunction";

const DetailAnggotaEksternal = ({ crews }) => {
    const dataRender = () => {
        return crews.length > 0 ? (
            crews.map((crew) => (
                <Table.TrBody key={crew.id}>
                    <Table.Td>{crew.no_identitas}</Table.Td>
                    <Table.Td>{crew.nama}</Table.Td>
                    <Table.Td>{crew.institusi}</Table.Td>
                    <Table.Td>Anggota Eksternal</Table.Td>
                    <Table.Td>
                        {crew.bidang_tugas
                            ? formatText(crew.bidang_tugas)
                            : "-"}
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={4} text="Tidak ada anggota eksternal" />
        );
    };

    return (
        <div className="flex flex-col">
            <AlertContent
                title="Anggota Usulan Eksternal"
                color="--color-info"
                className="mb-5"
            />
            <Table>
                <Table.Thead>
                    <Table.TrHead>
                        <Table.Th width="15">no identitas</Table.Th>
                        <Table.Th width="15">nama anggota</Table.Th>
                        <Table.Th width="15">institusi</Table.Th>
                        <Table.Th width="12">peran</Table.Th>
                        <Table.Th width="53">uraian tugas</Table.Th>
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default DetailAnggotaEksternal;
