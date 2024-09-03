import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { formatRupiah, getFilterLabel } from "@/Utils/GlobalFunction";

const Widget = ({ data, params }) => {
    return (
        <div className="grid grid-cols-4 gap-5 mb-5">
            <div className="col-span-4 lg:col-span-1">
                <ContentWrapper className="flex flex-col gap-2 pb-6 text-info border border-2 border-info">
                    <span className="text-[15px] font-semibold">Saldo</span>
                    <span className="text-3xl font-bold">
                        {formatRupiah(data.totalSaldo)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-4 lg:col-span-1">
                <ContentWrapper className="flex flex-col gap-2 pb-6 text-success border border-2 border-success">
                    <span className="text-[15px] font-bold">
                        Total Pemasukan{" "}
                        <span className="text-[11px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-3xl font-bold">
                        {formatRupiah(data.totalPemasukan)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-4 lg:col-span-1">
                <ContentWrapper className="flex flex-col gap-2 pb-6 text-danger border border-2 border-danger">
                    <span className="text-[15px] font-semibold">
                        Total Pengeluaran{" "}
                        <span className="text-[11px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-3xl font-bold">
                        {formatRupiah(data.totalPengeluaran)}
                    </span>
                </ContentWrapper>
            </div>
            <div className="col-span-4 lg:col-span-1">
                <ContentWrapper className="flex flex-col gap-2 pb-6 text-warning border border-2 border-warning">
                    <span className="text-[15px] font-semibold">
                        Total Utang{" "}
                        <span className="text-[11px] font-normal">
                            {getFilterLabel(params)}
                        </span>
                    </span>
                    <span className="text-3xl font-bold">
                        {formatRupiah(data.totalUtang)}
                    </span>
                </ContentWrapper>
            </div>
        </div>
    );
};

export default Widget;
