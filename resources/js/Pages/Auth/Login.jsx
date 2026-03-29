import Button from "@/Components/Atoms/Button";
import Divider from "@/Components/Atoms/Divider";
import FormInput from "@/Components/Atoms/FormInput";
import Icon from "@/Components/Atoms/Icon";
import UseLogin from "@/Hooks/Auth/UseLogin";
import AppLayout from "@/Layouts/AppLayout";
import { Head } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    const { data, processing, handleOnChange, submit } = UseLogin();

    return (
        <AppLayout>
            <Head title="Login" />

            <div className="flex flex-col justify-center gap-8 h-full">
                <div className="flex flex-col items-center text-center">
                    <div className="relative group mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-info rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <img
                            src={`/images/logo.png`}
                            alt="logo"
                            className="relative h-24 w-auto transform transition duration-500 group-hover:scale-105"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        Selamat Datang! 👋
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 max-w-[280px]">
                        Sistem Informasi Catatan Keuangan Pribadi
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                        <span className="bg-slate-900/0 px-4 text-slate-500 backdrop-blur-none">Masuk ke Akun</span>
                    </div>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <FormInput
                            name="username"
                            placeholder="Username"
                            onChange={handleOnChange}
                            value={data.username}
                            prefix="👤"
                        />
                        <FormInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleOnChange}
                            value={data.password}
                            prefix="🔑"
                        />
                    </div>
                    
                    <Button 
                        type="submit" 
                        disabled={processing}
                        variant="primary"
                        className="w-full py-4"
                    >
                        <div className="flex justify-center items-center gap-2">
                            {processing ? (
                                <div className="h-5 w-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Masuk</span>
                                    <Icon icon="box-arrow-in-right" />
                                </>
                            )}
                        </div>
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
