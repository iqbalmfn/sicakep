import{j as s}from"./app-DM-GkA35.js";import{I as l}from"./Icon-aDvYvAPI.js";import{L as j}from"./Label-Dwm9ge0U.js";import{M as n}from"./Modal-BfgDKEvQ.js";import{f as c,c as x}from"./GlobalFunction-BEL7TiXH.js";import{c as o}from"./clsx-B-dksMZM.js";import"./dialog-DHYKxqCe.js";import"./transition-qXDfPg6a.js";import"./react-toastify.esm-BLIOqqY_.js";const k=({title:m,showModal:u,closeModal:h,data:e})=>{var t,d;const r=Array.isArray(e.piutang_detail)?e.piutang_detail.reduce((i,p)=>i+p.nominal,0):0;return s.jsxs(n,{maxWidth:"3xl",show:u,onClose:h,closeable:!1,children:[s.jsxs(n.Header,{onClick:h,children:["Detail ",m]}),s.jsx(n.Body,{children:s.jsxs("div",{className:"grid grid-cols-2 gap-4 py-5",children:[s.jsxs("div",{className:"col-span-1 flex flex-col gap-4 border-e",children:[s.jsx("h3",{className:"text-center font-bold underline text-lg",children:"Data"}),s.jsx("table",{className:"w-full text-left -mt-2",cellPadding:5,children:s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("th",{width:"40%",children:"Donatur"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:(t=e==null?void 0:e.user)==null?void 0:t.name})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"40%",children:"Peminjam"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e==null?void 0:e.nama})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"40%",children:"Nominal"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e!=null&&e.nominal?c(e==null?void 0:e.nominal):"-"})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"40%",children:"Sudah Dibayar"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:c(r)})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Status"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:s.jsx(j,{variant:(e==null?void 0:e.nominal)<=r?"success":"danger",children:(e==null?void 0:e.nominal)<=r?"Lunas":"Belum Lunas"})})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Tanggal Meminjam"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:x(e==null?void 0:e.tanggal)})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"28%",children:"Janji Bayar"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e!=null&&e.jatuh_tempo?x(e.jatuh_tempo):s.jsx(j,{variant:"info",children:"Tidak Ditentukan"})})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Deskripsi"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e!=null&&e.deskripsi?e.deskripsi:"-"})]})]})})]}),s.jsxs("div",{className:"col-span-1 flex flex-col gap-4 border-e",children:[s.jsx("h3",{className:"text-center font-bold underline text-lg",children:"Transaksi Pelunasan"}),((d=e.piutang_detail)==null?void 0:d.length)>0?e.piutang_detail.map(i=>s.jsxs("div",{className:o(i.status==1?"border-success":"border-danger","border  flex flex-col mx-5"),children:[s.jsx("div",{className:o(i.status==1?"bg-success":"bg-danger","flex justify-center items-center w-full p-1 text-xs"),children:i.status==1?s.jsxs("span",{className:"text-white",children:[s.jsx("i",{className:"bi bi-check-circle me-1"})," ","Lunas"]}):s.jsxs("span",{className:"text-white",children:[s.jsx("i",{className:"bi bix-circle me-1"})," ","Belum Lunas"]})}),s.jsxs("div",{className:"flex flex-col gap-1 p-2 text-xs",children:[s.jsxs("div",{className:"flex gap-3",children:[s.jsx(l,{icon:"info-circle"}),s.jsx("span",{children:i.judul})]}),s.jsxs("div",{className:"flex gap-3",children:[s.jsx(l,{icon:"calendar"}),s.jsx("span",{children:x(i.jatuh_tempo)})]}),s.jsxs("div",{className:"flex gap-3",children:[s.jsx(l,{icon:"currency-dollar"}),s.jsx("span",{children:i.nominal?c(i.nominal):"-"})]})]})]},i.id)):s.jsx("div",{class:"flex items-center justify-center h-[100px] border border-danger rounded-lg mx-5",children:s.jsx("div",{class:"text-center text-danger",children:"Belum ada transaksi"})})]})]})})]})};export{k as default};