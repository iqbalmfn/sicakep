import { router } from "@inertiajs/react";

export const kategoriCreateData = (data, setErrors, clearErrors) => {
    router.post(route("master.kategori.store"), data, {
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
export const kategoriUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("master.kategori.update", {kategori: data.id}), {
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