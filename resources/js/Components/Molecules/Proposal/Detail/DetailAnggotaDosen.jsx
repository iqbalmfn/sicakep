import AlertContent from "@/Components/Atoms/AlertContent";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import { formatText } from "@/Utils/GlobalFunction";

const DetailAnggotaDosen = ({ lecturers }) => {
    const dataRender = () => {
        const statusApproved = (status) => {
            if (status === 1) {
                return (
                    <span className="bg-success text-white px-3 py-1 rounded text-xs">
                        Menyetujui
                    </span>
                );
            } else if (status === 0) {
                return (
                    <span className="bg-warning text-white px-3 py-1 rounded text-xs">
                        Belum Menyetujui
                    </span>
                );
            } else {
                return (
                    <span className="bg-danger text-white px-3 py-1 rounded text-xs">
                        Tidak Menyetujui
                    </span>
                );
            }
        };

        return lecturers.length > 0 ? (
            lecturers.map((lecturer) => (
                <Table.TrBody key={lecturer.id}>
                    <Table.Td>{lecturer.lecturer.nidn}</Table.Td>
                    <Table.Td>{lecturer.lecturer.nama_lengkap}</Table.Td>
                    <Table.Td>{lecturer.lecturer.studyprogram ? lecturer.lecturer.studyprogram?.name : '-'}</Table.Td>
                    <Table.Td>Anggota Pengusul</Table.Td>
                    <Table.Td>
                        {lecturer.bidang_tugas
                            ? formatText(lecturer.bidang_tugas)
                            : "-"}
                    </Table.Td>
                    <Table.Td>{statusApproved(lecturer.is_approved)}</Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={5} text="Tidak ada anggota dosen" />
        );
    };

    return (
        <div className="flex flex-col">
            <AlertContent title="Anggota Usulan Dosen" color="--color-info" className="mb-5" />
            <Table>
                <Table.Thead>
                    <Table.TrHead>
                        <Table.Th width="10">nidn</Table.Th>
                        <Table.Th width="15">nama anggota</Table.Th>
                        <Table.Th width="15">program studi</Table.Th>
                        <Table.Th width="12">peran</Table.Th>
                        <Table.Th width="34">uraian tugas</Table.Th>
                        <Table.Th width="19">status</Table.Th>
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default DetailAnggotaDosen;
