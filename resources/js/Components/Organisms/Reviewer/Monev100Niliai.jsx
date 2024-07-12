import Alert from "@/Components/Atoms/Alert";
import AlertContent from "@/Components/Atoms/AlertContent";
import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Icon from "@/Components/Atoms/Icon";
import TableEmpty from "@/Components/Atoms/TableEmpty";
import RegularSubmit from "@/Components/Molecules/RegularSubmit";
import UseNilaiProposal from "@/Hooks/Reviewer/ProposalReview/UseNilaiProposal";
import { Fragment } from "react";
import Table from "../Table";
import FormToggle from "@/Components/Atoms/FormToggle";

const Monev100Nilai = ({
    periode,
    proposalReviewer,
    kriteria,
    tahun,
    maxDana,
    flash,
}) => {
    const {
        totalBobot,
        // form
        data,
        errors,
        handleChangeNilai,
        handleCheckboxChange,
        handleChange,
        submit,
        processing,
        // utils
        jumlah,
        totalButir,
        totalJumlah,
        isDisabledNilai,
    } = UseNilaiProposal(
        proposalReviewer,
        kriteria,
        tahun,
        maxDana,
        flash,
        "validator_100"
    );


    const alertInformasi = () => {
        return !periode.success ? (
            <Alert
                title="Perhatian"
                icon="exclamation-triangle"
                color="--color-danger"
                message={periode.message}
                className="mb-5"
                padding={10}
            />
        ) : (
            <AlertContent
                color="--color-info"
                message={
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <Icon icon="info-circle" />
                                <span className="font-extrabold">
                                    Keterangan
                                </span>
                            </div>
                            <span>Input nilai dengan angka 1 - 5</span>
                            <span>Jumlah = bobot x nilai</span>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <Icon icon="info-circle" />
                                <span className="font-extrabold">
                                    Skala Penilaian
                                </span>
                            </div>
                            <span>5 = Sangat Baik</span>
                            <span>4 = Baik</span>
                            <span>3 = Cukup</span>
                            <span>2 = Kurang</span>
                            <span>1 = Sangat Kurang</span>
                        </div>
                    </div>
                }
                className="mb-5"
            />
        );
    };

    const renderData = () => {
        return kriteria.length > 0 ? (
            kriteria.map((krit, i) => (
                <Fragment key={i}>
                    <Table.TrBody>
                        <Table.Td rowSpan={krit.butir.length + 1}>
                            {krit.kriteria}
                        </Table.Td>
                    </Table.TrBody>
                    {krit.butir.map((butir, i) => (
                        <Table.TrBody key={i}>
                            <Table.Td>{butir.butir}</Table.Td>
                            <Table.Td align="center">{butir.bobot}</Table.Td>
                            <Table.Td
                                align="center"
                                className="flex justify-center"
                            >
                                <div className="w-[75px]">
                                    <FormInput
                                        size="sm"
                                        className="text-center"
                                        onChange={(e) =>
                                            handleChangeNilai(
                                                butir.id,
                                                butir.bobot,
                                                e
                                            )
                                        }
                                        defaultValue={
                                            data.nilais.find(
                                                (nilai) =>
                                                    nilai.skema_kriteria_butir_id ===
                                                    butir.id
                                            )?.nilai
                                        }
                                        isError={data.nilais.some(
                                            (nilai) =>
                                                nilai.skema_kriteria_butir_id ===
                                                    butir.id && nilai.error
                                        )}
                                        disabled={!periode.success}
                                    />
                                </div>
                            </Table.Td>
                            <Table.Td align="center">
                                {jumlah(butir.id)}
                            </Table.Td>
                        </Table.TrBody>
                    ))}
                </Fragment>
            ))
        ) : (
            <TableEmpty colSpan={5} />
        );
    };

    const formNilai = () => {
        return (
            <div className="col-span-12 sm:col-span-8 border rounded-lg overflow-hidden">
                <Table>
                    <Table.Thead>
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
                    <Table.Tbody>{renderData()}</Table.Tbody>
                    <tfoot>
                        <tr className="font-extrabold">
                            <td
                                align="center"
                                className="ps-2 py-2"
                                colSpan={2}
                            >
                                Jumlah
                            </td>
                            <td align="center" className="ps-2 py-2">
                                {totalBobot}
                            </td>
                            <td align="center" className="ps-2 py-2"></td>
                            <td align="center" className="ps-2 py-2">
                                {totalJumlah}
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        );
    };

    const formRekomendasi = () => {
        return (
            <div className="col-span-12 sm:col-span-4">
                <div className="flex flex-col gap-4">
                    <FormGroup>
                        <FormLabel name="Catatan" htmlFor="catatan" />
                        <FormTextarea
                            size="sm"
                            id="catatan"
                            name="catatan"
                            onChange={handleChange}
                            defaultValue={data.catatan}
                            placeholder="Tulis catatan..."
                            isError={errors?.catatan}
                            rows={5}
                            disabled={!periode.success}
                        />
                        <FormError message={errors?.catatan} />
                    </FormGroup>
                    {tahun > 1 ? (
                        <FormGroup>
                            <div className="flex items-center gap-3">
                                <span>Tidak Dilanjutkan</span>
                                <FormToggle
                                    notCheck="danger"
                                    variant="success"
                                    name="is_approved"
                                    value={1}
                                    onChange={handleCheckboxChange}
                                    defaultChecked={data.is_approved === 1}
                                    disabled={!periode.success}
                                />
                                <span>Dilanjutkan</span>
                            </div>
                        </FormGroup>
                    ) : null}
                    <div className="flex justify-end border-t pt-5 mt-5">
                        <RegularSubmit
                            back="/reviewer/laporan-monev100"
                            label={
                                data.nilais.length !== totalButir ||
                                !data.catatan
                                    ? "Simpan sebagai draft"
                                    : "Kirim Penilaian"
                            }
                            processing={processing}
                            disabled={
                                processing ||
                                !periode.success ||
                                isDisabledNilai
                            }
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <form className="flex flex-col gap-5 mb-3" onSubmit={submit}>
            {alertInformasi()}
            <div className="grid grid-cols-12 gap-5">
                {formNilai()}
                {formRekomendasi()}
            </div>
        </form>
    );
};

export default Monev100Nilai;
