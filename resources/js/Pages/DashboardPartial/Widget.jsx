import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { formatRupiah, getFilterLabel } from "@/Utils/GlobalFunction";
import Icon from "@/Components/Atoms/Icon";

const WidgetCard = ({ title, subtitle, amount, colorClass, icon }) => (
    <div className="col-span-1 lg:col-span-1">
        <ContentWrapper className={`relative flex flex-col justify-between lg:justify-start h-[125px] gap-2 pb-6 overflow-hidden group border border-white/5 hover:border-white/10`}>
            {/* Soft background glow */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${colorClass} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-all duration-700`}></div>
            
            <div className="z-10 flex flex-col gap-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-400">
                        {title}
                    </span>
                    {icon && <span className="text-base leading-none">{icon}</span>}
                </div>
                {subtitle && (
                    <span className="text-[10px] font-normal text-slate-500 -mt-1">
                        {subtitle}
                    </span>
                )}
            </div>
            
            <div className="z-10 mt-auto">
                <span className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-100">
                    {amount}
                </span>
            </div>
        </ContentWrapper>
    </div>
);

const Widget = ({ data, params }) => {
    return (
        <div className="grid grid-cols-2 col-span-5 lg:col-span-2 gap-4 mb-5">
            <WidgetCard 
                title="Total Saldo" 
                subtitle="Akumulasi"
                amount={formatRupiah(data.totalSaldo)} 
                colorClass="bg-info"
                icon="💳"
            />
            <WidgetCard 
                title="Total Pemasukan" 
                subtitle={getFilterLabel(params)} 
                amount={formatRupiah(data.totalPemasukan)} 
                colorClass="bg-success"
                icon="📈"
            />
            <WidgetCard 
                title="Total Pengeluaran" 
                subtitle={getFilterLabel(params)} 
                amount={formatRupiah(data.totalPengeluaran)} 
                colorClass="bg-danger"
                icon="📉"
            />
            <WidgetCard 
                title="Total Utang" 
                subtitle={getFilterLabel(params)} 
                amount={formatRupiah(data.totalUtang)} 
                colorClass="bg-warning"
                icon="🧾"
            />
            <WidgetCard 
                title="Saldo Bulanan" 
                subtitle={getFilterLabel(params)} 
                amount={formatRupiah(data.saldoBulanan)} 
                colorClass="bg-info"
                icon="💵"
            />
            <WidgetCard 
                title="Dana Tersedia" 
                subtitle={getFilterLabel(params)} 
                amount={formatRupiah(data.danaTersedia.dana_tersedia)} 
                colorClass="bg-success"
                icon="🏦"
            />
            <WidgetCard 
                title="Total Anggaran" 
                subtitle={getFilterLabel(params)} 
                amount={formatRupiah(data.anggaran.total_anggaran_acc)} 
                colorClass="bg-danger"
                icon="🐖"
            />
            <WidgetCard 
                title="Persentase Pengeluaran" 
                subtitle={getFilterLabel(params)} 
                amount={`${data.persentasePengeluaran} %`} 
                colorClass="bg-warning"
                icon="📊"
            />
        </div>
    );
};

export default Widget;
