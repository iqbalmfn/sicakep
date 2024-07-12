import clsx from "clsx";
import React from "react";
import TableHeader from "./../Molecules/TableHeader";

function Table({ children, className }) {
    return (
        <div className="relative overflow-x-auto">
            <table
                className={clsx(
                    className,
                    "gy-2 gs-5 table-sm fs-7 rounded w-full"
                )}
            >
                {children}
            </table>
        </div>
    );
}

function Thead({ children, className }) {
    return <thead className={clsx(className)}>{children}</thead>;
}

function Tbody({ children, className }) {
    return <tbody className={className}>{children}</tbody>;
}

function TrHead({ children, className }) {
    return (
        <tr
            className={clsx(
                className,
                "sticky-table-header fw-bolder fs-6 text-gray-500 bg-gray-100 px-7"
            )}
        >
            {children}
        </tr>
    );
}

function TrBody({ children, className }) {
    return <tr className={clsx(className)}>{children}</tr>;
}

function Th({
    children,
    className,
    valign = "middle",
    nowrap = false,
    align,
    width = 6,
    height,
    ordered = false,
    column,
    orderBy = "id",
    orderDirection = "desc",
    onHandleOrder,
    ...props
}) {
    return (
        <th
            className={clsx(
                className,
                nowrap && `whitespace-nowrap`,
                `align-${valign}`,
                `text-${align}`,
                "uppercase ps-3"
            )}
            width={width + "%"}
            {...props}
        >
            <TableHeader
                height={height}
                ordered={ordered}
                align={align}
                column={column}
                orderBy={orderBy}
                orderDirection={orderDirection}
                onHandleOrder={onHandleOrder}
            >
                {children}
            </TableHeader>
        </th>
    );
}

function Td({
    children,
    className,
    valign = "align-middle",
    align = "start",
    width,
    nowrap = false,
    ...props
}) {
    return (
        <td
            className={clsx(
                className,
                valign,
                nowrap && `whitespace-nowrap`,
                `text-${align} ps-3 py-2 border-b`
            )}
            width={`${width}%`}
            {...props}
        >
            {children}
        </td>
    );
}

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.TrHead = TrHead;
Table.TrBody = TrBody;
Table.Th = Th;
Table.Td = Td;

export default Table;
