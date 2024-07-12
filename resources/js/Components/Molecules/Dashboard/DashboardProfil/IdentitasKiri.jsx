import DashboardProfilIdentitasItem from "@/Components/Atoms/DashboardProfilIdentitasItem";
import { usePage } from "@inertiajs/react";

const IdentitasKiri = ({ lecturer }) => {
    const { universitas } = usePage().props;
    return (
        <div className="col-span-1">
            <div className="flex flex-col gap-4">
                <DashboardProfilIdentitasItem
                    label="NIDN/NIDK"
                    value={lecturer.nidn ? lecturer.nidn : "-"}
                />
                <DashboardProfilIdentitasItem
                    label="Institusi"
                    value={universitas.nm_lemb}
                />
                <DashboardProfilIdentitasItem
                    label="Program Studi"
                    value={
                        lecturer.studyprogram
                            ? lecturer.studyprogram?.name
                            : "-"
                    }
                />
                <DashboardProfilIdentitasItem
                    label="Jenjang Pendidikan"
                    value={
                        lecturer.pendidikan_terakhir
                            ? lecturer.pendidikan_terakhir
                            : "-"
                    }
                />
                <DashboardProfilIdentitasItem
                    label="Jabatan Akademik"
                    value={lecturer.jafung ? lecturer.jafung : "-"}
                />
            </div>
        </div>
    );
};

export default IdentitasKiri;
