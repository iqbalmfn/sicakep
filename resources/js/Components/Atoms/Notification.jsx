import UseNotification from "@/Hooks/UseNotification";
import { Transition } from "@headlessui/react";
import { Link, usePage } from "@inertiajs/react";
import clsx from "clsx";
import Icon from "./Icon";
import NotificationItem from "./NotificationItem";

const Notification = () => {
    const { auth, app } = usePage().props;

    const {
        dataNotification,
        showNotification,
        handleShowNotification,
        readNotification,
    } = UseNotification(app, auth);

    return (
        <div className="relative flex md:me-0" style={{ zIndex: 9999 }}>
            <div
                className={clsx(
                    dataNotification?.total === 0 || !dataNotification?.total
                        ? "hidden"
                        : null,
                    "absolute -top-1 -right-2 animate-bounce"
                )}
            >
                <div className="w-[20px] h-[20px] rounded-full bg-danger flex justify-center items-center">
                    <span className="text-[10px] text-white">
                        {dataNotification?.total}
                    </span>
                </div>
            </div>
            <button onClick={handleShowNotification}>
                <Icon icon="bell" className="text-2xl" />
            </button>

            <Transition
                as={"div"}
                show={showNotification}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div className="absolute bg-white min-w-[350px] shadow-xl rounded h-auto -right-16 sm:right-0 top-12">
                    <div className="flex flex-col">
                        <div className="border-b mb-2 px-3 py-2">
                            <span className="text-base">Notifikasi</span>
                        </div>
                        <div className="-mt-2">
                            {dataNotification?.total > 0 ? (
                                <div className="flex flex-col">
                                    {dataNotification?.data.map(
                                        (notification) => (
                                            <NotificationItem
                                                key={notification.id}
                                                link={notification.url}
                                                avatar={
                                                    notification.sender?.avatar
                                                }
                                                name={notification.sender?.name}
                                                title={notification.title}
                                                message={notification.message}
                                                onClick={() =>
                                                    readNotification(
                                                        notification.id
                                                    )
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 justify-center items-center py-5 text-gray-400">
                                    <Icon
                                        icon="bell-slash"
                                        className="text-[40px]"
                                    />
                                    Tidak ada notifikasi
                                </div>
                            )}
                        </div>
                        <Link
                            href={route("notifikasi.index")}
                            className="border-t mb-2 px-3 pb-1 pt-3 flex justify-center items-center"
                        >
                            <span className="text-primary text-xs">
                                <Icon icon="arrow-right-circle-fill" me={2} />{" "}
                                Lihat Lebih Banyak...
                            </span>
                        </Link>
                    </div>
                </div>
            </Transition>
        </div>
    );
};

export default Notification;
