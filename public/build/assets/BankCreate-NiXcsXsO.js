import{j as e}from"./app-D-B5Id0O.js";import{F as x,a as d,c as u,b as r,R as b}from"./RegularSubmitModal-aKLLzvBd.js";import{c as F}from"./clsx-B-dksMZM.js";import{F as N}from"./FormInput-lsZ7UmeJ.js";import{M as n}from"./Modal-B6gJLD6L.js";import"./Button-CHbT7l0S.js";import"./Icon-BtsFO4oB.js";import"./dialog-Bt29UEoM.js";import"./transition-BO-KxpVP.js";const w=({type:o="file",size:m="md",isError:c=!1,className:p,...l})=>{let a;return m==="md"?a="h-[45px]":m==="sm"?a="h-[38px] pt-1 ps-2":a="h-[55px]",e.jsx("input",{type:o,className:F(p,a,c?"border-red-700 focus:border-red-700":"border-gray-200","rounded-lg border placeholder-gray-400 focus:border-primary outline-1 focus:outline-none text-sm w-full"),...l})},U=({title:o,submit:m,update:c,showModal:p,closeModal:l,mode:a,data:i,handleChange:t,errors:s,processing:g})=>{const h=["bank","e-wallet","cash"];return e.jsxs(n,{maxWidth:"md",show:p,onClose:l,closeable:!1,children:[e.jsxs(n.Header,{onClick:l,children:[a==="create"?"Tambah":"Update"," ",o]}),e.jsxs("form",{onSubmit:a==="create"?m:c,children:[e.jsx(n.Body,{children:e.jsx("div",{className:"grid grid-cols-1 gap-5 py-5",children:e.jsxs("div",{className:"col-span-1 flex flex-col gap-4",children:[e.jsxs(x,{children:[e.jsx(d,{name:"Nama",htmlFor:"nama",required:!0}),e.jsx(N,{size:"sm",id:"nama",name:"nama",onChange:t,defaultValue:i.nama,placeholder:"Masukkan Nama",isError:s==null?void 0:s.nama,required:!0}),e.jsx(u,{message:s==null?void 0:s.nama})]}),e.jsxs(x,{children:[e.jsx(d,{name:"Jenis",htmlFor:"jenis",required:!0}),e.jsxs(r,{size:"sm",id:"jenis",name:"jenis",onChange:t,value:i.jenis,isError:s==null?void 0:s.jenis,required:!0,className:"uppercase",children:[e.jsx("option",{value:"",children:"Pilih Jenis"}),h.map((j,f)=>e.jsx("option",{value:j,className:"uppercase",children:j},f))]}),e.jsx(u,{message:s==null?void 0:s.jenis})]}),e.jsxs(x,{children:[e.jsx(d,{name:"Logo",htmlFor:"logo"}),e.jsx(w,{size:"sm",id:"logo",name:"logo",onChange:t,isError:s==null?void 0:s.logo,className:"uppercase"}),i.logo?e.jsx("img",{src:URL.createObjectURL(i.logo),className:"img-fluid w-[200px]"}):i.previewLogo&&a=="create"?e.jsx("img",{src:`/bank/${i.previewLogo}`,className:"img-fluid w-[200px]"}):i.previewLogo&&a=="edit"?e.jsx("img",{src:`/storage/bank/${i.previewLogo}`,className:"img-fluid w-[200px]"}):null,e.jsx(u,{message:s==null?void 0:s.logo})]})]})})}),e.jsx(n.Footer,{children:e.jsx(b,{closeModal:l,label:a==="create"?"Simpan":"Update",disabled:g||!i.nama||!i.jenis})})]})]})};export{U as default};
