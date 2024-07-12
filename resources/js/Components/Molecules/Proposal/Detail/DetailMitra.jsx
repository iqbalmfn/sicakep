import AlertContent from "@/Components/Atoms/AlertContent";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import { formatRupiah } from "@/Utils/GlobalFunction";
import React from "react";

const DetailMitra = ({ tahun, mitras, isHideFile = false }) => {
    const dataRender = () => {
        return mitras.length > 0 ? (
            mitras.map((mitra) => (
                <Table.TrBody key={mitra.id}>
                    <Table.Td>{mitra.pimpinan}</Table.Td>
                    <Table.Td>{mitra.nama}</Table.Td>
                    <Table.Td>{mitra.alamat}</Table.Td>
                    <Table.Td>{mitra.email ? mitra.email : "-"}</Table.Td>
                    {isHideFile ? null : (
                        <Table.Td>
                            {mitra.surat_kesanggupan ? (
                                <a
                                    href={`/storage/proposal/mitra/${mitra.surat_kesanggupan}`}
                                    target="_blank"
                                    className="text-primary underline"
                                >
                                    Download
                                </a>
                            ) : (
                                "-"
                            )}
                        </Table.Td>
                    )}
                    {[...Array(tahun).keys()].map((tahun) => (
                        <Table.Td key={tahun}>
                            {mitra.dana > 0 ? formatRupiah(mitra.dana, true) : '-'}
                        </Table.Td>
                    ))}
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty
                colSpan={5 + [...Array(tahun)].length}
                text="Tidak ada mitra"
            />
        );
    };

    return (
        <div className="flex flex-col">
            <AlertContent title="Mitra" color="--color-info" className="mb-5" />

            <Table>
                <Table.Thead>
                    <Table.TrHead>
                        <Table.Th height={32} width="10">
                            nama mitra
                        </Table.Th>
                        <Table.Th height={32} width="10">
                            institusi
                        </Table.Th>
                        <Table.Th height={32} width="20">
                            alamat institusi
                        </Table.Th>
                        <Table.Th height={32} width="10">
                            surel
                        </Table.Th>
                        {isHideFile ? null : (
                            <Table.Th height={32} width="10">
                                surat kesanggupan
                            </Table.Th>
                        )}
                        {[...Array(tahun).keys()].map((tahun) => (
                            <Table.Th height={32} key={tahun}>
                                {`Dana Thn ${tahun + 1}`}
                            </Table.Th>
                        ))}
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default DetailMitra;
