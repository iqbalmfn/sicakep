import AlertContent from "@/Components/Atoms/AlertContent";
import Table from "@/Components/Organisms/Table";
import { formatRupiah } from "@/Utils/GlobalFunction";

const DetailAnggaran = ({ anggarans, dana = [], isPerbaikan = false }) => {
    // grouping RAB berdasarkan tahun
    const groupedObject = anggarans.reduce((accumulator, currentValue) => {
        const key = `Tahun ${currentValue.tahun}`;
        if (!accumulator[key]) {
            accumulator[key] = [];
        }
        accumulator[key].push(currentValue);
        return accumulator;
    }, {});

    const groupedAnggaran = Object.entries(groupedObject).map(
        ([key, value]) => ({
            tahun: key,
            data: value,
        })
    );
    // end : grouping RAB berdasarkan tahun

    // menghitung total RAB
    const totalAllAnggaran = groupedAnggaran.reduce((totalAcc, currGroup) => {
        const totalForCurrentGroup = currGroup.data.reduce(
            (groupAcc, currAnggaran) => groupAcc + currAnggaran.total,
            0
        );
        return totalAcc + totalForCurrentGroup;
    }, 0);
    // end : mengitung total RAB

    const dataRender = (groupAnggaran) => {
        const totalAnggaran = groupAnggaran.reduce(
            (acc, curr) => acc + curr.total,
            0
        );

        return (
            <>
                <Table.Tbody>
                    {groupAnggaran.map((anggaran, i) => {
                        return (
                            <Table.TrBody key={i}>
                                <Table.Td>{anggaran.kelompok}</Table.Td>
                                <Table.Td>{anggaran.komponen}</Table.Td>
                                <Table.Td>{anggaran.item}</Table.Td>
                                <Table.Td>{anggaran.satuan}</Table.Td>
                                <Table.Td align="center">
                                    {anggaran.volume}
                                </Table.Td>
                                <Table.Td align="end">
                                    {formatRupiah(anggaran.harga, true)}
                                </Table.Td>
                                <Table.Td align="end">
                                    {formatRupiah(anggaran.total, true)}
                                </Table.Td>
                            </Table.TrBody>
                        );
                    })}
                </Table.Tbody>
                <tfoot>
                    <tr>
                        <td colSpan={6} className="p-3 font-semibold">
                            Total Anggaran
                        </td>
                        <td className="ps-3 font-semibold text-end">
                            {formatRupiah(totalAnggaran, true)}
                        </td>
                    </tr>
                </tfoot>
            </>
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <AlertContent
                title="Rencana Anggaran Biaya"
                color="--color-info"
                className="mb-5"
            />

            <div className="-mt-5">
                <span className="border border-info rounded-lg text-info px-3 py-2 w-auto font-extrabold">
                    Total RAB {groupedAnggaran.length} Tahun{" "}
                    {formatRupiah(totalAllAnggaran, true)}
                </span>
            </div>
            {groupedAnggaran.map((groupAnggaran, i) => {
                let danaDisetujui = null;
                const tahunAngka = groupAnggaran.tahun.replace(
                    /^Tahun\s+/i,
                    ""
                );
                if (dana.length > 0) {
                    const danaProposal = dana.find(
                        (dn) => dn.tahun == tahunAngka
                    );
                    danaDisetujui = danaProposal.dana;
                }

                return (
                    <div key={i} className="flex flex-col gap-3">
                        <span className="font-semibold">
                            {groupAnggaran.tahun}{" "}
                            {isPerbaikan ? (
                                <span className="text-success font-semibold italic">
                                    (Dana Disetujui :{" "}
                                    {formatRupiah(danaDisetujui, true)})
                                </span>
                            ) : null}
                        </span>
                        <Table>
                            <Table.Thead>
                                <Table.TrHead className="text-xs">
                                    <Table.Th height={32} width="20">
                                        kelompok
                                    </Table.Th>
                                    <Table.Th height={32} width="25">
                                        komponen
                                    </Table.Th>
                                    <Table.Th height={32} width="25">
                                        item
                                    </Table.Th>
                                    <Table.Th height={32} width="7">
                                        satuan
                                    </Table.Th>
                                    <Table.Th
                                        align="center"
                                        height={32}
                                        width="3"
                                    >
                                        volume
                                    </Table.Th>
                                    <Table.Th height={32} width="10" align="end">
                                        harga satuan
                                    </Table.Th>
                                    <Table.Th height={32} width="10" align="end">
                                        total
                                    </Table.Th>
                                </Table.TrHead>
                            </Table.Thead>
                            {dataRender(groupAnggaran.data)}
                        </Table>
                    </div>
                );
            })}
        </div>
    );
};

export default DetailAnggaran;
