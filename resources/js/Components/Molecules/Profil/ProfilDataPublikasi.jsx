import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import ActionButton from "../ActionButton";
import { handleDeleteWithParams } from "@/Utils/GlobalFunction";
import { usePage } from "@inertiajs/react";

const ProfilDataPublikasi = ({ datas }) => {
    const { auth } = usePage().props;

    const akreditasiJurnal = (akreditasi, judul) => {
        let label;
        let color;
        if (akreditasi !== null && akreditasi.includes("Q4") !== false) {
            label = "Q4";
            color = "#fd7e14";
        } else if (akreditasi !== null && akreditasi.includes("Q3") !== false) {
            label = "Q3";
            color = "#ffc107";
        } else if (akreditasi !== null && akreditasi.includes("Q2") !== false) {
            label = "Q2";
            color = "#cbf542";
        } else if (akreditasi !== null && akreditasi.includes("Q1") !== false) {
            label = "Q1";
            color = "#8df037";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("no-Q") !== false
        ) {
            label = "no-Q";
            color = "#e4e6ef";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("Sinta 5") !== false
        ) {
            label = "S5";
            color = "#fd7e14";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("Sinta 4") !== false
        ) {
            label = "S4";
            color = "#ffc107";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("Sinta 3") !== false
        ) {
            label = "S3";
            color = "#ede42f";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("Sinta 2") !== false
        ) {
            label = "S2";
            color = "#cbf542";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("Sinta 1") !== false
        ) {
            label = "S1";
            color = "#8df037";
        } else if (
            akreditasi !== null &&
            akreditasi.includes("No-Q") !== false
        ) {
            label = "no-Q";
            color = "#e4e6ef";
        } else {
            label = "?";
            color = "#e4e6ef";
        }

        return (
            <div className="flex justify-start gap-3 items-center">
                <div className="w-[40px] h-[40px]">
                    <div
                        className="w-[40px] h-[40px] flex justify-center items-center rounded-full font-semibold text-gray-600"
                        style={{ backgroundColor: color }}
                    >
                        {label}
                    </div>
                </div>
                <span>{judul}</span>
            </div>
        );
    };

    const sumberJurnal = (sumber) => {
        return (
            <div className="border rounded-lg w-[100px] p-2 flex justify-center items-center gap-2">
                <img
                    src={`/images/icon_${sumber.toLowerCase()}.png`}
                    width={18}
                    alt={sumber}
                />
                <span>{sumber}</span>
            </div>
        );
    };

    const dataRender = () => {
        return datas.length > 0 ? (
            datas.map((data, i) => (
                <Table.TrBody key={i} className="text-xs">
                    <Table.Td>
                        {akreditasiJurnal(data.akreditasi, data.judul)}
                    </Table.Td>
                    <Table.Td>{data.jurnal}</Table.Td>
                    <Table.Td>{data.posisi}</Table.Td>
                    <Table.Td>{data.tahun}</Table.Td>
                    <Table.Td>{sumberJurnal(data.sumber)}</Table.Td>
                    <Table.Td align="center" nowrap>
                        <a href={data.link} target="_blank">
                            <Button variant="primary" size="sm">
                                <Icon icon="download" className="me-2" /> Unduh
                            </Button>
                        </a>
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
                                            jenis: "publikasi",
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
            <TableEmpty colSpan={6} />
        );
    };
    return (
        <Table>
            <Table.Thead>
                <Table.TrHead>
                    <Table.Th height={25} width={35}>
                        judul
                    </Table.Th>
                    <Table.Th height={25} width={30} nowrap>
                        nama jurnal
                    </Table.Th>
                    <Table.Th height={25} width={10}>
                        posisi
                    </Table.Th>
                    <Table.Th height={25} width={5}>
                        tahun
                    </Table.Th>
                    <Table.Th height={25} width={10}>
                        sumber
                    </Table.Th>
                    <Table.Th height={25} width={10} align="center">
                        file
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

export default ProfilDataPublikasi;
