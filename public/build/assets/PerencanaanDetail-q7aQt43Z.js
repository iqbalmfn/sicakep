import{j as s}from"./app-DRe3ZoID.js";import{L as x}from"./Label-Ei5UlWVb.js";import{M as r}from"./Modal-DKMrV-75.js";import{N as d}from"./NameWithAvatar-DYRN5J1h.js";import{m as o,f as u,d as p}from"./GlobalFunction-DGaRtxfk.js";import{c as t}from"./clsx-B-dksMZM.js";import"./dialog-DmrMdd6q.js";import"./transition-DKMJMnQ-.js";import"./react-toastify.esm-DiP7byAa.js";const D=({title:j,showModal:m,closeModal:n,data:e})=>{var c,l,h;return s.jsxs(r,{maxWidth:"3xl",show:m,onClose:n,closeable:!1,children:[s.jsxs(r.Header,{onClick:n,children:["Detail ",j]}),s.jsx(r.Body,{children:s.jsxs("div",{className:"grid grid-cols-2 gap-4 py-5",children:[s.jsxs("div",{className:"col-span-1 flex flex-col gap-4 border-e",children:[s.jsx("h3",{className:"text-center font-bold underline text-lg",children:"Data"}),s.jsx("table",{className:"w-full text-left -mt-2",cellPadding:5,children:s.jsxs("tbody",{children:[s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Periode"}),s.jsx("td",{width:"3%",children:":"}),s.jsxs("td",{children:[o(e==null?void 0:e.bulan)," ",e==null?void 0:e.tahun]})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Pengaju"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:(c=e==null?void 0:e.user)==null?void 0:c.name})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Pemegang Anggaran"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:(l=e==null?void 0:e.pic)==null?void 0:l.name})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Kategori"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:(h=e==null?void 0:e.kategori)==null?void 0:h.nama})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Judul"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e==null?void 0:e.judul})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Nominal"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e!=null&&e.nominal?u(e==null?void 0:e.nominal):"-"})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Tipe"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:s.jsx(x,{variant:(e==null?void 0:e.tipe)=="cash"?"info":"success",children:e==null?void 0:e.tipe})})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Status"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:s.jsx(x,{variant:(e==null?void 0:e.status)==0?"danger":(e==null?void 0:e.status)==1?"success":"warning",children:(e==null?void 0:e.status)==0?"reject":(e==null?void 0:e.status)==1?"accept":"waiting"})})]}),s.jsxs("tr",{children:[s.jsx("th",{width:"20%",children:"Deskripsi"}),s.jsx("td",{width:"3%",children:":"}),s.jsx("td",{children:e==null?void 0:e.deskripsi})]})]})})]}),s.jsxs("div",{className:"col-span-1 flex flex-col gap-2",children:[s.jsx("h3",{className:"text-center font-bold underline text-lg mb-1",children:"Log"}),e!=null&&e.logs?e==null?void 0:e.logs.map(i=>s.jsxs("div",{className:t(i.status==2?"border-warning":i.status==1?"border-success":"border-danger","border flex flex-col"),children:[s.jsx("div",{className:t(i.status==2?"bg-warning":i.status==1?"bg-success":"bg-danger","flex justify-center items-center w-full p-1 text-xs"),children:i.status==2?s.jsxs("span",{className:"text-white",children:[s.jsx("i",{className:"bi bi-clock me-1"})," ","Mengajukan"]}):i.status==1?s.jsxs("span",{className:"text-white",children:[s.jsx("i",{className:"bi bi-check-circle me-1"})," ","Accept"]}):s.jsxs("span",{className:"text-white",children:[s.jsx("i",{className:"bi bix-circle me-1"})," ","Reject"]})}),s.jsxs("div",{className:"border-warning p-2",children:[s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsx(d,{avatar:i.user.foto?`/images/${i.user.foto}`:i.user.foto,avatarSize:"xs",name:i.user.name,className:"text-xs"}),s.jsx("span",{className:"text-[10px] text-gray-400",children:p(i.created_at)})]}),s.jsx("p",{className:"border-t pt-2 mt-2 text-xs",children:i.pesan})]})]},i.id)):s.jsx("div",{children:"Tidak ada log"})]})]})})]})};export{D as default};
