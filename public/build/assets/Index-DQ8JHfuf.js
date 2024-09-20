import{y as O,W as q,r as p,j as e,Y as J,a as $}from"./app-D-B5Id0O.js";import{B as G}from"./Breadcrumbs-CtUvoVno.js";import{C as Q,a as V,F as X,D as R,T as r,A as z,b as Z}from"./GlobalHooks-BObUdkZC.js";import{F as K}from"./FormSelectPrefix-IURo6B1m.js";import{I as L}from"./Icon-BtsFO4oB.js";import{L as ee}from"./Label-BzbcA2-x.js";import{N as ae}from"./NameWithAvatar-GIsD9rUq.js";import{B as Y}from"./react-toastify.esm-BVePyrV-.js";import{U as re}from"./UsePageController--fCQaKvE.js";import{A as ne}from"./AppContentLayout-Bg68R0nB.js";import{C as f}from"./ContentWrapper-Hl4gDioz.js";import{f as b,g as se,l as le,a as oe,b as ie,c as te,h as de}from"./GlobalFunction-CS89OH8D.js";import ce from"./PengeluaranCreate-DQldsmmz.js";import he from"./PengeluaranDetail-BbBhc6Tl.js";import"./Button-CHbT7l0S.js";import"./clsx-B-dksMZM.js";import"./FormInput-lsZ7UmeJ.js";import"./RegularSubmitModal-aKLLzvBd.js";/* empty css                      */import"./transition-BO-KxpVP.js";import"./FormTextarea-s0NloVG5.js";import"./FormToggle-BBBdSZ_D.js";import"./Modal-B6gJLD6L.js";import"./dialog-Bt29UEoM.js";const me=(o,m,i)=>{O.post(route("transaksi.pengeluaran.store"),o,{onError:t=>{m(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},xe=(o,m,i)=>{O.post(route("transaksi.pengeluaran.update",{pengeluaran:o.id}),{...o,_method:"PUT"},{onError:t=>{m(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},pe=(o,m)=>{const{data:i,setData:t,reset:u}=q({user_id:"",kategori_id:"",perencanaan_id:"",rekening_id:"",judul:"",nominal:"",tanggal:"",jenis:"online",deskripsi:"",is_sesuai:1}),[v,g]=p.useState({}),[D,c]=p.useState(null),n=()=>{g({})},{mode:N,params:j,setParams:C,fetching:T,request:w,showModal:_,handleShowModal:y,handleEditModal:S,handleCloseModal:d,initialData:s,setInitialData:M,setFetching:B,onHandleFilter:E,onHandleOrder:x}=re(o,n,u,"transaksi.pengeluaran.index");p.useEffect(()=>{T&&w(j)},[j,T]),p.useEffect(()=>{s.id&&t({id:s.id,user_id:s.user_id,kategori_id:s.kategori_id,perencanaan_id:s.perencanaan_id,rekening_id:s.rekening_id,judul:s.judul,nominal:s.nominal,nominal_strict:s.nominal,tanggal:s.tanggal,jenis:s.jenis,deskripsi:s.deskripsi,is_sesuai:s.is_sesuai,rekening:s.rekening})},[s]);const h=l=>{t(l.target.name,l.target.type==="file"?l.target.files[0]:l.target.value)},P=l=>{l.target.checked?t(l.target.name,1):t(l.target.name,0)},F=l=>{l.preventDefault(),c(Y.loading("Sedang menyimpan data...")),me(i,g,n)},A=l=>{l.preventDefault(),c(Y.loading("Sedang menyimpan data...")),xe(i,g,n)},[H,U]=p.useState({}),[I,k]=p.useState(!1),W=l=>{k(!0),U(l)},a=l=>{k(!1),M({}),u()};return Q(m,v,D,c,d),{data:i,processing:D,errors:v,submit:F,update:A,handleChange:h,handleCheckboxChange:P,mode:N,params:j,setParams:C,setFetching:B,onHandleFilter:E,onHandleOrder:x,showModal:_,handleShowModal:y,handleEditModal:S,handleCloseModal:d,detailData:H,showDetailModal:I,handleShowDetailModal:W,handleCloseDetailModal:a}},We=({title:o,breadcrumbs:m,datas:i,dataAll:t,categories:u,users:v,rekenings:g,perencanaans:D,widget:c,filtered:n,flash:N})=>{const{data:j,processing:C,errors:T,submit:w,update:_,handleChange:y,handleCheckboxChange:S,params:d,setParams:s,setFetching:M,mode:B,showModal:E,onHandleFilter:x,onHandleOrder:h,handleShowModal:P,handleEditModal:F,handleCloseModal:A,detailData:H,showDetailModal:U,handleShowDetailModal:I,handleCloseDetailModal:k}=pe(n,N),W=()=>i.data.length>0?i.data.map((a,l)=>e.jsxs(r.TrBody,{children:[e.jsx(r.Td,{children:l+1}),e.jsx(r.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(ae,{avatar:a.user.foto?`/images/${a.user.foto}`:a.user.foto,name:a.user.name})})}),e.jsx(r.Td,{children:a.kategori.nama}),e.jsx(r.Td,{children:a.perencanaan.judul}),e.jsx(r.Td,{children:a.judul}),e.jsx(r.Td,{children:b(a.nominal)}),e.jsx(r.Td,{children:te(a.tanggal)}),e.jsx(r.Td,{children:e.jsx(ee,{variant:a.jenis=="cash"?"info":"success",children:a.jenis})}),e.jsxs(r.Td,{className:"text-end pe-3",children:[e.jsx(z,{variant:"warning",icon:"search",label:"Detail",onClick:()=>I(a)}),e.jsx(z,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>F(a)}),e.jsx(z,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>de("transaksi.pemasukan.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(Z,{colSpan:9});return e.jsxs(ne,{children:[e.jsx(J,{title:o}),e.jsx(G,{title:o,breadcrumbs:m}),e.jsxs("div",{className:"grid grid-cols-4 gap-5 mb-5",children:[e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-info border border-2 border-info",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Pemasukan"}),e.jsx("span",{className:"text-4xl font-bold",children:b(c.total_pemasukan)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-warning border border-2 border-warning",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Anggaran"}),e.jsx("span",{className:"text-4xl font-bold",children:b(c.total_anggaran)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-danger border border-2 border-danger",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Pengeluaran"}),e.jsx("span",{className:"text-4xl font-bold",children:b(c.total_pengeluaran)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-success border border-2 border-success",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Dana Tersedia"}),e.jsx("span",{className:"text-4xl font-bold",children:b(c.dana_tersedia)})]})})]}),e.jsxs(f,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(V,{onClick:P}),e.jsx($,{href:route("transaksi.pengeluaran.view",d),target:"_blank",rel:"noopener noreferrer",className:"rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center",children:e.jsx("i",{className:"bi bi-file-text"})})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(K,{prefix:e.jsx(L,{icon:"tag"}),size:"sm",name:"kategori_id",value:d.kategori_id,onChange:x,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Kategori"}),u.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(K,{prefix:e.jsx(L,{icon:"calendar-month"}),size:"sm",name:"bulan",value:d.bulan?d.bulan:se(),onChange:x,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Bulan"}),le().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(K,{prefix:e.jsx(L,{icon:"calendar-check"}),size:"sm",name:"tahun",value:d.tahun?d.tahun:oe(),onChange:x,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Tahun"}),ie().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(X,{onHandleFilter:x})]})]}),e.jsxs(R,{children:[e.jsxs(r,{children:[e.jsx(r.Thead,{children:e.jsxs(r.TrHead,{children:[e.jsx(r.Th,{width:"4",ordered:!0,onHandleOrder:h,column:"id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"no"}),e.jsx(r.Th,{width:"12",children:"Pengguna Dana"}),e.jsx(r.Th,{width:"15",ordered:!0,onHandleOrder:h,column:"kategori_id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"Kategori"}),e.jsx(r.Th,{width:"12",ordered:!0,onHandleOrder:h,column:"perencanaan_id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"Sub Kategori"}),e.jsx(r.Th,{width:"15",children:"Judul"}),e.jsx(r.Th,{width:"10",ordered:!0,onHandleOrder:h,column:"nominal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"nominal"}),e.jsx(r.Th,{width:"13",ordered:!0,onHandleOrder:h,column:"tanggal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"tanggal"}),e.jsx(r.Th,{width:"7",ordered:!0,onHandleOrder:h,column:"jenis",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"jenis"}),e.jsx(r.Th,{align:"end",width:"9",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(r.Tbody,{children:W()})]}),e.jsx(R.Footer,{data:i,params:n,setParams:s,setFetching:M,onChange:x})]})]}),e.jsx(ce,{title:o,showModal:E,closeModal:A,mode:B,data:j,pengeluaranData:t,categories:u,users:v,rekenings:g,perencanaans:D,handleChange:y,handleCheckboxChange:S,errors:T,submit:w,update:_,processing:C}),e.jsx(he,{title:o,showModal:U,closeModal:k,data:H})]})};export{We as default};
