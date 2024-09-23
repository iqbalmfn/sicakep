import{j as i}from"./app-Cdi_OQB5.js";import{F as m,a as l,b as j,c as r,R as f}from"./RegularSubmitModal-DGBv2ktI.js";import{F as u}from"./FormInput-BGNyigKV.js";import{M as s}from"./Modal-C0vBXtY8.js";import{f as F,c as b}from"./GlobalFunction-Crb_YBLM.js";import"./clsx-B-dksMZM.js";import"./Button-SIcltFR_.js";import"./Icon-D_rup-BN.js";import"./dialog-H7w5I7Xk.js";import"./transition-Bf5V0w49.js";import"./react-toastify.esm-C-1ZJZRP.js";const C=({submit:h,update:x,showModal:p,closeModal:d,mode:o,data:e,users:c,rekenings:g,handleChange:t,errors:n,processing:_})=>i.jsxs(s,{maxWidth:"md",show:p,onClose:d,closeable:!1,children:[i.jsx(s.Header,{onClick:d,children:"Bayar Utang"}),i.jsxs("form",{onSubmit:o==="create"?h:x,children:[i.jsx(s.Body,{children:i.jsx("div",{className:"grid grid-cols-1 gap-5 py-5",children:i.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[i.jsxs(m,{children:[i.jsx(l,{name:"Judul",htmlFor:"judul"}),i.jsx(u,{size:"sm",id:"judul",name:"judul",value:e.judul,disabled:!0})]}),i.jsxs(m,{children:[i.jsx(l,{name:"Nominal",htmlFor:"nominal"}),i.jsx(u,{size:"sm",id:"nominal",name:"nominal",value:e.nominal?F(e.nominal):0,disabled:!0})]}),i.jsxs(m,{children:[i.jsx(l,{name:"Tanggal Jatuh Tempo",htmlFor:"jatuh_tempo"}),i.jsx(u,{size:"sm",id:"jatuh_tempo",name:"jatuh_tempo",value:e?b(e.jatuh_tempo):"-",disabled:!0})]}),i.jsxs(m,{children:[i.jsx(l,{name:"Pembayar",htmlFor:"user_id",required:!0}),i.jsxs(j,{size:"sm",id:"user_id",name:"user_id",onChange:t,value:e.user_id,isError:n==null?void 0:n.user_id,required:!0,children:[i.jsx("option",{value:"",children:"Pilih Pembayar"}),c.map(a=>i.jsx("option",{value:a.id,children:a.name},a.id))]}),i.jsx(r,{message:n==null?void 0:n.user_id})]}),i.jsxs(m,{children:[i.jsx(l,{name:"Rekening Yang Digunakan",htmlFor:"rekening_id",required:!0}),i.jsxs(j,{size:"sm",id:"rekening_id",name:"rekening_id",onChange:t,value:e.rekening_id,isError:n==null?void 0:n.rekening_id,required:!0,children:[i.jsx("option",{value:"",children:"Pilih Rekening Yang Digunakan"}),g.map(a=>i.jsxs("option",{value:a.id,children:[a.nama_rekening," ",a.no_rekening?`(${a.no_rekening})`:null]},a.id))]}),i.jsx(r,{message:n==null?void 0:n.rekening_id})]})]})})}),i.jsx(s.Footer,{children:i.jsx(f,{closeModal:d,label:o==="create"?"Simpan":"Update",disabled:_||!e.user_id||!e.judul||!e.nominal||!e.jenis||!e.jatuh_tempo})})]})]});export{C as default};
