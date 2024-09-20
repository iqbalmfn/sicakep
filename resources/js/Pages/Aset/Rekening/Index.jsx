import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import CreateButton from "@/Components/Atoms/CreateButton";
import FilterSearch from "@/Components/Atoms/FilterSearch";
import Label from "@/Components/Atoms/Label";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import ActionButton from "@/Components/Molecules/ActionButton";
import DataTable from "@/Components/Organisms/DataTable";
import Table from "@/Components/Organisms/Table";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { Head } from "@inertiajs/react";
import React from "react";
import { formatRupiah, handleDelete } from "@/Utils/GlobalFunction";
import UseRekening from "@/Hooks/UseRekening";
import RekeningCreate from "./Modals/RekeningCreate";
import NameWithAvatar from "@/Components/Atoms/NameWithAvatar";

const Index = ({
    title,
    breadcrumbs,
    datas,
    banks,
    users,
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
        handleCheckboxChange,
        // page controller
        setParams,
        setFetching,
        mode,
        showModal,
        onHandleFilter,
        onHandleOrder,
        handleShowModal,
        handleEditModal,
        handleCloseModal,
    } = UseRekening(filtered, flash);

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
                    <Table.Td>{data.nama_rekening}</Table.Td>
                    <Table.Td>{data.no_rekening}</Table.Td>
                    <Table.Td>
                        <div className="flex items-center gap-3">
                            <img
                                src={`/storage/bank/${data.bank.logo}`}
                                alt="logo"
                                className="w-[50px]"
                            />
                        </div>
                    </Table.Td>
                    <Table.Td>
                        <Label
                            variant={
                                data.bank.jenis == "bank"
                                    ? "info"
                                    : data.bank.jenis == "e-wallet"
                                    ? "success"
                                    : "warning"
                            }
                        >
                            {data.bank.jenis}
                        </Label>
                    </Table.Td>
                    <Table.Td className="font-bold">{formatRupiah(data.saldo)}</Table.Td>
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
                                    "master.kategori.destroy",
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
                    <FilterSearch onHandleFilter={onHandleFilter} />
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
                                <Table.Th width="15">Pemilik Rekening</Table.Th>
                                <Table.Th width="15">Nama Rekening</Table.Th>
                                <Table.Th width="10">Nomor Rekening</Table.Th>
                                <Table.Th width="10">
                                    Nama Bank/E-Wallet
                                </Table.Th>
                                <Table.Th width="5">jenis</Table.Th>
                                <Table.Th
                                    width="10"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="saldo"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    saldo
                                </Table.Th>
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
            <RekeningCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
                users={users}
                banks={banks}
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
