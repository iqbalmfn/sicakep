import { router } from "@inertiajs/react";

export const rekeningCreateData = (data, setErrors, clearErrors) => {
    router.post(route("aset.rekening.store"), data, {
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
export const rekeningUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("aset.rekening.update", {rekening: data.id}), {
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