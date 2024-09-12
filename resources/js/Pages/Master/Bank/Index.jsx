import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import CreateButton from "@/Components/Atoms/CreateButton";
import FilterSearch from "@/Components/Atoms/FilterSearch";
import Label from "@/Components/Atoms/Label";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import ActionButton from "@/Components/Molecules/ActionButton";
import DataTable from "@/Components/Organisms/DataTable";
import Table from "@/Components/Organisms/Table";
import UseMasterBank from "@/Hooks/Master/UserMasterBank";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { handleDelete } from "@/Utils/GlobalFunction";
import { Head } from "@inertiajs/react";
import BankCreate from "./Modals/BankCreate";

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
    } = UseMasterBank(filtered, flash);

    const dataRender = () => {
        return datas.data.length > 0 ? (
            datas.data.map((data, i) => (
                <Table.TrBody key={data.id}>
                    <Table.Td>{i + 1}</Table.Td>
                    <Table.Td>
                        <div className="flex items-center gap-3">
                            <img
                                src={`/storage/bank/${data.logo}`}
                                alt="logo"
                                className="w-[50px]"
                            />
                            <span>{data.nama}</span>
                        </div>
                    </Table.Td>
                    <Table.Td>
                        <Label
                            variant={
                                data.jenis == "bank"
                                    ? "info"
                                    : data.jenis == "e-wallet"
                                    ? "success"
                                    : "primary"
                            }
                        >
                            {data.jenis}
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
                                    "master.bank.destroy",
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
                                <Table.Th width="69">Nama</Table.Th>
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
            <BankCreate
                title={title}
                showModal={showModal}
                closeModal={handleCloseModal}
                mode={mode}
                data={data}
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
