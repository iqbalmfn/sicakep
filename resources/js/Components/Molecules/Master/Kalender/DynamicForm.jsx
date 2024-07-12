import FormGroup from "@/Components/Atoms/FormGroup";
import FormLabel from "@/Components/Atoms/FormLabel";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import { useEffect, useState } from "react";
import ActionButton from "../../ActionButton";
import FormInput from "@/Components/Atoms/FormInput";
import Button from "@/Components/Atoms/Button";
import Select2Basic from "@/Components/Atoms/Select2Basic";
import { skemaGetDataByIdAPI } from "@/Service/Master/SkemaService";

function DynamicForm({
    title,
    borderColor = "primary",
    options = [],
    hideOptions = [],
    handleChange,
    defaultValue = [{ skema_id: null, tahun: null }],
}) {
    const [forms, setForms] = useState(defaultValue);
  
    // Handle change untuk input text berdasarkan indeks
    const handleChangeForm = (value, index) => {
        const list = [...forms];
        list[index]["tahun"] = value;
        setForms(list);
    };

    // Handle change untuk select box berdasarkan indeks
    const handleSelectChange = async (value, index) => {
        const list = [...forms];
        list[index]["skema_id"] = value;
        setForms(list);

        if (forms[index].tahun === null) {

            const getSkema = await skemaGetDataByIdAPI(value);
            if (getSkema.success) {
                handleChangeForm(getSkema.data.tahun, index);
            }
        }
    };

    // Tambah form baru
    const handleAddForm = () => {
        setForms([...forms, { skema_id: null, tahun: null }]);
    };

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
        <div className={`border-2 border-${borderColor} rounded-lg p-5`}>
            <SectionTitle title={title} />
            <div className="mt-5">
                {forms.map((form, index) => (
                    <div key={index} className="grid grid-cols-12 gap-5 mb-5">
                        <FormGroup className="col-span-8">
                            <FormLabel name="Skema" htmlFor="skema" />
                            <Select2Basic
                                options={options}
                                hideOptions={hideOptions}
                                placeholder="Pilih Skema"
                                defaultValue={form.skema_id}
                                handleChange={(value) =>
                                    handleSelectChange(value, index)
                                }
                            />
                        </FormGroup>
                        <FormGroup className="col-span-3">
                            <FormLabel name="Tahun" htmlFor="tahun" />
                            <FormInput
                                size="sm"
                                name="tahun"
                                value={form.tahun}
                                onChange={(e) =>
                                    handleChangeForm(e.target.value, index)
                                }
                                disabled
                                placeholder="Tahun"
                            />
                        </FormGroup>
                        <FormGroup className="col-span-1">
                            <FormLabel name="&nbsp;" htmlFor="tahun" />
                            <div className="mt-1">
                                <ActionButton
                                    icon="trash"
                                    label="Hapus"
                                    variant="danger"
                                    onClick={() => handleRemoveForm(index)}
                                    disabled={forms.length === 1}
                                />
                            </div>
                        </FormGroup>
                    </div>
                ))}
            </div>
            <Button size="sm" outline onClick={handleAddForm} className="text-xs">
                Tambah
            </Button>
        </div>
    );
}

export default DynamicForm;
