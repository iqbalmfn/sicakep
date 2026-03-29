import { Link } from "@inertiajs/react";

export default function ApplicationLogo({ setting }) {
    return (
        <Link href="/dashboard">
            <img
                src={`/images/logo_old.png`}
                className="w-[125px] rounded-lg"
                alt="logo"
            />
        </Link>
    );
}
