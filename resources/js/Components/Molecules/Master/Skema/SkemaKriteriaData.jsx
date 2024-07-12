import TableEmpty from "@/Components/Atoms/TableEmpty";
import Table from "@/Components/Organisms/Table";
import React from "react";
import ActionButton from "../../ActionButton";
import { handleDelete } from "@/Utils/GlobalFunction";

const SkemaKriteriaData = ({ data, handleEditModal }) => {
    // Fungsi untuk menghitung total bobot
    const getTotalBobot = () => {
        return data.reduce((total, kriteria) => {
            const sumButir = kriteria.butir.reduce((sum, butir) => sum + butir.bobot, 0);
            return parseInt(total) + parseInt(sumButir);
        }, 0);
    };

    const dataRender = () => {
        return data.length > 0 ? (
            data.map((kriteria, i) => (
                <Table.TrBody key={i}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{kriteria.kriteria}</Table.Td>
                    <Table.Td colSpan={2}>
                        <div className="flex flex-col gap-1">
                            {kriteria.butir.map((butir, i) => (
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <span>{i + 1}.</span>
                                        <span>{butir.butir}</span>
                                    </div>
                                    <span className="me-1">{butir.bobot}</span>
                                </div>
                            ))}
                        </div>
                    </Table.Td>
                    <Table.Td className="text-end pe-3" nowrap>
                        <ActionButton
                            variant="info"
                            icon="pencil"
                            label="Edit"
                            onClick={() => handleEditModal(kriteria)}
                        />
                        <ActionButton
                            variant="danger"
                            icon="trash"
                            label="Hapus"
                            onClick={() =>
                                handleDelete(
                                    "master.skema-kriteria.destroy",
                                    kriteria.id,
                                    "Data berhasil dihapus"
                                )
                            }
                        />
                    </Table.Td>
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
                    <Table.Th width="5">no</Table.Th>
                    <Table.Th width="30">kriteria penilaian</Table.Th>
                    <Table.Th width="50">butir penilaian</Table.Th>
                    <Table.Th width="5" align="end">
                        bobot
                    </Table.Th>
                    <Table.Th align="end" width="10">
                        <span className="me-3">opsi</span>
                    </Table.Th>
                </Table.TrHead>
            </Table.Thead>
            <Table.Tbody>{dataRender()}</Table.Tbody>
            <tfoot className="font-semibold text-[16px]">
                <tr>
                    <td colSpan={2}></td>
                    <td className="ps-3 pt-3">Jumlah</td>
                    <td className="text-end pe-1">{getTotalBobot()}</td>
                    <td></td>
                </tr>
            </tfoot>
        </Table>
    );
};

export default SkemaKriteriaData;
