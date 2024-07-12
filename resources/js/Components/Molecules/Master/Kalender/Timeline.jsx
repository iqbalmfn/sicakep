import Icon from "@/Components/Atoms/Icon";

const KalenderTimeline = ({ iconColor, events }) => {
    return (
        <div className="py-4">
            {events.map((event, idx) => (
                <div key={idx} className="relative pb-8">
                    {/* Line for the timeline */}
                    {idx !== events.length - 1 ? (
                        <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-300 z-0"
                            aria-hidden="true"
                        ></span>
                    ) : null}

                    {/* Timeline dot */}
                    <div className="relative flex space-x-3">
                        <div>
                            <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white z-10 relative bg-white overflow-hidden">
                                <span
                                    className={`absolute w-full h-2/4 top-0 left-0 z-10`}
                                    style={{ backgroundColor: iconColor }}
                                ></span>
                                <span
                                    className={`absolute w-full h-2/4 bottom-0 left-0 z-10`}
                                    style={{ backgroundColor: iconColor }}
                                ></span>
                                <Icon
                                    icon={event.icon}
                                    className="text-primary z-20"
                                />
                            </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div className="w-full">
                                <div className="flex justify-between items-center">
                                    <p className="text-sm font-semibold">
                                        {event.title}
                                    </p>
                                    <span className="text-xs text-gray-400 font-light">
                                        {event.diffForHumans}
                                    </span>
                                </div>
                                <div className="mt-1 text-sm">
                                    <p>{event.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KalenderTimeline;
