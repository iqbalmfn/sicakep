import { formatDateWithDay, formatRupiah } from "@/Utils/GlobalFunction";
import clsx from "clsx";
import React from "react";

const ListUtang = ({ data }) => {
    return (
        <div className="flex flex-col gap-2 py-4 px-3 max-h-[405px] overflow-y-auto">
            {data.length > 0 ? (
                data.map((utang) => (
                    <div
                        className={clsx(
                            utang.status == 1
                                ? "border-success"
                                : "border-danger",
                            "border rounded"
                        )}
                        key={utang.id}
                    >
                        <div
                            className={clsx(
                                utang.status == 1 ? "bg-success" : "bg-danger",
                                "text-white text-center py-1"
                            )}
                        >
                            {utang.status == 1 ? "Lunas" : "Belum Lunas"}
                        </div>
                        <div
                            className={clsx(
                                utang.status == 1
                                    ? "text-success"
                                    : "text-danger",
                                "flex flex-col text-[13px] px-3 py-2"
                            )}
                        >
                            <div className="font-bold">
                                <i className="bi bi-info-circle me-3"></i>
                                <span>{utang.judul}</span>
                            </div>
                            <div>
                                <i className="bi bi-calendar me-3"></i>
                                <span>
                                    {formatDateWithDay(utang.jatuh_tempo)}
                                </span>
                            </div>
                            <div>
                                <i className="bi bi-currency-dollar me-3"></i>
                                <span>{formatRupiah(utang.nominal)}</span>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="rounded bg-success text-white text-center p-5">
                    Tidak Ada Utang
                </div>
            )}
        </div>
    );
};

export default ListUtang;
