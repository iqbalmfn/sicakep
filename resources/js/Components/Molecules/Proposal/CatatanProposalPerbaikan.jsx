import Icon from "@/Components/Atoms/Icon";

const CatatanProposalPerbaikan = ({
    catatanAdministrasi,
    catatanReviewer = [],
    catatanHasil
}) => {
    const catatanAdministrasiRender = () => {
        return catatanAdministrasi ? (
            <div className="flex flex-col gap-1">
                <div>
                    <span className="font-semibold">Administrasi</span>
                </div>
                <div>
                    <p>{catatanAdministrasi}</p>
                </div>
            </div>
        ) : null;
    };

    const catatanReviewerRender = () => {
        return catatanReviewer && catatanReviewer.length > 0
            ? catatanReviewer.map((reviewer, i) => (
                  <div className="flex flex-col gap-1" key={i}>
                      <div>
                          <span className="font-semibold">
                              {`Reviewer Substansi ${i + 1}`}
                          </span>
                      </div>
                      <div>
                          <p>{reviewer.catatan}</p>
                      </div>
                  </div>
              ))
            : null;
    };

    const catatanHasilRender = () => {
        return catatanHasil ? (
            <div className="flex flex-col gap-1">
                <div>
                    <span className="font-semibold">Penetapan Hasil</span>
                </div>
                <div>
                    <p>{catatanHasil}</p>
                </div>
            </div>
        ) : null;
    };

    return catatanAdministrasi || catatanReviewer.length > 0 ? (
        <div className="mt-7 mb-3">
            <span className="font-semibold">
                <Icon icon="chat-right-text" className="me-2" /> Catatan
                Reviewer
            </span>
            <div className="border border-gray-400 rounded py-2 px-3 mt-1 flex flex-col gap-4">
                {catatanAdministrasiRender()}
                {catatanReviewerRender()}
                {catatanHasilRender()}
            </div>
        </div>
    ) : null;
};

export default CatatanProposalPerbaikan;
