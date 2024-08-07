import{y as O,W as $,r as u,j as e,Y as G}from"./app-Dbx9D277.js";import{B as K,C as f}from"./ContentWrapper-C4_OpZj5.js";import{U as Q,C as V,a as X,F as Z,D as W,T as s,A as v,b as ee}from"./UsePageController-CR0QzmNK.js";import{F as D}from"./FormSelectPrefix-C0FjWGdz.js";import{I as C}from"./Button-QycNx3Nk.js";import{L as R}from"./Label-D-4VNg3n.js";import{N as ae}from"./NameWithAvatar-CxhbC4St.js";import{B as Y}from"./react-toastify.esm-C4JAiLfa.js";import{A as se}from"./AppContentLayout-D6g_OWw4.js";import{f as N,g as ne,l as re,a as le,b as te,e as oe,i as ie,h as de}from"./GlobalFunction-vceBG54b.js";import ce from"./UtangCreate-gn8Od2Pb.js";import he from"./UtangDetail-1febeBkG.js";import"./clsx-B-dksMZM.js";import"./FormInput-kgoxNz9M.js";import"./RegularSubmitModal-D-3_FVAx.js";/* empty css                      */import"./transition-Cj9ZHop8.js";import"./FormTextarea-C_0J2Uir.js";import"./Modal-VBNP6egu.js";import"./dialog-DYQLsHLt.js";const ue=(o,h,i)=>{O.post(route("utang-piutang.utang.store"),o,{onError:t=>{h(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},me=(o,h,i)=>{O.post(route("utang-piutang.utang.update",{utang:o.id}),{...o,_method:"PUT"},{onError:t=>{h(t)},onSuccess:()=>{i()},preserveScroll:!1,preserveState:!0})},xe=(o,h)=>{const{data:i,setData:t,reset:m}=$({user_id:"",judul:"",jenis:"transfer",nominal:"",jatuh_tempo:"",deskripsi:""}),[n,x]=u.useState({}),[b,p]=u.useState(null),j=()=>{x({})},{mode:y,params:g,setParams:T,fetching:d,request:S,showModal:w,handleShowModal:B,handleEditModal:M,handleCloseModal:c,initialData:r,setInitialData:_,setFetching:k,onHandleFilter:E,onHandleOrder:U}=Q(o,j,m,"utang-piutang.utang.index");u.useEffect(()=>{d&&S(g)},[g,d]),u.useEffect(()=>{r.id&&t({id:r.id,user_id:r.user_id,judul:r.judul,jenis:r.jenis,jatuh_tempo:r.jatuh_tempo,nominal:r.nominal,deskripsi:r.deskripsi})},[r]);const F=l=>{t(l.target.name,l.target.type==="file"?l.target.files[0]:l.target.value)},L=l=>{l.target.checked?t(l.target.name,1):t(l.target.name,0)},P=l=>{l.preventDefault(),p(Y.loading("Sedang menyimpan data...")),ue(i,x,j)},H=l=>{l.preventDefault(),p(Y.loading("Sedang menyimpan data...")),me(i,x,j)},[A,a]=u.useState({}),[z,I]=u.useState(!1),q=l=>{I(!0),a(l)},J=l=>{I(!1),_({}),m()};return V(h,n,b,p,c),{data:i,processing:b,errors:n,submit:P,update:H,handleChange:F,handleCheckboxChange:L,mode:y,params:g,setParams:T,setFetching:k,onHandleFilter:E,onHandleOrder:U,showModal:w,handleShowModal:B,handleEditModal:M,handleCloseModal:c,detailData:A,showDetailModal:z,handleShowDetailModal:q,handleCloseDetailModal:J}},Le=({title:o,breadcrumbs:h,datas:i,widget:t,users:m,filtered:n,flash:x})=>{const{data:b,processing:p,errors:j,submit:y,update:g,handleChange:T,params:d,setParams:S,setFetching:w,mode:B,showModal:M,onHandleFilter:c,onHandleOrder:r,handleShowModal:_,handleEditModal:k,handleCloseModal:E,detailData:U,showDetailModal:F,handleShowDetailModal:L,handleCloseDetailModal:P}=xe(n,x),H=[{value:0,label:"Belum Lunas"},{value:1,label:"Lunas"}],A=()=>i.data.length>0?i.data.map((a,z)=>e.jsxs(s.TrBody,{children:[e.jsx(s.Td,{children:z+1}),e.jsx(s.Td,{children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(ae,{avatar:a.user.foto?`/images/${a.user.foto}`:a.user.foto,name:a.user.name})})}),e.jsx(s.Td,{children:a.judul}),e.jsx(s.Td,{children:N(a.nominal)}),e.jsx(s.Td,{children:oe(a.jatuh_tempo)}),e.jsx(s.Td,{children:e.jsx(R,{variant:a.jenis=="cash"?"info":"success",children:a.jenis})}),e.jsx(s.Td,{children:e.jsx(R,{variant:a.status==0?"danger":"success",children:a.status==0?"Belum Lunas":"Lunas"})}),e.jsxs(s.Td,{className:"text-end pe-3",children:[e.jsx(v,{variant:"warning",icon:"search",label:"Detail",onClick:()=>L(a)}),e.jsx(v,{variant:"success",icon:"check-lg",label:"Lunas",onClick:()=>ie("utang-piutang.utang.bayar",a.id,"Utang telah dibayar")}),e.jsx(v,{variant:"info",icon:"pencil",label:"Edit",onClick:()=>k(a)}),e.jsx(v,{variant:"danger",icon:"trash",label:"Hapus",onClick:()=>de("utang-piutang.utang.destroy",a.id,"Data berhasil dihapus")})]})]},a.id)):e.jsx(ee,{colSpan:8});return e.jsxs(se,{children:[e.jsx(G,{title:o}),e.jsx(K,{title:o,breadcrumbs:h}),e.jsxs("div",{className:"grid grid-cols-4 gap-5 mb-5",children:[e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-danger border border-2 border-danger",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Total Utang"}),e.jsx("span",{className:"text-4xl font-bold",children:N(t.total_utang)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-success border border-2 border-success",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Sudah Dibayar"}),e.jsx("span",{className:"text-4xl font-bold",children:N(t.total_dibayar)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-danger border border-2 border-danger",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Belum Dibayar"}),e.jsx("span",{className:"text-4xl font-bold",children:N(t.total_belum_dibayar)})]})}),e.jsx("div",{className:"col-span-4 lg:col-span-1",children:e.jsxs(f,{className:"flex flex-col gap-2 pb-6 text-info border border-2 border-info",children:[e.jsx("span",{className:"text-xl font-semibold",children:"Persentase Lunas"}),e.jsxs("span",{className:"text-4xl font-bold",children:[t.persentase,"%"]})]})})]}),e.jsxs(f,{children:[e.jsxs("div",{className:"flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3",children:[e.jsx("div",{className:"flex items-center gap-2",children:e.jsx(X,{onClick:_})}),e.jsxs("div",{className:"flex justify-end gap-2",children:[e.jsx("div",{children:e.jsxs(D,{prefix:e.jsx(C,{icon:"person"}),size:"sm",name:"user_id",value:d.user_id,onChange:c,className:"w-[205px]",children:[e.jsx("option",{value:"",children:"Semua Peminjam"}),m.map(a=>e.jsx("option",{value:a.id,children:a.name},a.id))]})}),e.jsx("div",{children:e.jsxs(D,{prefix:e.jsx(C,{icon:"check-circle"}),size:"sm",name:"status",value:d.status,onChange:c,className:"w-[150px]",children:[e.jsx("option",{value:"",children:"Semua Status"}),H.map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(D,{prefix:e.jsx(C,{icon:"calendar-month"}),size:"sm",name:"bulan",value:d.bulan?d.bulan:ne(),onChange:c,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Bulan"}),re().map(a=>e.jsx("option",{value:a.value,children:a.label},a.value))]})}),e.jsx("div",{children:e.jsxs(D,{prefix:e.jsx(C,{icon:"calendar-check"}),size:"sm",name:"tahun",value:d.tahun?d.tahun:le(),onChange:c,className:"w-[150px]",children:[e.jsx("option",{value:"all",children:"Semua Tahun"}),te().map(a=>e.jsx("option",{value:a,children:a},a))]})}),e.jsx(Z,{onHandleFilter:c})]})]}),e.jsxs(W,{children:[e.jsxs(s,{children:[e.jsx(s.Thead,{children:e.jsxs(s.TrHead,{children:[e.jsx(s.Th,{width:"4",ordered:!0,onHandleOrder:r,column:"id",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"no"}),e.jsx(s.Th,{width:"15",children:"Peminjam"}),e.jsx(s.Th,{width:"15",children:"Judul"}),e.jsx(s.Th,{width:"10",ordered:!0,onHandleOrder:r,column:"nominal",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"nominal"}),e.jsx(s.Th,{width:"10",ordered:!0,onHandleOrder:r,column:"jatuh_tempo",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"jatuh tempo"}),e.jsx(s.Th,{width:"7",ordered:!0,onHandleOrder:r,column:"jenis",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"jenis"}),e.jsx(s.Th,{width:"7",ordered:!0,onHandleOrder:r,column:"status",orderBy:n.orderBy,orderDirection:n.orderDirection,children:"status"}),e.jsx(s.Th,{align:"end",width:"10",children:e.jsx("span",{className:"me-3",children:"opsi"})})]})}),e.jsx(s.Tbody,{children:A()})]}),e.jsx(W.Footer,{data:i,params:n,setParams:S,setFetching:w,onChange:c})]})]}),e.jsx(ce,{title:o,showModal:M,closeModal:E,mode:B,data:b,users:m,handleChange:T,errors:j,submit:y,update:g,processing:p}),e.jsx(he,{title:o,showModal:F,closeModal:P,data:U})]})};export{Le as default};
