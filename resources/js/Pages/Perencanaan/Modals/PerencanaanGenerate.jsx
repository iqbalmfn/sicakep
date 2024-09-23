import FormError from "@/Components/Atoms/FormError";
import FormGroup from "@/Components/Atoms/FormGroup";
import FormLabel from "@/Components/Atoms/FormLabel";
import FormSelect from "@/Components/Atoms/FormSelect";
import FormTextarea from "@/Components/Atoms/FormTextarea";
import Label from "@/Components/Atoms/Label";
import Modal from "@/Components/Atoms/Modal";
import NameWithAvatar from "@/Components/Atoms/NameWithAvatar";
import RegularSubmitModal from "@/Components/Molecules/RegularSubmitModal";
import {
    diffForHumans,
    formatRupiah,
    listMonths,
    listYears,
    monthNumberToIndonesian,
} from "@/Utils/GlobalFunction";
import clsx from "clsx";

const PerencanaanGenerate = ({
    title,
    showModal,
    closeModal,
    data,
    formData,
    submit,
    handleChange,
    errors,
    processing,
}) => {
    return (
        <Modal
            maxWidth="sm"
            show={showModal}
            onClose={closeModal}
            closeable={false}
        >
            <Modal.Header onClick={closeModal}>
                Salin Perencanaan Anggaran
            </Modal.Header>
            <form onSubmit={submit}>
                <Modal.Body>
                    <div className="grid grid-cols-1 gap-4 py-5">
                        <div className="col-span-1 flex flex-col gap-4 ">
                            <FormGroup>
                                <FormLabel
                                    name="Referensi Data Bulan"
                                    htmlFor="bulan"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="bulan"
                                    name="ref_bulan"
                                    onChange={handleChange}
                                    value={formData.ref_bulan}
                                    isError={errors?.ref_bulan}
                                    required
                                >
                                    <option value="">Pilih Bulan</option>
                                    {listMonths().map((month) => (
                                        <option
                                            key={month.value}
                                            value={month.value}
                                        >
                                            {month.label}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.ref_bulan} />
                            </FormGroup>
                            <FormGroup>
                                <FormLabel
                                    name="Referensi Data Tahun"
                                    htmlFor="tahun"
                                    required
                                />
                                <FormSelect
                                    size="sm"
                                    id="tahun"
                                    name="ref_tahun"
                                    onChange={handleChange}
                                    value={formData.ref_tahun}
                                    isError={errors?.ref_tahun}
                                    required
                                >
                                    <option value="">Pilih Tahun</option>
                                    {listYears().map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </FormSelect>
                                <FormError message={errors?.ref_tahun} />
                            </FormGroup>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <RegularSubmitModal
                        closeModal={closeModal}
                        label="Generate"
                        icon="arrow-clockwise"
                        disabled={
                            processing ||
                            !formData.ref_bulan ||
                            !formData.ref_tahun
                        }
                    />
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default PerencanaanGenerate;
