import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormInput from "@/Components/Atoms/FormInput";
import FormLabel from "@/Components/Atoms/FormLabel";
import Select2Basic from "@/Components/Atoms/Select2Basic";
import RegularSubmit from "@/Components/Molecules/RegularSubmit";
import { religionLists } from "@/Dictionaries/ProfilEditDictionaries";

const ProfileEdit = ({
    data,
    handleChange,
    handleChangeAgama,
    errors,
    submit,
    processing,
    studyprogramList,
    jafungList,
    handleChangeStudyprogram,
    handleChangeJafung
}) => {
    
    return (
        <form onSubmit={submit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="col-span-1 flex flex-col gap-4">
                    <FormGroup>
                        <FormLabel
                            name="Nama Lengkap"
                            htmlFor="nama_lengkap"
                            required
                        />
                        <FormInput
                            size="sm"
                            id="nama_lengkap"
                            name="nama_lengkap"
                            onChange={handleChange}
                            defaultValue={data.nama_lengkap}
                            placeholder="Masukkan Nama Lengkap"
                            isError={errors?.nama_lengkap}
                        />
                        <FormError message={errors?.nama_lengkap} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="NIDN" htmlFor="nidn" required />
                        <FormInput
                            size="sm"
                            id="nidn"
                            name="nidn"
                            onChange={handleChange}
                            defaultValue={data.nidn}
                            placeholder="Masukkan NIDN"
                            isError={errors?.nidn}
                        />
                        <FormError message={errors?.nidn} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="NIP" htmlFor="nip"/>
                        <FormInput
                            size="sm"
                            id="nip"
                            name="nip"
                            onChange={handleChange}
                            defaultValue={data.nip}
                            placeholder="Masukkan NIP"
                            isError={errors?.nip}
                        />
                        <FormError message={errors?.nip} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="NIK" htmlFor="nik" required />
                        <FormInput
                            size="sm"
                            id="nik"
                            name="nik"
                            onChange={handleChange}
                            defaultValue={data.nik}
                            placeholder="Masukkan NIK"
                            isError={errors?.nik}
                        />
                        <FormError message={errors?.nik} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="Agama" htmlFor="agama" required />
                        <Select2Basic
                            options={religionLists}
                            placeholder="Pilih Agama"
                            handleChange={handleChangeAgama}
                            isError={errors?.agama}
                            defaultValue={data.agama}
                        />
                        <FormError message={errors?.agama} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel
                            name="Tanggal Lahir"
                            htmlFor="tanggal_lahir"
                            required
                        />
                        <FormInput
                            size="sm"
                            type="date"
                            id="tanggal_lahir"
                            name="tanggal_lahir"
                            onChange={handleChange}
                            defaultValue={data.tanggal_lahir}
                            placeholder="Masukkan Tanggal Lahir"
                            isError={errors?.tanggal_lahir}
                        />
                        <FormError message={errors?.tanggal_lahir} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="Email" htmlFor="email" required />
                        <FormInput
                            size="sm"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            defaultValue={data.email}
                            placeholder="Masukkan Email"
                            isError={errors?.email}
                        />
                        <FormError message={errors?.email} />
                    </FormGroup>
                </div>
                <div className="col-span-1 flex flex-col gap-4">
                    <FormGroup>
                        <FormLabel name="Program Studi" htmlFor="studyprogram_id" required />
                        <Select2Basic
                            options={studyprogramList}
                            placeholder="Pilih Program Studi"
                            handleChange={handleChangeStudyprogram}
                            isError={errors?.studyprogram_id}
                            defaultValue={data.studyprogram_id}
                        />
                        <FormError message={errors?.studyprogram_id} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="Jabatan Fungsional" htmlFor="studyprogram_id" />
                        <Select2Basic
                            options={jafungList}
                            placeholder="Pilih Jabatan Fungsional"
                            handleChange={handleChangeJafung}
                            isError={errors?.jafung}
                            defaultValue={data.jafung}
                        />
                        <FormError message={errors?.jafung} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="ID SINTA" htmlFor="id_sinta" required />
                        <FormInput
                            size="sm"
                            id="id_sinta"
                            name="id_sinta"
                            onChange={handleChange}
                            defaultValue={data.id_sinta}
                            placeholder="Masukkan ID SINTA"
                            isError={errors?.id_sinta}
                        />
                        <FormError message={errors?.id_sinta} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="ID Google Scholar" htmlFor="id_google_scholar" required />
                        <FormInput
                            size="sm"
                            id="id_google_scholar"
                            name="id_google_scholar"
                            onChange={handleChange}
                            defaultValue={data.id_google_scholar}
                            placeholder="Masukkan ID Google Scholar"
                            isError={errors?.id_google_scholar}
                        />
                        <FormError message={errors?.id_google_scholar} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="ID Scopus" htmlFor="id_scopus" />
                        <FormInput
                            size="sm"
                            id="id_scopus"
                            name="id_scopus"
                            onChange={handleChange}
                            defaultValue={data.id_scopus}
                            placeholder="Masukkan ID Scopus"
                            isError={errors?.id_scopus}
                        />
                        <FormError message={errors?.id_scopus} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="No. Rekening Mandiri" htmlFor="rekening_nomor" required />
                        <FormInput
                            size="sm"
                            id="rekening_nomor"
                            name="rekening_nomor"
                            onChange={handleChange}
                            defaultValue={data.rekening_nomor}
                            placeholder="Masukkan No. Rekening Mandiri"
                            isError={errors?.rekening_nomor}
                        />
                        <FormError message={errors?.rekening_nomor} />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel name="Nama Rekening Mandiri" htmlFor="rekening_nama" required />
                        <FormInput
                            size="sm"
                            id="rekening_nama"
                            name="rekening_nama"
                            onChange={handleChange}
                            defaultValue={data.rekening_nama}
                            placeholder="Masukkan Nama Rekening Mandiri"
                            isError={errors?.rekening_nama}
                        />
                        <FormError message={errors?.rekening_nama} />
                    </FormGroup>
                </div>
            </div>
            <div className="mt-10">
                <RegularSubmit back="/profil" label="Simpan" processing={processing}  />
            </div>
        </form>
    );
};

export default ProfileEdit;
