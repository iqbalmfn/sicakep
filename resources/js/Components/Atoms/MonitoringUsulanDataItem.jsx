const MonitoringUsulanDataItem = ({ label, value }) => {
    return (
        <div className="flex gap-2">
            <span>{label}</span>
            <span>:</span>
            <span className="font-semibold">{value}</span>
        </div>
    );
};

export default MonitoringUsulanDataItem;
