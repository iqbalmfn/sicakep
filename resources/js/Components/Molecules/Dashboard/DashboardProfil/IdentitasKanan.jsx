import DashboardProfilIdentitasItem from "@/Components/Atoms/DashboardProfilIdentitasItem";
import { formatDate } from "@/Utils/GlobalFunction";

const IdentitasKanan = ({ lecturer }) => {
    return (
        <div className="col-span-1">
            <div className="flex flex-col gap-4">
                <DashboardProfilIdentitasItem
                    label="NIP"
                    value={lecturer.nip ? lecturer.nip : "-"}
                />
                <DashboardProfilIdentitasItem
                    label="No KTP"
                    value={lecturer.nik ? lecturer.nik : "-"}
                />
                <DashboardProfilIdentitasItem
                    label="Tempat Tanggal Lahir"
                    value={
                        lecturer.is_scraping_pddikti
                            ? `${lecturer.tempat_lahir}, ${formatDate(
                                  lecturer.tanggal_lahir
                              )}`
                            : "-"
                    }
                />
                <DashboardProfilIdentitasItem
                    label="Agama"
                    value={lecturer.agama ? lecturer.agama : "-"}
                />
                <DashboardProfilIdentitasItem
                    label="Alamat Surel"
                    value={lecturer.email ? lecturer.email : "-"}
                />
            </div>
        </div>
    );
};

export default IdentitasKanan;
