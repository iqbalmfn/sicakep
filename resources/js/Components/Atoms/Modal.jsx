import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

function Modal({
    children,
    className,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
        "3xl": "sm:max-w-3xl",
        "1000px": "sm:max-w-[1000px]",
        "1500px": "sm:max-w-[1500px]",
        "50%": "sm:max-w-[50%]",
        "75%": "sm:max-w-[75%]",
        full: "sm:max-w-[98%]",
        auto: "sm:w-auto sm:max-w-[85%]",
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                onClose={close}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-black/50" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg shadow-xl transform transition-all w-full sm:mx-auto ${maxWidthClass} ${className}`}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

function Header({ className, isShowModalClose = true, children, ...props }) {
    return (
        <div
            className={clsx(
                className,
                "flex justify-between items-center h-12 px-5 border-b text-gray-500"
            )}
        >
            <span className="font-semibold text-base">{children}</span>
            {isShowModalClose ? (
                <div>
                    <button type="button" {...props}>
                        <i className="bi bi-x-lg py-2 px-3 rounded-lg hover:bg-slate-100"></i>
                    </button>
                </div>
            ) : (
                false
            )}
        </div>
    );
}

function Body({ className, children }) {
    return <div className={clsx(className, "px-5 mb-")}>{children}</div>;
}

function Footer({ className, children }) {
    return (
        <div className={clsx(className, "px-5 py-3 border-t")}>{children}</div>
    );
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
