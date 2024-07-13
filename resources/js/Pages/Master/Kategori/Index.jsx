import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import CreateButton from "@/Components/Atoms/CreateButton";
import FilterSearch from "@/Components/Atoms/FilterSearch";
import Label from "@/Components/Atoms/Label";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import ActionButton from "@/Components/Molecules/ActionButton";
import DataTable from "@/Components/Organisms/DataTable";
import Table from "@/Components/Organisms/Table";
import UseMasterKategori from "@/Hooks/Master/UseMasterKategori";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { Head } from "@inertiajs/react";
import React from "react";
import KategoriCreate from "./Modals/KategoriCreate";
import { handleDelete } from "@/Utils/GlobalFunction";

const Index = ({ title, breadcrumbs, datas, filtered, flash }) => {
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
    } = UseMasterKategori(filtered, flash);

    const dataRender = () => {
        return datas.data.length > 0 ? (
            datas.data.map((data, i) => (
                <Table.TrBody key={data.id}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>{data.nama}</Table.Td>
                    <Table.Td>
                        <Label
                            variant={
                                data.jenis == "pengeluaran"
                                    ? "danger"
                                    : "success"
                            }
                        >
                            {data.jenis}
                        </Label>
                    </Table.Td>
                    <Table.Td>
                        <Label
                            variant={
                                data.status == 0
                                    ? "danger"
                                    : "success"
                            }
                        >
                            {data.status == 0 ? "non aktif" : "aktif"}
                        </Label>
                    </Table.Td>
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
            <TableEmpty colSpan={5} />
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
                                    width="5"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="id"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    no
                                </Table.Th>
                                <Table.Th width="69">Nama Kategori</Table.Th>
                                <Table.Th
                                    width="10"
                                    ordered
                                    onHandleOrder={onHandleOrder}
                                    column="jenis"
                                    orderBy={filtered.orderBy}
                                    orderDirection={filtered.orderDirection}
                                >
                                    jenis
                                </Table.Th>
                                <Table.Th
                                    width="8"
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
            <KategoriCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
                handleChange={handleChange}
                handleCheckboxChange={handleCheckboxChange}
                errors={errors}
                submit={submit}
                update={update}
                processing={processing}
            />
        </AppContentLayout>
    );
};

export default Index;
