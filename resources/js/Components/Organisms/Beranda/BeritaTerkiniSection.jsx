import BeritaItem from "@/Components/Atoms/BeritaItem";
import PengumumanItem from "@/Components/Atoms/PengumumanItem";
import SectionTitleGuest from "@/Components/Atoms/SectionTitleGuest";
import PengumumanContent from "@/Components/Molecules/Beranda/PengumumanContent";
import FloatingContent from "@/Layouts/Partials/FloatingContent";
import clsx from "clsx";
import { useState } from "react";

const BeritaTerkiniSection = ({
    pengumumans,
    beritas,
    pengumumanBimas,
    pengumumanDiktis,
}) => {
    const diktis = pengumumanDiktis.original?.channel?.item;

    const tabs = ["pengumuman bima", "pengumuman dikti", "berita bima"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const handleSwitchTab = (tab) => {
        setActiveTab(tab);
    };

    return (
        <FloatingContent id="berita-terkini">
            <PengumumanContent pengumumans={pengumumans} />
            <div className="col-span-12 lg:col-span-5">
                <SectionTitleGuest
                    title="Konten Eksternal"
                    navigationLabel="Lihat Semua Berita"
                />
                <div className="grid grid-cols-12 gap-5">
                    {/* <div className="col-span-12 lg:col-span-7">
                        <ContentBeritaSlideshow beritas={beritas} />
                    </div> */}
                    <div className="col-span-12">
                        <div className="grid grid-cols-3 mb-5">
                            {tabs.map((tab, i) => (
                                <div
                                    key={i}
                                    className={clsx(
                                        activeTab === tab
                                            ? "border-primary"
                                            : "border-color-gray-300",
                                        "text-center pb-3 border-b-4 cursor-pointer"
                                    )}
                                    onClick={() => handleSwitchTab(tab)}
                                >
                                    <span className="font-medium uppercase">
                                        {tab}
                                    </span>
                                </div>
                            ))}
                        </div>
                        {activeTab === "berita bima" ? (
                            <div className="flex flex-col gap-5">
                                {beritas.length > 0
                                    ? beritas.map((berita) => (
                                          <BeritaItem
                                              key={berita.id}
                                              judul={berita.judul}
                                              image={berita.files[0].url}
                                              author={berita.no_surat}
                                              date={berita.tgl_pemberitaan}
                                          />
                                      ))
                                    : null}
                            </div>
                        ) : activeTab === "pengumuman bima" ? (
                            <div className="flex flex-col gap-5">
                                {pengumumanBimas.length > 0
                                    ? pengumumanBimas.map((pengumuman) => (
                                          <PengumumanItem
                                              dir={pengumuman.direktorat}
                                              key={pengumuman.id}
                                              author={pengumuman.no_surat}
                                              date={pengumuman.tgl_pemberitaan}
                                              judul={pengumuman.judul}
                                              dokumen={pengumuman.files}
                                              isBima
                                          />
                                      ))
                                    : null}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5">
                                {diktis ? (
                                    diktis.length > 0 ? (
                                        diktis.map((dikti, i) => (
                                            <PengumumanItem
                                                key={i}
                                                author="DIKTI"
                                                date={dikti.pubDate}
                                                judul={dikti.title}
                                                link={dikti.guid}
                                            />
                                        ))
                                    ) : null
                                ) : (
                                    <div className="w-100 border border-red-500 rounded p-14 text-center text-red-700">
                                        Data sumber sedang mengalami gangguan
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <ContentExternal className="block md:hidden" /> */}
        </FloatingContent>
    );
};

export default BeritaTerkiniSection;
