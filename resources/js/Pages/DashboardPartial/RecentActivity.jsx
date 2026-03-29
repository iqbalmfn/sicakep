import { formatRupiah } from "@/Utils/GlobalFunction";

const RecentActivity = ({ data }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const d = new Date(dateStr);
        const options = { day: "numeric", month: "short" };
        return d.toLocaleDateString("id-ID", options);
    };

    return (
        <div className="flex flex-col divide-y divide-white/5 max-h-[540px] overflow-y-auto">
            {data && data.length > 0 ? (
                data.map((item, index) => {
                    const isPemasukan = item.tipe === "pemasukan";
                    return (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors duration-200"
                        >
                            {/* Icon */}
                            <div
                                className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base
                                    ${isPemasukan
                                        ? "bg-emerald-500/15 border border-emerald-500/20"
                                        : "bg-rose-500/15 border border-rose-500/20"
                                    }`}
                            >
                                {isPemasukan ? "💚" : "🔴"}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-200 truncate leading-tight">
                                    {item.judul}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                    {item.kategori} · {item.rekening}
                                </p>
                            </div>

                            {/* Amount & Date */}
                            <div className="flex flex-col items-end flex-shrink-0">
                                <span
                                    className={`text-sm font-bold ${
                                        isPemasukan ? "text-emerald-400" : "text-rose-400"
                                    }`}
                                >
                                    {isPemasukan ? "+" : "-"}
                                    {formatRupiah(item.nominal)}
                                </span>
                                <span className="text-[10px] text-slate-500 mt-0.5">
                                    {formatDate(item.tanggal)}
                                </span>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <span className="text-4xl">📭</span>
                    <p className="text-slate-500 text-sm">Belum ada transaksi</p>
                </div>
            )}
        </div>
    );
};

export default RecentActivity;
