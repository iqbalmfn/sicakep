import{y as z,W as K,r as m,j as e,Y as O,a as q}from"./app-CtSM_atx.js";import{B as J}from"./Breadcrumbs-Dg-AHzjv.js";import{C as $,a as G,F as Q,D as I,T as r,A as P,b as V}from"./GlobalHooks-DCrxrgSQ.js";import{F as H}from"./FormSelectPrefix-DaXSsb9e.js";import{I as A}from"./Button-qZ0kSPmv.js";import{L as X}from"./Label-BcnbtBnJ.js";import{N as Z}from"./NameWithAvatar-Bl7orhIy.js";import{B as W}from"./react-toastify.esm-C5OqejhA.js";import{U as ee}from"./UsePageController-CGf4W9G-.js";import{A as ae,C as re}from"./ContentWrapper-B0Roet5g.js";import{g as se,l as ne,a as oe,b as te,f as ie,c as le,h as de}from"./GlobalFunction-0EgN8gc6.js";import ce from"./PemasukanCreate-B7zOS_gp.js";import he from"./PemasukanDetail-CUzDH20B.js";import"./FormInput-BGlEnrGv.js";import"./clsx-B-dksMZM.js";import"./RegularSubmitModal-r55TVxK_.js";/* empty css                      */import"./transition-q9NKPf7c.js";import"./FormTextarea-B-eomjPD.js";import"./Modal-C_6n0BbJ.js";import"./dialog-8rKw1kas.js";const me=(t,h,i)=>{z.post(route("transaksi.pemasukan.store"),t,{onError:l=>{h(l)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},ue=(t,h,i)=>{z.post(route("transaksi.pemasukan.update",{pemasukan:t.id}),{...t,_method:"PUT"},{onError:l=>{h(l)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},pe=(t,h)=>{const{data:i,setData:l,reset:g}=K({kategori_id:"",user_id:"",judul:"",nominal:"",tanggal:"",jenis:"online",deskripsi:""}),[n,u]=m.useState({}),[f,p]=m.useState(null),x=()=>{u({})},{mode:D,params:j,setParams:v,fetching:d,request:k,showModal:b,handleShowModal:w,handleEditModal:C,handleCloseModal:c,initialData:s,setInitialData:T,setFetching:y,onHandleFilter:S,onHandleOrder:M}=ee(t,x,g,"transaksi.pemasukan.index");m.useEffect(()=>{d&&k(j)},[j,d]),m.useEffect(()=>{s.id&&l({id:s.id,user_id:s.user_id,kategori_id:s.kategori_id,judul:s.judul,nominal:s.nominal,tanggal:s.tanggal,jenis:s.jenis,deskripsi:s.deskripsi})},[s]);const B=o=>{l(o.target.name,o.target.type==="file"?o.target.files[0]:o.target.value)},N=o=>{o.target.checked?l(o.target.name,1):l(o.target.name,0)},E=o=>{o.preventDefault(),p(W.loading("Sedang menyimpan data...")),me(i,u,x)},_=o=>{o.preventDefault(),p(W.loading("Sedang menyimpan data...")),ue(i,u,x)},[a,F]=m.useState({}),[L,U]=m.useState(!1),R=o=>{U(!0),F(o)},Y=o=>{U(!1),T({}),g()};return $(h,n,f,p,c),{data:i,processing:f,errors:n,submit:E,update:_,handleChange:B,handleCheckboxChange:N,mode:D,params:j,setParams:v,setFetching:y,onHandleFilter:S,onHandleOrder:M,showModal:b,handleShowModal:w,handleEditModal:C,handleCloseModal:c,detailData:a,showDetailModal:L,handleShowDetailModal:R,handleCloseDetailModal:Y}},Ae=({title:t,breadcrumbs:h,datas:i,categories:l,users:g,filtered:n,flash:u})=>{const{data:f,processing:p,errors:x,submit:D,update:j,handleChange:v,params:d,setParams:k,setFetching:b,mode:w,showModal:C,onHandleFilter:c,onHandleOrder:s,handleShowModal:T,handleEditModal:y,handleCloseModal:S,detailData:M,showDetailModal:B,handleShowDetailModal:N,handleCloseDetailModal:E}=pe(n,u),_=()=>i.data.length>0?i.data.map((a,F)=>e.jsxs(r.TrBody,{children:[e.jsx(r.Td,{children:F+1}),e.jsx(r.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(Z,{avatar:a.user.foto?`/images/${a.user.foto}`:a.user.foto,name:a.user.name})})}),e.jsx(r.Td,{children:a.kategori.nama}),e.jsx(r.Td,{children:a.judul}),e.jsx(r.Td,{children:ie(a.nominal)}),e.jsx(r.Td,{children:le(a.tanggal)}),e.jsx(r.Td,{children:e.jsx(X,{variant:a.jenis=="cash"?"info":"success",children:a.jenis})}),e.jsxs(r.Td,{className:"text-end pe-3",children:[e.jsx(P,{variant:"warning",icon:"search",label:"Detail",onClick:()=>N(a)}),e.jsx(P,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>y(a)}),e.jsx(P,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>de("transaksi.pemasukan.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(V,{colSpan:9});return e.jsxs(ae,{children:[e.jsx(O,{title:t}),e.jsx(J,{title:t,breadcrumbs:h}),e.jsxs(re,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(G,{onClick:T}),e.jsx(q,{href:route("perencanaan.view",d),target:"_blank",rel:"noopener noreferrer",className:"rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center",children:e.jsx("i",{className:"bi bi-file-text"})})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(H,{prefix:e.jsx(A,{icon:"tag"}),size:"sm",name:"kategori_id",value:d.kategori_id,onChange:c,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Kategori"}),l.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(H,{prefix:e.jsx(A,{icon:"calendar-month"}),size:"sm",name:"bulan",value:d.bulan?d.bulan:se(),onChange:c,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Bulan"}),ne().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(H,{prefix:e.jsx(A,{icon:"calendar-check"}),size:"sm",name:"tahun",value:d.tahun?d.tahun:oe(),onChange:c,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Tahun"}),te().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(Q,{onHandleFilter:c})]})]}),e.jsxs(I,{children:[e.jsxs(r,{children:[e.jsx(r.Thead,{children:e.jsxs(r.TrHead,{children:[e.jsx(r.Th,{width:"4",ordered:!0,onHandleOrder:s,column:"id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"no"}),e.jsx(r.Th,{width:"15",children:"Donatur"}),e.jsx(r.Th,{width:"15",ordered:!0,onHandleOrder:s,column:"kategori_id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"Kategori"}),e.jsx(r.Th,{width:"15",children:"Judul"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:s,column:"nominal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"nominal"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:s,column:"tanggal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"tanggal"}),e.jsx(r.Th,{width:"7",ordered:!0,onHandleOrder:s,column:"jenis",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"jenis"}),e.jsx(r.Th,{align:"end",width:"10",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(r.Tbody,{children:_()})]}),e.jsx(I.Footer,{data:i,params:n,setParams:k,setFetching:b,onChange:c})]})]}),e.jsx(ce,{title:t,showModal:C,closeModal:S,mode:w,data:f,categories:l,users:g,handleChange:v,errors:x,submit:D,update:j,processing:p}),e.jsx(he,{title:t,showModal:B,closeModal:E,data:M})]})};export{Ae as default};