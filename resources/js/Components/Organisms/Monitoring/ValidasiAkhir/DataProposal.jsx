import Icon from "@/Components/Atoms/Icon";
import SectionTitle from "@/Components/Atoms/SectionTitle";
import UseValidasiFormData from "@/Hooks/Pengawasan/UseValidasiFormData";
import {
    calculateProposalDuration,
    formatDateYear,
    formatRupiah,
    ucwords,
} from "@/Utils/GlobalFunction";
import clsx from "clsx";

const DataProposal = ({ data }) => {
 
    const {
        dana,
        danaTerpakai,
        catatanHarian,
        persentaseCatatanHarian,
        jumlahTunggakanWajib,
        jumlahTunggakanTambahan,
    } = UseValidasiFormData(data);

    const dataDetail = () => {
        return (
            <table cellPadding={4}>
                <tbody>
                    <tr>
                        <td width="17%">Judul</td>
                        <td width="2%">:</td>
                        <td>{data.judul}</td>
                    </tr>
                    <tr>
                        <td>Jenis</td>
                        <td>:</td>
                        <td>{ucwords(data.jenis)}</td>
                    </tr>
                    <tr>
                        <td>Skema</td>
                        <td>:</td>
                        <td>{data.skema_name.nama}</td>
                    </tr>
                    <tr>
                        <td>Ketua</td>
                        <td>:</td>
                        <td>{data.lecturer_name.nama_lengkap}</td>
                    </tr>
                    <tr>
                        <td>Pelaksanaan</td>
                        <td>:</td>
                        <td>
                            {calculateProposalDuration(
                                data.skema_name.tahun,
                                data.tahun_pelaksanaan,
                                data.kalender_name.tahun_pelaksanaan,
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>Dana Hibah</td>
                        <td>:</td>
                        <td>{formatRupiah(dana, true)}</td>
                    </tr>
                    <tr>
                        <td>Dana Terpakai</td>
                        <td>:</td>
                        <td>{formatRupiah(danaTerpakai, true)}</td>
                    </tr>
                    <tr>
                        <td>Progres Proposal</td>
                        <td>:</td>
                        <td>
                            <div className="bg-gray-300 w-[50%] relative rounded">
                                <div
                                    className={clsx(
                                        persentaseCatatanHarian === 0
                                            ? "bg-gray-300"
                                            : persentaseCatatanHarian <= 25
                                            ? "bg-danger"
                                            : persentaseCatatanHarian <= 50
                                            ? "bg-warning"
                                            : persentaseCatatanHarian <= 75
                                            ? "bg-info"
                                            : "bg-success",
                                        `p-1 rounded text-center text-white text-xs font-semibold`
                                    )}
                                    style={
                                        persentaseCatatanHarian !== 0
                                            ? {
                                                  width:
                                                      persentaseCatatanHarian +
                                                      "%",
                                              }
                                            : null
                                    }
                                >
                                    {persentaseCatatanHarian} %
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Tunggakan Luaran Wajib</td>
                        <td>:</td>
                        <td>{jumlahTunggakanWajib}</td>
                    </tr>
                </tbody>
            </table>
        );
    };

    const dataChecklist = () => {
        return (
            <table>
                <thead>
                    <tr>
                        <th className="border border-gray-300 py-2 bg-gray-100">
                            Laporan Kemajuan
                        </th>
                        <th className="border border-gray-300 py-2 bg-gray-100">
                            Laporan Akhir
                        </th>
                        <th className="border border-gray-300 py-2 bg-gray-100">
                            Catatan Harian
                        </th>
                        <th className="border border-gray-300 py-2 bg-gray-100">
                            Luaran Wajib
                        </th>
                        <th className="border border-gray-300 py-2 bg-gray-100">
                            Luaran Tambahan
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td
                            className="border border-gray-300 py-2"
                            align="center"
                        >
                            {data.laporan.is_finished ? (
                                <Icon
                                    icon="check-circle-fill"
                                    className="text-success text-lg"
                                />
                            ) : (
                                "-"
                            )}
                        </td>
                        <td
                            className="border border-gray-300 py-2"
                            align="center"
                        >
                            {data.laporan_akhir.is_finished ? (
                                <Icon
                                    icon="check-circle-fill"
                                    className="text-success text-lg"
                                />
                            ) : (
                                "-"
                            )}
                        </td>
                        <td
                            className="border border-gray-300 py-2"
                            align="center"
                        >
                            {persentaseCatatanHarian === 100 ? (
                                <Icon
                                    icon="check-circle-fill"
                                    className="text-success text-lg"
                                />
                            ) : (
                                "-"
                            )}
                        </td>
                        <td
                            className="border border-gray-300 py-2"
                            align="center"
                        >
                            {jumlahTunggakanWajib === 0 ? (
                                <Icon
                                    icon="check-circle-fill"
                                    className="text-success text-lg"
                                />
                            ) : (
                                "-"
                            )}
                        </td>
                        <td
                            className="border border-gray-300 py-2"
                            align="center"
                        >
                            {jumlahTunggakanTambahan === 0 ? (
                                <Icon
                                    icon="check-circle-fill"
                                    className="text-success text-lg"
                                />
                            ) : (
                                "-"
                            )}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    };

    return (
        <div>
            <div className="mb-6">
                <SectionTitle title="Resume Proposal" />
            </div>
            <div className="flex flex-col gap-5">
                {dataDetail()}
                {dataChecklist()}
            </div>
        </div>
    );
};

export default DataProposal;
