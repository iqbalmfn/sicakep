import{y as $,W as X,r as u,q as Z,j as e,Y as ee,a as ae}from"./app-Esk4smMP.js";import{B as ne,C as b}from"./ContentWrapper-D2TWqCql.js";import{U as re,C as se,a as oe,F as le,D as G,T as n,A as k,b as ie}from"./UsePageController-B9MWBPgj.js";import{F as B}from"./FormSelectPrefix-i5XtSNgY.js";import{I as _}from"./Button-TwuELYel.js";import{L as Q}from"./Label-CTNxt9J1.js";import{N as te}from"./NameWithAvatar-JzNTYqV0.js";import{B as J}from"./react-toastify.esm-BxdoXAWA.js";import{A as de}from"./AppContentLayout-CaRU7TGL.js";import{f as v,l as ce,a as he,m as me,h as pe}from"./GlobalFunction-MPVoFHby.js";import xe from"./PerencanaanCreate-CCfQ75de.js";import ue from"./PerencanaanDetail-CljYYcLK.js";import je from"./PerencanaanConfirm-DzNs9wcp.js";import"./clsx-B-dksMZM.js";import"./FormInput-CwX9YeZ4.js";import"./RegularSubmitModal-BQQEQ2D0.js";/* empty css                      */import"./transition-CT-KJqE9.js";import"./FormTextarea-CRd202Vt.js";import"./Modal-CGBLfhy4.js";import"./dialog-BushzQjs.js";const ge=(l,c,i)=>{$.post(route("perencanaan.store"),l,{onError:t=>{c(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},fe=(l,c,i)=>{$.post(route("perencanaan.update",{perencanaan:l.id}),{...l,_method:"PUT"},{onError:t=>{c(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},be=(l,c,i)=>{$.post(route("perencanaan.confirm",{perencanaan:l.id}),{...l,_method:"PUT"},{onError:t=>{c(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},ve=(l,c)=>{const{data:i,setData:t,reset:j}=X({kategori_id:"",pic_id:"",judul:"",nominal:"",bulan:"",tahun:"",tipe:"cash",deskripsi:""}),[h,r]=u.useState({}),[D,m]=u.useState(null),p=()=>{r({})},{mode:C,params:g,setParams:E,fetching:f,request:x,showModal:A,handleShowModal:P,handleEditModal:F,handleCloseModal:w,initialData:o,setInitialData:d,setFetching:H,onHandleFilter:U,onHandleOrder:I}=re(l,p,j,"perencanaan.index");u.useEffect(()=>{f&&x(g)},[g,f]),u.useEffect(()=>{o.id&&t({id:o.id,kategori_id:o.kategori_id,pic_id:o.pic_id,judul:o.judul,nominal:o.nominal,bulan:o.bulan,tahun:o.tahun,tipe:o.tipe,deskripsi:o.deskripsi})},[o]);const S=s=>{t(s.target.name,s.target.type==="file"?s.target.files[0]:s.target.value)},z=s=>{s.target.checked?t(s.target.name,1):t(s.target.name,0)},L=s=>{s.preventDefault(),m(J.loading("Sedang menyimpan data...")),ge(i,r,p)},R=s=>{s.preventDefault(),m(J.loading("Sedang menyimpan data...")),fe(i,r,p)},[W,T]=u.useState({}),[K,N]=u.useState(!1),q=s=>{N(!0),T(s)},O=s=>{N(!1),d({}),j()},[M,a]=u.useState(!1),Y=s=>{a(!0),T(s),d(s)},y=s=>{a(!1),d({}),j()},V=s=>{s.preventDefault(),m(J.loading("Sedang memproses data...")),be(i,r,p)};return se(c,h,D,m,M?y:w),{data:i,processing:D,errors:h,submit:L,update:R,handleChange:S,handleCheckboxChange:z,mode:C,params:g,setParams:E,setFetching:H,onHandleFilter:U,onHandleOrder:I,showModal:A,handleShowModal:P,handleEditModal:F,handleCloseModal:w,detailData:W,showDetailModal:K,handleShowDetailModal:q,handleCloseDetailModal:O,showConfirmModal:M,handleShowConfirmModal:Y,handleCloseConfirmModal:y,confirm:V}},We=({title:l,breadcrumbs:c,datas:i,categories:t,users:j,widget:h,filtered:r,flash:D})=>{const{data:m,processing:p,errors:C,submit:g,update:E,handleChange:f,params:x,setParams:A,setFetching:P,mode:F,showModal:w,onHandleFilter:o,onHandleOrder:d,handleShowModal:H,handleEditModal:U,handleCloseModal:I,detailData:S,showDetailModal:z,handleShowDetailModal:L,handleCloseDetailModal:R,showConfirmModal:W,handleShowConfirmModal:T,handleCloseConfirmModal:K,confirm:N}=ve(r,D),{auth:q}=Z().props,O=[{value:"waiting",label:"Waiting"},{value:1,label:"Accept"},{value:0,label:"Reject"}],M=()=>i.data.length>0?i.data.map((a,Y)=>e.jsxs(n.TrBody,{children:[e.jsx(n.Td,{children:Y+1}),e.jsx(n.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(te,{avatar:a.pic.foto?`/images/${a.pic.foto}`:a.pic.foto,name:a.pic.name})})}),e.jsx(n.Td,{children:a.kategori.nama}),e.jsx(n.Td,{children:a.judul}),e.jsx(n.Td,{children:v(a.nominal)}),e.jsx(n.Td,{children:me(a.bulan)}),e.jsx(n.Td,{children:a.tahun}),e.jsx(n.Td,{children:e.jsx(Q,{variant:a.tipe=="cash"?"info":"success",children:a.tipe})}),e.jsx(n.Td,{children:e.jsx(Q,{variant:a.status==0?"danger":a.status==1?"success":"warning",children:a.status==0?"reject":a.status==1?"accept":"waiting"})}),e.jsxs(n.Td,{className:"text-end pe-3",children:[q.user.roles.find(y=>y.name==="Admin")&&a.status==null?e.jsx(k,{variant:"success",icon:"check-lg",label:"Konfirmasi",onClick:()=>T(a)}):e.jsx(k,{variant:"warning",icon:"search",label:"Detail",onClick:()=>L(a)}),e.jsx(k,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>U(a)}),e.jsx(k,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>pe("perencanaan.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(ie,{colSpan:10});return e.jsxs(de,{children:[e.jsx(ee,{title:l}),e.jsx(ne,{title:l,breadcrumbs:c}),e.jsxs("div",{className:"grid grid-cols-4 gap-5 mb-5",children:[e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-danger border border-2 border-danger",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Limit Anggaran"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.limit_anggaran)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-info border border-2 border-info",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Anggaran Diajukan"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.total_anggaran)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-success border border-2 border-success",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Anggaran Disetujui"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.total_anggaran_acc)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(b,{className:"flex flex-col gap-2 pb-6 text-warning border border-2 border-warning",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Selisih Anggaran"}),e.jsx("span",{className:"text-4xl font-bold",children:v(h.selisih_anggaran)})]})})]}),e.jsxs(b,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(oe,{onClick:H,disabled:h.limit_anggaran==0}),e.jsx(ae,{href:route("perencanaan.view",x),target:"_blank",rel:"noopener noreferrer",className:"rounded-lg bg-transparent text-primary border border-primary group hover:bg-primary hover:text-white w-[37px] h-[37px] flex justify-center items-center",children:e.jsx("i",{className:"bi bi-file-text"})})]}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(B,{prefix:e.jsx(_,{icon:"tag"}),size:"sm",name:"kategori_id",value:x.kategori_id,onChange:o,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Kategori"}),t.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(B,{prefix:e.jsx(_,{icon:"info-circle"}),size:"sm",name:"status",value:x.status,onChange:o,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Status"}),O.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(B,{prefix:e.jsx(_,{icon:"calendar-month"}),size:"sm",name:"bulan",value:x.bulan,onChange:o,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Bulan"}),ce().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(B,{prefix:e.jsx(_,{icon:"calendar-check"}),size:"sm",name:"tahun",value:x.tahun,onChange:o,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Tahun"}),he().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(le,{onHandleFilter:o})]})]}),e.jsxs(G,{children:[e.jsxs(n,{children:[e.jsx(n.Thead,{children:e.jsxs(n.TrHead,{children:[e.jsx(n.Th,{width:"4",ordered:!0,onHandleOrder:d,column:"id",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"no"}),e.jsx(n.Th,{width:"15",children:"Pemegang Anggaran"}),e.jsx(n.Th,{width:"15",ordered:!0,onHandleOrder:d,column:"kategori_id",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"Kategori"}),e.jsx(n.Th,{width:"15",children:"Judul"}),e.jsx(n.Th,{width:"10",ordered:!0,onHandleOrder:d,column:"nominal",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"nominal"}),e.jsx(n.Th,{width:"10",ordered:!0,onHandleOrder:d,column:"bulan",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"bulan"}),e.jsx(n.Th,{width:"7",ordered:!0,onHandleOrder:d,column:"tahun",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"tahun"}),e.jsx(n.Th,{width:"7",ordered:!0,onHandleOrder:d,column:"tipe",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"tipe"}),e.jsx(n.Th,{width:"7",ordered:!0,onHandleOrder:d,column:"status",orderBy:r.orderBy,orderDirection:r.orderDirection,children:"status"}),e.jsx(n.Th,{align:"end",width:"10",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(n.Tbody,{children:M()})]}),e.jsx(G.Footer,{data:i,params:r,setParams:A,setFetching:P,onChange:o})]})]}),e.jsx(xe,{title:l,showModal:w,closeModal:I,mode:F,data:m,categories:t,users:j,handleChange:f,errors:C,submit:g,update:E,processing:p}),e.jsx(ue,{title:l,showModal:z,closeModal:R,data:S}),e.jsx(je,{title:l,showModal:W,closeModal:K,data:S,formData:m,handleChange:f,errors:C,submit:N,processing:p})]})};export{We as default};
