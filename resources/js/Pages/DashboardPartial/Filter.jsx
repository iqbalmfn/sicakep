import FormSelectPrefix from "@/Components/Atoms/FormSelectPrefix";
import Icon from "@/Components/Atoms/Icon";
import {
    getCurrentMonth,
    getCurrentYear,
    listMonths,
    listYears,
} from "@/Utils/GlobalFunction";

const Filter = ({ params, onHandleFilter }) => {
    return (
        <div className="flex gap-3">
            <div>
                <FormSelectPrefix
                    prefix={<Icon icon="calendar-month" />}
                    size="sm"
                    name="bulan"
                    value={
                        params.bulan != ""
                            ? params.bulan
                                ? params.bulan
                                : getCurrentMonth()
                            : "all"
                    }
                    disabled={params.tahun == "all"}
                    onChange={onHandleFilter}
                    className="w-[150px]"
                >
                    <option value="all">Semua Bulan</option>
                    {listMonths().map((month) => (
                        <option key={month.value} value={month.value}>
                            {month.label}
                        </option>
                    ))}
                </FormSelectPrefix>
            </div>
            <div>
                <FormSelectPrefix
                    prefix={<Icon icon="calendar-check" />}
                    size="sm"
                    name="tahun"
                    value={
                        params.tahun != ""
                            ? params.tahun
                                ? params.tahun
                                : getCurrentYear()
                            : ""
                    }
                    onChange={onHandleFilter}
                    className="w-[150px]"
                >
                    <option
                        value="all"
                        disabled={params.bulan && params.bulan != "all"}
                    >
                        Semua Tahun
                    </option>
                    {listYears().map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </FormSelectPrefix>
            </div>
        </div>
    );
};

export default Filter;
