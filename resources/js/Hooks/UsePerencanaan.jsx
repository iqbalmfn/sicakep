import {
    perencanaanConfirmData,
    perencanaanCreateData,
    perencanaanGenerateData,
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
        pic_id: "",
        judul: "",
        nominal: "",
        bulan: "",
        tahun: "",
        tipe: "cash",
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
                pic_id: initialData.pic_id,
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

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleShowConfirmModal = (data) => {
        setShowConfirmModal(true);
        setDetailData(data);
        setInitialData(data);
    };
    const handleCloseConfirmModal = (data) => {
        setShowConfirmModal(false);
        setInitialData({});
        reset();
    };

    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const handleShowGenerateModal = () => {
        setShowGenerateModal(true);
        setData({
            ...data,
            bulan: filtered.bulan,
            tahun: filtered.tahun,
        });
    };
    const handleCloseGenerateModal = () => {
        setShowGenerateModal(false);
        reset();
    };

    // generate
    const generate = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang generate data..."));
        perencanaanGenerateData(data, setErrors, clearErrors);
    };

    // confirm
    const confirm = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang memproses data..."));
        perencanaanConfirmData(data, setErrors, clearErrors);
    };

    // menampilkan toast notification
    CrudToast(
        flash,
        errors,
        processing,
        setProcessing,
        showConfirmModal
            ? handleCloseConfirmModal
            : showGenerateModal
            ? handleCloseGenerateModal
            : handleCloseModal
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
        showConfirmModal,
        handleShowConfirmModal,
        handleCloseConfirmModal,
        confirm,
        showGenerateModal,
        handleShowGenerateModal,
        handleCloseGenerateModal,
        generate,
    };
};

export default UsePerencanaan;
