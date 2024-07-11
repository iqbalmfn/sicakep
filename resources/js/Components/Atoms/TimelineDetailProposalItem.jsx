import { backgroundLight } from "@/Utils/GlobalFunction";
import Icon from "./Icon";
import { useEffect, useState } from "react";
import { timelineStatusDictionary } from "@/Dictionaries/ProposalDictonaries";
import { usePage } from "@inertiajs/react";

const TimelineDetailProposalItem = ({
    status,
    title,
    message,
    isPublished = false,
    statusAdministrasi = false,
}) => {
    const [statusUtils, setStatusUtils] = useState({
        hexColor: "--color-disabled",
        color: "bg-disabled",
        icon: "lock",
        message: message,
    });
    const proccess = timelineStatusDictionary.filter((stat) =>
        stat.kodeProccess.includes(status)
    );
    const warning = timelineStatusDictionary.filter((stat) =>
        stat.kodeWarning.includes(status)
    );
    const success = timelineStatusDictionary.filter((stat) =>
        stat.kodeSuccess.includes(status)
    );
    const reject = timelineStatusDictionary.filter((stat) =>
        stat.kodeReject.includes(status)
    );

    const { auth } = usePage().props;

    const isOperatorAdmin = auth.user.roles.some(
        (role) => role.name === "Operator" || role.name === "Super Admin"
    );

    useEffect(() => {
        if (
            [7, 71, 72, 73].includes(status) &&
            (!isPublished || isPublished == 0) &&
            !isOperatorAdmin &&
            title === "Penetapan Hasil"
        ) {
            setStatusUtils({
                hexColor: "--color-info",
                color: "bg-info",
                icon: "clock",
                message: "Menunggu pengumuman penetapan hasil",
            });
        } else if (
            [5, 51, 52, 6, 61, 62, 7, 71, 72, 73].includes(status) &&
            (!isPublished || isPublished == 0)  &&
            !isOperatorAdmin &&
            title === "Seleksi Administrasi"
        ) {
            setStatusUtils({
                hexColor: "--color-info",
                color: "bg-info",
                icon: "clock",
                message: "Menunggu pengumuman penetapan hasil",
            });
        } else if (
            [5, 52, 6, 61, 62, 7, 71, 72, 73].includes(status) &&
            (!isPublished || isPublished == 0) &&
            !isOperatorAdmin &&
            title === "Seleksi Substansi"
        ) {
            setStatusUtils({
                hexColor: "--color-info",
                color: "bg-info",
                icon: "clock",
                message: "Menunggu pengumuman penetapan hasil",
            });
        } else if (
            [5, 52, 6, 61, 62, 7, 71, 72, 73].includes(status) &&
            // isPublished &&
            !statusAdministrasi &&
            ((!isOperatorAdmin && isPublished) || (isOperatorAdmin)) &&
            title === "Seleksi Administrasi"
        ) {
            setStatusUtils({
                hexColor: "--color-danger",
                color: "bg-danger",
                icon: "x-lg",
                message: "Proposal tidak lolos seleksi administrasi",
            });
        } else {
            if (proccess && proccess.find((proc) => proc.title === title)) {
                setStatusUtils({
                    hexColor: "--color-info",
                    color: "bg-info",
                    icon: "clock",
                    message: proccess.find((proc) => proc.title === title)
                        ?.messageProccess,
                });
            }

            if (warning && warning.find((proc) => proc.title === title)) {
                setStatusUtils({
                    hexColor: "--color-warning",
                    color: "bg-warning",
                    icon: "exclamation",
                    message: warning.find((proc) => proc.title === title)
                        ?.messageWarning,
                });
            }

            if (success && success.find((suc) => suc.title === title)) {
                setStatusUtils({
                    hexColor: "--color-success",
                    color: "bg-success",
                    icon: "check-lg",
                    message: success.find((proc) => proc.title === title)
                        ?.messageSuccess,
                });
            }

            if (reject && reject.find((suc) => suc.title === title)) {
                setStatusUtils({
                    hexColor: "--color-danger",
                    color: "bg-danger",
                    icon: "x-lg",
                    message: reject.find((proc) => proc.title === title)
                        ?.messageReject,
                });
            }
        }
    }, []);

    return (
        <div className="relative">
            <div
                className="border-2 rounded-lg ps-8 pe-5 py-3 flex flex-col gap-2"
                style={{
                    backgroundColor: backgroundLight(statusUtils.hexColor, 0.2),
                    borderColor: backgroundLight(statusUtils.hexColor, 1),
                    color: backgroundLight(statusUtils.hexColor, 1),
                }}
            >
                <span className="font-extrabold">{title}</span>
                <p className="text-sm">{statusUtils.message}</p>
            </div>
            <div
                className={`w-[35px] h-[35px] absolute -left-4 top-1/2 transform -translate-y-1/2 rounded-full ${statusUtils.color} flex justify-center items-center`}
            >
                <Icon icon={statusUtils.icon} className="text-white absolute" />
            </div>
        </div>
    );
};

export default TimelineDetailProposalItem;
