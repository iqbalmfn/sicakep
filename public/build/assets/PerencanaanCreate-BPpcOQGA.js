import{j as i}from"./app-DyPD85s7.js";import{F as n,a as m,c as j,b as s,R as v}from"./RegularSubmitModal-BeEzqzau.js";import{F as x}from"./FormInput-BV5x008C.js";import{F as b}from"./FormTextarea-C5LR6kUY.js";import{M as u}from"./Modal-BPQ_dL7J.js";import{e as q}from"./GlobalFunction-DSMOM06H.js";import"./clsx-B-dksMZM.js";import"./Button-B3-6BY9u.js";import"./dialog-FZAPLoR6.js";import"./transition-CvBcTNZb.js";import"./react-toastify.esm-D6yYUWKT.js";const A=({title:c,submit:h,update:o,showModal:g,closeModal:t,mode:p,data:l,categories:k,users:f,handleChange:d,errors:e,processing:F})=>{const _=["cash","transfer"];return i.jsxs(u,{maxWidth:"md",show:g,onClose:t,closeable:!1,children:[i.jsxs(u.Header,{onClick:t,children:[p==="create"?"Tambah":"Update"," ",c]}),i.jsxs("form",{onSubmit:p==="create"?h:o,children:[i.jsx(u.Body,{children:i.jsx("div",{className:"grid grid-cols-1 gap-5 py-5",children:i.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[i.jsxs(n,{children:[i.jsx(m,{name:"Periode"}),i.jsx(x,{size:"sm",defaultValue:q(),disabled:!0})]}),i.jsxs(n,{children:[i.jsx(m,{name:"Kategori",htmlFor:"kategori_id",required:!0}),i.jsxs(j,{size:"sm",id:"kategori_id",name:"kategori_id",onChange:d,value:l.kategori_id,isError:e==null?void 0:e.kategori_id,required:!0,children:[i.jsx("option",{value:"",children:"Pilih Kategori"}),k.map(a=>i.jsx("option",{value:a.value,children:a.label},a.value))]}),i.jsx(s,{message:e==null?void 0:e.kategori_id})]}),i.jsxs(n,{children:[i.jsx(m,{name:"Pemegang Anggaran",htmlFor:"pic_id",required:!0}),i.jsxs(j,{size:"sm",id:"pic_id",name:"pic_id",onChange:d,value:l.pic_id,isError:e==null?void 0:e.pic_id,required:!0,children:[i.jsx("option",{value:"",children:"Pilih Pemegang Anggaran"}),f.map(a=>i.jsx("option",{value:a.id,children:a.name},a.id))]}),i.jsx(s,{message:e==null?void 0:e.pic_id})]}),i.jsxs(n,{children:[i.jsx(m,{name:"Judul",htmlFor:"judul",required:!0}),i.jsx(x,{size:"sm",id:"judul",name:"judul",onChange:d,defaultValue:l.judul,placeholder:"Masukkan Judul",isError:e==null?void 0:e.judul,required:!0}),i.jsx(s,{message:e==null?void 0:e.judul})]}),i.jsxs(n,{children:[i.jsx(m,{name:"Nominal",htmlFor:"nominal",required:!0}),i.jsx(x,{type:"number",size:"sm",id:"nominal",name:"nominal",onChange:d,defaultValue:l.nominal,placeholder:"Masukkan Nominal",isError:e==null?void 0:e.nominal,required:!0}),i.jsx(s,{message:e==null?void 0:e.nominal})]}),i.jsxs(n,{children:[i.jsx(m,{name:"Tipe",htmlFor:"tipe",required:!0}),i.jsx(j,{size:"sm",id:"tipe",name:"tipe",onChange:d,value:l.tipe,isError:e==null?void 0:e.tipe,required:!0,children:_.map(a=>i.jsx("option",{value:a,children:a},a))}),i.jsx(s,{message:e==null?void 0:e.tipe})]}),i.jsxs(n,{children:[i.jsx(m,{name:"Deskripsi",htmlFor:"deskripsi"}),i.jsx(b,{size:"sm",id:"deskripsi",name:"deskripsi",onChange:d,defaultValue:l.deskripsi,placeholder:"Tulis Deskripsi...",isError:e==null?void 0:e.deskripsi,rows:"3"}),i.jsx(s,{message:e==null?void 0:e.deskripsi})]})]})})}),i.jsx(u.Footer,{children:i.jsx(v,{closeModal:t,label:p==="create"?"Simpan":"Update",disabled:F||!l.kategori_id||!l.judul||!l.nominal||!l.tipe})})]})]})};export{A as default};