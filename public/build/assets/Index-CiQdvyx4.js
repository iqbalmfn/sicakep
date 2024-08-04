import{y as R,W as O,r as h,j as e,Y,a as q}from"./app-Esk4smMP.js";import{B as J,C as $}from"./ContentWrapper-D2TWqCql.js";import{U as G,C as Q,a as V,F as X,D as W,T as r,A as H,b as Z}from"./UsePageController-B9MWBPgj.js";import{F as A}from"./FormSelectPrefix-i5XtSNgY.js";import{I}from"./Button-TwuELYel.js";import{L as ee}from"./Label-CTNxt9J1.js";import{N as ae}from"./NameWithAvatar-JzNTYqV0.js";import{B as z}from"./react-toastify.esm-BxdoXAWA.js";import{A as re}from"./AppContentLayout-CaRU7TGL.js";import{l as ne,a as se,f as ie,b as oe,h as te}from"./GlobalFunction-MPVoFHby.js";import le from"./PengeluaranCreate-CHHzCt8Q.js";import de from"./PengeluaranDetail-B-COhTl9.js";import"./clsx-B-dksMZM.js";import"./FormInput-CwX9YeZ4.js";import"./RegularSubmitModal-BQQEQ2D0.js";/* empty css                      */import"./transition-CT-KJqE9.js";import"./FormTextarea-CRd202Vt.js";import"./Modal-CGBLfhy4.js";import"./dialog-BushzQjs.js";const ce=(l,m,o)=>{R.post(route("transaksi.pengeluaran.store"),l,{onError:t=>{m(t)},onSuccess:()=>{o()},preserveScroll:!1,preserveState:!0})},he=(l,m)=>{const{data:o,setData:t,reset:j}=O({user_id:"",kategori_id:"",perencanaan_id:"",judul:"",nominal:"",tanggal:"",jenis:"online",deskripsi:""}),[g,n]=h.useState({}),[f,u]=h.useState(null),p=()=>{n({})},{mode:b,params:x,setParams:w,fetching:D,request:c,showModal:T,handleShowModal:y,handleEditModal:C,handleCloseModal:v,initialData:s,setInitialData:d,setFetching:k,onHandleFilter:S,onHandleOrder:B}=G(l,p,j,"transaksi.pemasukan.index");h.useEffect(()=>{D&&c(x)},[x,D]),h.useEffect(()=>{s.id&&t({id:s.id,user_id:s.user_id,kategori_id:s.kategori_id,perencanaan_id:s.perencanaan_id,judul:s.judul,nominal:s.nominal,tanggal:s.tanggal,jenis:s.jenis,deskripsi:s.deskripsi})},[s]);const M=i=>{t(i.target.name,i.target.type==="file"?i.target.files[0]:i.target.value)},_=i=>{i.target.checked?t(i.target.name,1):t(i.target.name,0)},N=i=>{i.preventDefault(),u(z.loading("Sedang menyimpan data...")),ce(o,n,p)},E=i=>{i.preventDefault(),u(z.loading("Sedang menyimpan data...")),pengeluaranUpdateData(o,n,p)},[F,a]=h.useState({}),[P,U]=h.useState(!1),K=i=>{U(!0),a(i)},L=i=>{U(!1),d({}),j()};return Q(m,g,f,u,v),{data:o,processing:f,errors:g,submit:N,update:E,handleChange:M,handleCheckboxChange:_,mode:b,params:x,setParams:w,setFetching:k,onHandleFilter:S,onHandleOrder:B,showModal:T,handleShowModal:y,handleEditModal:C,handleCloseModal:v,detailData:F,showDetailModal:P,handleShowDetailModal:K,handleCloseDetailModal:L}},Ee=({title:l,breadcrumbs:m,datas:o,categories:t,users:j,perencanaans:g,filtered:n,flash:f})=>{const{data:u,processing:p,errors:b,submit:x,update:w,handleChange:D,params:c,setParams:T,setFetching:y,mode:C,showModal:v,onHandleFilter:s,onHandleOrder:d,handleShowModal:k,handleEditModal:S,handleCloseModal:B,detailData:M,showDetailModal:_,handleShowDetailModal:N,handleCloseDetailModal:E}=he(n,f),F=()=>o.data.length>0?o.data.map((a,P)=>e.jsxs(r.TrBody,{children:[e.jsx(r.Td,{children:P+1}),e.jsx(r.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(ae,{avatar:a.user.foto?`/images/${a.user.foto}`:a.user.foto,name:a.user.name})})}),e.jsx(r.Td,{children:a.kategori.nama}),e.jsx(r.Td,{children:a.perencanaan.judul}),e.jsx(r.Td,{children:a.judul}),e.jsx(r.Td,{children:ie(a.nominal)}),e.jsx(r.Td,{children:oe(a.tanggal)}),e.jsx(r.Td,{children:e.jsx(ee,{variant:a.jenis=="cash"?"info":"success",children:a.jenis})}),e.jsxs(r.Td,{className:"text-end pe-3",children:[e.jsx(H,{variant:"warning",icon:"search",label:"Detail",onClick:()=>N(a)}),e.jsx(H,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>S(a)}),e.jsx(H,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>te("transaksi.pemasukan.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(Z,{colSpan:9});return e.jsxs(re,{children:[e.jsx(Y,{title:l}),e.jsx(J,{title:l,breadcrumbs:m}),e.jsxs($,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(V,{onClick:k}),e.jsx(q,{href:route("perencanaan.view",c),target:"_blank",rel:"noopener noreferrer",className:"rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center",children:e.jsx("i",{className:"bi bi-file-text"})})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(A,{prefix:e.jsx(I,{icon:"tag"}),size:"sm",name:"kategori_id",value:c.kategori_id,onChange:s,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Kategori"}),t.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(A,{prefix:e.jsx(I,{icon:"calendar-month"}),size:"sm",name:"bulan",value:c.bulan,onChange:s,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Bulan"}),ne().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(A,{prefix:e.jsx(I,{icon:"calendar-check"}),size:"sm",name:"tahun",value:c.tahun,onChange:s,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Tahun"}),se().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(X,{onHandleFilter:s})]})]}),e.jsxs(W,{children:[e.jsxs(r,{children:[e.jsx(r.Thead,{children:e.jsxs(r.TrHead,{children:[e.jsx(r.Th,{width:"4",ordered:!0,onHandleOrder:d,column:"id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"no"}),e.jsx(r.Th,{width:"12",children:"Pengguna Dana"}),e.jsx(r.Th,{width:"15",ordered:!0,onHandleOrder:d,column:"kategori_id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"Kategori"}),e.jsx(r.Th,{width:"12",ordered:!0,onHandleOrder:d,column:"perencanaan_id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"Sub Kategori"}),e.jsx(r.Th,{width:"15",children:"Judul"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:d,column:"nominal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"nominal"}),e.jsx(r.Th,{width:"13",ordered:!0,onHandleOrder:d,column:"tanggal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"tanggal"}),e.jsx(r.Th,{width:"7",ordered:!0,onHandleOrder:d,column:"jenis",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"jenis"}),e.jsx(r.Th,{align:"end",width:"9",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(r.Tbody,{children:F()})]}),e.jsx(W.Footer,{data:o,params:n,setParams:T,setFetching:y,onChange:s})]})]}),e.jsx(le,{title:l,showModal:v,closeModal:B,mode:C,data:u,pengeluaranData:o.data,categories:t,users:j,perencanaans:g,handleChange:D,errors:b,submit:x,update:w,processing:p}),e.jsx(de,{title:l,showModal:_,closeModal:E,data:M})]})};export{Ee as default};
