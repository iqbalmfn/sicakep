import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import { formatRupiah, monthNumberToIndonesian } from "@/Utils/GlobalFunction";
import { Head, Link } from "@inertiajs/react";
import { Fragment } from "react";

const View = ({
    title,
    breadcrumbs,
    datas,
    limit_anggaran,
    filtered,
    flash,
}) => {
    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Link href={route("perencanaan.index")}>
                            <Button size="sm" variant="danger">
                                <Icon icon="chevron-left" /> Kembali
                            </Button>
                        </Link>
                    </div>
                    <div className="flex justify-end gap-2"></div>
                </div>
                <div className="border-t my-5 pt-3">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900">
                            Perencanaan Anggaran
                        </h3>
                        <h5 className="text-lg font-bold text-gray-900">
                            Bulan {monthNumberToIndonesian(datas.bulan)} Tahun{" "}
                            {datas.tahun}
                        </h5>
                    </div>
                    <div className="my-3">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th
                                        className="border border-gray-400 px-3 py-2 text-gray-600 text-center"
                                        width="3%"
                                    >
                                        No
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Judul
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Pemegang Anggaran
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Jenis
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Tipe
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Status
                                    </th>
                                    <th
                                        className="border border-gray-400 px-3 py-2 text-gray-600 text-end"
                                        width="10%"
                                    >
                                        Besarnya
                                    </th>
                                    <th
                                        className="border border-gray-400 px-3 py-2 text-gray-600 text-end"
                                        width="10%"
                                    >
                                        Kalkulasi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {datas.kategori_list.length > 0
                                    ? datas.kategori_list.map((kategori, i) => (
                                          <Fragment key={i}>
                                              <tr>
                                                  <td
                                                      colSpan={8}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold bg-blue-100"
                                                  >
                                                      {kategori.kategori}
                                                  </td>
                                              </tr>
                                              {kategori.list.map(
                                                  (data, index) => (
                                                      <tr key={index}>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600 text-center">
                                                              {index + 1}
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                              {data.judul}
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                              {data.pic.name}
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                              {
                                                                  data.kategori
                                                                      .nama
                                                              }
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                              {data.tipe}
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                              {data.status == 0
                                                                  ? "reject"
                                                                  : data.status ==
                                                                    1
                                                                  ? "accept"
                                                                  : "waiting"}
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                                              {formatRupiah(
                                                                  data.nominal
                                                              )}
                                                          </td>
                                                          <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                      </tr>
                                                  )
                                              )}
                                              <tr>
                                                  <td
                                                      colSpan={2}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold"
                                                  >
                                                      Total Cash
                                                  </td>
                                                  <td
                                                      colSpan={5}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"
                                                  >
                                                      {formatRupiah(
                                                          kategori.sub_total_cash
                                                      )}
                                                  </td>
                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"></td>
                                              </tr>
                                              <tr>
                                                  <td
                                                      colSpan={2}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold"
                                                  >
                                                      Total Transfer
                                                  </td>
                                                  <td
                                                      colSpan={5}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"
                                                  >
                                                      {formatRupiah(
                                                          kategori.sub_total_transfer
                                                      )}
                                                  </td>
                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"></td>
                                              </tr>
                                              <tr>
                                                  <td
                                                      colSpan={2}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold"
                                                  >
                                                      Sub Total
                                                  </td>
                                                  <td
                                                      colSpan={5}
                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"
                                                  >
                                                      {formatRupiah(
                                                          kategori.sub_total
                                                      )}
                                                  </td>
                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"></td>
                                              </tr>
                                          </Fragment>
                                      ))
                                    : null}
                            </tbody>
                            <tfoot>
                                <tr className="bg-red-200">
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold"
                                    >
                                        Limit Anggaran
                                    </td>
                                    <td
                                        colSpan={6}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end"
                                    >
                                        {formatRupiah(limit_anggaran)}
                                    </td>
                                </tr>
                                <tr className="bg-yellow-200">
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold"
                                    >
                                        Total Cash
                                    </td>
                                    <td
                                        colSpan={5}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end"
                                    >
                                        {formatRupiah(datas.total_cash)}
                                    </td>
                                    <td className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"></td>
                                </tr>
                                <tr className="bg-yellow-200">
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold"
                                    >
                                        Total Transfer
                                    </td>
                                    <td
                                        colSpan={5}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end"
                                    >
                                        {formatRupiah(datas.total_transfer)}
                                    </td>
                                    <td className="border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"></td>
                                </tr>
                                <tr className="bg-yellow-200">
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold"
                                    >
                                        Total Anggaran
                                    </td>
                                    <td
                                        colSpan={5}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end"
                                    >
                                        {formatRupiah(datas.total)}
                                    </td>
                                    <td className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end">
                                        {formatRupiah(datas.total)}
                                    </td>
                                </tr>

                                <tr className="bg-green-200">
                                    <td
                                        colSpan={2}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold"
                                    >
                                        Selisih Anggaran
                                    </td>
                                    <td
                                        colSpan={6}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end"
                                    >
                                        {formatRupiah(
                                            limit_anggaran - datas.total
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </ContentWrapper>
        </AppContentLayout>
    );
};

export default View;
