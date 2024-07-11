export default function TableEmpty({ colSpan, text = "Tidak ada data ditemukan" }) {
    return (
        <tr className="border-b">
            <td colSpan={colSpan} align="center" className="py-5">
                {text}
            </td>
        </tr>
    );
}
