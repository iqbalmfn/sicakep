import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import { useEffect, useState } from "react";
import ActionButton from "../../ActionButton";
import Select2Basic from "@/Components/Atoms/Select2Basic";
import { luaranAkreditasi, luaranStatus } from "@/Dictionaries/ProposalDictonaries";
import clsx from "clsx";

function LuaranTambahanForm({
    borderColor = "primary",
    handleChange,
    luaranTambahan,
    defaultValue = [
        {
            tahun: null,
            luaran_id: null,
            target: null,
            url: null,
            akreditasi: null,
            status: null,
        },
    ],
    isError = false,
    tahun
}) {
     // konversi data luaranWajib menjadi format untuk select2
     const luarans = luaranTambahan.map((item) => ({
        id: item.luaran_name.id,
        label: `${item.luaran_name.jenis} (${item.luaran_name.kategori})`,
    }));

    const [forms, setForms] = useState(defaultValue);

    // Handle change untuk input text berdasarkan indeks
    const handleChangeForm = (e, index) => {
        const { name, value } = e.target;
        const list = [...forms];
        list[index][name] = value;
        setForms(list);
    };

    // handle select
    const handleSelectChange = async (name, value, index) => {
        const list = [...forms];
        list[index][name] = value;

        setForms(list);
    };

    // Tambah form baru
    const handleAddForm = () => {
        setForms([
            ...forms,
            {
                tahun: null,
                luaran_id: null,
                target: null,
                url: null,
                akreditasi: null,
                status: null,
            },
        ]);
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

    let tahunList = [];
    for (let i = 1; i <= tahun; i++) {
        tahunList.push({id: i, label: `Tahun ${i}`});
    }

    return (
        <div
            className={`border-2 border-${
                isError ? "danger" : borderColor
            } rounded-lg -mt-5 px-5 pb-5`}
        >
            <div>
                {forms.map((form, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between items-center border-b my-5"
                    >
                        <div className="flex flex-col gap-3 w-[96%]">
                            <div className="grid grid-cols-3 gap-5">
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel
                                        name="Tahun"
                                        htmlFor="tahun"
                                        required
                                    />
                                    <Select2Basic
                                        size="sm"
                                        options={tahunList}
                                        handleChange={(value) =>
                                            handleSelectChange(
                                                "tahun",
                                                value,
                                                index
                                            )
                                        }
                                        placeholder="Pilih Tahun"
                                        defaultValue={form.tahun}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel
                                        name="Luaran"
                                        htmlFor="luaran_id"
                                        required
                                    />
                                    <Select2Basic
                                        size="sm"
                                        options={luarans}
                                        handleChange={(value) =>
                                            handleSelectChange(
                                                "luaran_id",
                                                value,
                                                index
                                            )
                                        }
                                        placeholder="Pilih Luaran"
                                        defaultValue={form.luaran_id}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel
                                        name="Target/Keterangan"
                                        htmlFor="target"
                                        required
                                    />
                                    
                                    <FormInput
                                        size="sm"
                                        name="target"
                                        value={form.target}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Nama Jurnal/Penerbit /keterangan sejenis lainnya"
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="grid grid-cols-3 gap-5 mb-5">
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel name="URL" htmlFor="url" />
                                    <FormInput
                                        size="sm"
                                        name="url"
                                        value={form.url}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan URL Jurnal/strip (-) jika tidak ada url"
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel
                                        name="Akreditasi"
                                        htmlFor="akreditasi"
                                    />
                                    <Select2Basic
                                        size="sm"
                                        options={luaranAkreditasi}
                                        handleChange={(value) =>
                                            handleSelectChange(
                                                "akreditasi",
                                                value,
                                                index,
                                            )
                                        }
                                        placeholder="Pilih Akreditasi"
                                        defaultValue={form.akreditasi}
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel name="Status" htmlFor="status" required />
                                    <Select2Basic
                                        size="sm"
                                        options={luaranStatus}
                                        handleChange={(value) =>
                                            handleSelectChange(
                                                "status",
                                                value,
                                                index,
                                                true
                                            )
                                        }
                                        placeholder="Pilih Status"
                                        defaultValue={form.status}
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
                                    // disabled={forms.length === 1}
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
                className={clsx(forms.length === 0 ? "mt-5" : null, "text-xs")}
            >
                Tambah
            </Button>
        </div>
    );
}

export default LuaranTambahanForm;
