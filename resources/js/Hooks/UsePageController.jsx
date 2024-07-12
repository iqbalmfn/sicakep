import { useState } from "react";
import { debounce } from "lodash";
import { useCallback } from "react";
import { router } from "@inertiajs/react";

function UsePageController(
    filtered,
    clearErrors,
    reset,
    routeName,
    parameter = null,
    isPagination = false
) {
    const [mode, setMode] = useState("create");
    const [fetching, setFetching] = useState(false);
    const [fetchingId, setFetchingId] = useState("");
    const [params, setParams] = useState(filtered ?? {});
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingModal, setIsLoadingModal] = useState(false);
    const [initialData, setInitialData] = useState([]);

    // request fetch data
    const request = useCallback(
        debounce((query) => {
            router.get(
                route(routeName, parameter),
                { ...query },
                {
                    onSuccess: () => {
                        setIsLoading(false);
                    },
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );

    // filter
    const onHandleFilter = (e) => {
        if (isPagination) {
            setParams({
                ...params,
                page: 1,
                [e.target.name]: e.target.value,
            });
        } else {
            setParams({
                ...params,
                [e.target.name]: e.target.value,
            });
        }
        setFetching(true);
    };
    // alert(JSON.stringify(params));

    const onHandleOrder = (orderBy, orderDirection) => {
        setParams({
            ...params,
            orderBy,
            orderDirection,
        });
        setFetching(true);
    };

    // modal
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
        setMode("create");
    };

    const handleEditModal = (data) => {
        setShowModal(true);
        setMode("edit");
        setInitialData(data);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        clearErrors();
        reset();
        setInitialData({});
        setFetchingId("");
        setMode("create");
    };

    return {
        mode,
        setMode,
        params,
        setParams,
        fetching,
        setFetching,
        request,
        isLoading,
        setIsLoading,
        isLoadingModal,
        setIsLoadingModal,
        showModal,
        handleShowModal,
        handleEditModal,
        handleCloseModal,
        initialData,
        setInitialData,
        onHandleFilter,
        onHandleOrder,
        fetchingId,
        setFetchingId,
    };
}

export default UsePageController;
