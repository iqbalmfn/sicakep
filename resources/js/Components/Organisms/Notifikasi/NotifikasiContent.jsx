import Alert from "@/Components/Atoms/Alert";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import NotificationListItem from "@/Components/Atoms/NotificationListItem";
import { notificatonRead } from "@/Service/NotificationService";
import { router, usePage } from "@inertiajs/react";

const NotifikasiContent = ({ datas, filtered, onHandleFilter }) => {
    const { universitas } = usePage().props;

    const notificationReadCall = async (notificationId) => {
        try {
            await notificatonRead(notificationId);
        } catch (error) {
            console.log(error);
        }
    };

    const handleReadNotification = (notificationId) => {
        notificationReadCall(notificationId);
    };

    const handleViewMore = () => {
        router.visit(
            route("notifikasi.index", {
                perPage: filtered.perPage
                    ? parseInt(filtered.perPage) + 10
                    : 20,
            }),
            {
                preserveScroll: true,
                preserveState: true,
            }
        );
    };

    return (
        <div className="flex flex-col gap-3">
            {datas.total > 0 ? (
                datas.data.map((data) => (
                    <NotificationListItem
                        key={data.id}
                        link={data.url}
                        avatar={
                            data.sender
                                ? data.sender.avatar
                                    ? data.sender.avatar
                                    : `https://ui-avatars.com/api/?name=${data.sender.name}&background=random&color=fff`
                                : universitas.logo
                        }
                        title={data.title}
                        message={data.message}
                        createdAt={data.created_at}
                        onClick={() => handleReadNotification(data.id)}
                        isRead={data.read_at}
                    />
                ))
            ) : (
                <Alert
                    icon="bell-slash"
                    color="--color-primary"
                    message="Tidak ada notifikasi"
                />
            )}

            {datas.total > datas.to ? (
                <div className="flex justify-center my-5">
                    <Button
                        size="sm"
                        type="submit"
                        name="perPage"
                        onClick={handleViewMore}
                    >
                        <Icon icon="chevron-double-down" me={2} /> Lihat lebih
                        banyak
                    </Button>
                </div>
            ) : null}
        </div>
    );
};

export default NotifikasiContent;
