import { router } from "@inertiajs/react";

export const pemindahanAsetCreateData = (data, setErrors, clearErrors) => {
    router.post(route("aset.pemindahan-aset.store"), data, {
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
export const pemindahanAsetUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("aset.pemindahan-aset.update", {pemindahan_aset: data.id}), {
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