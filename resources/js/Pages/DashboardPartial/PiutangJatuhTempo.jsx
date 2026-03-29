import { formatRupiah } from "@/Utils/GlobalFunction";

const PiutangJatuhTempo = ({ data }) => {
    const getStatusStyle = (status) => {
        if (status === "overdue") {
            return {
                border: "border-red-500/40",
                badge: "bg-red-500/20 text-red-400 border border-red-500/30",
                badgeText: "Terlambat",
                dot: "bg-red-400",
                glow: "shadow-[0_2px_12px_rgba(239,68,68,0.08)]",
            };
        }
        if (status === "urgent") {
            return {
                border: "border-orange-500/40",
                badge: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
                badgeText: "Segera",
                dot: "bg-orange-400",
                glow: "shadow-[0_2px_12px_rgba(249,115,22,0.08)]",
            };
        }
        return {
            border: "border-yellow-500/30",
            badge: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/25",
            badgeText: "Akan Datang",
            dot: "bg-yellow-400",
            glow: "shadow-[0_2px_12px_rgba(234,179,8,0.06)]",
        };
    };

    const formatSisaHari = (sisaHari) => {
        if (sisaHari < 0) return `${Math.abs(sisaHari)} hari lalu`;
        if (sisaHari === 0) return "Hari ini";
        return `${sisaHari} hari lagi`;
    };

    return (
        <div className="flex flex-col gap-3 py-4 px-3 max-h-[380px] overflow-y-auto">
            {data.length > 0 ? (
                data.map((item) => {
                    const style = getStatusStyle(item.status);
                    return (
                        <div
                            key={item.id}
                            className={`relative flex items-start gap-3 rounded-xl bg-slate-800/40 backdrop-blur-md border ${style.border} px-4 py-3 ${style.glow} transition-all duration-300 hover:bg-slate-800/60`}
                        >
                            {/* Dot indicator */}
                            <div className="flex-shrink-0 mt-1">
                                <span className={`block w-2.5 h-2.5 rounded-full ${style.dot} animate-pulse`}></span>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-sm font-semibold text-slate-100 truncate">
                                        {item.nama}
                                    </span>
                                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${style.badge}`}>
                                        {style.badgeText}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <span>⏳ {formatSisaHari(item.sisa_hari)}</span>
                                    <span className="font-semibold text-slate-200">
                                        {formatRupiah(item.sisa)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
                    <span className="text-4xl">🎉</span>
                    <div>
                        <p className="text-slate-300 font-medium text-sm">Tidak ada piutang</p>
                        <p className="text-slate-500 text-xs mt-1">yang jatuh tempo dalam 30 hari ke depan</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PiutangJatuhTempo;
