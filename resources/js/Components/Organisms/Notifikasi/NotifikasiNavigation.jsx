import Button from "@/Components/Atoms/Button";
import FormGroup from "@/Components/Atoms/FormGroup";
import Icon from "@/Components/Atoms/Icon";
import UseNotifikasiNavigation from "@/Hooks/Notifikasi/UseNotifikasiNavigation";
import { ucwords } from "@/Utils/GlobalFunction";

const NotifikasiNavigation = ({ params, onChange }) => {
    const { statusList, orderList, handleReadAll } = UseNotifikasiNavigation();

    const filterStatus = () => {
        return (
            <FormGroup>
                <label className="font-extrabold">Status</label>
                <div className="flex flex-col gap-2">
                    {statusList.map((status) => (
                        <div key={status} className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="isRead"
                                id={status}
                                value={status}
                                onChange={onChange}
                                defaultChecked={params.isRead == status}
                                className="cursor-pointer checked:text-primary"
                            />
                            <label htmlFor={status} className="cursor-pointer">
                                {`${ucwords(
                                    status == "true" ? "sudah" : "belum"
                                )} Dibaca`}
                            </label>
                        </div>
                    ))}
                </div>
            </FormGroup>
        );
    };

    const filterOrder = () => {
        return (
            <FormGroup>
                <label className="font-extrabold">Urut Berdasarkan</label>
                <div className="flex flex-col gap-2">
                    {orderList.map((order) => (
                        <div key={order} className="flex items-center gap-3">
                            <input
                                type="radio"
                                name="orderDirection"
                                id={order}
                                value={order}
                                onChange={onChange}
                                defaultChecked={params.orderDirection == order}
                                className="cursor-pointer checked:text-primary"
                            />
                            <label htmlFor={order} className="cursor-pointer">
                                {`${ucwords(
                                    order == "desc" ? "terbaru" : "terlama"
                                )}`}
                            </label>
                        </div>
                    ))}
                </div>
            </FormGroup>
        );
    };

    return (
        <div className="flex flex-col gap-5">
            <Button outline onClick={handleReadAll}>
                <Icon icon="check-circle" me={2} /> Tandai semua sudah dibaca
            </Button>
            <hr />
            {filterStatus()}
            <hr />
            {filterOrder()}
        </div>
    );
};

export default NotifikasiNavigation;
