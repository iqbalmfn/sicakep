import FormInput from "./FormInput";

const FilterSearch = ({ onHandleFilter, width = "200" }) => {
    return (
        <div>
            <div className={`w-full sm:w-[${width}px]`}>
                <FormInput
                    className="w-full"
                    type="search"
                    size="sm"
                    placeholder="Search..."
                    name="q"
                    onChange={onHandleFilter}
                />
            </div>
        </div>
    );
};

export default FilterSearch;
