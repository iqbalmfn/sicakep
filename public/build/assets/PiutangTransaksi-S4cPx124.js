import{j as i}from"./app-Dky1OL0q.js";import{F as t,a,b as d,c as y,R as _}from"./RegularSubmitModal-DMuzVBCr.js";import{F as h}from"./FormInput-BMU-lflI.js";import{F as k}from"./FormTextarea-C51USjr7.js";import{M as u}from"./Modal-BEsgWuvn.js";import{f as c}from"./GlobalFunction-BYU1XxCA.js";import"./clsx-B-dksMZM.js";import"./Button-H6c4ZnJ5.js";import"./Icon-DqCGg3DT.js";import"./dialog-C8x8T90B.js";import"./transition-DfSEsz85.js";import"./react-toastify.esm-D4KLAdp0.js";const A=({submit:p,showModal:o,closeModal:j,mode:f,data:n,dataTransaksi:l,handleChange:s,errors:e,processing:g})=>{var x;const b=["transfer","cash"],F=Array.isArray(l.piutang_detail)?l.piutang_detail.reduce((m,N)=>m+N.nominal,0):0;return i.jsxs(u,{maxWidth:"md",show:o,onClose:j,closeable:!1,children:[i.jsx(u.Header,{onClick:j,children:"Transaksi Pelunasan"}),i.jsxs("form",{onSubmit:p,children:[i.jsx(u.Body,{children:i.jsx("div",{className:"grid grid-cols-1 gap-5 py-5",children:i.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[i.jsx("div",{className:"bg-blue-50 border border-info rounded-lg text-info p-3",children:i.jsx("table",{className:"w-full",children:i.jsxs("thead",{children:[i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Peminjam"}),i.jsx("td",{children:":"}),i.jsx("td",{children:l.nama})]}),i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Donatur"}),i.jsx("td",{children:":"}),i.jsx("td",{children:(x=l==null?void 0:l.user)==null?void 0:x.name})]}),i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Total Meminjam"}),i.jsx("td",{children:":"}),i.jsx("td",{children:c(l.nominal?l.nominal:0)})]}),i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Sudah Dibayar"}),i.jsx("td",{children:":"}),i.jsx("td",{className:"font-bold",children:c(F)})]})]})})}),i.jsxs(t,{children:[i.jsx(a,{name:"Judul",htmlFor:"judul",required:!0}),i.jsx(h,{size:"sm",id:"judul",name:"judul",onChange:s,defaultValue:n.judul,placeholder:"Masukkan Judul",isError:e==null?void 0:e.judul,required:!0}),i.jsx(d,{message:e==null?void 0:e.judul})]}),i.jsxs(t,{children:[i.jsx(a,{name:"Nominal",htmlFor:"nominal",required:!0}),i.jsx(h,{type:"number",size:"sm",id:"nominal",name:"nominal",onChange:s,placeholder:"Masukkan Nominal",isError:e==null?void 0:e.nominal,required:!0}),i.jsx(d,{message:e==null?void 0:e.nominal})]}),i.jsxs(t,{children:[i.jsx(a,{name:"Jenis",htmlFor:"jenis",required:!0}),i.jsx(y,{size:"sm",id:"jenis",name:"jenis",onChange:s,isError:e==null?void 0:e.jenis,required:!0,children:b.map(m=>i.jsx("option",{value:m,children:m},m))}),i.jsx(d,{message:e==null?void 0:e.jenis})]}),i.jsxs(t,{children:[i.jsx(a,{name:"Tanggal Pembayaran",htmlFor:"jatuh_tempo",required:!0}),i.jsx(h,{type:"date",size:"sm",id:"jatuh_tempo",name:"jatuh_tempo",onChange:s,placeholder:"Masukkan Tanggal Pembayaran",isError:e==null?void 0:e.jatuh_tempo,required:!0}),i.jsx(d,{message:e==null?void 0:e.jatuh_tempo})]}),i.jsxs(t,{children:[i.jsx(a,{name:"Deskripsi",htmlFor:"deskripsi"}),i.jsx(k,{size:"sm",id:"deskripsi",name:"deskripsi",onChange:s,defaultValue:n.deskripsi,placeholder:"Tulis Deskripsi...",isError:e==null?void 0:e.deskripsi,rows:"3"}),i.jsx(d,{message:e==null?void 0:e.deskripsi})]})]})})}),i.jsx(u.Footer,{children:i.jsx(_,{closeModal:j,label:f==="create"?"Simpan":"Update",disabled:g||!n.user_id||!n.judul||!n.nominal||!n.jenis||!n.jatuh_tempo})})]})]})};export{A as default};
