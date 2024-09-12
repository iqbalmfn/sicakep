export const menus = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: "graph-up",
        subMenus: [],
        roles: [1,2],
    },
    {
        href: null,
        label: "Master",
        icon: "database",
        subMenus: [
            {
                href: "/master/kategori",
                label: "Kategori Pengeluaran & Pemasukan",
                icon: "tag",
                subMenus: [],
                roles:[1]
            },
            {
                href: "/master/bank",
                label: "Bank",
                icon: "bank2",
                subMenus: [],
                roles:[1]
            },
        ],
        roles: [1],
    },
    {
        href: "/perencanaan",
        label: "Perencanaan",
        icon: "journal-check",
        roles: [1,2],
    },
    {
        href: null,
        label: "Utang & Piutang",
        icon: "arrow-left-right",
        subMenus: [
            {
                href: "/utang-piutang/utang",
                label: "Utang",
                icon: "arrow-left-square",
                subMenus: [],
                roles: [1,2],
            },
            {
                href: "/utang-piutang/piutang",
                label: "Piutang",
                icon: "arrow-right-square",
                subMenus: [],
                roles: [1,2],
            },
        ],
        roles: [1,2],
    },
    {
        href: null,
        label: "Transaksi",
        icon: "cart-check",
        subMenus: [
            {
                href: "/transaksi/pemasukan",
                label: "Pemasukan",
                icon: "arrow-right-square",
                subMenus: [],
                roles: [1, 2],
            },
            {
                href: "/transaksi/pengeluaran",
                label: "Pengeluaran",
                icon: "arrow-left-square",
                subMenus: [],
                roles: [1, 2],
            }
        ],
        roles: [1,2],
    },
];
