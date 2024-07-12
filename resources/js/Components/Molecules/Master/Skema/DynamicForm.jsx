import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import { useEffect, useState } from "react";
import ActionButton from "../../ActionButton";

function DynamicForm({
    title,
    borderColor = "primary",
    handleChange,
    defaultValue = [{ butir: null, bobot: null }],
    isError = false
}) {
    const [forms, setForms] = useState(defaultValue);
  
    // Handle change untuk input text berdasarkan indeks
    const handleChangeForm = (e, index) => {
        const {name, value} = e.target
        const list = [...forms];
        list[index][name] = value;
        setForms(list);
    };

    // Tambah form baru
    const handleAddForm = () => {
        setForms([...forms, { butir: null, bobot: null }]);
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
        <div className={`border-2 border-${isError ? "danger" : borderColor} rounded-lg p-5`}>
            <SectionTitle title={title} />
            <div className="mt-5">
                {forms.map((form, index) => (
                    <div key={index} className="grid grid-cols-12 gap-5 mb-5">
                        <FormGroup className="col-span-8">
                            <FormLabel name="Butir Penilaian" htmlFor="butir" />
                            <FormInput
                                size="sm"
                                name="butir"
                                value={form.butir}
                                onChange={(e) =>
                                    handleChangeForm(e, index)
                                }
                                placeholder="Masukkan Butir Peniliain"
                            />
                        </FormGroup>
                        <FormGroup className="col-span-3">
                            <FormLabel name="Bobot" htmlFor="bobot" />
                            <FormInput
                                size="sm"
                                type="number"
                                name="bobot"
                                value={form.bobot}
                                onChange={(e) =>
                                    handleChangeForm(e, index)
                                }
                                placeholder="Masukkan Bobot"
                            />
                        </FormGroup>
                        <FormGroup className="col-span-1">
                            <FormLabel name="&nbsp;" />
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
