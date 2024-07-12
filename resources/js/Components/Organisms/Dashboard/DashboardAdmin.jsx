import FormSelectPrefix from "@/Components/Atoms/FormSelectPrefix";
import Icon from "@/Components/Atoms/Icon";
import MonitoringStatisticItem from "@/Components/Atoms/MonitoringStatisticItem";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import UseUsulan from "@/Hooks/Pengawasan/UseUsulan";
import { listYears, ucwords } from "@/Utils/GlobalFunction";
import Table from "../Table";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import clsx from "clsx";

const DashboardAdmin = ({ datas, filtered, roles }) => {
    const {
        // page controller
        params,
        onHandleFilter,
        jenisList,
    } = UseUsulan(filtered, "dashboard");

    const filterSection = () => {
        return (
            <div className="flex justify-start gap-2 -mb-2">
                <div className="bg-white rounded-lg">
                    <FormSelectPrefix
                        prefix={<Icon icon="tags" />}
                        size="sm"
                        name="jenis"
                        placeholder="Jenis Usulan"
                        value={params.jenis}
                        onChange={onHandleFilter}
                        className="w-[165px]"
                    >
                        <option value="">Jenis Usulan</option>
                        {jenisList.map((jenis) => (
                            <option key={jenis} value={jenis}>
                                {ucwords(jenis)}
                            </option>
                        ))}
                    </FormSelectPrefix>
                </div>
                <div className="bg-white rounded-lg">
                    <FormSelectPrefix
                        prefix={<Icon icon="calendar" />}
                        size="sm"
                        name="tahun"
                        value={params.tahun}
                        onChange={onHandleFilter}
                        className="w-[165px]"
                    >
                        {listYears().map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </FormSelectPrefix>
                </div>
            </div>
        );
    };

    const statisticSection = () => {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="col-span-1">
                    <MonitoringStatisticItem
                        title="Usulan Draft"
                        value={datas.statistik.draft}
                        icon="file-earmark-text"
                        color="gray-500"
                        params={{
                            kategori: "draft",
                            jenis: params.jenis,
                            tahun: params.tahun,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <MonitoringStatisticItem
                        title="Usulan Dikirim"
                        value={datas.statistik.dikirim}
                        icon="send"
                        color="info"
                        params={{
                            kategori: "dikirim",
                            jenis: params.jenis,
                            tahun: params.tahun,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <MonitoringStatisticItem
                        title="Usulan Belum Ditinjau"
                        value={datas.statistik.belumDitinjau}
                        icon="question-lg"
                        color="warning"
                        params={{
                            kategori: "belum-ditinjau",
                            jenis: params.jenis,
                            tahun: params.tahun,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <MonitoringStatisticItem
                        title="Usulan Disetujui LPPM"
                        value={datas.statistik.disetujuiLppm}
                        icon="check-circle"
                        color="success"
                        params={{
                            kategori: "disetujui-lppm",
                            jenis: params.jenis,
                            tahun: params.tahun,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <MonitoringStatisticItem
                        title="Usulan Ditolak LPPM"
                        value={datas.statistik.ditolakLppm}
                        icon="x-circle"
                        color="danger"
                        params={{
                            kategori: "ditolak-lppm",
                            jenis: params.jenis,
                            tahun: params.tahun,
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <MonitoringStatisticItem
                        title="Hasil Penetapan"
                        value={datas.statistik.review}
                        icon="pencil"
                        color="success"
                        params={{
                            kategori: "hasil-penetapan",
                            jenis: params.jenis,
                            tahun: params.tahun,
                        }}
                    />
                </div>
            </div>
        );
    };

    const rekapSection = () => {
        return (
            <div className="bg-white rounded-lg overflow-hidden">
                <Table>
                    <Table.Thead>
                        <Table.TrHead>
                            <Table.Th width="30">nama skema</Table.Th>
                            <Table.Th align="center" width="10">
                                draft
                            </Table.Th>
                            <Table.Th align="center" width="10">
                                dikirim
                            </Table.Th>
                            <Table.Th align="center" width="10">
                                belum ditinjau
                            </Table.Th>
                            <Table.Th align="center" width="10">
                                disetujui
                            </Table.Th>
                            <Table.Th align="center" width="10">
                                tidak disetujui
                            </Table.Th>
                            <Table.Th align="center" width="10">
                                lolos
                            </Table.Th>
                            <Table.Th align="center" width="10">
                                tidak lolos
                            </Table.Th>
                        </Table.TrHead>
                    </Table.Thead>
                    <Table.Tbody>
                        {datas.rekap.length > 0 ? (
                            datas.rekap.map((data, i) => (
                                <Table.TrBody key={i}>
                                    <Table.Td className="text-primary font-semibold">
                                        {data.skema}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.draft}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.dikirim}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.belumDitinjau}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.disetujuiLppm}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.ditolakLppm}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.lolos}
                                    </Table.Td>
                                    <Table.Td align="center">
                                        {data.tidakLolos}
                                    </Table.Td>
                                </Table.TrBody>
                            ))
                        ) : (
                            <TableEmpty colSpan={6} />
                        )}
                    </Table.Tbody>
                </Table>
            </div>
        );
    };

    return (
        <div
            className={clsx(
                !roles.includes("Dosen") ? "-mt-3" : "mt-3",
                "flex flex-col gap-5"
            )}
        >
            <div className="-mb-2">
                <SectionTitle title="Rekap Usulan Baru" />
            </div>
            {filterSection()}
            {statisticSection()}
            {rekapSection()}
        </div>
    );
};

export default DashboardAdmin;
