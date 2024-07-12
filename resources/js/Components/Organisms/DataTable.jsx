import clsx from "clsx";
import { isDesktop, isMobile } from "react-device-detect";
import Button from "../Atoms/Button";
import FormSelect from "../Atoms/FormSelect";

function DataTable({ children, className }) {
    return (
        <div className={`flex flex-col my-5 gap-3 ${className}`}>
            {children}
        </div>
    );
}

function Body({ children, className }) {
    return <div className={`table-responsive ${className}`}>{children}</div>;
}

function Footer({ data, params, setParams, setFetching, onChange }) {
    const prevPage = () => {
        setParams({
            ...params,
            page: data.current_page - 1,
        });
        setFetching(true);
    };

    const nextPage = () => {
        setParams({
            ...params,
            page: data.current_page + 1,
        });
        setFetching(true);
    };
    return (
        <div className="flex justify-between mt-3">
            {isDesktop && (
                <div className="flex items-center gap-2">
                    Show
                    <FormSelect
                        name="perPage"
                        value={params.perPage}
                        onChange={onChange}
                        size="sm"
                        style={{ width: "70px" }}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </FormSelect>
                    entries from total <strong>{data.total}</strong>
                </div>
            )}

            <div
                className={clsx(
                    isMobile && "justify-content-center",
                    "flex items-center gap-2"
                )}
            >
                Page
                <FormSelect
                    size="sm"
                    name="page"
                    value={params.page}
                    onChange={onChange}
                    style={{ width: "65px" }}
                >
                    {(() => {
                        let option = [];
                        for (let i = 1; i <= data.last_page; i++) {
                            option.push(
                                <option key={i} value={i}>
                                    {i}
                                </option>
                            );
                        }
                        return option;
                    })()}
                </FormSelect>
                from {data.last_page}
                <div className="flex gap-2 ms-5">
                    <Button
                        size="sm"
                        outline
                        buttonIcon
                        onClick={prevPage}
                        disabled={data.current_page == 1}
                        >
                        <i className="bi bi-chevron-left"></i>
                    </Button>
                    <Button
                        size="sm"
                        outline
                        buttonIcon
                        onClick={nextPage}
                        disabled={data.current_page == data.last_page}
                        className="btn btn-sm btn-outline btn-outline-success px-3"
                    >
                        <i className="bi bi-chevron-right"></i>
                    </Button>
                </div>
            </div>
        </div>
    );
}

DataTable.Body = Body;
DataTable.Footer = Footer;

export default DataTable;
