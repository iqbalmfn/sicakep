import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { formatRupiah, getFilterLabel } from "@/Utils/GlobalFunction";

const Widget = ({ data, params }) => {
    return (
        <div className="grid grid-cols-2 gap-5 mb-5">
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-info border border-2 border-info">
                    <span className="text-[13px] font-bold">Total Aset</span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.totalSaldo)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-success border border-2 border-success">
                    <span className="text-[13px] font-bold">
                        Total Pemasukan{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.totalPemasukan)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-danger border border-2 border-danger">
                    <span className="text-[13px] font-bold">
                        Total Pengeluaran{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.totalPengeluaran)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-warning border border-2 border-warning">
                    <span className="text-[13px] font-bold">
                        Total Utang{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.totalUtang)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-info border border-2 border-info">
                    <span className="text-[13px] font-bold">
                        Saldo Bulanan{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.saldoBulanan)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-success border border-2 border-success">
                    <span className="text-[13px] font-bold">
                        Dana Tersedia{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.danaTersedia.dana_tersedia)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-danger border border-2 border-danger">
                    <span className="text-[13px] font-bold">
                        Total Anggaran{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {formatRupiah(data.anggaran.total_anggaran_acc)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-1 lg:col-span-1">
                <ContentWrapper className="flex flex-col justify-between lg:justify-start gap-2 pb-6 text-warning border border-2 border-warning">
                    <span className="text-[13px] font-bold">
                        Persentase Pengeluaran{" "}
                        <span className="text-[10px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-2xl lg:text-3xl font-bold">
                        {data.persentasePengeluaran} %
                    </span>
                </ContentWrapper>
            </div>
        </div>
    );
};

export default Widget;
