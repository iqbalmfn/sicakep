import {
    perencanaanCreateData,
    perencanaanUpdateData,
} from "@/Services/PerencanaanServices";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CrudToast } from "./GlobalHooks";
import UsePageController from "./UsePageController";

const UsePerencanaan = (filtered, flash) => {
    // form
    const { data, setData, reset } = useForm({
        kategori_id: "",
        judul: "",
        nominal: "",
        bulan: "",
        tahun: "",
        tipe: "cash",
        deskripsi: ""
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(null);

    const clearErrors = () => {
        setErrors({});
    };

    // page controller
    const {
        mode,
        params,
        setParams,
        fetching,
        request,
        showModal,
        handleShowModal,
        handleEditModal,
        handleCloseModal,
        initialData,
        setFetching,
        onHandleFilter,
        onHandleOrder,
    } = UsePageController(filtered, clearErrors, reset, "perencanaan.index");

    // fetching data
    useEffect(() => {
        if (fetching) {
            request(params);
        }
    }, [params, fetching]);

    // setData ketika edit
    useEffect(() => {
        if (initialData.id) {
            setData({
                id: initialData.id,
                kategori_id: initialData.kategori_id,
                judul: initialData.judul,
                nominal: initialData.nominal,
                bulan: initialData.bulan,
                tahun: initialData.tahun,
                tipe: initialData.tipe,
                deskripsi: initialData.deskripsi,
            });
        }
    }, [initialData]);

    // crud
    const handleChange = (e) => {
        setData(
            e.target.name,
            e.target.type === "file" ? e.target.files[0] : e.target.value
        );
    };

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setData(e.target.name, 1);
        } else {
            setData(e.target.name, 0);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        perencanaanCreateData(data, setErrors, clearErrors);
    };

    const update = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        perencanaanUpdateData(data, setErrors, clearErrors);
    };
    // end crud

    // menampilkan toast notification
    CrudToast(flash, errors, processing, setProcessing, handleCloseModal);

    return {
        data,
        processing,
        errors,
        submit,
        update,
        handleChange,
        handleCheckboxChange,
        // page controller
        mode,
        params,
        setParams,
        setFetching,
        onHandleFilter,
        onHandleOrder,
        showModal,
        handleShowModal,
        handleEditModal,
        handleCloseModal,
    };
};

export default UsePerencanaan;
