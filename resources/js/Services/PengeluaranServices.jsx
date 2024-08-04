import { router } from "@inertiajs/react";

export const pengeluaranCreateData = (data, setErrors, clearErrors) => {
    router.post(route("transaksi.pengeluaran.store"), data, {
        onError: (errors) => {
            setErrors(errors);
        },
        onSuccess: () => {
            clearErrors();
        },
        preserveScroll: false,
        preserveState: true,
    });
};

export const pengeluaranUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("transaksi.pengeluaran.update", {pengeluaran: data.id}), {
        ...data,
        _method: "PUT"
    }, {
        onError: (errors) => {
            setErrors(errors);
        },
        onSuccess: () => {
            clearErrors();
        },
        preserveScroll: false,
        preserveState: true,
    });
};

export const pengeluaranConfirmData = (data, setErrors, clearErrors) => {
    router.post(route("transaksi.pengeluaran.confirm", {pengeluaran: data.id}), {
        ...data,
        _method: "PUT"
    }, {
        onError: (errors) => {
            setErrors(errors);
        },
        onSuccess: () => {
            clearErrors();
        },
        preserveScroll: false,
        preserveState: true,
    });
};