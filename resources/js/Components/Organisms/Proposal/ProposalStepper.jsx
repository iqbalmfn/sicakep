import Icon from "@/Components/Atoms/Icon";
import { Link } from "@inertiajs/react";
import clsx from "clsx";

const ProposalStepper = ({ jenis, step, form }) => {
    return (
        <div className="mt-5 mb-12">
            <div className="flex items-center w-full mx-auto">
                <div
                    className={clsx(
                        "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out border-primary"
                    )}
                ></div>

                <Link
                    href={route("proposal.usulan.create", jenis)}
                    className="flex flex-1 items-center"
                >
                    <div className="relative">
                        <div
                            className={clsx(
                                "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 bg-primary"
                            )}
                        >
                            {form?.step_1 ? (
                                <Icon icon="check-lg " />
                            ) : (
                                "1"
                            )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                            Detail Proposal
                        </div>
                    </div>
                    <div
                        className={clsx(
                            step === "substansi" ||
                                step === "anggaran" ||
                                step === "luaran" ||
                                step === "rangkuman"
                                ? "border-primary"
                                : "border-gray-400",
                            "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                        )}
                    ></div>
                </Link>

                <Link
                    href={route("proposal.usulan.create", {
                        jenis,
                        step: form?.step_1 ? "substansi" : "detail",
                    })}
                    className="flex flex-1 items-center"
                >
                    <div className="relative">
                        <div
                            className={clsx(
                                step === "substansi" ||
                                    step === "anggaran" ||
                                    step === "luaran" ||
                                    step === "rangkuman"
                                    ? "bg-primary"
                                    : "bg-gray-400",
                                "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                            )}
                        >
                            {form?.step_2 ? (
                                <Icon icon="check-lg " />
                            ) : (
                                "2"
                            )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                            Substansi
                        </div>
                    </div>
                    <div
                        className={clsx(
                            step === "anggaran" ||
                                step === "luaran" ||
                                step === "rangkuman"
                                ? "border-primary"
                                : "border-gray-400",
                            "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                        )}
                    ></div>
                </Link>

                <Link
                    href={route("proposal.usulan.create", {
                        jenis,
                        step: form?.step_1 ? "anggaran" : "detail",
                    })}
                    className="flex flex-1 items-center"
                >
                    <div className="relative">
                        <div
                            className={clsx(
                                step === "anggaran" ||
                                    step === "luaran" ||
                                    step === "rangkuman"
                                    ? "bg-primary"
                                    : "bg-gray-400",
                                "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                            )}
                        >
                            {form?.step_3 ? (
                                <Icon icon="check-lg " />
                            ) : (
                                "3"
                            )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                            Anggaran
                        </div>
                    </div>
                    <div
                        className={clsx(
                            step === "luaran" || step === "rangkuman"
                                ? "border-primary"
                                : "border-gray-400",
                            "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                        )}
                    ></div>
                </Link>

                <Link
                    href={route("proposal.usulan.create", {
                        jenis,
                        step: form?.step_1 ? "luaran" : "detail",
                    })}
                    className="flex flex-1 items-center"
                >
                    <div className="relative">
                        <div
                            className={clsx(
                                step === "luaran" || step === "rangkuman"
                                    ? "bg-primary"
                                    : "bg-gray-400",
                                "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                            )}
                        >
                            {form?.step_4 ? (
                                <Icon icon="check-lg " />
                            ) : (
                                "4"
                            )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                            Luaran
                        </div>
                    </div>
                    <div
                        className={clsx(
                            step === "rangkuman"
                                ? "border-primary"
                                : "border-gray-400",
                            "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                        )}
                    ></div>
                </Link>

                <Link
                    href={route("proposal.usulan.create", {
                        jenis,
                        step: form?.step_1 ? "rangkuman" : "detail",
                    })}
                    className="flex flex-1 items-center"
                >
                    <div className="relative">
                        <div
                            className={clsx(
                                step === "rangkuman"
                                    ? "bg-primary"
                                    : "bg-gray-400",
                                "w-8 h-8 text-white font-semibold rounded-full flex justify-center items-center z-10 hover:bg-primary"
                            )}
                        >
                            {form?.step_5 ? (
                                <Icon icon="check-lg " />
                            ) : (
                                "5"
                            )}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 text-center mt-1 whitespace-nowrap">
                            Rangkuman
                        </div>
                    </div>
                    <div
                        className={clsx(
                            step === "rangkuman"
                                ? "border-primary"
                                : "border-gray-400",
                            "flex-1 mx-2 border-t-4 transition duration-500 ease-in-out"
                        )}
                    ></div>
                </Link>
            </div>
        </div>
    );
};

export default ProposalStepper;
