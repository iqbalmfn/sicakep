import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import { backgroundLight } from "@/Utils/GlobalFunction";
import { Link } from "@inertiajs/react";

const ProfilHeader = ({ lecturer }) => {
    return (
        <div
            className="flex justify-between"
            style={{
                backgroundColor: backgroundLight("--color-primary", 0.2),
                color: backgroundLight("--color-primary", 1),
            }}
        >
            <div className="flex flex-col justify-center p-5">
                <span className="font-extrabold text-xl">
                    {lecturer.nama_lengkap}
                </span>
                {lecturer.studyprogram ? (
                    <span>Program Studi {lecturer.studyprogram?.name}</span>
                ) : (
                    <span>(Belum ada program studi)</span>
                )}
                <Link href="/profil">
                    <Button size="sm" className="mt-3"><Icon icon="pencil-square" me={2} /> Edit Profil</Button>
                </Link>
            </div>
            <div>
                <img
                    src={
                        lecturer.foto
                            ? lecturer.foto
                            : `https://ui-avatars.com/api/?name=${lecturer.nama_lengkap}&background=random&color=fff`
                    }
                    alt="foto profil"
                    className="w-[135px] h-full object-cover object-top"
                />
            </div>
        </div>
    );
};

export default ProfilHeader;
