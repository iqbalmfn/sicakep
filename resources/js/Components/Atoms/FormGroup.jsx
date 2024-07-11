import clsx from "clsx";

const FormGroup = ({ className, children }) => {
    return (
        <div className={clsx(className, "flex flex-col gap-2")}>{children}</div>
    );
};

export default FormGroup;
