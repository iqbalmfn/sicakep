const CalendarActive = ({ active = null }) => {
    if (active) {
        return (
            <span className="border border-primary text-primary font-semibold px-3 py-1 rounded-lg animate">
                {active}
            </span>
        );
    } else {
        return null;
    }
};

export default CalendarActive;
