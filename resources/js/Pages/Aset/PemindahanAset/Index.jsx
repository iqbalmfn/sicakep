import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import CreateButton from "@/Components/Atoms/CreateButton";
import FilterSearch from "@/Components/Atoms/FilterSearch";
import FormSelectPrefix from "@/Components/Atoms/FormSelectPrefix";
import Icon from "@/Components/Atoms/Icon";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import ActionButton from "@/Components/Molecules/ActionButton";
import DataTable from "@/Components/Organisms/DataTable";
import Table from "@/Components/Organisms/Table";
import UsePemindahanAset from "@/Hooks/UsePemindahanAset";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatDateWithDay,
    formatRupiah,
    getCurrentMonth,
    getCurrentYear,
    handleDelete,
    listMonths,
    listYears,
} from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";
import PemindahanAsetCreate from "./Modals/PemindahanAsetCreate";

const Index = ({ title, breadcrumbs, datas, rekenings, filtered, flash }) => {
    const {
        data,
        processing,
        errors,
        submit,
        update,
        handleChange,
        // page controller
        params,
        setParams,
        setFetching,
        mode,
        showModal,
        onHandleFilter,
        onHandleOrder,
        handleShowModal,
        handleEditModal,
        handleCloseModal,
    } = UsePemindahanAset(filtered, flash);

    const dataRender = () => {
        return datas.data.length > 0 ? (
            datas.data.map((data, i) => (
                <Table.TrBody key={data.id}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>
                        <div className="flex items-center gap-3">
                            <img
                                src={`/storage/bank/${data.initial_rekening.bank.logo}`}
                                alt="logo"
                                className="w-[50px]"
                            />
                            <span>{data.initial_rekening.nama_rekening}</span>
                        </div>
                    </Table.Td>
                    <Table.Td>
                        <div className="flex items-center gap-3">
                            <img
                                src={`/storage/bank/${data.destination_rekening.bank.logo}`}
                                alt="logo"
                                className="w-[50px]"
                            />
                            <span>{data.destination_rekening.nama_rekening}</span>
                        </div>
                    </Table.Td>
                    <Table.Td>{formatRupiah(data.nominal)}</Table.Td>
                    <Table.Td>{formatRupiah(data.biaya_administrasi)}</Table.Td>
                    <Table.Td>{formatDateWithDay(data.tanggal)}</Table.Td>
                    <Table.Td className="text-end pe-3">
                        <ActionButton
                            variant="info"
                            icon="pencil"
                            label="Edit"
                            onClick={() => handleEditModal(data)}
                        />
                        <ActionButton
                            variant="danger"
                            icon="trash"
                            label="Hapus"
                            onClick={() =>
                                handleDelete(
                                    "aset.pemindahan-aset.destroy",
                                    data.id,
                                    "Data berhasil dihapus"
                                )
                            }
                        />
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={7} />
        );
    };

    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex gap-2">
                        <CreateButton onClick={handleShowModal} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <div>
                            <FormSelectPrefix
                                prefix={<Icon icon="calendar-month" />}
                                size="sm"
                                name="bulan"
                                value={
                                    params.bulan
                                        ? params.bulan
                                        : getCurrentMonth()
                                }
                                onChange={onHandleFilter}
                                className="w-[150px]"
                            >
                                <option value="all">Semua Bulan</option>
                                {listMonths().map((month) => (
                                    <option
                                        key={month.value}
                                        value={month.value}
                                    >
                                        {month.label}
                                    </option>
                                ))}
                            </FormSelectPrefix>
                        </div>
                        <div>
                            <FormSelectPrefix
                                prefix={<Icon icon="calendar-check" />}
                                size="sm"
                                name="tahun"
                                value={
                                    params.tahun
                                        ? params.tahun
                                        : getCurrentYear()
                                }
                                onChange={onHandleFilter}
                                className="w-[150px]"
                            >
                                <option value="all">Semua Tahun</option>
                                {listYears().map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </FormSelectPrefix>
                        </div>
                        <FilterSearch onHandleFilter={onHandleFilter} />
                    </div>
                </div>
                <DataTable>
                    <Table>
                        <Table.Thead>
                            <Table.TrHead>
                                <Table.Th
                                    width="3"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="id"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    no
                                </Table.Th>
                                <Table.Th width="15">Rekening Asal</Table.Th>
                                <Table.Th width="15">Rekening Tujuan</Table.Th>
                                <Table.Th width="10">Nominal</Table.Th>
                                <Table.Th width="10">Biaya Transaksi</Table.Th>
                                <Table.Th width="10">tanggal</Table.Th>
                                <Table.Th align="end" width="7">
                                    <span className="me-3">opsi</span>
                                </Table.Th>
                            </Table.TrHead>
                        </Table.Thead>
                        <Table.Tbody>{dataRender()}</Table.Tbody>
                    </Table>
                    <DataTable.Footer
                        data={datas}
                        params={filtered}
                        setParams={setParams}
                        setFetching={setFetching}
                        onChange={onHandleFilter}
                    />
                </DataTable>
            </ContentWrapper>

            {/* modal CRUD create/update */}
            <PemindahanAsetCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
                rekenings={rekenings}
                handleChange={handleChange}
                errors={errors}
                submit={submit}
                update={update}
                processing={processing}
            />
        </AppContentLayout>
    );
};

export default Index;
