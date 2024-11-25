import{y as P,W as R,r as b,j as e,Y as U}from"./app-DM-GkA35.js";import{B as I}from"./Breadcrumbs-r_D49TL6.js";import{C as W,a as Y,F as z,D as E,T as n,b as O}from"./GlobalHooks-CFt34WdV.js";import{F as N}from"./FormSelectPrefix-DrfhZ81U.js";import{I as M}from"./Icon-aDvYvAPI.js";import{A as B}from"./ActionButton-B66P3gBE.js";import{B as A}from"./react-toastify.esm-BLIOqqY_.js";import{U as $}from"./UsePageController-BTae5kPx.js";import{A as q}from"./AppContentLayout-D-rxH7n1.js";import{C as L}from"./ContentWrapper-DHv_OPFz.js";import{g as G,l as J,a as K,b as Q,f as F,c as V,h as X}from"./GlobalFunction-BEL7TiXH.js";import Z from"./PemindahanAsetCreate-vc09yVVW.js";import"./Button-BFs2_1SV.js";import"./clsx-B-dksMZM.js";import"./FormInput-Biz51T7o.js";import"./RegularSubmitModal-DLa58vQn.js";/* empty css                      */import"./transition-qXDfPg6a.js";import"./Modal-BfgDKEvQ.js";import"./dialog-DHYKxqCe.js";const ee=(i,l,s)=>{P.post(route("aset.pemindahan-aset.store"),i,{onError:t=>{l(t)},onSuccess:()=>{s()},preserveScroll:!1,preserveState:!0})},ae=(i,l,s)=>{P.post(route("aset.pemindahan-aset.update",{pemindahan_aset:i.id}),{...i,_method:"PUT"},{onError:t=>{l(t)},onSuccess:()=>{s()},preserveScroll:!1,preserveState:!0})},ne=(i,l)=>{const{data:s,setData:t,reset:d}=R({initial_rekening_id:"",destination_rekening_id:"",nominal:"",biaya_administrasi:"",tanggal:""}),[u,h]=b.useState({}),[j,p]=b.useState(null),x=()=>{h({})},{mode:v,params:g,setParams:c,fetching:f,request:_,showModal:k,handleShowModal:C,handleEditModal:m,handleCloseModal:T,initialData:r,setFetching:y,onHandleFilter:w,onHandleOrder:S}=$(i,x,d,"aset.pemindahan-aset.index");b.useEffect(()=>{f&&_(g)},[g,f]),b.useEffect(()=>{r.id&&t({id:r.id,initial_rekening_id:r.initial_rekening_id,destination_rekening_id:r.destination_rekening_id,nominal:r.nominal,biaya_administrasi:r.biaya_administrasi,tanggal:r.tanggal})},[r]);const a=o=>{t(o.target.name,o.target.type==="file"?o.target.files[0]:o.target.value)},D=o=>{o.preventDefault(),p(A.loading("Sedang menyimpan data...")),ee(s,h,x)},H=o=>{o.preventDefault(),p(A.loading("Sedang menyimpan data...")),ae(s,h,x)};return W(l,u,j,p,T),{data:s,processing:j,errors:u,submit:D,update:H,handleChange:a,mode:v,params:g,setParams:c,setFetching:y,onHandleFilter:w,onHandleOrder:S,showModal:k,handleShowModal:C,handleEditModal:m,handleCloseModal:T}},ke=({title:i,breadcrumbs:l,datas:s,rekenings:t,filtered:d,flash:u})=>{const{data:h,processing:j,errors:p,submit:x,update:v,handleChange:g,params:c,setParams:f,setFetching:_,mode:k,showModal:C,onHandleFilter:m,onHandleOrder:T,handleShowModal:r,handleEditModal:y,handleCloseModal:w}=ne(d,u),S=()=>s.data.length>0?s.data.map((a,D)=>e.jsxs(n.TrBody,{children:[e.jsx(n.Td,{children:D+1}),e.jsx(n.Td,{children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("img",{src:`/storage/bank/${a.initial_rekening.bank.logo}`,alt:"logo",className:"w-[50px]"}),e.jsx("span",{children:a.initial_rekening.nama_rekening})]})}),e.jsx(n.Td,{children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("img",{src:`/storage/bank/${a.destination_rekening.bank.logo}`,alt:"logo",className:"w-[50px]"}),e.jsx("span",{children:a.destination_rekening.nama_rekening})]})}),e.jsx(n.Td,{children:F(a.nominal)}),e.jsx(n.Td,{children:F(a.biaya_administrasi)}),e.jsx(n.Td,{children:V(a.tanggal)}),e.jsxs(n.Td,{className:"text-end pe-3",children:[e.jsx(B,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>y(a)}),e.jsx(B,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>X("aset.pemindahan-aset.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(O,{colSpan:7});return e.jsxs(q,{children:[e.jsx(U,{title:i}),e.jsx(I,{title:i,breadcrumbs:l}),e.jsxs(L,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsx("div",{className:"flex gap-2",children:e.jsx(Y,{onClick:r})}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(N,{prefix:e.jsx(M,{icon:"calendar-month"}),size:"sm",name:"bulan",value:c.bulan?c.bulan:G(),onChange:m,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Bulan"}),J().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(N,{prefix:e.jsx(M,{icon:"calendar-check"}),size:"sm",name:"tahun",value:c.tahun?c.tahun:K(),onChange:m,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Tahun"}),Q().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(z,{onHandleFilter:m})]})]}),e.jsxs(E,{children:[e.jsxs(n,{children:[e.jsx(n.Thead,{children:e.jsxs(n.TrHead,{children:[e.jsx(n.Th,{width:"3",ordered:!0,onHandleOrder:T,column:"id",orderBy:d.orderBy,orderDirection:d.orderDirection,children:"no"}),e.jsx(n.Th,{width:"15",children:"Rekening Asal"}),e.jsx(n.Th,{width:"15",children:"Rekening Tujuan"}),e.jsx(n.Th,{width:"10",children:"Nominal"}),e.jsx(n.Th,{width:"10",children:"Biaya Transaksi"}),e.jsx(n.Th,{width:"10",children:"tanggal"}),e.jsx(n.Th,{align:"end",width:"7",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(n.Tbody,{children:S()})]}),e.jsx(E.Footer,{data:s,params:d,setParams:f,setFetching:_,onChange:m})]})]}),e.jsx(Z,{title:i,showModal:C,closeModal:w,mode:k,data:h,rekenings:t,handleChange:g,errors:p,submit:x,update:v,processing:j})]})};export{ke as default};