import{j as i}from"./app-Cdi_OQB5.js";import{F as d,a as t,c as a,b as c,R as q}from"./RegularSubmitModal-DGBv2ktI.js";import{F as x}from"./FormInput-BGNyigKV.js";import{F as y}from"./FormTextarea-oOYHgTSn.js";import{M as u}from"./Modal-C0vBXtY8.js";import{f as p}from"./GlobalFunction-Crb_YBLM.js";import"./clsx-B-dksMZM.js";import"./Button-SIcltFR_.js";import"./Icon-D_rup-BN.js";import"./dialog-H7w5I7Xk.js";import"./transition-Bf5V0w49.js";import"./react-toastify.esm-C-1ZJZRP.js";const V=({submit:o,showModal:g,closeModal:j,mode:f,data:l,rekenings:_,dataTransaksi:s,handleChange:m,errors:e,processing:b})=>{var h;const k=["transfer","cash"],F=Array.isArray(s.piutang_detail)?s.piutang_detail.reduce((n,N)=>n+N.nominal,0):0;return i.jsxs(u,{maxWidth:"md",show:g,onClose:j,closeable:!1,children:[i.jsx(u.Header,{onClick:j,children:"Transaksi Pelunasan"}),i.jsxs("form",{onSubmit:o,children:[i.jsx(u.Body,{children:i.jsx("div",{className:"grid grid-cols-1 gap-5 py-5",children:i.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[i.jsx("div",{className:"bg-blue-50 border border-info rounded-lg text-info p-3",children:i.jsx("table",{className:"w-full",children:i.jsxs("thead",{children:[i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Peminjam"}),i.jsx("td",{children:":"}),i.jsx("td",{children:s.nama})]}),i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Donatur"}),i.jsx("td",{children:":"}),i.jsx("td",{children:(h=s==null?void 0:s.user)==null?void 0:h.name})]}),i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Total Meminjam"}),i.jsx("td",{children:":"}),i.jsx("td",{children:p(s.nominal?s.nominal:0)})]}),i.jsxs("tr",{children:[i.jsx("th",{width:"33%",className:"text-left",children:"Sudah Dibayar"}),i.jsx("td",{children:":"}),i.jsx("td",{className:"font-bold",children:p(F)})]})]})})}),i.jsxs(d,{children:[i.jsx(t,{name:"Judul",htmlFor:"judul",required:!0}),i.jsx(x,{size:"sm",id:"judul",name:"judul",onChange:m,defaultValue:l.judul,placeholder:"Masukkan Judul",isError:e==null?void 0:e.judul,required:!0}),i.jsx(a,{message:e==null?void 0:e.judul})]}),i.jsxs(d,{children:[i.jsx(t,{name:"Nominal",htmlFor:"nominal",required:!0}),i.jsx(x,{type:"number",size:"sm",id:"nominal",name:"nominal",onChange:m,placeholder:"Masukkan Nominal",isError:e==null?void 0:e.nominal,required:!0}),i.jsx(a,{message:e==null?void 0:e.nominal})]}),i.jsxs(d,{children:[i.jsx(t,{name:"Jenis",htmlFor:"jenis",required:!0}),i.jsx(c,{size:"sm",id:"jenis",name:"jenis",onChange:m,isError:e==null?void 0:e.jenis,required:!0,children:k.map(n=>i.jsx("option",{value:n,children:n},n))}),i.jsx(a,{message:e==null?void 0:e.jenis})]}),i.jsxs(d,{children:[i.jsx(t,{name:"Tanggal Pembayaran",htmlFor:"jatuh_tempo",required:!0}),i.jsx(x,{type:"date",size:"sm",id:"jatuh_tempo",name:"jatuh_tempo",onChange:m,placeholder:"Masukkan Tanggal Pembayaran",isError:e==null?void 0:e.jatuh_tempo,required:!0}),i.jsx(a,{message:e==null?void 0:e.jatuh_tempo})]}),i.jsxs(d,{children:[i.jsx(t,{name:"Rekening Tujuan",htmlFor:"rekening_id",required:!0}),i.jsxs(c,{size:"sm",id:"rekening_id",name:"rekening_id",onChange:m,value:l.rekening_id,isError:e==null?void 0:e.rekening_id,required:!0,children:[i.jsx("option",{value:"",children:"Pilih Rekening Tujuan"}),_.map(n=>i.jsxs("option",{value:n.id,children:[n.nama_rekening," ",n.no_rekening?`(${n.no_rekening})`:null]},n.id))]}),i.jsx(a,{message:e==null?void 0:e.rekening_id})]}),i.jsxs(d,{children:[i.jsx(t,{name:"Deskripsi",htmlFor:"deskripsi"}),i.jsx(y,{size:"sm",id:"deskripsi",name:"deskripsi",onChange:m,defaultValue:l.deskripsi,placeholder:"Tulis Deskripsi...",isError:e==null?void 0:e.deskripsi,rows:"3"}),i.jsx(a,{message:e==null?void 0:e.deskripsi})]})]})})}),i.jsx(u.Footer,{children:i.jsx(q,{closeModal:j,label:f==="create"?"Simpan":"Update",disabled:b||!l.user_id||!l.judul||!l.nominal||!l.jenis||!l.jatuh_tempo||!l.rekening_id})})]})]})};export{V as default};
