import Breadcrumbs from "@/Components/Atoms/Breadcrumbs";
import Button from "@/Components/Atoms/Button";
import Icon from "@/Components/Atoms/Icon";
import AppContentLayout from "@/Layouts/AppContentLayout";
import ContentWrapper from "@/Layouts/Partials/ContentWrapper";
import {
    formatDateWithDay,
    formatRupiah,
    monthNumberToIndonesian,
} from "@/Utils/GlobalFunction";
import { Head, Link } from "@inertiajs/react";
import { Fragment } from "react";

const View = ({ title, breadcrumbs, datas, limit_anggaran }) => {
    let totalAnggaran = 0;
    let totalDanaTerpakai = 0;
    let totalDanaTersisa = 0;

    datas.kategori_list.forEach((kategori) => {
        kategori.list.forEach((data) => {
            let totalTransaksi = 0;
            data.transaksi.forEach((transaksi) => {
                totalTransaksi += parseInt(transaksi.nominal);
            });
            totalDanaTerpakai += parseInt(totalTransaksi);
            totalDanaTersisa += parseInt(data.nominal) - parseInt(totalTransaksi);
            totalAnggaran += parseInt(data.nominal);
        });
    });
    return (
        <AppContentLayout>
            <Head title={title} />
            <Breadcrumbs title={title} breadcrumbs={breadcrumbs} />
            <ContentWrapper>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Link href={route("transaksi.pengeluaran.index")}>
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
                            Laporan Pengeluaran
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
                                        Pengguna Dana
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Tanggal
                                    </th>
                                    <th className="border border-gray-400 px-3 py-2 text-gray-600">
                                        Jenis
                                    </th>
                                    <th
                                        className="border border-gray-400 px-3 py-2 text-gray-600 text-end"
                                        width="10%"
                                    >
                                        Nominal
                                    </th>
                                    <th
                                        className="border border-gray-400 px-3 py-2 text-gray-600 text-end"
                                        width="10%"
                                    >
                                        Dana Terpakai
                                    </th>
                                    <th
                                        className="border border-gray-400 px-3 py-2 text-gray-600 text-end"
                                        width="10%"
                                    >
                                        Dana Tersisa
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
                                                  (data, index) => {
                                                      let totalTransaksi = 0;
                                                      return (
                                                          <Fragment key={index}>
                                                              <tr className="bg-yellow-100">
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-start font-bold">
                                                                      {index +
                                                                          1}
                                                                  </td>
                                                                  <td
                                                                      colSpan={
                                                                          4
                                                                      }
                                                                      className="border border-gray-400 px-3 py-1 text-gray-600 font-bold"
                                                                  >
                                                                      {
                                                                          data.judul
                                                                      }
                                                                  </td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end font-bold">
                                                                      {formatRupiah(
                                                                          data.nominal
                                                                      )}
                                                                  </td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                              </tr>

                                                              {data.transaksi.map(
                                                                  (
                                                                      transaksi,
                                                                      itrax
                                                                  ) => {
                                                                      totalTransaksi +=
                                                                          parseInt(transaksi.nominal);
                                                                      return (
                                                                          <Fragment
                                                                              key={
                                                                                  itrax
                                                                              }
                                                                          >
                                                                              <tr>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-start">
                                                                                      {index +
                                                                                          1}

                                                                                      .
                                                                                      {itrax +
                                                                                          1}
                                                                                  </td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                                                      {
                                                                                          transaksi.judul
                                                                                      }
                                                                                  </td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                                                      {
                                                                                          transaksi
                                                                                              .user
                                                                                              .name
                                                                                      }
                                                                                  </td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                                                      {formatDateWithDay(
                                                                                          transaksi.tanggal
                                                                                      )}
                                                                                  </td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600">
                                                                                      {
                                                                                          transaksi.jenis
                                                                                      }
                                                                                  </td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                                                                      {formatRupiah(
                                                                                          transaksi.nominal
                                                                                      )}
                                                                                  </td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                                              </tr>
                                                                          </Fragment>
                                                                      );
                                                                  }
                                                              )}
                                                              <tr className="font-semibold">
                                                                  <td
                                                                      colSpan={
                                                                          5
                                                                      }
                                                                      className="border border-gray-400 px-3 py-1 text-gray-600 text-start"
                                                                  >
                                                                      Sub Total
                                                                  </td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                                                      {formatRupiah(
                                                                          totalTransaksi
                                                                      )}
                                                                  </td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                                                      {formatRupiah(
                                                                          totalTransaksi
                                                                      )}
                                                                  </td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                              </tr>
                                                              <tr className="font-semibold">
                                                                  <td
                                                                      colSpan={
                                                                          5
                                                                      }
                                                                      className="border border-gray-400 px-3 py-1 text-gray-600 text-start"
                                                                  >
                                                                      Selisih
                                                                  </td>
                                                                  <td
                                                                      colSpan={
                                                                          1
                                                                      }
                                                                      className="border border-gray-400 px-3 py-1 text-gray-600 text-end"
                                                                  >
                                                                      {formatRupiah(
                                                                          parseInt(data.nominal) -
                                                                              parseInt(totalTransaksi)
                                                                      )}
                                                                  </td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end"></td>
                                                                  <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                                                      {formatRupiah(
                                                                          parseInt(data.nominal) -
                                                                              parseInt(totalTransaksi)
                                                                      )}
                                                                  </td>
                                                              </tr>
                                                          </Fragment>
                                                      );
                                                  }
                                              )}
                                          </Fragment>
                                      ))
                                    : null}
                            </tbody>
                            <tfoot>
                                <tr className="bg-green-200 font-extrabold text-md">
                                    <td
                                        colSpan={5}
                                        className="border border-gray-400 px-3 py-1 text-gray-600 text-start"
                                    >
                                        Total Dana
                                    </td>
                                    <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                        {formatRupiah(totalAnggaran)}
                                    </td>
                                    <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                        {formatRupiah(totalDanaTerpakai)}
                                    </td>
                                    <td className="border border-gray-400 px-3 py-1 text-gray-600 text-end">
                                        {formatRupiah(totalDanaTersisa)}
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
