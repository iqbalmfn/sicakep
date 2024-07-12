import { useState, useEffect } from "react";
import Icon from "@/Components/Atoms/Icon";
import clsx from "clsx";

const TableHeader = ({
    children,
    height = 45,
    ordered = true,
    align,
    column,
    orderBy,
    orderDirection,
    onHandleOrder,
}) => {
    const [isOrder, setIsOrder] = useState(1)
    const [direction, setDirection] = useState(orderDirection);

    const onHandleDirection = () => {
        if(direction==='desc') {
            setDirection('asc')
        } else {
            setDirection('desc')
        }
    };

    const handleOrder = () => {
        setIsOrder(isOrder+1);
        onHandleOrder(column, direction)
    }

    useEffect(() => {
        onHandleDirection()
    }, [isOrder]);

    return (
        <div
            className={clsx(
                ordered && "cursor-pointer",
                align ? `justify-${align}` : `justify-between`,
                `flex items-center h-[${height}px]`
            )}
            onClick={ordered ? handleOrder : null}
        >
            {children}
            <div className="relative">
                <Icon
                    icon={column === orderBy && direction === "desc" ? "caret-up" : "caret-up-fill"}
                    className={clsx(!ordered && "hidden", "text-xs absolute -bottom-1 right-0")}
                    fs={9}
                />
                <Icon
                    icon={column === orderBy && direction === "asc" ? "caret-down" : "caret-down-fill"}
                    className={clsx(!ordered && "hidden", "text-xs absolute -top-1 right-0")}
                    fs={9}
                />
            </div>
        </div>
    );
};

export default TableHeader;
