import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import ProposalInformasiItem from "@/Components/Atoms/ProposalInformasiItem";
import { downloadFile, formatDateYear, ucwords } from "@/Utils/GlobalFunction";

const DetailInformasi = ({
    judul,
    jenis,
    skema,
    prodi,
    tahunAnggaran,
    tahunKegiatan,
    tahunUsulan,
    fileProposal,
    fileSubstansi,
    isHideFile = false,
    isHideFileSubstansi = false,
}) => {
    return (
        <div className="flex flex-col gap-5 -mt-5">
            <div className="flex justify-between gap-10 items-end -mb-3">
                <h2 className="text-base font-extrabold uppercase">{judul}</h2>
                <div className="flex gap-2 flex-shrink-0">
                    {isHideFile ? null : (
                        <a
                            href={`/storage/proposal/${fileProposal}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="sm"
                                variant="danger"
                                disabled={!fileProposal}
                            >
                                <Icon icon="file-earmark-pdf-fill" me={2} />{" "}
                                Proposal
                            </Button>
                        </a>
                    )}
                    {isHideFileSubstansi ? null : (
                        <a
                            href={`/storage/proposal_substansi/${fileSubstansi}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                size="sm"
                                variant="danger"
                                disabled={!fileSubstansi}
                            >
                                <Icon icon="file-earmark-pdf-fill" me={2} />
                                Substansi
                            </Button>
                        </a>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-x-5">
                <div className="col-span-1 flex flex-col">
                    <ProposalInformasiItem>
                        <span>Tahun Anggaran</span>
                        <span className="font-semibold">{tahunAnggaran}</span>
                    </ProposalInformasiItem>
                    <ProposalInformasiItem>
                        <span>Jenis Proposal</span>
                        <span className="font-semibold">{ucwords(jenis)}</span>
                    </ProposalInformasiItem>
                    <ProposalInformasiItem isLast>
                        <span>Skema {ucwords(jenis)}</span>
                        <span className="font-semibold">{skema}</span>
                    </ProposalInformasiItem>
                </div>
                <div className="col-span-1 flex flex-col">
                    <ProposalInformasiItem>
                        <span>Rumpun Ilmu</span>
                        <span className="font-semibold">{prodi}</span>
                    </ProposalInformasiItem>
                    <ProposalInformasiItem>
                        <span>Lama Kegiatan</span>
                        <span className="font-semibold">{`${tahunKegiatan} Tahun`}</span>
                    </ProposalInformasiItem>
                    <ProposalInformasiItem isLast>
                        <span>Tahun Pertama Usulan</span>
                        <span className="font-semibold">
                            {formatDateYear(tahunUsulan)}
                        </span>
                    </ProposalInformasiItem>
                </div>
            </div>
        </div>
    );
};

export default DetailInformasi;
