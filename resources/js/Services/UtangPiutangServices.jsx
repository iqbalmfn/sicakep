import { router } from "@inertiajs/react";

export const utangCreateData = (data, setErrors, clearErrors) => {
    router.post(route("utang-piutang.utang.store"), data, {
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

export const utangUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("utang-piutang.utang.update", {utang: data.id}), {
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

export const utangBayar = (data, setErrors, clearErrors) => {
    router.post(route("utang-piutang.utang.bayar", {utang: data.id}), {
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

export const piutangMasterCreateData = (data, setErrors, clearErrors) => {
    router.post(route("utang-piutang.piutang.store"), data, {
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

export const piutangMasterUpdateData = (data, setErrors, clearErrors) => {
    router.post(route("utang-piutang.piutang.update", {piutang: data.id}), {
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

// export const pemasukanConfirmData = (data, setErrors, clearErrors) => {
//     router.post(route("transaksi.pemasukan.confirm", {pemasukan: data.id}), {
//         ...data,
//         _method: "PUT"
//     }, {
//         onError: (errors) => {
//             setErrors(errors);
//         },
//         onSuccess: () => {
//             clearErrors();
//         },
//         preserveScroll: false,
//         preserveState: true,
//     });
// };