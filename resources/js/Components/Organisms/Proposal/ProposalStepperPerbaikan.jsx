import { Link } from "@inertiajs/react";
import clsx from "clsx";

const ProposalStepperPerbaikan = ({ id, jenis, step, form }) => {
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
                        href={route("proposal.perbaikan-usulan.edit", {
                            jenis: jenis,
                            id: id ? id : "xxxxxx",
                            step: form?.step_1 ? "substansi" : "detail",
                        })}
                        className="flex flex-1 items-center"
                    >
                        <div className="relative">
                            <div className="w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 bg-primary">
                                1
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                                Substansi
                            </div>
                        </div>
                        <div
                            className={clsx(
                                step === "anggaran" ||
                                    step === "konfirmasi"
                                    ? "border-primary"
                                    : "border-gray-400",
                                "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                            )}
                        ></div>
                    </Link>

                    <Link
                        href={route("proposal.perbaikan-usulan.edit", {
                            jenis: jenis,
                            id: id ? id : "xxxxxx",
                            step: form?.step_1 ? "anggaran" : "detail",
                        })}
                        className="flex flex-1 items-center"
                    >
                        <div className="relative">
                            <div
                                className={clsx(
                                    step === "anggaran" ||

                                        step === "konfirmasi"
                                        ? "bg-primary"
                                        : "bg-gray-400",
                                    "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                                )}
                            >
                                2
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                                Anggaran
                            </div>
                        </div>
                        <div
                            className={clsx(
                                step === "kesanggupan" || step === "konfirmasi"
                                    ? "border-primary"
                                    : "border-gray-400",
                                "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                            )}
                        ></div>
                    </Link>

                    <Link
                        href={route("proposal.perbaikan-usulan.edit", {
                            jenis: jenis,
                            id: id ? id : "xxxxxx",
                            step: form?.step_1 ? "konfirmasi" : "detail",
                        })}
                        className="flex flex-1 items-center"
                    >
                        <div className="relative">
                            <div
                                className={clsx(
                                    step === "konfirmasi"
                                        ? "bg-primary"
                                        : "bg-gray-400",
                                    "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                                )}
                            >
                                3
                            </div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                                Konfirmasi Usulan
                            </div>
                        </div>
                        <div
                            className={clsx(
                                step === "konfirmasi"
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

export default ProposalStepperPerbaikan;
