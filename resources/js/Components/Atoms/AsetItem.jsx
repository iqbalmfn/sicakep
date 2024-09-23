import { formatRupiah } from "@/Utils/GlobalFunction";
import React from "react";

const AsetItem = ({ namaRekening, bankLogo, saldo }) => {
    return (
        <div className="col-span-1 border border-[3px] border-info rounded-xl flex flex-col justify-between h-[150px] overflow-hidden">
            <div className="bg-info px-3 py-1 text-white">{namaRekening}</div>
            <div className="pb-3 px-3">
                <div className="flex items-center h-[75px]">
                    <img
                        src={
                            namaRekening == "Aset Piutang"
                                ? bankLogo
                                : `/storage/bank/${bankLogo}`
                        }
                        alt="logo"
                        className={namaRekening == "Aset Piutang" ? "w-[80px] ms-[-13px]" : "w-[100px]"}
                    />
                </div>
                <span className="text-[25px] text-info font-bold">
                    {formatRupiah(saldo)}
                </span>
            </div>
        </div>
    );
};

export default AsetItem;
