import Alert from "@/Components/Atoms/Alert";
import Icon from "@/Components/Atoms/Icon";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import TabItem from "@/Components/Atoms/TabItem";
import Table from "@/Components/Organisms/Table";
import { formatDateTime, formatRupiah } from "@/Utils/GlobalFunction";
import { useEffect, useState } from "react";

const ModalNilai = ({ data }) => {
    const [activeTab, setActiveTab] = useState(null);
    const [dataReview, setDataReview] = useState({});

    const handleSwitchTab = (category) => {
        setActiveTab(category);
    };

    useEffect(() => {
        data && data.length > 0
            ? setActiveTab(data[0].lecturer?.nama_lengkap)
            : null;
    }, [data]);

    useEffect(() => {
        setDataReview(
            data && data.length > 0
                ? data.find(
                      (review) => review.lecturer.nama_lengkap === activeTab
                  )
                : {}
        );
    }, [activeTab]);

    const dataReviewRender = () => {
        const groupedData = {};

        if (dataReview?.reviewer_nilai?.length > 0) {
            dataReview?.reviewer_nilai.forEach((nilai) => {
                const kriteria =
                    nilai.skema_kriteria_butir.skema_kriteria.kriteria;
                if (!groupedData[kriteria]) {
                    groupedData[kriteria] = [];
                }
                groupedData[kriteria].push(nilai);
            });
        }

        const totalNilai = dataReview?.reviewer_nilai?.reduce(
            (total, nilai) =>
                total + nilai.nilai * nilai.skema_kriteria_butir.bobot,
            0
        );

        const dataRender = () => {
            return Object.keys(groupedData).map((kriteria) => {
                const values = groupedData[kriteria];
                const rowSpan = values.length;

                return values.map((nilai, index) => (
                    <Table.TrBody key={index}>
                        {index === 0 && (
                            <Table.Td rowSpan={rowSpan}>{kriteria}</Table.Td>
                        )}
                        <Table.Td>{nilai.skema_kriteria_butir.butir}</Table.Td>
                        <Table.Td align="center">
                            {nilai.skema_kriteria_butir.bobot}
                        </Table.Td>
                        <Table.Td align="center">{nilai.nilai}</Table.Td>
                        <Table.Td align="center">
                            {nilai.nilai * nilai.skema_kriteria_butir.bobot}
                        </Table.Td>
                    </Table.TrBody>
                ));
            });
        };

        return (
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-8">
                    <Table className="border">
                        <Table.Thead className="h-[60px]">
                            <Table.TrHead>
                                <Table.Th align="start" width="20%">
                                    kriteria penilaian
                                </Table.Th>
                                <Table.Th align="start" width="40%">
                                    butir penilaian
                                </Table.Th>
                                <Table.Th align="center" width="10%">
                                    bobot
                                </Table.Th>
                                <Table.Th align="center" width="10%">
                                    <div className="flex flex-col">
                                        <span>nilai</span>
                                        <small>(skala 1-5)</small>
                                    </div>
                                </Table.Th>
                                <Table.Th width="10%" align="center">
                                    <div className="flex flex-col">
                                        <span>jumlah</span>
                                        <small>(bobot x nilai)</small>
                                    </div>
                                </Table.Th>
                            </Table.TrHead>
                        </Table.Thead>
                        <Table.Tbody>
                            {dataReview?.reviewer_nilai?.length > 0 ? (
                                dataRender()
                            ) : (
                                <Table.TrBody>
                                    <Table.Td colSpan={5} className="ps-0 pe-0">
                                        <Alert
                                            color="--color-warning"
                                            icon="exclamation-triangle"
                                            message={`${activeTab} belum melakukan review proposal`}
                                        />
                                    </Table.Td>
                                </Table.TrBody>
                            )}
                        </Table.Tbody>
                        {dataReview?.reviewer_nilai?.length > 0 ? (
                            <tfoot>
                                <tr className="font-extrabold">
                                    <td
                                        align="center"
                                        className="ps-2 py-2"
                                        colSpan={4}
                                    >
                                        Total Jumlah
                                    </td>
                                    <td align="center" className="ps-2 py-2">
                                        {totalNilai}
                                    </td>
                                </tr>
                            </tfoot>
                        ) : null}
                    </Table>
                </div>
                <div className="col-span-12 md:col-span-4">
                    <Table className="border">
                        <Table.Tbody>
                            <Table.TrBody>
                                <Table.Td width="30%">Nama Reviewer</Table.Td>
                                <Table.Td width="3%">:</Table.Td>
                                <Table.Td>
                                    {dataReview?.lecturer?.nama_lengkap}
                                </Table.Td>
                            </Table.TrBody>
                            <Table.TrBody>
                                <Table.Td width="30%">NIDN/NIDK</Table.Td>
                                <Table.Td width="3%">:</Table.Td>
                                <Table.Td>
                                    {dataReview?.lecturer?.nidn}
                                </Table.Td>
                            </Table.TrBody>
                            <Table.TrBody>
                                <Table.Td width="30%">Catatan</Table.Td>
                                <Table.Td width="3%">:</Table.Td>
                                <Table.Td>
                                    {dataReview?.catatan
                                        ? dataReview?.catatan
                                        : "-"}
                                </Table.Td>
                            </Table.TrBody>
                            <Table.TrBody>
                                <Table.Td width="30%">Tanggal Review</Table.Td>
                                <Table.Td width="3%">:</Table.Td>
                                <Table.Td>
                                    {dataReview?.is_approved === 1
                                        ? formatDateTime(dataReview?.updated_at)
                                        : dataReview?.is_approved === 2
                                        ? formatDateTime(dataReview?.updated_at)
                                        : "-"}
                                </Table.Td>
                            </Table.TrBody>
                        </Table.Tbody>
                    </Table>
                </div>
            </div>
        );
    };

    return (
        <div>
            <SectionTitle title="Hasil Monev 100%" />
            <div className="flex flex-wrap gap-3 md:gap-5 mb-5 mt-6">
                {data?.map((reviewer, i) => (
                    <TabItem
                        key={i}
                        category={reviewer.lecturer?.nama_lengkap}
                        handleSwitchTab={handleSwitchTab}
                        activeTab={activeTab}
                    />
                ))}
            </div>
            <div>{dataReviewRender()}</div>
        </div>
    );
};

export default ModalNilai;
