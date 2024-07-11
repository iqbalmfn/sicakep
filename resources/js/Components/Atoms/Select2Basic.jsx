import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import clsx from "clsx";
import Icon from "./Icon";

function Select2Basic({
    size = "sm",
    options,
    availableOptions = [],
    hideOptions = [],
    placeholder,
    handleChange,
    defaultValue = null,
    isError,
    isClearable = false,
    isEditable = false,
    required = false,
    disabled = false,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ id: "", label: "" });
    const ref = useRef(null);
    const itemsRefs = useRef({});

    const [searchTerm, setSearchTerm] = useState("");
    let filteredOptions =
        availableOptions.length > 0
            ? availableOptions.filter((option) =>
                  option.label.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : options.filter((option) =>
                  option.label.toLowerCase().includes(searchTerm.toLowerCase())
              );

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen);
        setSearchTerm("");
        if (isClearable) {
            setSelectedOption({ id: "", label: "" });
        }
    };

    const handleOutsideClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (options.length > 0) {
            const item = options.find((obj) => obj.id == defaultValue);
            setSelectedOption(
                item
                    ? { id: defaultValue, label: item.label }
                    : { id: "", label: "" }
            );
        }
    }, [defaultValue, options]);

    const previousSelectedOption = useRef(selectedOption);

    useEffect(() => {
        if (
            selectedOption.id !== "" &&
            previousSelectedOption.current.id !== selectedOption.id
        ) {
            handleChange(selectedOption.id);
        }
        previousSelectedOption.current = selectedOption;
    }, [selectedOption]);

    useEffect(() => {
        if (selectedOption?.id && itemsRefs.current[selectedOption.id]) {
            itemsRefs.current[selectedOption.id].focus();
        }
    }, [selectedOption]);

    useEffect(() => {
        if (selectedOption?.id && itemsRefs.current[selectedOption.id]) {
            itemsRefs.current[selectedOption.id].scrollIntoView();
        }
    }, [isOpen, selectedOption]);

    return (
        <div ref={ref} className="relative">
            <FormInput
                className="w-full cursor-pointer"
                size={size}
                type="text"
                placeholder={placeholder}
                value={
                    isClearable
                        ? ""
                        : selectedOption
                        ? selectedOption.label
                        : ""
                }
                // readOnly={!isEditable}
                onClick={handleOpenDropdown}
                isError={isError}
                disabled={disabled}
                required={required}
            />
            {isOpen && (
                <div className="absolute top-10 bg-white rounded-b-lg w-full p-3 shadow-lg z-50">
                    <FormInput
                        autoFocus
                        size={size}
                        type="text"
                        placeholder="Cari..."
                        value={searchTerm}
                        className="w-full"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="mt-2 max-h-[150px] overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions
                                .filter(
                                    (option) =>
                                        !hideOptions.some(
                                            (hideOption) =>
                                                hideOption.id === option.id
                                        )
                                )
                                .map((option, idx) => (
                                    <li
                                        // ref={(el) => (itemsRefs.current[option.id] = el)}
                                        className={clsx(
                                            selectedOption?.id === option.id
                                                ? "bg-gray-100"
                                                : null,
                                            "flex justify-between p-2 cursor-pointer hover:bg-gray-100"
                                        )}
                                        key={idx}
                                        onClick={() => {
                                            setSelectedOption(option);
                                            setIsOpen(false);
                                        }}
                                        {...props}
                                    >
                                        <span>{option.label}</span>
                                        {selectedOption?.id === option.id ? (
                                            <Icon
                                                icon="check-lg"
                                                className="text-success"
                                            />
                                        ) : null}
                                    </li>
                                ))
                        ) : (
                            <li className="py-3 text-center text-gray-400">
                                Tidak ada data ditemukan.
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Select2Basic;
