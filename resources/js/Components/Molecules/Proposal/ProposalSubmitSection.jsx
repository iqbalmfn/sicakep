import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import { Link } from "@inertiajs/react";
import clsx from "clsx";

const ProposalSubmitSection = ({
    isDraft = true,
    cancelLink,
    cancelLabel,
    handleDraft,
    handleNext,
    disabled = false,
    hide = false,
    step = null,
    className,
}) => {
    return (
        <div className={clsx(className, "border-t pt-4")}>
            <div className="flex flex-col md:flex-row md:justify-between gap-5">
                <Link href={cancelLink}>
                    <Button
                        size="sm"
                        variant="danger"
                        className="w-full md:w-auto"
                        outline
                    >
                        <Icon icon="chevron-left" me={2} />
                        {cancelLabel}
                    </Button>
                </Link>
                {!hide ? (
                    <div className="flex flex-col md:flex-row gap-3">
                        {step === "rangkuman" || step === "konfirmasi" ? (
                            <Button
                                size="sm"
                                type="submit"
                                name="save"
                                onClick={handleDraft}
                                variant="info"
                                disabled={disabled}
                                className="flex items-center justify-center md:justify-start"
                            >
                                <Icon icon="send" me={2} />
                                Submit Proposal
                            </Button>
                        ) : (
                            <>
                                <Button
                                    size="sm"
                                    type="submit"
                                    name="save"
                                    onClick={handleDraft}
                                    variant="info"
                                    disabled={disabled}
                                    className="flex items-center justify-center md:justify-start"
                                >
                                    Simpan {isDraft ? "sebagai draft" : null }
                                    <Icon icon="save" ms={2} />
                                </Button>
                                <Button
                                    size="sm"
                                    type="submit"
                                    name="selanjutnya"
                                    onClick={handleNext}
                                    variant="primary"
                                    disabled={disabled}
                                    className="flex items-center justify-center md:justify-start"
                                >
                                    Selanjutnya
                                    <Icon icon="chevron-right" ms={2} />
                                </Button>
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProposalSubmitSection;
