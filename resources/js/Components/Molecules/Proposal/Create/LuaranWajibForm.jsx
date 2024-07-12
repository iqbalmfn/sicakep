import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import Select2Basic from "@/Components/Atoms/Select2Basic";
import {
    luaranAkreditasi,
    luaranStatus,
} from "@/Dictionaries/ProposalDictonaries";
import { useEffect, useState } from "react";

function LuaranWajibForm({
    borderColor = "primary",
    handleChange,
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
    tahun,
    luaranWajib,
}) {
    // konversi data luaranWajib menjadi format untuk select2
    const luarans = luaranWajib.map((item) => ({
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

    useEffect(() => {
        handleChange(forms);
    }, [forms]);

    let tahunList = [];
    for (let i = 1; i <= tahun; i++) {
        tahunList.push({ id: i, label: `Tahun ${i}` });
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
                        <div className="flex flex-col gap-3 w-full">
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
                                                index,
                                                true
                                            )
                                        }
                                        placeholder="Pilih Tahun"
                                        defaultValue={form.tahun}
                                        required
                                        disabled
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel
                                        name="Luaran"
                                        htmlFor="luaran"
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
                                        disabled
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
                                    <FormLabel
                                        name="URL"
                                        htmlFor="url"
                                        required
                                    />
                                    
                                    <FormInput
                                        size="sm"
                                        name="url"
                                        value={form.url}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan URL Jurnal/strip (-) jika tidak ada url"
                                        required
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
                                                true
                                            )
                                        }
                                        placeholder="Pilih Akreditasi"
                                        defaultValue={form.akreditasi}
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-3 sm:col-span-1">
                                    <FormLabel
                                        name="Status"
                                        htmlFor="status"
                                        required
                                    />
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
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LuaranWajibForm;
