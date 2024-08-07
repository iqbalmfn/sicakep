import{j as r,Y as c,a as y,r as b}from"./app-CjfYFX5_.js";import{B as p,C as g}from"./ContentWrapper-DNQ2og-V.js";import{B as i,I as m}from"./Button-CiTflGKJ.js";import{A as h}from"./AppContentLayout-ip5iDx_b.js";import{m as j,f as e}from"./GlobalFunction-3O6TYQ86.js";import"./clsx-B-dksMZM.js";import"./react-toastify.esm-D5LBCEBx.js";/* empty css                      */import"./transition-3t7GowXj.js";const B=({title:d,breadcrumbs:x,datas:t,limit_anggaran:l})=>r.jsxs(h,{children:[r.jsx(c,{title:d}),r.jsx(p,{title:d,breadcrumbs:x}),r.jsxs(g,{children:[r.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[r.jsx("div",{className:"flex items-center gap-2",children:r.jsx(y,{href:route("perencanaan.index"),children:r.jsxs(i,{size:"sm",variant:"danger",children:[r.jsx(m,{icon:"chevron-left"})," Kembali"]})})}),r.jsx("div",{className:"flex justify-end gap-2"})]}),r.jsxs("div",{className:"border-t my-5 pt-3",children:[r.jsxs("div",{className:"text-center",children:[r.jsx("h3",{className:"text-2xl font-bold text-gray-900",children:"Perencanaan Anggaran"}),r.jsxs("h5",{className:"text-lg font-bold text-gray-900",children:["Bulan ",j(t.bulan)," Tahun"," ",t.tahun]})]}),r.jsx("div",{className:"my-3",children:r.jsxs("table",{className:"w-full text-left border-collapse",children:[r.jsx("thead",{children:r.jsxs("tr",{className:"bg-gray-100",children:[r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-center",width:"3%",children:"No"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Judul"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Pemegang Anggaran"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Jenis"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Tipe"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Status"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-end",width:"10%",children:"Besarnya"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-end",width:"10%",children:"Kalkulasi"})]})}),r.jsx("tbody",{children:t.kategori_list.length>0?t.kategori_list.map((s,n)=>r.jsxs(b.Fragment,{children:[r.jsx("tr",{children:r.jsx("td",{colSpan:8,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold bg-blue-100",children:s.kategori})}),s.list.map((a,o)=>r.jsxs("tr",{children:[r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-center",children:o+1}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.judul}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.pic.name}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.kategori.nama}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.tipe}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.status==0?"reject":a.status==1?"accept":"waiting"}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:e(a.nominal)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"})]},o)),r.jsxs("tr",{children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold",children:"Total Cash"}),r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end",children:e(s.sub_total_cash)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"})]}),r.jsxs("tr",{children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold",children:"Total Transfer"}),r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end",children:e(s.sub_total_transfer)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"})]}),r.jsxs("tr",{children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold",children:"Sub Total"}),r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end",children:e(s.sub_total)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"})]})]},n)):null}),r.jsxs("tfoot",{children:[r.jsxs("tr",{className:"bg-red-200",children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold",children:"Limit Anggaran"}),r.jsx("td",{colSpan:6,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end",children:e(l)})]}),r.jsxs("tr",{className:"bg-yellow-200",children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold",children:"Total Cash"}),r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end",children:e(t.total_cash)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"})]}),r.jsxs("tr",{className:"bg-yellow-200",children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold",children:"Total Transfer"}),r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end",children:e(t.total_transfer)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold text-end"})]}),r.jsxs("tr",{className:"bg-yellow-200",children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold",children:"Total Anggaran"}),r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end",children:e(t.total)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end",children:e(t.total)})]}),r.jsxs("tr",{className:"bg-green-200",children:[r.jsx("td",{colSpan:2,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold",children:"Selisih Anggaran"}),r.jsx("td",{colSpan:6,className:"border border-gray-400 px-3 py-1 text-gray-600 font-extrabold text-end",children:e(l-t.total)})]})]})]})})]})]})]});export{B as default};