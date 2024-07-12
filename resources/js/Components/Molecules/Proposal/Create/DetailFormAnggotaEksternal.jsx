import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import { useEffect, useState } from "react";
import ActionButton from "../../ActionButton";

function DetailFormAnggotaEksternal({
    title,
    borderColor = "primary",
    handleChange,
    defaultValue,
    isError = false,
}) {
    const [forms, setForms] = useState(defaultValue);

    const types = ["KTP", "SIM"];

    // Tambah form baru
    const handleAddForm = () => {
        setForms([
            ...forms,
            {
                jenis_identitas: null,
                no_identitas: null,
                nama: null,
                institusi: null,
                bidang_tugas: null,
            },
        ]);
    };

    // Handle change untuk input text berdasarkan indeks
    const handleChangeForm = (e, index) => {
        const { name, value } = e.target;
        const list = [...forms];
        list[index][name] = value;

        setForms(list);
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
        <div
            className={`border-2 border-${
                isError ? "danger" : borderColor
            } rounded-lg p-5 mb-10`}
        >
            <SectionTitle title={title} />
            <div className="mt-5">
                {forms.map((form, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between items-center my-5"
                    >
                        <div className="flex flex-col gap-3 w-[96%]">
                            <div className="grid grid-cols-4 gap-5">
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Jenis Identitas"
                                        htmlFor="jenis_identitas"
                                        required
                                    />
                                    <FormSelect
                                        size="sm"
                                        name="jenis_identitas"
                                        value={form.jenis_identitas}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        required
                                    >
                                        <option value="">
                                            Pilih Jenis Identitas
                                        </option>
                                        {types.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </FormSelect>
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="No Identitas"
                                        htmlFor="no_identitas"
                                        required
                                    />
                                    <FormInput
                                        size="sm"
                                        name="no_identitas"
                                        value={form.no_identitas}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan No Identitas"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Nama Anggota"
                                        htmlFor="nama"
                                        required
                                    />
                                    <FormInput
                                        size="sm"
                                        name="nama"
                                        value={form.nama}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Nama Anggota"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Instutisi/Lembaga/Perusahaan"
                                        htmlFor="institusi"
                                        required
                                    />
                                    <FormInput
                                        size="sm"
                                        name="institusi"
                                        value={form.institusi}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Nama Institusi/Lembaga/Perusahaan"
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="grid grid-cols-1 gap-5">
                                <FormGroup className="col-span-1">
                                    <FormLabel
                                        name="Uraian Tugas"
                                        htmlFor="bidang_tugas"
                                        required
                                    />
                                    <FormTextarea
                                        name="bidang_tugas"
                                        placeholder="Tulis uraian tugas..."
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        rows={3}
                                        value={form.bidang_tugas}
                                        required
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <FormGroup className="-mt-10 sm:-mt-9 col-span-1">
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
            <Button
                size="sm"
                outline
                onClick={handleAddForm}
                className="text-xs"
            >
                Tambah
            </Button>
        </div>
    );
}

export default DetailFormAnggotaEksternal;
