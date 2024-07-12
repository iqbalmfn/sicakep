import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import FormInput from "@/Components/Atoms/FormInput";
import Icon from "@/Components/Atoms/Icon";
import { debounce } from "lodash";

function Select2Mahasiswa({
    getApiCall,
    placeholder,
    handleChange,
    defaultValue = null,
    isError,
    isClearable = false,
    disabled = false,
    ...props
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        id: "",
        label: "",
        nim: "",
        nama: "",
        studyprogram_level: "",
        studyprogram_name: "",
        status: "",
    });

    const ref = useRef(null);

    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = debounce((e) => {
        setSearchTerm(e.target.value);
    }, 500);

    // get list mahasiswa
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const getDataMahasiswa = async (search) => {
        setIsLoading(true);
        try {
            const { data } = await getApiCall(search);
            setOptions(data);
        } catch (error) {
            console.log(error.response.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (isOpen) {
            getDataMahasiswa(searchTerm);
        } else {
            setSearchTerm("");
        }
    }, [searchTerm, isOpen]);

    const handleOpenDropdown = () => {
        setIsOpen(!isOpen);

        // reset selected data jika isClearable = true
        if (isClearable) {
            setSelectedOption({
                id: "",
                label: "",
                nim: "",
                nama: "",
                studyprogram_level: "",
                studyprogram_name: "",
                status: "",
            });
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
            if (defaultValue !== null) {
                const item = options.find((obj) => obj.id == defaultValue);
                setSelectedOption({
                    id: defaultValue,
                    label: item.label,
                    nim: item.nim,
                    nama: iten.nama,
                    studyprogram_level: item.studyprogram_level,
                    studyprogram_name: item.studyprogram_name,
                    status: item.status,
                });
            }
        }
    }, [defaultValue, options]);

    const previousSelectedOption = useRef(selectedOption);
    useEffect(() => {
        if (
            selectedOption.id != "" &&
            previousSelectedOption.current.id !== selectedOption.id
        ) {
            handleChange(selectedOption);
        }
        previousSelectedOption.current = selectedOption;
    }, [selectedOption]);

    return (
        <div ref={ref} className="relative">
            <FormInput
                className="w-full cursor-pointer"
                size="sm"
                type="text"
                placeholder={placeholder}
                value={
                    isClearable
                        ? ""
                        : selectedOption
                        ? selectedOption.label
                        : ""
                }
                readOnly
                onClick={handleOpenDropdown}
                isError={isError}
                disabled={disabled}
            />
            {isOpen && (
                <div className="absolute top-10 bg-white rounded-b-lg w-full p-3 shadow-lg z-30">
                    <FormInput
                        autoFocus
                        size="sm"
                        type="text"
                        placeholder="Cari..."
                        defaultValue={searchTerm}
                        className="w-full"
                        onChange={handleSearch}
                    />
                    <ul className="mt-2 max-h-[150px] overflow-y-auto">
                        {isLoading ? (
                            <li className="py-3 text-center text-gray-400">
                                Memproses data...
                            </li>
                        ) : options.database?.length > 0 ? (
                            options.database.map((student) => (
                                <li
                                    key={student.id}
                                    className={clsx(
                                        selectedOption?.id === student.id
                                            ? "bg-gray-100"
                                            : null,
                                        "flex justify-between p-2 cursor-pointer hover:bg-gray-100"
                                    )}
                                      onClick={() => {
                                          setSelectedOption(student);
                                          setIsOpen(false);
                                      }}
                                    {...props}
                                >
                                    <span>{student.label}</span>
                                    {selectedOption?.id === student.id ? (
                                        <Icon
                                            icon="check-lg"
                                            className="text-success"
                                        />
                                    ) : null}
                                </li>
                            ))
                        ) : options.pddikti?.length > 0 ? (
                            options.pddikti.map((student) => (
                                <li
                                    key={student.id}
                                    className={clsx(
                                        selectedOption?.id === student.id
                                            ? "bg-gray-100"
                                            : null,
                                        "flex justify-between p-2 cursor-pointer hover:bg-gray-100"
                                    )}
                                      onClick={() => {
                                          setSelectedOption(student);
                                          setIsOpen(false);
                                      }}
                                    {...props}
                                >
                                    <span>{student.label}</span>
                                    {selectedOption?.id === student.id ? (
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

export default Select2Mahasiswa;
