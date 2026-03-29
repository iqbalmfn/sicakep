import { formatRupiah } from "@/Utils/GlobalFunction";
import React from "react";

const ListKategoriPengeluaran = ({ data }) => {
    const pengeluaranKategori = data.categories.map((category, index) => {
        return {
            category: category,
            nominal: data.data ? data.data[index] : 0,
            persentase: data.persentase ? data.persentase[index] : 0,
            color: data.colors ? data.colors[index] : "#f0f0f0",
        };
    });
    return (
        <div className="grid grid-cols-1 gap-3 overflow-y-auto h-[290px]">
            {pengeluaranKategori.map((item) => (
                <div className="col-span-1 me-2">
                    <div className="flex items-center">
                        <div
                            className="bg-danger rounded-full w-[40px] h-[37px] flex items-center justify-center me-2"
                            style={{
                                backgroundColor: item.color,
                            }}
                        >
                            <i className="bi bi-tag text-white text-[16px]" />
                        </div>
                        <div className="flex flex-col justify-center w-full">
                            <div className="flex justify-between text-slate-200">
                                <span className="font-semibold text-[12px]">
                                    {item.category}
                                </span>
                                <span className="text-[12px] font-bold">
                                    {formatRupiah(item.nominal)}
                                </span>
                            </div>
                            <div className="w-full bg-slate-700/50 rounded h-4 overflow-hidden border border-white/5 shadow-inner">
                                <div
                                    className="h-full rounded transition-all duration-500 ease-out"
                                    style={{
                                        width: `${item.persentase}%`,
                                        backgroundColor: item.color,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListKategoriPengeluaran;
