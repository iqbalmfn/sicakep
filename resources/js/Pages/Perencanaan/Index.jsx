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
import UsePerencanaan from "@/Hooks/UsePerencanaan";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatRupiah,
    handleDelete,
    listMonths,
    listYears,
    monthNumberToIndonesian,
} from "@/Utils/GlobalFunction";
import { Head, usePage } from "@inertiajs/react";
import PerencanaanCreate from "./Modals/PerencanaanCreate";
import PerencanaanDetail from "./Modals/PerencanaanDetail";
import PerencanaanConfirm from "./Modals/PerencanaanConfirm";

const Index = ({ title, breadcrumbs, datas, categories, filtered, flash }) => {
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
        showConfirmModal,
        handleShowConfirmModal,
        handleCloseConfirmModal,
        confirm
    } = UsePerencanaan(filtered, flash);

    const { auth } = usePage().props;

    const status = [
        {
            value: "waiting",
            label: "Waiting",
        },
        {
            value: 1,
            label: "Accept",
        },
        {
            value: 0,
            label: "Reject",
        },
    ];

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
                    <Table.Td>{data.judul}</Table.Td>
                    <Table.Td>{formatRupiah(data.nominal)}</Table.Td>
                    <Table.Td>{monthNumberToIndonesian(data.bulan)}</Table.Td>
                    <Table.Td>{data.tahun}</Table.Td>
                    <Table.Td>
                        <Label
                            variant={data.tipe == "cash" ? "info" : "success"}
                        >
                            {data.tipe}
                        </Label>
                    </Table.Td>
                    <Table.Td>
                        <Label
                            variant={
                                data.status == 0
                                    ? "danger"
                                    : data.status == 1
                                    ? "success"
                                    : "warning"
                            }
                        >
                            {data.status == 0
                                ? "reject"
                                : data.status == 1
                                ? "accept"
                                : "waiting"}
                        </Label>
                    </Table.Td>
                    <Table.Td className="text-end pe-3">
                        {auth.user.roles.find(
                            (role) => role.name === "Admin"
                        ) && data.status == null ? (
                            <ActionButton
                                variant="success"
                                icon="check-lg"
                                label="Konfirmasi"
                                onClick={() => handleShowConfirmModal(data)}
                            />
                        ) : (
                            <ActionButton
                                variant="warning"
                                icon="search"
                                label="Detail"
                                onClick={() => handleShowDetailModal(data)}
                            />
                        )}
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
                                    "perencanaan.destroy",
                                    data.id,
                                    "Data berhasil dihapus"
                                )
                            }
                        />
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={10} />
        );
    };

    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <CreateButton onClick={handleShowModal} />
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
                                prefix={<Icon icon="info-circle" />}
                                size="sm"
                                name="status"
                                value={params.status}
                                onChange={onHandleFilter}
                                className="w-[150px]"
                            >
                                <option value="">Semua Status</option>
                                {status.map((stat) => (
                                    <option key={stat.value} value={stat.value}>
                                        {stat.label}
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
                                <Table.Th width="15">Pengaju</Table.Th>
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
                                    width="10"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="bulan"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    bulan
                                </Table.Th>
                                <Table.Th
                                    width="7"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="tahun"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    tahun
                                </Table.Th>
                                <Table.Th
                                    width="7"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="tipe"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    tipe
                                </Table.Th>
                                <Table.Th
                                    width="7"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="status"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    status
                                </Table.Th>
                                <Table.Th align="end" width="10">
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
            <PerencanaanCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
                categories={categories}
                handleChange={handleChange}
                errors={errors}
                submit={submit}
                update={update}
                processing={processing}
            />

            {/* modal Detail */}
            <PerencanaanDetail
                title={title}
                showModal={showDetailModal}
                closeModal={handleCloseDetailModal}
                data={detailData}
            />

            <PerencanaanConfirm
                title={title}
                showModal={showConfirmModal}
                closeModal={handleCloseConfirmModal}
                data={detailData}
                formData={data}
                handleChange={handleChange}
                errors={errors}
                submit={confirm}
                processing={processing}
            />
        </AppContentLayout>
    );
};

export default Index;
