import{y as O,W as q,r as p,j as e,Y as J,a as $}from"./app-BEEVhXZ9.js";import{B as G,C as b}from"./ContentWrapper-mYdLEtLs.js";import{U as Q,C as V,a as X,F as Z,D as L,T as r,A as W,b as ee}from"./UsePageController-CvaKRKwj.js";import{F as z}from"./FormSelectPrefix-BfXIQtBc.js";import{I as K}from"./Button-CIns9tMG.js";import{L as ae}from"./Label-DJKTj-Vi.js";import{N as re}from"./NameWithAvatar-dZ5_tLRD.js";import{B as R}from"./react-toastify.esm-D7lJOAux.js";import{A as se}from"./AppContentLayout-DpzKR4M8.js";import{f as v,l as ne,a as le,b as oe,h as ie}from"./GlobalFunction-DxCFkILF.js";import te from"./PengeluaranCreate-BrYIB1O0.js";import de from"./PengeluaranDetail-Ck0EB_-S.js";import"./clsx-B-dksMZM.js";import"./FormInput-B7t5cf6l.js";import"./RegularSubmitModal-Bj3ljE07.js";/* empty css                      */import"./transition-CpuxZW1B.js";import"./FormTextarea-CVHpI8Ql.js";import"./Modal-Dxmt5B6u.js";import"./dialog-B9sXbomx.js";const ce=(o,c,i)=>{O.post(route("transaksi.pengeluaran.store"),o,{onError:t=>{c(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},he=(o,c,i)=>{O.post(route("transaksi.pengeluaran.update",{pengeluaran:o.id}),{...o,_method:"PUT"},{onError:t=>{c(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},me=(o,c)=>{const{data:i,setData:t,reset:u}=q({user_id:"",kategori_id:"",perencanaan_id:"",judul:"",nominal:"",tanggal:"",jenis:"online",deskripsi:""}),[D,j]=p.useState({}),[h,s]=p.useState(null),g=()=>{j({})},{mode:w,params:f,setParams:k,fetching:T,request:y,showModal:C,handleShowModal:x,handleEditModal:S,handleCloseModal:N,initialData:l,setInitialData:_,setFetching:m,onHandleFilter:d,onHandleOrder:B}=Q(o,g,u,"transaksi.pengeluaran.index");p.useEffect(()=>{T&&y(f)},[f,T]),p.useEffect(()=>{l.id&&t({id:l.id,user_id:l.user_id,kategori_id:l.kategori_id,perencanaan_id:l.perencanaan_id,judul:l.judul,nominal:l.nominal,nominal_strict:l.nominal,tanggal:l.tanggal,jenis:l.jenis,deskripsi:l.deskripsi})},[l]);const M=n=>{t(n.target.name,n.target.type==="file"?n.target.files[0]:n.target.value)},E=n=>{n.target.checked?t(n.target.name,1):t(n.target.name,0)},P=n=>{n.preventDefault(),s(R.loading("Sedang menyimpan data...")),ce(i,j,g)},F=n=>{n.preventDefault(),s(R.loading("Sedang menyimpan data...")),he(i,j,g)},[A,H]=p.useState({}),[U,a]=p.useState(!1),I=n=>{a(!0),H(n)},Y=n=>{a(!1),_({}),u()};return V(c,D,h,s,N),{data:i,processing:h,errors:D,submit:P,update:F,handleChange:M,handleCheckboxChange:E,mode:w,params:f,setParams:k,setFetching:m,onHandleFilter:d,onHandleOrder:B,showModal:C,handleShowModal:x,handleEditModal:S,handleCloseModal:N,detailData:A,showDetailModal:U,handleShowDetailModal:I,handleCloseDetailModal:Y}},Pe=({title:o,breadcrumbs:c,datas:i,dataAll:t,categories:u,users:D,perencanaans:j,widget:h,filtered:s,flash:g})=>{const{data:w,processing:f,errors:k,submit:T,update:y,handleChange:C,params:x,setParams:S,setFetching:N,mode:l,showModal:_,onHandleFilter:m,onHandleOrder:d,handleShowModal:B,handleEditModal:M,handleCloseModal:E,detailData:P,showDetailModal:F,handleShowDetailModal:A,handleCloseDetailModal:H}=me(s,g),U=()=>i.data.length>0?i.data.map((a,I)=>e.jsxs(r.TrBody,{children:[e.jsx(r.Td,{children:I+1}),e.jsx(r.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(re,{avatar:a.user.foto?`/images/${a.user.foto}`:a.user.foto,name:a.user.name})})}),e.jsx(r.Td,{children:a.kategori.nama}),e.jsx(r.Td,{children:a.perencanaan.judul}),e.jsx(r.Td,{children:a.judul}),e.jsx(r.Td,{children:v(a.nominal)}),e.jsx(r.Td,{children:oe(a.tanggal)}),e.jsx(r.Td,{children:e.jsx(ae,{variant:a.jenis=="cash"?"info":"success",children:a.jenis})}),e.jsxs(r.Td,{className:"text-end pe-3",children:[e.jsx(W,{variant:"warning",icon:"search",label:"Detail",onClick:()=>A(a)}),e.jsx(W,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>M(a)}),e.jsx(W,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>ie("transaksi.pemasukan.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(ee,{colSpan:9});return e.jsxs(se,{children:[e.jsx(J,{title:o}),e.jsx(G,{title:o,breadcrumbs:c}),e.jsxs("div",{className:"grid grid-cols-4 gap-5 mb-5",children:[e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-info border border-2 border-info",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Pemasukan"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.total_pemasukan)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-warning border border-2 border-warning",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Anggaran"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.total_anggaran)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-danger border border-2 border-danger",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Pengeluaran"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.total_pengeluaran)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-success border border-2 border-success",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Dana Tersedia"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.dana_tersedia)})]})})]}),e.jsxs(b,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(X,{onClick:B}),e.jsx($,{href:route("transaksi.pengeluaran.view",x),target:"_blank",rel:"noopener noreferrer",className:"rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center",children:e.jsx("i",{className:"bi bi-file-text"})})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(z,{prefix:e.jsx(K,{icon:"tag"}),size:"sm",name:"kategori_id",value:x.kategori_id,onChange:m,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Kategori"}),u.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(z,{prefix:e.jsx(K,{icon:"calendar-month"}),size:"sm",name:"bulan",value:x.bulan,onChange:m,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Bulan"}),ne().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(z,{prefix:e.jsx(K,{icon:"calendar-check"}),size:"sm",name:"tahun",value:x.tahun,onChange:m,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Tahun"}),le().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(Z,{onHandleFilter:m})]})]}),e.jsxs(L,{children:[e.jsxs(r,{children:[e.jsx(r.Thead,{children:e.jsxs(r.TrHead,{children:[e.jsx(r.Th,{width:"4",ordered:!0,onHandleOrder:d,column:"id",orderBy:s.orderBy,orderDirection:s.orderDirection,children:"no"}),e.jsx(r.Th,{width:"12",children:"Pengguna Dana"}),e.jsx(r.Th,{width:"15",ordered:!0,onHandleOrder:d,column:"kategori_id",orderBy:s.orderBy,orderDirection:s.orderDirection,children:"Kategori"}),e.jsx(r.Th,{width:"12",ordered:!0,onHandleOrder:d,column:"perencanaan_id",orderBy:s.orderBy,orderDirection:s.orderDirection,children:"Sub Kategori"}),e.jsx(r.Th,{width:"15",children:"Judul"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:d,column:"nominal",orderBy:s.orderBy,orderDirection:s.orderDirection,children:"nominal"}),e.jsx(r.Th,{width:"13",ordered:!0,onHandleOrder:d,column:"tanggal",orderBy:s.orderBy,orderDirection:s.orderDirection,children:"tanggal"}),e.jsx(r.Th,{width:"7",ordered:!0,onHandleOrder:d,column:"jenis",orderBy:s.orderBy,orderDirection:s.orderDirection,children:"jenis"}),e.jsx(r.Th,{align:"end",width:"9",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(r.Tbody,{children:U()})]}),e.jsx(L.Footer,{data:i,params:s,setParams:S,setFetching:N,onChange:m})]})]}),e.jsx(te,{title:o,showModal:_,closeModal:E,mode:l,data:w,pengeluaranData:t,categories:u,users:D,perencanaans:j,handleChange:C,errors:k,submit:T,update:y,processing:f}),e.jsx(de,{title:o,showModal:F,closeModal:H,data:P})]})};export{Pe as default};