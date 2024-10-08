import { router } from "@inertiajs/react";

export const perencanaanCreateData = (data, setErrors, clearErrors) => {
    router.post(route("perencanaan.store"), data, {
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

export const perencanaanUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("perencanaan.update", {perencanaan: data.id}), {
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

export const perencanaanConfirmData = (data, setErrors, clearErrors) => {
    router.post(route("perencanaan.confirm", {perencanaan: data.id}), {
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

export const perencanaanGenerateData = (data, setErrors, clearErrors) => {
    router.post(route("perencanaan.generate"), data, {
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