import{y as q,W as K,r as h,q as O,j as e,Y,a as J}from"./app-DRe3ZoID.js";import{B as $,C as G}from"./ContentWrapper-qH_HQg54.js";import{U as Q,C as V,a as X,F as Z,D as U,T as r,A as P,b as ee}from"./UsePageController-DehWSrjH.js";import{F as H}from"./FormSelectPrefix-BecGyYfe.js";import{I as A}from"./Button-Bi9co_RV.js";import{L as ae}from"./Label-Ei5UlWVb.js";import{N as re}from"./NameWithAvatar-DYRN5J1h.js";import{B as W}from"./react-toastify.esm-DiP7byAa.js";import{A as se}from"./AppContentLayout-OmASg4Pa.js";import{l as ne,a as oe,f as ie,b as te,h as le}from"./GlobalFunction-DGaRtxfk.js";import de from"./PengeluaranCreate-NqBeM5xh.js";import ce from"./PengeluaranDetail-CIRIQzKl.js";import"./clsx-B-dksMZM.js";import"./FormInput-eUwaTByh.js";import"./RegularSubmitModal-CYR0ZasK.js";/* empty css                      */import"./transition-DKMJMnQ-.js";import"./FormTextarea-jZmTlmTJ.js";import"./Modal-DKMrV-75.js";import"./dialog-DmrMdd6q.js";const he=(l,m,i)=>{q.post(route("transaksi.pengeluaran.store"),l,{onError:t=>{m(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},me=(l,m)=>{const{data:i,setData:t,reset:g}=K({kategori_id:"",user_id:"",judul:"",nominal:"",tanggal:"",jenis:"online",deskripsi:""}),[n,u]=h.useState({}),[f,p]=h.useState(null),x=()=>{u({})},{mode:D,params:j,setParams:v,fetching:c,request:b,showModal:w,handleShowModal:T,handleEditModal:C,handleCloseModal:d,initialData:s,setInitialData:k,setFetching:y,onHandleFilter:S,onHandleOrder:M}=Q(l,x,g,"transaksi.pemasukan.index");h.useEffect(()=>{c&&b(j)},[j,c]),h.useEffect(()=>{s.id&&t({id:s.id,user_id:s.user_id,kategori_id:s.kategori_id,judul:s.judul,nominal:s.nominal,tanggal:s.tanggal,jenis:s.jenis,deskripsi:s.deskripsi})},[s]);const B=o=>{t(o.target.name,o.target.type==="file"?o.target.files[0]:o.target.value)},N=o=>{o.target.checked?t(o.target.name,1):t(o.target.name,0)},E=o=>{o.preventDefault(),p(W.loading("Sedang menyimpan data...")),he(i,u,x)},_=o=>{o.preventDefault(),p(W.loading("Sedang menyimpan data...")),pengeluaranUpdateData(i,u,x)},[a,F]=h.useState({}),[z,I]=h.useState(!1),L=o=>{I(!0),F(o)},R=o=>{I(!1),k({}),g()};return V(m,n,f,p,d),{data:i,processing:f,errors:n,submit:E,update:_,handleChange:B,handleCheckboxChange:N,mode:D,params:j,setParams:v,setFetching:y,onHandleFilter:S,onHandleOrder:M,showModal:w,handleShowModal:T,handleEditModal:C,handleCloseModal:d,detailData:a,showDetailModal:z,handleShowDetailModal:L,handleCloseDetailModal:R}},Fe=({title:l,breadcrumbs:m,datas:i,categories:t,users:g,filtered:n,flash:u})=>{const{data:f,processing:p,errors:x,submit:D,update:j,handleChange:v,params:c,setParams:b,setFetching:w,mode:T,showModal:C,onHandleFilter:d,onHandleOrder:s,handleShowModal:k,handleEditModal:y,handleCloseModal:S,detailData:M,showDetailModal:B,handleShowDetailModal:N,handleCloseDetailModal:E}=me(n,u);O().props;const _=()=>i.data.length>0?i.data.map((a,F)=>e.jsxs(r.TrBody,{children:[e.jsx(r.Td,{children:F+1}),e.jsx(r.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(re,{avatar:a.user.foto?`/images/${a.user.foto}`:a.user.foto,name:a.user.name})})}),e.jsx(r.Td,{children:a.kategori.nama}),e.jsx(r.Td,{children:a.judul}),e.jsx(r.Td,{children:ie(a.nominal)}),e.jsx(r.Td,{children:te(a.tanggal)}),e.jsx(r.Td,{children:e.jsx(ae,{variant:a.jenis=="cash"?"info":"success",children:a.jenis})}),e.jsxs(r.Td,{className:"text-end pe-3",children:[e.jsx(P,{variant:"warning",icon:"search",label:"Detail",onClick:()=>N(a)}),e.jsx(P,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>y(a)}),e.jsx(P,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>le("transaksi.pemasukan.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(ee,{colSpan:9});return e.jsxs(se,{children:[e.jsx(Y,{title:l}),e.jsx($,{title:l,breadcrumbs:m}),e.jsxs(G,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{onClick:k}),e.jsx(J,{href:route("perencanaan.view",c),target:"_blank",rel:"noopener noreferrer",className:"rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center",children:e.jsx("i",{className:"bi bi-file-text"})})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(H,{prefix:e.jsx(A,{icon:"tag"}),size:"sm",name:"kategori_id",value:c.kategori_id,onChange:d,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Kategori"}),t.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(H,{prefix:e.jsx(A,{icon:"calendar-month"}),size:"sm",name:"bulan",value:c.bulan,onChange:d,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Bulan"}),ne().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(H,{prefix:e.jsx(A,{icon:"calendar-check"}),size:"sm",name:"tahun",value:c.tahun,onChange:d,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Tahun"}),oe().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(Z,{onHandleFilter:d})]})]}),e.jsxs(U,{children:[e.jsxs(r,{children:[e.jsx(r.Thead,{children:e.jsxs(r.TrHead,{children:[e.jsx(r.Th,{width:"4",ordered:!0,onHandleOrder:s,column:"id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"no"}),e.jsx(r.Th,{width:"15",children:"Pengguna Dana"}),e.jsx(r.Th,{width:"15",ordered:!0,onHandleOrder:s,column:"kategori_id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"Kategori"}),e.jsx(r.Th,{width:"15",children:"Judul"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:s,column:"nominal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"nominal"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:s,column:"tanggal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"tanggal"}),e.jsx(r.Th,{width:"7",ordered:!0,onHandleOrder:s,column:"jenis",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"jenis"}),e.jsx(r.Th,{align:"end",width:"10",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(r.Tbody,{children:_()})]}),e.jsx(U.Footer,{data:i,params:n,setParams:b,setFetching:w,onChange:d})]})]}),e.jsx(de,{title:l,showModal:C,closeModal:S,mode:T,data:f,categories:t,users:g,handleChange:v,errors:x,submit:D,update:j,processing:p}),e.jsx(ce,{title:l,showModal:B,closeModal:E,data:M})]})};export{Fe as default};
