import{j as e,r as m,W as h}from"./app-Dn5xKvvL.js";import{T as w,I as j}from"./TextInput-C5RnvMUz.js";import{I as b}from"./InputLabel-BM1akQpz.js";import{X as v,I as u}from"./transition-BENWUIyi.js";import{P as N,$ as D}from"./dialog-B4jZ96YY.js";function x({className:o="",disabled:t,children:s,...a}){return e.jsx("button",{...a,className:`inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${t&&"opacity-25"} `+o,disabled:t,children:s})}function C({children:o,show:t=!1,maxWidth:s="2xl",closeable:a=!0,onClose:r=()=>{}}){const n=()=>{a&&r()},l={sm:"sm:max-w-sm",md:"sm:max-w-md",lg:"sm:max-w-lg",xl:"sm:max-w-xl","2xl":"sm:max-w-2xl"}[s];return e.jsx(v,{show:t,leave:"duration-200",children:e.jsxs(N,{as:"div",id:"modal",className:"fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all",onClose:n,children:[e.jsx(u,{enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e.jsx("div",{className:"absolute inset-0 bg-gray-500/75"})}),e.jsx(u,{enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:e.jsx(D,{className:`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${l}`,children:o})})]})})}function F({type:o="button",className:t="",disabled:s,children:a,...r}){return e.jsx("button",{...r,type:o,className:`inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${s&&"opacity-25"} `+t,disabled:s,children:a})}function S({className:o=""}){const[t,s]=m.useState(!1),a=m.useRef(),{data:r,setData:n,delete:l,processing:p,reset:d,errors:f}=h({password:""}),y=()=>{s(!0)},g=c=>{c.preventDefault(),l(route("profile.destroy"),{preserveScroll:!0,onSuccess:()=>i(),onError:()=>a.current.focus(),onFinish:()=>d()})},i=()=>{s(!1),d()};return e.jsxs("section",{className:`space-y-6 ${o}`,children:[e.jsxs("header",{children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Delete Account"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."})]}),e.jsx(x,{onClick:y,children:"Delete Account"}),e.jsx(C,{show:t,onClose:i,children:e.jsxs("form",{onSubmit:g,className:"p-6",children:[e.jsx("h2",{className:"text-lg font-medium text-gray-900",children:"Are you sure you want to delete your account?"}),e.jsx("p",{className:"mt-1 text-sm text-gray-600",children:"Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account."}),e.jsxs("div",{className:"mt-6",children:[e.jsx(b,{htmlFor:"password",value:"Password",className:"sr-only"}),e.jsx(w,{id:"password",type:"password",name:"password",ref:a,value:r.password,onChange:c=>n("password",c.target.value),className:"mt-1 block w-3/4",isFocused:!0,placeholder:"Password"}),e.jsx(j,{message:f.password,className:"mt-2"})]}),e.jsxs("div",{className:"mt-6 flex justify-end",children:[e.jsx(F,{onClick:i,children:"Cancel"}),e.jsx(x,{className:"ms-3",disabled:p,children:"Delete Account"})]})]})})]})}export{S as default};