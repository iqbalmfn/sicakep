import{j as i}from"./app-Tsgv5mxs.js";import{F as d,a as m,c as t,b as u,R as T}from"./RegularSubmitModal-DToXkxiT.js";import{F as h}from"./FormInput-ChORgEGP.js";import{F as P}from"./FormTextarea-D_7d459p.js";import{M as x}from"./Modal-DdVNji5q.js";import{f as o}from"./GlobalFunction-CmFRmTY2.js";import{c as S}from"./clsx-B-dksMZM.js";import"./Button-D_x5bfY_.js";import"./dialog-DUDcZ0uP.js";import"./transition-D_XbGpMB.js";import"./react-toastify.esm-BVIVhL_T.js";const G=({title:_,submit:f,update:k,showModal:b,closeModal:j,mode:p,data:e,categories:v,users:F,perencanaans:q,pengeluaranData:N,handleChange:l,errors:n,processing:E})=>{const z=["online","cash"];let g=[];g=q.filter(a=>a.kategori_id==e.kategori_id);let s={};s=g.find(a=>a.id==e.perencanaan_id),console.log(s),console.log(e.nominal);let c=0;return c=N.filter(a=>a.perencanaan_id==e.perencanaan_id).reduce((a,I)=>a+I.nominal,0),p=="edit"&&(c=c-e.nominal_strict),i.jsxs(x,{maxWidth:"3xl",show:b,onClose:j,closeable:!1,children:[i.jsxs(x.Header,{onClick:j,children:[p==="create"?"Tambah":"Update"," ",_]}),i.jsxs("form",{onSubmit:p==="create"?f:k,children:[i.jsx(x.Body,{children:i.jsxs("div",{className:"grid grid-cols-2 gap-5 py-5",children:[e.perencanaan_id?i.jsxs("div",{className:"col-span-2 flex flex-col border rounded-lg border-info px-3 py-2 text-info bg-blue-50",children:[i.jsxs("div",{className:"flex gap-2",children:[i.jsx("span",{className:"font-bold",children:"Alokasi Anggaran"}),i.jsx("span",{children:":"}),i.jsx("span",{children:o(s==null?void 0:s.nominal)})]}),i.jsxs("div",{className:"flex gap-2",children:[i.jsx("span",{className:"font-bold",children:"Anggaran Terpakai"}),i.jsx("span",{children:":"}),i.jsx("span",{className:S(parseInt(s==null?void 0:s.nominal)<parseInt(c)+parseInt(e.nominal)?"text-danger":""),children:o(e.nominal?parseInt(c)+parseInt(e.nominal):parseInt(c))})]})]}):null,i.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[i.jsxs(d,{children:[i.jsx(m,{name:"Kategori",htmlFor:"kategori_id",required:!0}),i.jsxs(t,{size:"sm",id:"kategori_id",name:"kategori_id",onChange:l,value:e.kategori_id,isError:n==null?void 0:n.kategori_id,required:!0,children:[i.jsx("option",{value:"",children:"Pilih Kategori"}),v.map(a=>i.jsx("option",{value:a.value,children:a.label},a.value))]}),i.jsx(u,{message:n==null?void 0:n.kategori_id})]}),i.jsxs(d,{children:[i.jsx(m,{name:"Sumber Anggaran",htmlFor:"perencanaan_id",required:!0}),i.jsxs(t,{size:"sm",id:"perencanaan_id",name:"perencanaan_id",onChange:l,value:e.perencanaan_id,isError:n==null?void 0:n.perencanaan_id,required:!0,disabled:!e.kategori_id,children:[i.jsx("option",{value:"",children:"Pilih Sumber Anggaran"}),g.map(a=>i.jsx("option",{value:a.id,children:a.judul},a.id))]}),i.jsx(u,{message:n==null?void 0:n.perencanaan_id})]}),i.jsxs(d,{children:[i.jsx(m,{name:"Pengguna Dana",htmlFor:"user_id",required:!0}),i.jsxs(t,{size:"sm",id:"user_id",name:"user_id",onChange:l,value:e.user_id,isError:n==null?void 0:n.user_id,required:!0,disabled:!e.perencanaan_id,children:[i.jsx("option",{value:"",children:"Pilih Pengguna Dana"}),F.map(a=>i.jsx("option",{value:a.id,children:a.name},a.id))]}),i.jsx(u,{message:n==null?void 0:n.user_id})]}),i.jsxs(d,{children:[i.jsx(m,{name:"Judul",htmlFor:"judul",required:!0}),i.jsx(h,{size:"sm",id:"judul",name:"judul",onChange:l,defaultValue:e.judul,placeholder:"Masukkan Judul",isError:n==null?void 0:n.judul,required:!0,disabled:!e.perencanaan_id}),i.jsx(u,{message:n==null?void 0:n.judul})]}),i.jsxs(d,{children:[i.jsx(m,{name:"Nominal",htmlFor:"nominal",required:!0}),i.jsx(h,{type:"number",size:"sm",id:"nominal",name:"nominal",onChange:l,defaultValue:e.nominal,placeholder:"Masukkan Nominal",isError:n==null?void 0:n.nominal,required:!0,disabled:!e.perencanaan_id}),i.jsx(u,{message:n==null?void 0:n.nominal})]})]}),i.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[i.jsxs(d,{children:[i.jsx(m,{name:"Jenis",htmlFor:"jenis",required:!0}),i.jsx(t,{size:"sm",id:"jenis",name:"jenis",onChange:l,value:e.jenis,isError:n==null?void 0:n.jenis,required:!0,disabled:!e.perencanaan_id,children:z.map(a=>i.jsx("option",{value:a,children:a},a))}),i.jsx(u,{message:n==null?void 0:n.jenis})]}),i.jsxs(d,{children:[i.jsx(m,{name:"Tanggal",htmlFor:"tanggal",required:!0}),i.jsx(h,{type:"date",size:"sm",id:"tanggal",name:"tanggal",onChange:l,defaultValue:e.tanggal,placeholder:"Masukkan Tanggal",isError:n==null?void 0:n.tanggal,required:!0,disabled:!e.perencanaan_id}),i.jsx(u,{message:n==null?void 0:n.tanggal})]}),i.jsxs(d,{children:[i.jsx(m,{name:"Deskripsi",htmlFor:"deskripsi"}),i.jsx(P,{size:"sm",id:"deskripsi",name:"deskripsi",onChange:l,defaultValue:e.deskripsi,placeholder:"Tulis Deskripsi...",isError:n==null?void 0:n.deskripsi,rows:"3",disabled:!e.perencanaan_id}),i.jsx(u,{message:n==null?void 0:n.deskripsi})]})]})]})}),i.jsx(x.Footer,{children:i.jsx(T,{closeModal:j,label:p==="create"?"Simpan":"Update",disabled:E||!e.user_id||!e.kategori_id||!e.judul||!e.nominal||!e.jenis||!e.tanggal})})]})]})};export{G as default};
