import clsx from "clsx";

const ProposalInformasiItem = ({ isLast = false, children }) => {
    return (
        <div
            className={clsx(
                isLast ? "border" : "border-t border-s border-e",
                "p-3 flex justify-between"
            )}
        >
            {children}
        </div>
    );
};

export default ProposalInformasiItem;
