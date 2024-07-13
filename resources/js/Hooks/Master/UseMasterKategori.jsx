import { kategoriCreateData, kategoriUpdateData } from "@/Services/KategoriServices";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CrudToast } from "../GlobalHooks";
import UsePageController from "../UsePageController";

const UseMasterKategori = (filtered, flash) => {
    // form
    const { data, setData, reset } = useForm({
        nama: "",
        jenis: "",
        status: 1,
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
    } = UsePageController(
        filtered,
        clearErrors,
        reset,
        "master.kategori.index"
    );

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
                nama: initialData.nama,
                jenis: initialData.jenis,
                status: initialData.status
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
        kategoriCreateData(data, setErrors, clearErrors);
    };

    const update = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        kategoriUpdateData(data, setErrors, clearErrors);
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
    }
};

export default UseMasterKategori;
