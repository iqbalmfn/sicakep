import { useEffect } from "react";
import { toast } from "react-toastify";

export const CrudToast = (
    flash,
    errors,
    processing,
    setProcessing,
    handleCloseModal
) => {
    useEffect(() => {
        if (flash.success) {
            toast.update(processing, {
                render: flash.success,
                type: "success",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
            handleCloseModal();
        }
        if (Object.keys(errors).length > 0) {
            toast.update(processing, {
                render: "Gagal menyimpan data, silahkan periksa kembali form isiannya",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        if (flash.error) {
            toast.update(processing, {
                render: flash.error,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        setProcessing("");
    }, [flash]);
};

export const CrudToastNoModal = (flash, errors, processing, setProcessing) => {
    useEffect(() => {
        if (flash.success) {
            toast.update(processing, {
                render: flash.success,
                type: "success",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        if (Object.keys(errors).length > 0) {
            toast.update(processing, {
                render: "Gagal menyimpan data, silahkan periksa kembali form isiannya",
                type: "error",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        if (flash.error) {
            toast.update(processing, {
                render: flash.error,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        setProcessing("");
    }, [flash]);
};

export const SyncToast = (flash, syncLoading, setSyncLoading) => {
    useEffect(() => {
        if (flash.success) {
            toast.update(syncLoading, {
                render: flash.success,
                type: "success",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        if (flash.error) {
            toast.update(syncLoading, {
                render: flash.error,
                type: "error",
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        setSyncLoading("");
    }, [flash]);
};

export const goBack = () => {
    window.history.back();
};
