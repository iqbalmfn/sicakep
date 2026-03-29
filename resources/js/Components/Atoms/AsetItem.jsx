import { formatRupiah } from "@/Utils/GlobalFunction";
import React from "react";

const AsetItem = ({ namaRekening, bankLogo, saldo }) => {
    return (
        <div className="col-span-1 border border-white/10 rounded-2xl flex flex-col justify-between h-[150px] overflow-hidden bg-slate-800/40 backdrop-blur-sm hover:bg-slate-700/40 transition-all hover:border-white/20 group">
            <div className="bg-white/5 border-b border-white/5 px-4 py-2 text-slate-300 font-medium text-sm flex items-center justify-between">
                {namaRekening}
                <i className="bi bi-wallet2 text-slate-500 group-hover:text-slate-300 transition-colors"></i>
            </div>
            <div className="pb-4 px-4 flex flex-col justify-end h-full">
                <div className="flex items-center h-[50px] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    <img
                        src={
                            namaRekening == "Aset Piutang"
                                ? bankLogo
                                : `/storage/bank/${bankLogo}`
                        }
                        alt="logo"
                        className={namaRekening == "Aset Piutang" ? "h-6 ms-[-13px] object-contain" : "h-6 object-contain"}
                    />
                </div>
                <span className="text-[22px] text-slate-200 font-bold tracking-tight">
                    {formatRupiah(saldo)}
                </span>
            </div>
        </div>
    );
};

export default AsetItem;
