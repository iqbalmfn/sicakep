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
        label: "Hutang & Piutang",
        icon: "arrow-left-right",
        subMenus: [
            {
                href: "/hutang",
                label: "Hutang",
                icon: "journal-text",
                subMenus: [],
                roles: [1,2],
            },
            {
                href: "/piutang",
                label: "piutang",
                icon: "wrench-adjustable",
                subMenus: [],
                roles: [1,2],
            },
        ],
        roles: [1,2],
    },
    {
        href: "/pemasukan",
        label: "Pemasukan",
        icon: "box-arrow-in-right",
        subMenus: [],
        roles: [1, 2],
    },
    {
        href: "/pengeluaran",
        label: "Pengeluaran",
        icon: "box-arrow-right",
        subMenus: [],
        roles: [1, 2],
    }
];
