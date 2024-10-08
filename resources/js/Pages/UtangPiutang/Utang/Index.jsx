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
import UseUtang from "@/Hooks/UseUtang";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatDateWithDay,
    formatRupiah,
    getCurrentMonth,
    getCurrentYear,
    handleBayar,
    handleDelete,
    listMonths,
    listYears
} from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";
import UtangCreate from "./Modals/UtangCreate";
import UtangDetail from "./Modals/UtangDetail";
import UtangBayar from "./Modals/UtangBayar";

const Index = ({ title, breadcrumbs, datas, widget, users, rekenings, filtered, flash }) => {
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
        bayarData,
        showBayarModal,
        handleShowBayarModal,
        handleCloseBayarModal,
        submitBayar
    } = UseUtang(filtered, flash);

    const status = [
        {
            value: 0,
            label: "Belum Lunas"
        },
        {
            value: 1,
            label: "Lunas"
        }
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
                    <Table.Td>{data.judul}</Table.Td>
                    <Table.Td>{formatRupiah(data.nominal)}</Table.Td>
                    <Table.Td>{formatDateWithDay(data.jatuh_tempo)}</Table.Td>
                    <Table.Td>
                        <Label
                            variant={data.jenis == "cash" ? "info" : "success"}
                        >
                            {data.jenis}
                        </Label>
                    </Table.Td>
                    <Table.Td>
                        <Label
                            variant={data.status == 0 ? "danger" : "success"}
                        >
                            {data.status == 0 ? "Belum Lunas" : "Lunas"}
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
                            variant="success"
                            icon="check-lg"
                            label="Bayar"
                            onClick={() => handleShowBayarModal(data)}
                            disabled={data.status == 1}
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
                                    "utang-piutang.utang.destroy",
                                    data.id,
                                    "Data berhasil dihapus"
                                )
                            }
                        />
                    </Table.Td>
                </Table.TrBody>
            ))
        ) : (
            <TableEmpty colSpan={8} />
        );
    };

    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />

            <div className="grid grid-cols-4 gap-5 mb-5">
                <div className="col-span-4 lg:col-span-1">
                    <ContentWrapper className="flex flex-col gap-2 pb-6 text-danger border border-2 border-danger">
                        <span className="text-xl font-semibold">
                            Total Utang
                        </span>
                        <span className="text-4xl font-bold">
                            {formatRupiah(widget.total_utang)}
                        </span>
                    </ContentWrapper>
                </div>
                <div className="col-span-4 lg:col-span-1">
                    <ContentWrapper className="flex flex-col gap-2 pb-6 text-success border border-2 border-success">
                        <span className="text-xl font-semibold">
                            Sudah Dibayar
                        </span>
                        <span className="text-4xl font-bold">
                            {formatRupiah(widget.total_dibayar)}
                        </span>
                    </ContentWrapper>
                </div>
                <div className="col-span-4 lg:col-span-1">
                    <ContentWrapper className="flex flex-col gap-2 pb-6 text-danger border border-2 border-danger">
                        <span className="text-xl font-semibold">
                            Belum Dibayar
                        </span>
                        <span className="text-4xl font-bold">
                            {formatRupiah(widget.total_belum_dibayar)}
                        </span>
                    </ContentWrapper>
                </div>
                <div className="col-span-4 lg:col-span-1">
                    <ContentWrapper className="flex flex-col gap-2 pb-6 text-info border border-2 border-info">
                        <span className="text-xl font-semibold">
                            Persentase Lunas
                        </span>
                        <span className="text-4xl font-bold">
                            {widget.persentase}%
                        </span>
                    </ContentWrapper>
                </div>
            </div>

            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <CreateButton onClick={handleShowModal} />
                        {/* <Link
                            href={route('perencanaan.view', params)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center"
                        >
                            <i className="bi bi-file-text"></i>
                        </Link>             */}
                    </div>
                    <div className="flex justify-end gap-2">
                        <div>
                            <FormSelectPrefix
                                prefix={<Icon icon="person" />}
                                size="sm"
                                name="user_id"
                                value={params.user_id}
                                onChange={onHandleFilter}
                                className="w-[205px]"
                            >
                                <option value="">Semua Peminjam</option>
                                {users.map((user) => (
                                    <option
                                        key={user.id}
                                        value={user.id}
                                    >
                                        {user.name}
                                    </option>
                                ))}
                            </FormSelectPrefix>
                        </div>
                        <div>
                            <FormSelectPrefix
                                prefix={<Icon icon="check-circle" />}
                                size="sm"
                                name="status"
                                value={params.status}
                                onChange={onHandleFilter}
                                className="w-[150px]"
                            >
                                <option value="">Semua Status</option>
                                {status.map((stat) => (
                                    <option
                                        key={stat.value}
                                        value={stat.value}
                                    >
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
                                value={params.bulan ? params.bulan : getCurrentMonth()}
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
                                value={params.tahun ? params.tahun : getCurrentYear()}
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
                                    width="4"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="id"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    no
                                </Table.Th>
                                <Table.Th width="15">Peminjam</Table.Th>
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
                                    column="jatuh_tempo"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    jatuh tempo
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
            <UtangCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
                users={users}
                handleChange={handleChange}
                errors={errors}
                submit={submit}
                update={update}
                processing={processing}
            />

            {/* modal bayar utang */}
            <UtangBayar
                showModal={showBayarModal}
                closeModal={handleCloseBayarModal}
                mode={mode}
                data={data}
                users={users}
                rekenings={rekenings}
                handleChange={handleChange}
                errors={errors}
                submit={submitBayar}
                update={update}
                processing={processing}
            />

            {/* modal Detail */}
            <UtangDetail
                title={title}
                showModal={showDetailModal}
                closeModal={handleCloseDetailModal}
                data={detailData}
            />
        </AppContentLayout>
    );
};

export default Index;
