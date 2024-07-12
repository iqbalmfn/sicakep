import AlertContent from "@/Components/Atoms/AlertContent";
import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import Select2Basic from "@/Components/Atoms/Select2Basic";
import UseProposalCreateAnggaranForm from "@/Hooks/Proposal/UseProposalCreateAnggaranForm";
import { formatRupiah } from "@/Utils/GlobalFunction";
import ActionButton from "../../ActionButton";
import RupiahInput from "@/Components/Atoms/RupiahInput";
import { usePage } from "@inertiajs/react";

function AnggaranForm({
    isInitial,
    anggaranKelompoks,
    anggaranKelompoksRaw,
    borderColor = "primary",
    handleChange,
    defaultValue = [
        {
            kelompok: null,
            komponen: null,
            item: null,
            satuan: null,
            volume: null,
            harga: null,
            total: null,
        },
    ],
    activeFilter,
    isError = false,
    disabled = false,
    disabledDelete = false,
    maxDana = false,
    isAnyPercentageExceeded = false,
}) {
    const { auth } = usePage().props
    const {
        forms,
        handleChangeForm,
        handleSelectChange,
        handleAddForm,
        handleRemoveForm,
    } = UseProposalCreateAnggaranForm(defaultValue, handleChange, isInitial, anggaranKelompoksRaw);
    
    const RABHeader = () => {
        return (
            <thead>
                <tr>
                    <th width="20%" align="start" className="uppercase pb-2">
                        Kelompok RAB{" "}
                        <small className="text-danger ms-1">*</small>
                    </th>
                    <th width="20%" align="start" className="uppercase pb-2">
                        Komponen <small className="text-danger ms-1">*</small>
                    </th>
                    <th width="20%" align="start" className="uppercase pb-2">
                        Item <small className="text-danger ms-1">*</small>
                    </th>
                    <th width="10%" align="start" className="uppercase pb-2">
                        satuan <small className="text-danger ms-1">*</small>
                    </th>
                    <th width="7%" align="start" className="uppercase pb-2">
                        volume <small className="text-danger ms-1">*</small>
                    </th>
                    <th width="12%" align="start" className="uppercase pb-2">
                        harga satuan{" "}
                        <small className="text-danger ms-1">*</small>
                    </th>
                    <th width="15%" align="start" className="uppercase pb-2">
                        total
                    </th>
                    <th align="start" className="uppercase pb-2"></th>
                </tr>
            </thead>
        );
    };

    const filteredData = forms.filter(
        (anggaran) => !activeFilter || anggaran.kelompok === activeFilter
    );

    const totalAmount = filteredData.reduce(
        (sum, anggaran) => sum + anggaran.total,
        0
    );

    return (
        <div
            className={`border-2 border-${
                isError || maxDana || isAnyPercentageExceeded
                    ? "danger"
                    : borderColor
            } rounded-lg p-5`}
        >
            <div>
                <table className="mt-0 mb-2 w-full text-xs">
                    {RABHeader()}
                    <tbody>
                        {forms.map((form, index) => (
                            <tr
                                key={index}
                                style={{
                                    display:
                                        !activeFilter ||
                                        form.kelompok === activeFilter ||
                                        form.kelompok === null
                                            ? null
                                            : "none",
                                }}
                            >
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <Select2Basic
                                            size="xs"
                                            options={anggaranKelompoks}
                                            handleChange={(value) =>
                                                handleSelectChange(
                                                    "kelompok",
                                                    value,
                                                    index,
                                                    true
                                                )
                                            }
                                            placeholder="Pilih Kelompok RAB"
                                            defaultValue={form.kelompok}
                                            disabled={disabledDelete}
                                        />
                                    </FormGroup>
                                </td>
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <Select2Basic
                                            size="xs"
                                            options={form.anggaranKomponens}
                                            handleChange={(value) =>
                                                handleSelectChange(
                                                    "komponen",
                                                    value,
                                                    index,
                                                    true
                                                )
                                            }
                                            placeholder="Pilih Komponen"
                                            defaultValue={form.komponen}
                                            disabled={disabledDelete}
                                            required
                                        />
                                    </FormGroup>
                                </td>
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <FormInput
                                            size="xs"
                                            name="item"
                                            value={form.item}
                                            onChange={(e) =>
                                                handleChangeForm(e, index)
                                            }
                                            disabled={disabledDelete}
                                            required
                                        />
                                    </FormGroup>
                                </td>
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <FormInput
                                            size="xs"
                                            name="satuan"
                                            value={form.satuan}
                                            disabled
                                            required
                                        />
                                    </FormGroup>
                                </td>
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <FormInput
                                            size="xs"
                                            type="number"
                                            name="volume"
                                            value={form.volume}
                                            onChange={(e) =>
                                                handleChangeForm(e, index)
                                            }
                                            disabled={disabledDelete}
                                            required
                                        />
                                    </FormGroup>
                                </td>
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <RupiahInput
                                            size="xs"
                                            name="harga"
                                            value={form.harga}
                                            onChange={(value) => {
                                                form.harga = value;
                                                handleChangeForm(
                                                    {
                                                        target: {
                                                            name: "harga",
                                                            value,
                                                        },
                                                    },
                                                    index
                                                );
                                            }}
                                            disabled={disabledDelete}
                                            required
                                        />
                                    </FormGroup>
                                </td>
                                <td className="pe-5 pb-3">
                                    <FormGroup>
                                        <RupiahInput
                                            size="xs"
                                            name="total"
                                            value={form.total}
                                            onChange={(value) => {
                                                form.total = value;
                                                handleChangeForm(
                                                    {
                                                        target: {
                                                            name: "total",
                                                            value,
                                                        },
                                                    },
                                                    index
                                                );
                                            }}
                                            disabled={disabledDelete}
                                            readOnly
                                        />
                                    </FormGroup>
                                </td>
                                <td>
                                    <FormGroup className="-mt-3">
                                        <ActionButton
                                            icon="trash"
                                            label="Hapus"
                                            variant="danger"
                                            onClick={() =>
                                                handleRemoveForm(index)
                                            }
                                            disabled={forms.length === 1 || disabledDelete}
                                        />
                                    </FormGroup>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="border-t">
                        <tr>
                            <td
                                colSpan={6}
                                className="pt-2 font-semibold text-base"
                            >
                                Total Anggaran
                            </td>
                            <td className="pt-2 font-semibold text-base">
                                {formatRupiah(totalAmount)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {maxDana || isAnyPercentageExceeded ? (
                <AlertContent
                    icon="exclamation-triangle"
                    color="--color-danger"
                    title="Perhatian"
                    message={
                        maxDana
                            ? "Total RAB sudah melebihi batas maksimal dana yang dapat diajukan"
                            : "Salah satu kelompok RAB ada yang sudah melebih batas persentase"
                    }
                />
            ) : null}
            <Button
                size="sm"
                outline
                onClick={handleAddForm}
                className="text-xs mt-3"
                disabled={disabled}
            >
                Tambah
            </Button>
        </div>
    );
}

export default AnggaranForm;
