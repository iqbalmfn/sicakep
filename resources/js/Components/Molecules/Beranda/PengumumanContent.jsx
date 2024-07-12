import PengumumanContentItem from "@/Components/Atoms/PengumumanContentItem";
import SectionTitleGuest from "@/Components/Atoms/SectionTitleGuest";
import { usePage } from "@inertiajs/react";
import clsx from "clsx";

const PengumumanContent = ({ pengumumans, className }) => {
    const { app } = usePage().props;
    return (
        <div className={clsx(className, "col-span-12 lg:col-span-7")}>
            <SectionTitleGuest title={`Pengumuman ${app.name}`} />
            <div className="grid grid-cols-1 gap-5">
                {pengumumans.length > 0
                    ? pengumumans.map((pengumuman) => (
                          <PengumumanContentItem
                              key={pengumuman.id}
                              author={pengumuman.author.name}
                              authorAvatar={pengumuman.author.avatar}
                              date={pengumuman.created_at}
                              judul={pengumuman.judul}
                              isi={pengumuman.isi}
                              dokumen={pengumuman.pdf}
                          />
                      ))
                    : null}
            </div>
        </div>
    );
};

export default PengumumanContent;
