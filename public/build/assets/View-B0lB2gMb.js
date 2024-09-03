import{j as r,Y as b,a as h,r as o}from"./app-Bi1fzKQG.js";import{B as j}from"./Breadcrumbs-B4hL46QH.js";import{B as N}from"./Button-CkE4Hbxy.js";import{I as f}from"./Icon-DFaO2MJP.js";import{A as u}from"./AppContentLayout-BL10_D8d.js";import{C as I}from"./ContentWrapper-Bf3XZgdY.js";import{m as T,f as t,d as w}from"./GlobalFunction-Bn525JcG.js";import"./clsx-B-dksMZM.js";import"./react-toastify.esm-B7nIqQuz.js";/* empty css                      */import"./transition-B_IKbD9p.js";const L=({title:c,breadcrumbs:g,datas:s})=>{let p=0,y=0,i=0;return s.kategori_list.forEach(n=>{n.list.forEach(d=>{let e=0;d.transaksi.forEach(l=>{e+=parseInt(l.nominal)}),y+=parseInt(e),i+=parseInt(d.nominal)-parseInt(e),p+=parseInt(d.nominal)})}),r.jsxs(u,{children:[r.jsx(b,{title:c}),r.jsx(j,{title:c,breadcrumbs:g}),r.jsxs(I,{children:[r.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[r.jsx("div",{className:"flex items-center gap-2",children:r.jsx(h,{href:route("transaksi.pengeluaran.index"),children:r.jsxs(N,{size:"sm",variant:"danger",children:[r.jsx(f,{icon:"chevron-left"})," Kembali"]})})}),r.jsx("div",{className:"flex justify-end gap-2"})]}),r.jsxs("div",{className:"border-t my-5 pt-3",children:[r.jsxs("div",{className:"text-center",children:[r.jsx("h3",{className:"text-2xl font-bold text-gray-900",children:"Laporan Pengeluaran"}),r.jsxs("h5",{className:"text-lg font-bold text-gray-900",children:["Bulan ",T(s.bulan)," Tahun"," ",s.tahun]})]}),r.jsx("div",{className:"my-3",children:r.jsxs("table",{className:"w-full text-left border-collapse",children:[r.jsx("thead",{children:r.jsxs("tr",{className:"bg-gray-100",children:[r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-center",width:"3%",children:"No"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Judul"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Pengguna Dana"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Tanggal"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600",children:"Jenis"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-end",width:"10%",children:"Nominal"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-end",width:"10%",children:"Dana Terpakai"}),r.jsx("th",{className:"border border-gray-400 px-3 py-2 text-gray-600 text-end",width:"10%",children:"Dana Tersisa"})]})}),r.jsx("tbody",{children:s.kategori_list.length>0?s.kategori_list.map((n,d)=>r.jsxs(o.Fragment,{children:[r.jsx("tr",{children:r.jsx("td",{colSpan:8,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold bg-blue-100",children:n.kategori})}),n.list.map((e,l)=>{let x=0;return r.jsxs(o.Fragment,{children:[r.jsxs("tr",{className:"bg-yellow-100",children:[r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-start font-bold",children:l+1}),r.jsx("td",{colSpan:4,className:"border border-gray-400 px-3 py-1 text-gray-600 font-bold",children:e.judul}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end font-bold",children:t(e.nominal)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"})]}),e.transaksi.map((a,m)=>(x+=parseInt(a.nominal),r.jsx(o.Fragment,{children:r.jsxs("tr",{children:[r.jsxs("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-start",children:[l+1,".",m+1]}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.judul}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.user.name}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:w(a.tanggal)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600",children:a.jenis}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(a.nominal)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"})]})},m))),r.jsxs("tr",{className:"font-semibold",children:[r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 text-start",children:"Sub Total"}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(x)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(x)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"})]}),r.jsxs("tr",{className:"font-semibold",children:[r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 text-start",children:"Selisih"}),r.jsx("td",{colSpan:1,className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(parseInt(e.nominal)-parseInt(x))}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end"}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(parseInt(e.nominal)-parseInt(x))})]})]},l)})]},d)):null}),r.jsx("tfoot",{children:r.jsxs("tr",{className:"bg-green-200 font-extrabold text-md ",children:[r.jsx("td",{colSpan:5,className:"border border-gray-400 px-3 py-1 text-gray-600 text-start",children:"Total Dana"}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(p)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(y)}),r.jsx("td",{className:"border border-gray-400 px-3 py-1 text-gray-600 text-end",children:t(i)})]})})]})})]})]})]})};export{L as default};
