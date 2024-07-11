import { Link } from "@inertiajs/react";

export default function ApplicationLogo({ setting }) {
    return (
        <Link href="/dashboard">
            <img
                src={`/data/setting/`}
                className="w-40"
                alt="logo"
            />
        </Link>
    );
}
