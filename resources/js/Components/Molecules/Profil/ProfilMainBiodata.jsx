import BiodataItem from "@/Components/Atoms/BiodataItem";
import Icon from "@/Components/Atoms/Icon";
import { Tooltip } from "antd";
import clsx from "clsx";

const ProfilMainBiodata = ({
    foto,
    nama_lengkap,
    jurusan,
    jafung,
    nidn,
    roles,
    is_scraping_sinta = false,
    is_scraping_pddikti = false,
}) => {
    const statusScraping = () => {
        return is_scraping_sinta && is_scraping_pddikti ? (
            <Tooltip title="Sudah Synchronize PDDIKTI & SINTA" className="ms-2">
                <Icon
                    icon="patch-check-fill"
                    className="text-success text-xl"
                />
            </Tooltip>
        ) : (
            <Tooltip
                title={
                    !is_scraping_pddikti && !is_scraping_sinta
                        ? "Belum Synchronize PDDIKTI & SINTA"
                        : !is_scraping_pddikti
                        ? "Belum Synchronize PDDIKTI"
                        : "Belum Synchronize SINTA"
                }
                className="ms-2"
            >
                <Icon
                    icon="patch-exclamation-fill"
                    className={clsx(
                        !is_scraping_pddikti && !is_scraping_sinta
                            ? "text-danger"
                            : !is_scraping_pddikti
                            ? "text-warning"
                            : "text-warning",
                        "text-xl"
                    )}
                />
            </Tooltip>
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            <div className="rounded-lg w-[115px] h-[115px] overflow-hidden">
                <img
                    src={
                        foto
                            ? foto
                            : `https://ui-avatars.com/api/?name=${nama_lengkap}&background=random&color=fff`
                    }
                    alt="foto profil"
                    className="w-[115px] h-[115px] object-cover object-top"
                />
            </div>
            <div className="flex flex-col gap-0 -mt-1">
                <div className="mb-1">
                    <h5 className="font-semibold text-[16px] md:text-xl">
                        {nama_lengkap} {statusScraping()}
                    </h5>
                </div>
                <BiodataItem
                    icon="person-square"
                    label={`NIDN : ${nidn ? nidn : "-"}`}
                />
                <BiodataItem
                    icon="briefcase"
                    label={jurusan ? jurusan.name : "-"}
                />
                <BiodataItem
                    icon="bookmark-star"
                    label={jafung ? jafung : "-"}
                />
                <div className="flex gap-1 mt-1">
                    {roles.map((role, i) => (
                        <span
                            key={i}
                            className="border border-primary text-primary py-0.5 px-3 rounded text-xs"
                        >
                            {role.name === "Jurusan" ? "Kaprodi" : role.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilMainBiodata;
