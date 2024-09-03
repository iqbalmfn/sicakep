import{r as a,j as e,q as b,a as g}from"./app-DyPD85s7.js";import{c as h}from"./clsx-B-dksMZM.js";import{B as C,I as d}from"./Button-B3-6BY9u.js";import{Q as M}from"./react-toastify.esm-D6yYUWKT.js";/* empty css                      */import{X as N}from"./transition-CvBcTNZb.js";import{j as y}from"./GlobalFunction-DSMOM06H.js";const E=()=>{const[s,r]=a.useState(!1),t=()=>{window.pageYOffset>200?r(!0):r(!1)};a.useEffect(()=>(window.addEventListener("scroll",t),()=>{window.removeEventListener("scroll",t)}),[]);const n=()=>{const o=document.getElementById("up-page");o&&o.scrollIntoView({behavior:"smooth"})};return e.jsx(C,{size:"xs",variant:"primary",className:h(s?"show":null,"fixed bottom-14 right-10 fade"),onClick:n,isCircle:!0,buttonIcon:!0,children:e.jsx(d,{icon:"arrow-up-short",className:"text-2xl text-white"})})},L=()=>{const{props:s}=b(),[r,t]=a.useState(!1);return a.useEffect(()=>{const n=()=>{window.scrollY+window.innerHeight>=document.body.offsetHeight?t(!0):t(!1)};return window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n)}},[]),r&&e.jsx("footer",{className:"fixed bottom-0 w-full flex items-center h-[35px] bg-white shadow-top",children:e.jsxs("div",{className:"container mx-auto text-center px-5 text-xs",children:["Development"," ",e.jsx("a",{target:"_blank",href:"https://iqbalmfn.com",className:"text-primary hover:text-primary-hover ",children:s.app.name}),", All rights Reserved © 2024 - v(1.0.0)"]})})};function P({setting:s}){return e.jsx(g,{href:"/dashboard",children:e.jsx("img",{src:"/images/logo.png",className:"w-[125px] rounded-lg",alt:"logo"})})}const T=({active:s=null})=>s?e.jsx("span",{className:"border border-primary text-primary font-semibold px-3 py-1 rounded-lg animate",children:s}):null,v=a.createContext(),p=({children:s})=>{const[r,t]=a.useState(!1),n=()=>{t(o=>!o)};return e.jsx(v.Provider,{value:{open:r,setOpen:t,toggleOpen:n},children:e.jsx("div",{className:"relative",children:s})})},F=({children:s})=>{const{open:r,setOpen:t,toggleOpen:n}=a.useContext(v);return e.jsxs(e.Fragment,{children:[e.jsx("div",{onClick:n,children:s}),r&&e.jsx("div",{className:"fixed inset-0 z-40",onClick:()=>t(!1)})]})},O=({align:s="right",width:r="48",contentClasses:t="py-1 bg-white",children:n})=>{const{open:o,setOpen:x}=a.useContext(v);let c="origin-top";s==="left"?c="origin-top-left left-0":s==="right"&&(c="origin-top-right right-0");let u="";return r==="48"&&(u="w-48"),e.jsx(e.Fragment,{children:e.jsx(N,{as:a.Fragment,show:o,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:e.jsx("div",{className:`absolute z-50 mt-3 rounded-md shadow-lg ${c} ${u}`,onClick:()=>x(!1),children:e.jsx("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+t,children:n})})})})},D=({className:s="",children:r,...t})=>e.jsx(g,{...t,className:"block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "+s,children:r});p.Trigger=F;p.Content=O;p.Link=D;function I({auth:s,setting:r}){const{calendarActive:t}=b().props;return e.jsx("div",{className:"bg-white",children:e.jsxs("div",{className:"h-[65px] flex justify-between items-center px-5 lg:px-0 container mx-auto lg:w-[1500px]",children:[e.jsx(P,{setting:r}),e.jsxs("div",{className:"flex justify-start gap-5 items-center",children:[e.jsx(T,{active:t}),s.user?e.jsxs(p,{children:[e.jsx(p.Trigger,{children:e.jsxs("div",{className:"flex items-center justify-start gap-3 md:w-[165px] group cursor-pointer",children:[e.jsx("div",{children:s.user.foto?e.jsx("div",{className:"rounded-full w-[40px] h-[40px] group-hover:bg-white transition duration-300 overflow-hidden",children:e.jsx("img",{src:`/images/${s.user.foto}`,alt:s.user.name,className:"object-cover object-top"})}):e.jsx("div",{className:"border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center group-hover:bg-white transition duration-300 overflow-hidden",children:e.jsx("img",{src:`https://ui-avatars.com/api/?name=${s.user.name}&background=163826&color=fff`,alt:s.user.name})})}),e.jsx("span",{className:"hidden md:block",children:s.user.name})]})}),e.jsx(p.Content,{children:e.jsxs(p.Link,{href:route("logout"),method:"post",as:"button",className:"flex items-center gap-2",children:[e.jsx(d,{icon:"box-arrow-right",className:"text-[15px]"}),"Log Out"]})})]}):e.jsx(g,{href:route("login"),children:e.jsx("div",{className:"border border-white rounded-full w-[40px] h-[40px] flex justify-center items-center cursor-pointer hover:bg-white group transition duration-300",children:e.jsx(d,{icon:"person",className:"text-white group-hover:text-color-primary text-xl transition duration-300"})})})]})]})})}const U=({index:s,auth:r,href:t,label:n,icon:o,roles:x,subMenus:c,showSubMenu:u,indexSubMenu:j,activeUrl:f,...w})=>{const l=r.roles.map(i=>i.id);return t?e.jsx(g,{href:t,className:"text-white hover:bg-black/10 py-[5px] px-[10px] rounded",children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{icon:o}),e.jsx("span",{children:n})]})}):e.jsxs("div",{...w,className:h(x.length===0||x.some(i=>l.includes(i))?null:"hidden",f.slice(1).includes(y(n.toLowerCase()))?"bg-black/10 font-semibold":null,"flex items-center gap-3 text-white cursor-pointer hover:bg-black/10 py-[5px] px-[10px] transition-all duration-150 rounded !font-medium"),children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{icon:o}),e.jsx("span",{className:h(f.slice(1).includes(y(n.toLowerCase()))?"font-semibold":null),children:n})]}),c.length>0?e.jsx(d,{icon:"chevron-down",className:"text-xs"}):null,e.jsx(N,{as:a.Fragment,show:u&&j==s,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:e.jsx("div",{className:"absolute bg-white top-[123px] z-20 min-w-[175px] shadow-lg rounded h-auto border-danger overflow-hidden",children:e.jsx("div",{className:"flex flex-col",children:c.map((i,k)=>e.jsx(g,{href:i.href,className:h(i.roles.length===0||i.roles.some(S=>l.includes(S))?null:"hidden",f.includes(i.href)?"bg-gray-100 font-semibold":null,"text-standard hover:bg-gray-100 px-4 py-3"),children:e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(d,{icon:i.icon}),e.jsx("span",{children:i.label})]})},k))})})})]})},q=[{href:"/dashboard",label:"Dashboard",icon:"graph-up",subMenus:[],roles:[1,2]},{href:null,label:"Master",icon:"database",subMenus:[{href:"/master/kategori",label:"Kategori Pengeluaran & Pemasukan",icon:"tag",subMenus:[],roles:[1]}],roles:[1]},{href:"/perencanaan",label:"Perencanaan",icon:"journal-check",roles:[1,2]},{href:null,label:"Utang & Piutang",icon:"arrow-left-right",subMenus:[{href:"/utang-piutang/utang",label:"Utang",icon:"arrow-left-square",subMenus:[],roles:[1,2]},{href:"/utang-piutang/piutang",label:"Piutang",icon:"arrow-right-square",subMenus:[],roles:[1,2]}],roles:[1,2]},{href:null,label:"Transaksi",icon:"cart-check",subMenus:[{href:"/transaksi/pemasukan",label:"Pemasukan",icon:"arrow-right-square",subMenus:[],roles:[1,2]},{href:"/transaksi/pengeluaran",label:"Pengeluaran",icon:"arrow-left-square",subMenus:[],roles:[1,2]}],roles:[1,2]}],A=({auth:s})=>{const[r,t]=a.useState(!1),[n,o]=a.useState(""),x=l=>{t(!0),o(l)},c=()=>{t(!1),o("")},u=b().props,j=u.app.url,w=u.ziggy.location.split(j)[1];return e.jsx("div",{className:"bg-primary",children:e.jsx("div",{className:"container mx-auto lg:w-[1500px] h-[55px] flex items-center gap-2",children:q.map((l,m)=>e.jsx(U,{auth:s,index:m,href:l.href,label:l.label,icon:l.icon,roles:l.roles,subMenus:l.subMenus,showSubMenu:r,indexSubMenu:n,activeUrl:w,onClick:()=>n===m?c():x(m)},m))})})};function Q({children:s,title:r,active:t}){const{auth:n,setting:o}=b().props;return a.useEffect(()=>{document.documentElement.style.setProperty("--color-primary","#163826")},[]),e.jsxs("div",{id:"up-page",className:"min-h-screen flex flex-col sm:pt-0 bg-gray-200",children:[e.jsxs("div",{className:"w-full h-auto bg-gray-200 overflow-hidden text-gray-500 text-sm mb-20",children:[e.jsx(I,{auth:n,title:r,active:t,setting:o}),e.jsx(A,{auth:n.user}),e.jsx("div",{className:" bg-gray-200 container mx-auto lg:w-[1500px] h-auto md:h-auto px-2",children:e.jsx("main",{className:"flex flex-col pt-7 pb-24 md:py-5",children:s})})]}),e.jsx(L,{}),e.jsx(E,{}),e.jsx(M,{})]})}const B=({children:s,className:r})=>e.jsx("div",{className:h(r,"bg-white rounded-lg h-auto py-4 px-5"),children:s}),V=B;export{Q as A,V as C};
