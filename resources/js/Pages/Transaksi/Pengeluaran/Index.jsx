import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import CreateButton from "@/Components/Atoms/CreateButton";
import FilterSearch from "@/Components/Atoms/FilterSearch";
import FormSelectPrefix from "@/Components/Atoms/FormSelectPrefix";
import Icon from "@/Components/Atoms/Icon";
import Label from "@/Components/Atoms/Label";
import NameWithAvatar from "@/Components/Atoms/NameWithAvatar";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import ActionButton from "@/Components/Molecules/ActionButton";
import DataTable from "@/Components/Organisms/DataTable";
import Table from "@/Components/Organisms/Table";
import UsePengeluaran from "@/Hooks/UsePengeluaran";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatDateWithDay,
    formatRupiah,
    handleDelete,
    listMonths,
    listYears,
} from "@/Utils/GlobalFunction";
import { Head, Link } from "@inertiajs/react";
import PengeluaranCreate from "./Modals/PengeluaranCreate";
import PengeluaranDetail from "./Modals/PengeluaranDetail";

const Index = ({
    title,
    breadcrumbs,
    datas,
    dataAll,
    categories,
    users,
    perencanaans,
    filtered,
    flash,
}) => {
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
        // tambahan
        detailData,
        showDetailModal,
        handleShowDetailModal,
        handleCloseDetailModal,
    } = UsePengeluaran(filtered, flash);

    const dataRender = () => {
        return datas.data.length > 0 ? (
            datas.data.map((data, i) => (
                <Table.TrBody key={data.id}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>
                        <div className="flex items-center gap-2">
                            <NameWithAvatar
                                avatar={
                                    data.user.foto
                                        ? `/images/${data.user.foto}`
                                        : data.user.foto
                                }
                                name={data.user.name}
                            />
                        </div>
                    </Table.Td>
                    <Table.Td>{data.kategori.nama}</Table.Td>
                    <Table.Td>{data.perencanaan.judul}</Table.Td>
                    <Table.Td>{data.judul}</Table.Td>
                    <Table.Td>{formatRupiah(data.nominal)}</Table.Td>
                    <Table.Td>{formatDateWithDay(data.tanggal)}</Table.Td>
                    <Table.Td>
                        <Label
                            variant={data.jenis == "cash" ? "info" : "success"}
                        >
                            {data.jenis}
                        </Label>
                    </Table.Td>
                    <Table.Td className="text-end pe-3">
                        <ActionButton
                            variant="warning"
                            icon="search"
                            label="Detail"
                            onClick={() => handleShowDetailModal(data)}
                        />
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
                                    "transaksi.pemasukan.destroy",
                                    data.id,
                                    "Data berhasil dihapus"
                                )
                            }
                        />
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={9} />
        );
    };

    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <CreateButton onClick={handleShowModal} />
                        <Link
                            href={route("perencanaan.view", params)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center"
                        >
                            <i className="bi bi-file-text"></i>
                        </Link>
                        {/* <a
                            href={route('perencanaan.print-pdf', params)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-transparent text-danger border border-danger group hover:bg-danger hover:text-white w-[37px] h-[37px] flex justify-center items-center"
                        >
                            <i className="bi bi-file-pdf"></i>
                        </a> */}
                    </div>
                    <div className="flex justify-end gap-2">
                        <div>
                            <FormSelectPrefix
                                prefix={<Icon icon="tag" />}
                                size="sm"
                                name="kategori_id"
                                value={params.kategori_id}
                                onChange={onHandleFilter}
                                className="w-[205px]"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.label}
                                    </option>
                                ))}
                            </FormSelectPrefix>
                        </div>
                        <div>
                            <FormSelectPrefix
                                prefix={<Icon icon="calendar-month" />}
                                size="sm"
                                name="bulan"
                                value={params.bulan}
                                onChange={onHandleFilter}
                                className="w-[150px]"
                            >
                                <option value="">Semua Bulan</option>
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
                                value={params.tahun}
                                onChange={onHandleFilter}
                                className="w-[150px]"
                            >
                                <option value="">Semua Tahun</option>
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
                                    width="4"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="id"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    no
                                </Table.Th>
                                <Table.Th width="12">Pengguna Dana</Table.Th>
                                <Table.Th
                                    width="15"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="kategori_id"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    Kategori
                                </Table.Th>
                                <Table.Th
                                    width="12"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="perencanaan_id"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    Sub Kategori
                                </Table.Th>
                                <Table.Th width="15">Judul</Table.Th>
                                <Table.Th
                                    width="10"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="nominal"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    nominal
                                </Table.Th>
                                <Table.Th
                                    width="13"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="tanggal"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    tanggal
                                </Table.Th>
                                <Table.Th
                                    width="7"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="jenis"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    jenis
                                </Table.Th>
                                <Table.Th align="end" width="9">
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
            <PengeluaranCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
                pengeluaranData={dataAll.data}
                categories={categories}
                users={users}
                perencanaans={perencanaans}
                handleChange={handleChange}
                errors={errors}
                submit={submit}
                update={update}
                processing={processing}
            />

            {/* modal Detail */}
            <PengeluaranDetail
                title={title}
                showModal={showDetailModal}
                closeModal={handleCloseDetailModal}
                data={detailData}
            />
        </AppContentLayout>
    );
};

export default Index;
