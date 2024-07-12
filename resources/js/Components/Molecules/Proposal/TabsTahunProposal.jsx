import TabItem from '@/Components/Atoms/TabItem';
import React from 'react'

const TabsTahunProposal = ({tahun, activeTab, handleSwitchTab}) => {
    let listItems = [];
    for (let i = 0; i < tahun; i++) {
        listItems.push(
            <TabItem
                key={i}
                category={`Tahun ${i + 1}`}
                handleSwitchTab={handleSwitchTab}
                activeTab={activeTab}
            />
        );
    }

    return (
        <div className="flex flex-wrap gap-3 md:gap-5 mb-5">
            {listItems}
        </div>
    );
}

export default TabsTahunProposal