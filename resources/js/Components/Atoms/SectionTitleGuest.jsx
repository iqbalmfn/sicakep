import { Link } from "@inertiajs/react";
import Icon from "./Icon";

const SectionTitleGuest = ({
  title,
  navigation = false,
  navigationLabel = null,
  navigationLink = "#",
}) => {
  return (
    <div className="mb-7">
      <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:items-end">
        <h2 className="text-2xl text-nunito font-bold">{title}</h2>
        {navigation ? (
          <Link
            href={navigationLink}
            className="border border-primary text-primary hover:bg-primary/5 px-3 py-2 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span>{navigationLabel}</span>
              <Icon icon="box-arrow-up-right" />
            </div>
          </Link>
        ) : null}
      </div>
      <div className="hidden md:block border-b-4 border-secondary w-full mt-2"></div>
    </div>
  );
};

export default SectionTitleGuest;
