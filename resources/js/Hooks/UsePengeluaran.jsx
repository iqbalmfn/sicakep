import { pengeluaranCreateData, pengeluaranUpdateData } from "@/Services/PengeluaranServices";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CrudToast } from "./GlobalHooks";
import UsePageController from "./UsePageController";

const UsePengeluaran = (filtered, flash) => {
    // form
    const { data, setData, reset } = useForm({
        user_id: "",
        kategori_id: "",
        perencanaan_id: "",
        judul: "",
        nominal: "",
        tanggal: "",
        jenis: "online",
        deskripsi: "",
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
        setInitialData,
        setFetching,
        onHandleFilter,
        onHandleOrder,
    } = UsePageController(filtered, clearErrors, reset, "transaksi.pengeluaran.index");

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
                user_id: initialData.user_id,
                kategori_id: initialData.kategori_id,
                perencanaan_id: initialData.perencanaan_id,
                judul: initialData.judul,
                nominal: initialData.nominal,
                nominal_strict: initialData.nominal,
                tanggal: initialData.tanggal,
                jenis: initialData.jenis,
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
        pengeluaranCreateData(data, setErrors, clearErrors);
    };

    const update = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        pengeluaranUpdateData(data, setErrors, clearErrors);
    };
    // end crud

    // tambahan
    const [detailData, setDetailData] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleShowDetailModal = (data) => {
        setShowDetailModal(true);
        setDetailData(data);
    };
    const handleCloseDetailModal = (data) => {
        setShowDetailModal(false);
        setInitialData({});
        reset();
    };
    // menampilkan toast notification
    CrudToast(
        flash,
        errors,
        processing,
        setProcessing,
        handleCloseModal
    );

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
        // tambahan
        detailData,
        showDetailModal,
        handleShowDetailModal,
        handleCloseDetailModal,
    };
};

export default UsePengeluaran;
