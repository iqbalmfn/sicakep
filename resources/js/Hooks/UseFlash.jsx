import { useEffect } from "react";
import { toast } from "react-toastify";

function UseFlash(flash) {
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success, {
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
        if (flash.error) {
            toast.error(flash.error, {
                isLoading: false,
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
            });
        }
    }, [flash]);
}

export default UseFlash;
