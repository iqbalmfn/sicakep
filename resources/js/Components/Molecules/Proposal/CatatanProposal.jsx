import Icon from "@/Components/Atoms/Icon";
import { backgroundLight } from "@/Utils/GlobalFunction";
import { Transition } from "@headlessui/react";
import { useState } from "react";

const CatatanProposal = ({
    catatanDekan,
    catatanLppm,
    catatanAdministrasi,
    catatanReviewer,
    catatanHasil,
}) => {
    // page controller
    const [showCatatan, setShowCatatan] = useState(true);

    const handleShowCatatan = () => {
        setShowCatatan(!showCatatan);
    };
    // end : page controller

    const catatanDekanRender = () => {
        return catatanDekan ? (
            <Transition
                show={showCatatan}
                enter="transition-opacity ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex flex-col gap-1">
                    <div>
                        <span className="text-warning font-extrabold">
                            Dekan
                        </span>
                    </div>
                    <div>
                        <p className="text-warning">{catatanDekan}</p>
                    </div>
                </div>
            </Transition>
        ) : null;
    };

    const catatanLppmRender = () => {
        return catatanLppm ? (
            <Transition
                show={showCatatan}
                enter="transition-opacity ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex flex-col gap-1">
                    <div>
                        <span className="text-warning font-extrabold">
                            LPPM
                        </span>
                    </div>
                    <div>
                        <p className="text-warning">{catatanLppm}</p>
                    </div>
                </div>
            </Transition>
        ) : null;
    };

    const catatanAdministrasiRender = () => {
        return catatanAdministrasi ? (
            <Transition
                show={showCatatan}
                enter="transition-opacity ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex flex-col gap-1">
                    <div>
                        <span className="text-warning font-extrabold">
                            Administrasi
                        </span>
                    </div>
                    <div>
                        <p className="text-warning">{catatanAdministrasi}</p>
                    </div>
                </div>
            </Transition>
        ) : null;
    };

    const catatanReviewerRender = () => {
        return catatanReviewer && catatanReviewer.length > 0
            ? catatanReviewer.map((reviewer, i) => (
                  <Transition
                      show={showCatatan}
                      enter="transition-opacity ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                  >
                      <div className="flex flex-col gap-1">
                          <div>
                              <span className="text-warning font-extrabold">
                                  {`Reviewer Substansi ${i + 1}`}
                              </span>
                          </div>
                          <div>
                              <p className="text-warning">{reviewer.catatan}</p>
                          </div>
                      </div>
                  </Transition>
              ))
            : null;
    };

    const catatanHasilRender = () => {
        return catatanHasil ? (
            <Transition
                show={showCatatan}
                enter="transition-opacity ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="flex flex-col gap-1">
                    <div>
                        <span className="text-warning font-extrabold">
                            Penetapan Hasil
                        </span>
                    </div>
                    <div>
                        <p className="text-warning">{catatanHasil}</p>
                    </div>
                </div>
            </Transition>
        ) : null;
    };

    return (
        <div className="mb-3">
            <div className="mb-2">
                <Icon icon="chat-right-text" className="text-warning me-2" />
                <span className="text-warning font-extrabold">Catatan</span>
            </div>
            <div
                className="rounded-lg border-2 px-5 py-3 flex flex-col gap-3"
                style={{
                    backgroundColor: backgroundLight("--color-warning", 0.2),
                    borderColor: backgroundLight("--color-warning", 1),
                }}
            >
                <div className="flex flex-col gap-3">
                    {catatanDekanRender()}
                    {catatanLppmRender()}
                    {catatanAdministrasiRender()}
                    {catatanReviewerRender()}
                    {catatanHasilRender()}
                </div>
                <div>
                    <button
                        type="button"
                        className="text-xs"
                        onClick={handleShowCatatan}
                    >
                        <Icon
                            icon={showCatatan ? "chevron-up" : "chevron-down"}
                            className="text-warning me-2"
                        />
                        <span className="text-warning">
                            {showCatatan
                                ? "Sembunyikan Catatan"
                                : "Lihat Catatan"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CatatanProposal;
