import Button from "@/Components/Atoms/Button";
import Divider from "@/Components/Atoms/Divider";
import FormInput from "@/Components/Atoms/FormInput";
import Icon from "@/Components/Atoms/Icon";
import UseLogin from "@/Hooks/Auth/UseLogin";
import AppLayout from "@/Layouts/AppLayout";
import { Head, usePage } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { data, processing, handleOnChange, submit } = UseLogin();

    return (
        <AppLayout>
            <Head title="Login" />

            <div className="flex flex-col justify-center gap-10 h-full md:py-10">
                <img
                    src={`/data/setting/`}
                    alt="logo"
                    className="img-fluid lg:w-[60%] mx-auto"
                />
                <div className="flex flex-col gap-5">
                    <div>
                        <h1 className="text-lg font-medium">
                            Login dengan akun Anda
                        </h1>
                    </div>
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        <FormInput
                            name="username"
                            placeholder="Username/Email"
                            onChange={handleOnChange}
                            value={data.username}
                        />
                        <FormInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleOnChange}
                            value={data.password}
                        />
                        <Button type="submit" disabled={processing}>
                            <div className="flex justify-center gap-3">
                                <Icon
                                    icon="box-arrow-in-right"
                                    className="text-white"
                                />
                                <span>Login</span>
                            </div>
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
