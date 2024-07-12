import DashboardHeaderCard from "@/Components/Atoms/DashboardHeaderCard";
import { backgroundLight } from "@/Utils/GlobalFunction";
import { usePage } from "@inertiajs/react";

const DashboardHeader = () => {
    const { universitas } = usePage().props;
    return (
        <div className="rounded-lg overflow-hidden mb-10">
            <div
                className="p-8 bg-primary"
                style={{
                    backgroundImage: `linear-gradient(${backgroundLight(
                        "--color-primary",
                        0.9
                    )}, ${backgroundLight(
                        "--color-primary",
                        0.9
                    )}), url(${universitas.logo})`,
                    backgroundSize: "25%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex flex-col text-white pb-10 text-lg">
                    <span>Anda dapat mengajukan usulan</span>
                    <span>terkait dengan layanan berikut :</span>
                </div>
                <div className="flex justify-center gap-5">
                    <div className="absolute md:-mt-5 flex gap-5">
                        <DashboardHeaderCard
                            link="/proposal/penelitian/usulan"
                            icon="search"
                            label="Penelitian"
                        />
                        <DashboardHeaderCard
                            link="/proposal/pengabdian/usulan"
                            icon="star"
                            label="Pengabdian"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;
