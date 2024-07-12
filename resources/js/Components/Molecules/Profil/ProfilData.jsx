import TabItem from "@/Components/Atoms/TabItem";
import ProfilDataBuku from "./ProfilDataBuku";
import ProfilDataHki from "./ProfilDataHki";
import ProfilDataPenelitian from "./ProfilDataPenelitian";
import ProfilDataPengabdian from "./ProfilDataPengabdian";
import ProfilDataPublikasi from "./ProfilDataPublikasi";

const ProfilData = ({ data, sintaCategories, activeTab, handleSwitchTab }) => {
    const profilDataShow = (activeTab) => {
        switch (activeTab) {
            case "pengabdian":
                return <ProfilDataPengabdian datas={data.pengabdian} />;

            case "publikasi":
                return <ProfilDataPublikasi datas={data.publikasi} />;

            case "hki":
                return <ProfilDataHki datas={data.hki} />;

            case "buku":
                return <ProfilDataBuku datas={data.buku} />;

            default:
                return <ProfilDataPenelitian datas={data.penelitian} />;
        }
    };

    return (
        <>
            <div className="flex flex-wrap gap-3 md:gap-5 mb-5">
                {sintaCategories.map((category, i) => (
                    <TabItem
                        key={i}
                        category={category}
                        handleSwitchTab={handleSwitchTab}
                        activeTab={activeTab}
                    />
                ))}
            </div>
            <div>{profilDataShow(activeTab)}</div>
        </>
    );
};

export default ProfilData;
