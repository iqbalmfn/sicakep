import SectionTitle from "@/Components/Atoms/SectionTitle";
import Table from "../Table";

const ProfilSummary = ({ summaries }) => {
    const dataRender = () => {
        return summaries.map((summary, i) => (
            <Table.TrBody key={i}>
                <Table.Td>{summary.title}</Table.Td>
                <Table.Td align="center" className="text-secondary">
                    {summary.scopus}
                </Table.Td>
                <Table.Td align="center" className="text-success">
                    {summary.gscholar}
                </Table.Td>
                <Table.Td align="center" className="text-danger">
                    {summary.wos}
                </Table.Td>
            </Table.TrBody>
        ));
    };

    return (
        <div className="col-span-12 lg:col-span-3">
            <SectionTitle title="Summary"/>
            <Table className="text-xs">
                <Table.Thead>
                    <Table.TrHead className="bg-white">
                        <Table.Th width="25"></Table.Th>
                        <Table.Th align="center" className="text-secondary">
                            Scopus
                        </Table.Th>
                        <Table.Th align="center" className="text-success">
                            GScholar
                        </Table.Th>
                        <Table.Th align="center" className="text-danger">
                            WOS
                        </Table.Th>
                    </Table.TrHead>
                </Table.Thead>
                <Table.Tbody>{dataRender()}</Table.Tbody>
            </Table>
        </div>
    );
};

export default ProfilSummary;
