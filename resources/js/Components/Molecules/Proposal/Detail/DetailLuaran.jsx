import AlertContent from "@/Components/Atoms/AlertContent";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";

const DetailLuaran = ({ title, luarans }) => {
    const dataRender = () => {
        return luarans.length > 0 ? (
            luarans.map((luaran) => (
                <Table.TrBody key={luaran.id}>
                    <Table.Td align="center">{luaran.tahun}</Table.Td>
                    <Table.Td>{luaran.luaran_name.kategori}</Table.Td>
                    <Table.Td>{luaran.luaran_name.jenis}</Table.Td>
                    <Table.Td>{luaran.status}</Table.Td>
                    <Table.Td>
                        {luaran.laporan_luaran?.status
                            ? luaran.laporan_luaran?.status
                            : "-"}
                    </Table.Td>
                    <Table.Td>
                        {luaran.laporan_luaran?.file_luaran ? (
                            <a
                                href={`/storage/proposal_laporan/luaran/${luaran.laporan_luaran.file_luaran}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                            >
                                Download
                            </a>
                        ) : (
                            "-"
                        )}
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={5} text="Tidak ada data luaran" />
        );
    };

    return (
        <div className="flex flex-col">
            <AlertContent title={title} color="--color-info" className="mb-5" />
            <Table>
                <Table.Thead>
                    <Table.TrHead>
                        <Table.Th width="15" align="center">
                            urutan thn kegiatan
                        </Table.Th>
                        <Table.Th width="20">kelompok luaran</Table.Th>
                        <Table.Th width="35">jenis luaran</Table.Th>
                        <Table.Th width="10">target</Table.Th>
                        <Table.Th width="10">status</Table.Th>
                        <Table.Th width="10">berkas</Table.Th>
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default DetailLuaran;
