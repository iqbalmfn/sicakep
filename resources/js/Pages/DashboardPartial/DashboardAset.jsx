import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import AsetItem from "@/Components/Atoms/AsetItem"; // Import Bootstrap Icons
import { useState } from "react";
import ActionButton from "@/Components/Molecules/ActionButton";

const DashboardAset = ({ data }) => {
    // Buat item statis hanya jika data.piutang > 0
    const asetData = data.piutang > 0 
        ? [
            {
                id: "statis", // Pastikan ID ini unik
                nama_rekening: "Aset Piutang",
                bank: {
                    logo: "/images/piutang2.png",
                },
                saldo: data.piutang,
            },
            ...data.aset
          ]
        : data.aset;

    const chunkedAset = [];
    for (let i = 0; i < asetData.length; i += 4) {
        chunkedAset.push(asetData.slice(i, i + 4));
    }

    const [sliderRef, setSliderRef] = useState(null);

    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Disable default arrows
    };

    return (
        <div className="col-span-1">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg h-[489px]">
                <div className="border-b py-4 px-5">
                    <span className="text-lg font-bold">Aset</span>
                </div>
                <Slider ref={setSliderRef} {...settings} className="py-4 px-5">
                    {chunkedAset.length > 0 ? (
                        chunkedAset.map((chunk, index) => (
                            <div key={index}>
                                <div className="grid grid-cols-2 gap-5">
                                    {chunk.map((aset) => (
                                        <AsetItem
                                            key={aset.id}
                                            namaRekening={aset.nama_rekening}
                                            bankLogo={aset.bank.logo}
                                            saldo={aset.saldo}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">
                            Belum ada aset.
                        </p>
                    )}
                </Slider>
                <div className="flex justify-center gap-2 mt-4">
                    <ActionButton
                        variant="info"
                        icon="chevron-left"
                        onClick={() => sliderRef?.slickPrev()}
                    />
                    <ActionButton
                        variant="info"
                        icon="chevron-right"
                        onClick={() => sliderRef?.slickNext()}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardAset;
