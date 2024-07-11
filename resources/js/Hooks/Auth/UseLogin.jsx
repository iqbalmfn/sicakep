import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UseLogin = () => {
    const [loading, setLoading] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: "",
    });

    const handleOnChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    useEffect(() => {
        if (processing) {
            setLoading(toast.loading("Sedang memproses..."));
        } else {
            if (errors.username) {
                toast.update(loading, {
                    render: errors.username,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
            if (errors.password) {
                toast.update(loading, {
                    render: errors.password,
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        }
    }, [processing, errors]);

    return {
        data,
        processing,
        errors,
        handleOnChange,
        submit,
    };
};

export default UseLogin;
