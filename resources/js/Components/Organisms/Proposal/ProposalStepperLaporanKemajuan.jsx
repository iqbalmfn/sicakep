import { Link } from "@inertiajs/react";
import clsx from "clsx";

const ProposalStepperLaporanKemajuan = ({
    id,
    jenis,
    step,
    form,
    laporanJenis = "kemajuan",
    disabled = false,
}) => {
    let laporan, routeName;
    if (laporanJenis === "kemajuan") {
        laporan = form?.laporan
        routeName = "laporan-kemajuan"
    } else {
        laporan = form?.laporan_akhir
        routeName = "laporan-akhir"
    }
    return (
        <div>
            <div className="mt-2 mb-12">
                <div className="flex items-center w-full mx-auto">
                    <div
                        className={clsx(
                            "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out border-primary"
                        )}
                    ></div>

                    <Link
                        href={route(`proposal.${routeName}.edit`, {
                            jenis: jenis,
                            id: id ? id : "xxxxxx",
                            step: laporan?.step_1 ? "laporan" : "laporan",
                        })}
                        className="flex flex-1 items-center"
                    >
                        <div className="relative">
                            <div className="w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 bg-primary">
                                1
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                                Laporan Kemajuan
                            </div>
                        </div>
                        <div
                            className={clsx(
                                step === "anggaran" || step === "anggaran"
                                    ? "border-primary"
                                    : "border-gray-400",
                                "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                            )}
                        ></div>
                    </Link>

                    <Link
                        href={
                            disabled
                                ? null
                                : route(`proposal.${routeName}.edit`, {
                                      jenis: jenis,
                                      id: id ? id : "xxxxxx",
                                      step: laporan?.step_1
                                          ? "anggaran"
                                          : "laporan",
                                  })
                        }
                        className={clsx(
                            disabled ? "disabled" : null,
                            "flex flex-1 items-center"
                        )}
                    >
                        <div className="relative">
                            <div
                                className={clsx(
                                    step === "anggaran"
                                        ? "bg-primary"
                                        : "bg-gray-400",
                                    "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                                )}
                            >
                                2
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                                Penggunaan Anggaran
                            </div>
                        </div>
                        <div
                            className={clsx(
                                step === "anggaran"
                                    ? "border-primary"
                                    : "border-gray-400",
                                "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                            )}
                        ></div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProposalStepperLaporanKemajuan;
