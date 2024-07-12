import AlertContent from "@/Components/Atoms/AlertContent";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import { formatText } from "@/Utils/GlobalFunction";

const DetailAnggotaMahasiswa = ({ students }) => {
    const dataRender = () => {
        return students.length > 0 ? (
            students.map((student) => (
                <Table.TrBody key={student.id}>
                    <Table.Td>{student.student.nim}</Table.Td>
                    <Table.Td>{student.student.nama}</Table.Td>
                    <Table.Td>{student.student.studyprogram.name}</Table.Td>
                    <Table.Td>Mahasiswa Bimbingan</Table.Td>
                    <Table.Td>
                        {student.bidang_tugas
                            ? formatText(student.bidang_tugas)
                            : "-"}
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={4} text="Tidak ada anggota mahasiswa" />
        );
    };

    return (
        <div className="flex flex-col">
            <AlertContent
                title="Anggota Usulan Mahasiswa"
                color="--color-info"
                className="mb-5"
            />
            <Table>
                <Table.Thead>
                    <Table.TrHead>
                        <Table.Th width="10">nim</Table.Th>
                        <Table.Th width="15">nama anggota</Table.Th>
                        <Table.Th width="15">program studi</Table.Th>
                        <Table.Th width="12">peran</Table.Th>
                        <Table.Th width="53">uraian tugas</Table.Th>
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default DetailAnggotaMahasiswa;
