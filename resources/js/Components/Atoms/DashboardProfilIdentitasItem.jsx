const DashboardProfilIdentitasItem = ({ label, value }) => {
    return (
        <div className="flex flex-col">
            <span>{label}</span>
            <span className="text-primary">{value}</span>
        </div>
    );
};

export default DashboardProfilIdentitasItem;
