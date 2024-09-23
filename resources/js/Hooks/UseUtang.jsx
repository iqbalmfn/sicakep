import { pemasukanCreateData, pemasukanUpdateData } from "@/Services/PemasukanServices";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CrudToast } from "./GlobalHooks";
import UsePageController from "./UsePageController";
import { utangBayar, utangCreateData, utangUpdateData } from "@/Services/UtangPiutangServices";

const UseUtang = (filtered, flash) => {
    // form
    const { data, setData, reset } = useForm({
        user_id: "",
        judul: "",
        jenis: "transfer",
        nominal: "",
        jatuh_tempo: "",
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
    } = UsePageController(filtered, clearErrors, reset, "utang-piutang.utang.index");

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
                judul: initialData.judul,
                jenis: initialData.jenis,
                jatuh_tempo: initialData.jatuh_tempo,
                nominal: initialData.nominal,
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
        utangCreateData(data, setErrors, clearErrors);
    };

    const update = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        utangUpdateData(data, setErrors, clearErrors);
    };
    // end crud

    // tambahan
    const [detailData, setDetailData] = useState({});
    const [showDetailModal, setShowDetailModal] = useState(false);
    const handleShowDetailModal = (data) => {
        setShowDetailModal(true);
        setDetailData(data);
    };
    const handleCloseDetailModal = () => {
        setShowDetailModal(false);
        setInitialData({});
        reset();
    };

    const [bayarData, setBayarData] = useState({});
    const [showBayarModal, setShowBayarModal] = useState(false);
    const handleShowBayarModal = (data) => {
        setShowBayarModal(true);
        setData(data);
    };
    const handleCloseBayarModal = () => {
        setShowBayarModal(false);
        setInitialData({});
        reset();
    };

    const submitBayar = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        utangBayar(data, setErrors, clearErrors);
    };

    // menampilkan toast notification
    CrudToast(
        flash,
        errors,
        processing,
        setProcessing,
        showBayarModal ? handleCloseBayarModal : handleCloseModal
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
        bayarData,
        showBayarModal,
        handleShowBayarModal,
        handleCloseBayarModal,
        submitBayar
    };
};

export default UseUtang;
