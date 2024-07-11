import { Link } from "@inertiajs/react";
import Icon from "./Icon";
import SectionTitle from "./SectionTitle";

const Breadcrumbs = ({ title, breadcrumbs }) => {
    return (
        <div className="flex items-center gap-3 mb-4">
            <div className="sm:border-e border-gray-400 pe-3">
                <SectionTitle title={title} />
            </div>
            <div className="hidden sm:flex items-center mt-1 gap-2">
                <Link
                    href="/dashboard"
                    className="text-primary hover:text-primary-hover"
                >
                    Dashboard
                </Link>
                {breadcrumbs.map((breadcrumb, i) => (
                    <div key={i} className="flex items-end gap-2">
                        <Icon icon="chevron-right" className="text-xs" />
                        {breadcrumb.link ? (
                            <Link
                                href={breadcrumb.link}
                                className="text-primary hover:text-primary-hover"
                            >
                                {breadcrumb.name}
                            </Link>
                        ) : (
                            <span>{breadcrumb.name}</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Breadcrumbs;
