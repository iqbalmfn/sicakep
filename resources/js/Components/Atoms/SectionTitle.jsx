
function SectionTitle({ title }) {
    return (
        <h2 className="text-base md:text-lg font-semibold">
            <span className="border-b-4 border-secondary">{title}</span>
        </h2>
    );
}

export default SectionTitle;
