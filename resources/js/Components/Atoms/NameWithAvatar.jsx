import clsx from "clsx";

const NameWithAvatar = ({ avatar, avatarSize = "md", name, isShowName = true, className }) => {
    let size;
    if (avatarSize === "md") {
        size = "35px";
    } else if (avatarSize === "xs") {
        size = "25px";
    }

    return avatar ? (
        <div className={clsx(className, "flex gap-2 items-center")}>
            <div className={`rounded-full w-[${size}] h-[${size}] group-hover:bg-white transition duration-300 overflow-hidden`}>
                <img
                    src={avatar}
                    alt={name}
                    className={`w-[${size}] h-[${size}] object-cover object-top`}
                />
            </div>
            {isShowName ? <span>{name}</span> : null}
        </div>
    ) : (
        <div className="flex gap-2 items-center">
            <div className={`border border-white rounded-full w-[${size}] h-[${size}] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden`}>
                <img
                    src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff`}
                    alt={name}
                />
            </div>
            {isShowName ? <span>{name}</span> : null}
        </div>
    );
};

export default NameWithAvatar;
