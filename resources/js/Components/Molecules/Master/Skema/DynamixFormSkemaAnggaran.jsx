import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import { useEffect, useState } from "react";
import ActionButton from "../../ActionButton";
import Select2Basic from "@/Components/Atoms/Select2Basic";
import FormError from "@/Components/Atoms/FormError";
import { Tooltip } from "antd";
import Icon from "@/Components/Atoms/Icon";

function DynamicFormSkemaAnggaran({
    title,
    borderColor = "primary",
    options = [],
    handleChange,
    defaultValue = [{ anggaran_kelompok_id: null, persentase: null }],
    totalPersentase,
    isError = false,
}) {
    const [forms, setForms] = useState(defaultValue);

    // filter options
    const filterOptions = (options, data) => {
        // Ambil semua anggaran_kelompok_id dari data
        const idsToRemove = data.map((item) => item.anggaran_kelompok_id);

        // Filter options untuk menghilangkan objek dengan id yang ada di idsToRemove
        return options.filter((option) => !idsToRemove.includes(option.id));
    };
    let filteredOptions = [];
    filteredOptions = filterOptions(options, forms);

    // Handle change untuk input text berdasarkan indeks
    const handleChangeForm = (e, index) => {
        const { name, value } = e.target;
        const list = [...forms];
        list[index][name] = value;
        setForms(list);
    };

    // Handle change untuk select box berdasarkan indeks
    const handleSelectChange = async (value, index) => {
        const list = [...forms];
        list[index]["anggaran_kelompok_id"] = value;
        setForms(list);
    };

    // Tambah form baru
    const handleAddForm = () => {
        setForms([...forms, { anggaran_kelompok_id: null, persentase: null }]);
    };

    // reset form ketika data options berubah
    useEffect(() => {
        setForms(defaultValue);
    }, [options]);

    // Hapus form berdasarkan indeks
    const handleRemoveForm = (index) => {
        const list = [...forms];
        list.splice(index, 1);
        setForms(list);
    };

    useEffect(() => {
        handleChange(forms);
    }, [forms]);

    return (
        <div>
            <div
                className={`border-2 border-${
                    isError || totalPersentase() > 100 ? "danger" : borderColor
                } rounded-lg p-5`}
            >
                <div className="flex items-end gap-2">
                    <SectionTitle title={title} />
                    <Tooltip
                        title="Pilih kelompok anggaran untuk dimunculkan di RAB saat pengusulan proposal"
                        className="cursor-pointer"
                    >
                        <Icon icon="question-circle-fill" />
                    </Tooltip>
                </div>
                <div className="mt-5">
                    {forms.map((form, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-12 gap-3 mb-3"
                        >
                            <FormGroup className="col-span-8">
                                <FormLabel
                                    name="Kelompok Anggaran"
                                    htmlFor="kelompok_anggaran_id"
                                />
                                <Select2Basic
                                    options={options}
                                    availableOptions={filteredOptions}
                                    placeholder="Pilih Kelompok Anggaran"
                                    defaultValue={form.anggaran_kelompok_id}
                                    handleChange={(value) =>
                                        handleSelectChange(value, index)
                                    }
                                />
                            </FormGroup>
                            <FormGroup className="col-span-3">
                                <div className="flex gap-2">
                                    <FormLabel
                                        name="(%)"
                                        htmlFor="persentase"
                                    />
                                    <Tooltip
                                        title="Apabila tidak diisi, maka persentasenya tidak dibatasi; Total persentase tidak boleh melebihi 100%"
                                        className="cursor-pointer"
                                    >
                                        <Icon icon="question-circle-fill" />
                                    </Tooltip>
                                </div>
                                <FormInput
                                    size="sm"
                                    type="number"
                                    name="persentase"
                                    value={form.persentase}
                                    onChange={(e) => handleChangeForm(e, index)}
                                />
                            </FormGroup>
                            <FormGroup className="col-span-1">
                                <FormLabel name="&nbsp;" />
                                <div className="mt-1">
                                    <ActionButton
                                        icon="trash"
                                        label="Hapus"
                                        variant="danger"
                                        className="-ms-1"
                                        onClick={() => handleRemoveForm(index)}
                                        disabled={forms.length === 1}
                                    />
                                </div>
                            </FormGroup>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-12 gap-3 mb-3">
                    <div className="col-span-8">
                        <Button
                            size="sm"
                            outline
                            onClick={handleAddForm}
                            className="text-xs"
                            disabled={totalPersentase() >= 100}
                        >
                            Tambah
                        </Button>
                    </div>
                    <div className="col-span-3 text-center">
                        <span className="text-lg font-semibol">
                            {totalPersentase()} %
                        </span>
                    </div>
                </div>
            </div>
            <FormError
                message={
                    totalPersentase() > 100
                        ? "Persentase tidak boleh melebihi 100%"
                        : null
                }
            />
        </div>
    );
}

export default DynamicFormSkemaAnggaran;
