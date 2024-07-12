import { colorThemeLists } from "@/Dictionaries/ColorThemeLists";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Icon from "../Atoms/Icon";
import { useRecoilState } from "recoil";
import { primaryColorState } from "@/Store/ColorSwitchStore";
import { Tooltip } from "antd";
import { usePage } from "@inertiajs/react";

const ColorSwitch = () => {
    const { setting } = usePage().props

    const [showSwitcher, setShowSwitcher] = useState(false);

    const toggleShowSwitcher = () => {
        setShowSwitcher(!showSwitcher);
    };

    const [primaryColor, setPrimaryColor] = useRecoilState(primaryColorState);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--color-primary",
            setting.warna
        );
    }, []);

    // Fungsi untuk mengubah primary color
    const handleChangeColor = (color, colorHover) => {
        setPrimaryColor(color);
        document.documentElement.style.setProperty("--color-primary", color);
        document.documentElement.style.setProperty(
            "--color-primary-hover",
            colorHover
        );
    };

    return (
        <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-20">
            {/* Kontainer yang dianimasikan */}
            <div
                className={clsx(
                    "transition-transform duration-300 fixed transform -translate-y-1/2",
                    showSwitcher
                        ? "right-0 w-[250px] animate-slideIn"
                        : "right-0 w-0 animate-slideOut",
                    "h-[100px] shadow-lg rounded-tl-lg rounded-bl-lg bg-white z-20"
                )}
            >
                <div className="flex flex-col justify-center">
                    <div className="p-3 text-center">
                        <h3>Ubah Tema</h3>
                    </div>
                    <hr />
                    <div className="py-3 flex justify-center gap-2">
                        {showSwitcher
                            ? colorThemeLists.map((colorThemeList, i) => (
                                  <div
                                      key={i}
                                      className={clsx(
                                          primaryColor === colorThemeList.code
                                              ? "border-blue-600"
                                              : "border-transparent",
                                          "border border-1 rounded-lg flex p-[2px]"
                                      )}
                                  >
                                      <Tooltip title={colorThemeList.name}>
                                          <button
                                              onClick={() =>
                                                  handleChangeColor(
                                                      colorThemeList.code,
                                                      colorThemeList.codeHover
                                                  )
                                              }
                                              style={{
                                                  backgroundColor:
                                                      colorThemeList.code,
                                              }}
                                              className="w-[25px] h-[25px] rounded-lg cursor-pointer"
                                          />
                                      </Tooltip>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>

            {/* Tombol Toggle */}
            <div
                className={clsx(
                    showSwitcher
                        ? "right-[250px] animate-slideInToggle"
                        : "right-0",
                    "fixed transform -translate-y-1/2 z-30"
                )}
            >
                <button
                    onClick={toggleShowSwitcher}
                    className="bg-primary w-[35px] h-[35px] flex justify-center items-center rounded-tl-lg rounded-bl-lg shadow cursor-pointer hover:bg-primary/50"
                >
                    <Icon icon="gear" className="text-white animate-spin" />
                </button>
            </div>
        </div>
    );
};

export default ColorSwitch;
