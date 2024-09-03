import { useForm } from "@inertiajs/react";
import UsePageController from "./UsePageController";
import { useEffect, useState } from "react";

const UseDashboard = (filtered) => {
    // form
    const { reset } = useForm({});
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(null);

    const clearErrors = () => {
        setErrors({});
    };

    // page controller
    const {
        params,
        setParams,
        fetching,
        request,
        setFetching,
        onHandleFilter,
    } = UsePageController(filtered, clearErrors, reset, "dashboard");

    // fetching data
    useEffect(() => {
        if (fetching) {
            request(params);
        }
    }, [params, fetching]);

    return {
        params,
        setParams,
        setFetching,
        onHandleFilter,
    };
};

export default UseDashboard;
