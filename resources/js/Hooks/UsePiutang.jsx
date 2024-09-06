import { pemasukanCreateData, pemasukanUpdateData } from "@/Services/PemasukanServices";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CrudToast } from "./GlobalHooks";
import UsePageController from "./UsePageController";
import { piutangMasterCreateData, piutangMasterUpdateData, utangCreateData, utangUpdateData } from "@/Services/UtangPiutangServices";

const UsePiutang = (filtered, flash) => {
    // form
    const { data, setData, reset } = useForm({
        user_id: "",
        nama: "",
        jenis: "transfer",
        nominal: "",
        tanggal: "",
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
    } = UsePageController(filtered, clearErrors, reset, "utang-piutang.piutang.index");

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
                nama: initialData.nama,
                tanggal: initialData.tanggal,
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
        piutangMasterCreateData(data, setErrors, clearErrors);
    };

    const update = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        piutangMasterUpdateData(data, setErrors, clearErrors);
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

    const [transaksi, setTransaksi] = useState({});
    const [showTransaksiModal, setShowTransaksiModal] = useState(false);
    const handleShowTransaksiModal = (data) => {
        setShowTransaksiModal(true);
        setTransaksi(data);
        setData({
            user_id: data.user_id,
            piutang_master_id: data.id,
            judul: "",
            tipe: "piutang",
            jenis: "transfer",
            nominal: "",
            jatuh_tempo: "",
            deskripsi: "",
        })
    };
    const handleCloseTransaksiModal = (data) => {
        setShowTransaksiModal(false);
        setInitialData({});
        reset();
    };

    const handleChangeTransaksi = (e) => {
        setData(
            e.target.name,
            e.target.type === "file" ? e.target.files[0] : e.target.value
        );
    };

    const submitPiutang = (e) => {
        e.preventDefault();
        setProcessing(toast.loading("Sedang menyimpan data..."));
        utangCreateData(data, setErrors, clearErrors);
    };
    

    // menampilkan toast notification
    CrudToast(
        flash,
        errors,
        processing,
        setProcessing,
        transaksi ? handleCloseTransaksiModal : handleCloseModal
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
        transaksi,
        showTransaksiModal,
        handleShowTransaksiModal,
        handleCloseTransaksiModal,
        handleChangeTransaksi,
        submitPiutang
    };
};

export default UsePiutang;
