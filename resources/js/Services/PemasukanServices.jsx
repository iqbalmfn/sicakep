import { router } from "@inertiajs/react";

export const pemasukanCreateData = (data, setErrors, clearErrors) => {
    router.post(route("transaksi.pemasukan.store"), data, {
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

export const pemasukanUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("transaksi.pemasukan.update", {pemasukan: data.id}), {
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

export const pemasukanConfirmData = (data, setErrors, clearErrors) => {
    router.post(route("transaksi.pemasukan.confirm", {pemasukan: data.id}), {
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