import { formatDateWithDay, formatRupiah } from "@/Utils/GlobalFunction";
import clsx from "clsx";
import React from "react";

const ListUtang = ({ data }) => {
    return (
        <div className="flex flex-col gap-4 py-4 px-3 max-h-[405px] overflow-y-auto">
            {data.length > 0 ? (
                data.map((utang) => (
                    <div
                        className={clsx(
                            utang.status == 1
                                ? "border-success/30 shadow-[0_4px_15px_rgba(0,255,136,0.05)]"
                                : "border-danger/30 shadow-[0_4px_15px_rgba(255,0,85,0.05)]",
                            "border rounded-xl bg-slate-800/40 backdrop-blur-md overflow-hidden"
                        )}
                        key={utang.id}
                    >
                        <div
                            className={clsx(
                                utang.status == 1 ? "bg-success/20 text-success" : "bg-danger/20 text-danger",
                                "text-center py-1 font-semibold text-sm border-b border-white/5"
                            )}
                        >
                            {utang.status == 1 ? "Lunas" : "Belum Lunas"}
                        </div>
                        <div className="flex flex-col text-[13px] px-3 py-2 text-slate-300 gap-1">
                            <div className="font-bold text-slate-100">
                                <i className="bi bi-info-circle me-3 text-info"></i>
                                <span>{utang.judul}</span>
                            </div>
                            <div className="flex items-center">
                                <i className="bi bi-calendar me-3 text-slate-400"></i>
                                <span>
                                    {formatDateWithDay(utang.jatuh_tempo)}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <i className="bi bi-currency-dollar me-3 text-warning"></i>
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
