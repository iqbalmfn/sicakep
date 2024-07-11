import clsx from "clsx";

const TabItem = ({ handleSwitchTab, activeTab, category, }) => {
    return (
        <div
            onClick={() => handleSwitchTab(category)}
            className={clsx(
                activeTab === category && "border-b-2",
                "uppercase cursor-pointer hover:border-b-2 pb-2 border-primary"
            )}
        >
            {category}
        </div>
    );
};

export default TabItem;
