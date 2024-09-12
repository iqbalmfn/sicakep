import { router } from "@inertiajs/react";

export const bankCreateData = (data, setErrors, clearErrors) => {
    router.post(route("master.bank.store"), data, {
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
export const bankUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("master.bank.update", {bank: data.id}), {
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