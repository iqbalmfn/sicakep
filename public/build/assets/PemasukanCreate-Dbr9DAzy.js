import{j as e}from"./app-DRe3ZoID.js";import{F as u,a as s,c as x,b as m,R as q}from"./RegularSubmitModal-CYR0ZasK.js";import{F as p}from"./FormInput-eUwaTByh.js";import{F as v}from"./FormTextarea-jZmTlmTJ.js";import{M as d}from"./Modal-DKMrV-75.js";import"./clsx-B-dksMZM.js";import"./Button-Bi9co_RV.js";import"./dialog-DmrMdd6q.js";import"./transition-DKMJMnQ-.js";const V=({title:g,submit:c,update:h,showModal:k,closeModal:t,mode:j,data:a,categories:o,users:F,handleChange:n,errors:i,processing:f})=>{const _=["online","cash"];return e.jsxs(d,{maxWidth:"md",show:k,onClose:t,closeable:!1,children:[e.jsxs(d.Header,{onClick:t,children:[j==="create"?"Tambah":"Update"," ",g]}),e.jsxs("form",{onSubmit:j==="create"?c:h,children:[e.jsx(d.Body,{children:e.jsx("div",{className:"grid grid-cols-1 gap-5 py-5",children:e.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[e.jsxs(u,{children:[e.jsx(s,{name:"Kategori",htmlFor:"kategori_id",required:!0}),e.jsxs(x,{size:"sm",id:"kategori_id",name:"kategori_id",onChange:n,value:a.kategori_id,isError:i==null?void 0:i.kategori_id,required:!0,children:[e.jsx("option",{value:"",children:"Pilih Kategori"}),o.map(l=>e.jsx("option",{value:l.value,children:l.label},l.value))]}),e.jsx(m,{message:i==null?void 0:i.kategori_id})]}),e.jsxs(u,{children:[e.jsx(s,{name:"Donatur",htmlFor:"user_id",required:!0}),e.jsxs(x,{size:"sm",id:"user_id",name:"user_id",onChange:n,value:a.user_id,isError:i==null?void 0:i.user_id,required:!0,children:[e.jsx("option",{value:"",children:"Pilih Donatur"}),F.map(l=>e.jsx("option",{value:l.id,children:l.name},l.id))]}),e.jsx(m,{message:i==null?void 0:i.user_id})]}),e.jsxs(u,{children:[e.jsx(s,{name:"Judul",htmlFor:"judul",required:!0}),e.jsx(p,{size:"sm",id:"judul",name:"judul",onChange:n,defaultValue:a.judul,placeholder:"Masukkan Judul",isError:i==null?void 0:i.judul,required:!0}),e.jsx(m,{message:i==null?void 0:i.judul})]}),e.jsxs(u,{children:[e.jsx(s,{name:"Nominal",htmlFor:"nominal",required:!0}),e.jsx(p,{type:"number",size:"sm",id:"nominal",name:"nominal",onChange:n,defaultValue:a.nominal,placeholder:"Masukkan Nominal",isError:i==null?void 0:i.nominal,required:!0}),e.jsx(m,{message:i==null?void 0:i.nominal})]}),e.jsxs(u,{children:[e.jsx(s,{name:"Jenis",htmlFor:"jenis",required:!0}),e.jsx(x,{size:"sm",id:"jenis",name:"jenis",onChange:n,value:a.jenis,isError:i==null?void 0:i.jenis,required:!0,children:_.map(l=>e.jsx("option",{value:l,children:l},l))}),e.jsx(m,{message:i==null?void 0:i.jenis})]}),e.jsxs(u,{children:[e.jsx(s,{name:"Tanggal",htmlFor:"tanggal",required:!0}),e.jsx(p,{type:"date",size:"sm",id:"tanggal",name:"tanggal",onChange:n,defaultValue:a.tanggal,placeholder:"Masukkan Tanggal",isError:i==null?void 0:i.tanggal,required:!0}),e.jsx(m,{message:i==null?void 0:i.tanggal})]}),e.jsxs(u,{children:[e.jsx(s,{name:"Deskripsi",htmlFor:"deskripsi"}),e.jsx(v,{size:"sm",id:"deskripsi",name:"deskripsi",onChange:n,defaultValue:a.deskripsi,placeholder:"Tulis Deskripsi...",isError:i==null?void 0:i.deskripsi,rows:"3"}),e.jsx(m,{message:i==null?void 0:i.deskripsi})]})]})})}),e.jsx(d.Footer,{children:e.jsx(q,{closeModal:t,label:j==="create"?"Simpan":"Update",disabled:f||!a.user_id||!a.kategori_id||!a.judul||!a.nominal||!a.jenis||!a.tanggal})})]})]})};export{V as default};
