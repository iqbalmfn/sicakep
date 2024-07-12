import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import { useEffect, useState } from "react";
import ActionButton from "../../ActionButton";
import HelpIcon from "@/Components/Atoms/HelpIcon";
import Icon from "@/Components/Atoms/Icon";
import { downloadFile } from "@/Utils/GlobalFunction";
import { usePage } from "@inertiajs/react";

function DetailFormMitra({
    title,
    jenis,
    borderColor = "primary",
    handleChange,
    defaultValue,
    isError = false,
}) {
    const { setting } = usePage().props;

    const [forms, setForms] = useState(defaultValue);

    // Handle change untuk input text berdasarkan indeks
    const handleChangeForm = (e, index) => {
        const { name, type } = e.target;
        const list = [...forms];

        if (type === "file") {
            let file = e.target.files[0];

            // Maksimum ukuran file dalam byte
            const maxSize = 1024 * 1024; // 1 MB

            if (file) {
                // Memeriksa ukuran file
                if (file.size > maxSize) {
                    alert(
                        "Ukuran file terlalu besar. Maksimum ukuran file adalah 1 MB."
                    );
                    return; // Menghentikan proses jika ukuran file terlalu besar
                }

                // Memeriksa ekstensi file (opsional)
                if (!file.name.endsWith(".pdf")) {
                    alert("File yang diunggah harus bertipe pdf.");
                    return; // Menghentikan proses jika ekstensi file tidak valid
                }

                list[index][name] = file;
            }
        } else {
            list[index][name] = e.target.value;
        }

        setForms(list);
    };

    const handleReupload = (index) => {
        const list = [...forms];
        list[index]["surat_kesanggupan"] = null;
        list[index]["surat_kesanggupan_stored"] = null;
        setForms(list);
    };

    // Tambah form baru
    const handleAddForm = () => {
        setForms([
            ...forms,
            {
                nama: null,
                pimpinan: null,
                jenis: null,
                jarak: null,
                email: null,
                no_hp: null,
                dana: null,
                surat_kesanggupan: null,
                surat_kesanggupan_stored: null,
                alamat: null,
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

    return (
        <div
            className={`border-2 border-${
                isError ? "danger" : borderColor
            } rounded-lg p-5`}
        >
            <SectionTitle title={title} />
            <div className="mt-5">
                {forms.map((form, index) => (
                    <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:justify-between items-center border-b my-5"
                    >
                        <div className="flex flex-col gap-3 w-[96%]">
                            <div className="grid grid-cols-4 gap-5">
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Nama Instansi/Lembaga/Perusahaan"
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
                                        placeholder="Masukkan Nama Instansi/Lembaga/Perusahaan"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Nama Pimpinan"
                                        htmlFor="pimpinan"
                                        required
                                    />
                                    <FormInput
                                        size="sm"
                                        name="pimpinan"
                                        value={form.pimpinan}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Nama Pimpinan"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <div className="flex gap-1">
                                        <FormLabel
                                            name="Jenis"
                                            htmlFor="jenis"
                                            required
                                        />
                                        <HelpIcon title="Misal : Perusahaan/Instansi/Universitas/dll." />
                                    </div>
                                    <FormInput
                                        size="sm"
                                        name="jenis"
                                        value={form.jenis}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Jenis Mitra"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Jarak"
                                        htmlFor="jarak"
                                        required
                                    />
                                    <FormInput
                                        size="sm"
                                        type="number"
                                        name="jarak"
                                        value={form.jarak}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Jarak"
                                        suffix="KM"
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="grid grid-cols-4 gap-5">
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel name="Email" htmlFor="email" />
                                    <FormInput
                                        size="sm"
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Email"
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Nomor Handphone"
                                        htmlFor="no_hp"
                                    />
                                    <FormInput
                                        size="sm"
                                        name="no_hp"
                                        value={form.no_hp}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Nomor Handphone"
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Dana (Isi 0 jika tidak ada)"
                                        htmlFor="dana"
                                        required
                                    />
                                    <FormInput
                                        type="number"
                                        size="sm"
                                        name="dana"
                                        value={form.dana}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Jumlah Dana"
                                        prefix="Rp"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="col-span-4 sm:col-span-1">
                                    <FormLabel
                                        name="Alamat"
                                        htmlFor="alamat"
                                        required
                                    />
                                    <FormInput
                                        size="sm"
                                        name="alamat"
                                        value={form.alamat}
                                        onChange={(e) =>
                                            handleChangeForm(e, index)
                                        }
                                        placeholder="Masukkan Alamat"
                                        required
                                    />
                                </FormGroup>
                            </div>
                            <div className="mb-5 mt-2 flex gap-3 items-center">
                                {form.surat_kesanggupan !== null ||
                                form.surat_kesanggupan_stored ? (
                                    <button
                                        type="button"
                                        className="bg-gray-600 hover:bg-gray-700 transition-all duration-300 ease-in-out text-white px-4 py-2 rounded-lg"
                                        onClick={() => handleReupload(index)}
                                    >
                                        <Icon icon="arrow-clockwise" me={2} />{" "}
                                        Unggah Ulang
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-0">
                                        <div className="flex gap-1">
                                            <label
                                                htmlFor={`surat_kesanggupan_${index}`}
                                                className="border bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
                                            >
                                                <Icon icon="upload" me={2} />{" "}
                                                Upload Surat Kesanggupan Mitra
                                            </label>
                                            {setting.template_mitra ? (
                                                <a
                                                    href={`/storage/setting/${jenis}/${setting.template_mitra}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button size="sm" outline>
                                                        <Icon
                                                            icon="download"
                                                            me={2}
                                                        />{" "}
                                                        Unduh Template
                                                    </Button>
                                                </a>
                                            ) : null}
                                        </div>
                                        <small>
                                            <i className="bi bi-info-circle me-2"></i>{" "}
                                            File PDF max 1MB
                                        </small>
                                    </div>
                                )}

                                <input
                                    id={`surat_kesanggupan_${index}`}
                                    type="file"
                                    className="hidden"
                                    name="surat_kesanggupan"
                                    accept="application/pdf"
                                    onChange={(e) => handleChangeForm(e, index)}
                                    required={!form.surat_kesanggupan_stored}
                                />
                                <div>
                                    {form.surat_kesanggupan ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                downloadFile(
                                                    URL.createObjectURL(
                                                        form.surat_kesanggupan
                                                    ),
                                                    form.surat_kesanggupan.name
                                                )
                                            }
                                            className="text-primary"
                                        >
                                            <Icon
                                                icon="file-earmark-pdf-fill"
                                                me={1}
                                            />{" "}
                                            {form.surat_kesanggupan.name}
                                        </button>
                                    ) : form.surat_kesanggupan_stored ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                downloadFile(
                                                    `/storage/proposal/mitra/${form.surat_kesanggupan_stored}`,
                                                    form.surat_kesanggupan_stored
                                                )
                                            }
                                            className="text-primary"
                                        >
                                            <Icon
                                                icon="file-earmark-pdf-fill"
                                                me={1}
                                            />{" "}
                                            {form.surat_kesanggupan_stored}
                                        </button>
                                    ) : null}
                                </div>
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

export default DetailFormMitra;
