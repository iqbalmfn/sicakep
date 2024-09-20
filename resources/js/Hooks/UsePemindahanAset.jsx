import { pemindahanAsetCreateData, pemindahanAsetUpdateData } from "@/Services/PemindahanAsetServices";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CrudToast } from "./GlobalHooks";
import UsePageController from "./UsePageController";

const UsePemindahanAset = (filtered, flash) => {
    // form
    const { data, setData, reset } = useForm({
        initial_rekening_id: "",
        destination_rekening_id: "",
        nominal: "",
        biaya_administrasi: "",
        tanggal: "",
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
        "aset.pemindahan-aset.index"
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
                initial_rekening_id: initialData.initial_rekening_id,
                destination_rekening_id: initialData.destination_rekening_id,
                nominal: initialData.nominal,
                biaya_administrasi: initialData.biaya_administrasi,
                tanggal: initialData.tanggal,
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

    const submit = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        pemindahanAsetCreateData(data, setErrors, clearErrors);
    };

    const update = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        pemindahanAsetUpdateData(data, setErrors, clearErrors);
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

export default UsePemindahanAset;
