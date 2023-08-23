import{r as d,j as e,A as _,a as B,F as Z,S as q,u as X,t as E,m as J,I as Q,L as T,b as y,c as I,d as G,e as ee,f as te,g as ae,h as se,i as re,M as ne,C as oe}from"./index-ac446a90.js";function W({modalText:t,buttonText:n,onClick:s,isOpen:b,setIsOpen:p,onlyButton:x=!0}){const c={type:"spring",stiffness:700,damping:30};d.useEffect(()=>{const a=o=>{o.keyCode===27&&r()};return window.addEventListener("keydown",a),()=>{window.removeEventListener("keydown",a)}},[]);const f=()=>{s&&s(),p(!1)},r=()=>{x||p(!1)};return e.jsx(_,{mode:"wait",children:b?e.jsx(B,{onClick:r,animation:"opacityVariant",transition:{duration:.2},className:"!fixed inset-0 bg-opacity-80 duration-200 transition-all bg-gray-900 z-50 flex justify-center items-center",children:e.jsxs(B,{transition:c,animation:"scaleVariant",className:"relative w-80 rounded-sm h-60 bg-red-100 mb-3/4 background p-4 overflow-hidden text-lg flex flex-wrap flex-col",children:[t,e.jsx(Z,{onClick:f,text:n,className:"!w-fit !self-end mt-auto mb-2"})]})}):!1})}function le({days:t,bannedData:n,rowClassName:s,cellClassName:b,additionalFirstCol:p,translate:x,isPastDate:c}){const f=t.filter(a=>!n.includes(a.name.toUpperCase())),r=f.length>0?f.map(a=>{if(a.erase||c(a.date)||(u=>{const g=u.toUpperCase();return n.includes(g)})(a.name))return!1;const h=a.date.split("T")[0].split("-").reverse().join("-");return e.jsxs("th",{className:`${b} flex flex-col grow bg-accentMedium dark:bg-dark-accentMedium text-dark-baseColor dark:text-baseColor font-medium`,children:[e.jsx("h3",{className:"pb-1",children:x(a.name)}),e.jsx("h4",{children:h}),e.jsx("div",{className:"flex justify-evenly w-full overflow-hidden",children:a.columns.map(u=>e.jsx("h4",{className:"h-14 w-16 text-sm text-center",children:u.name},u.id))})]},a.id)}):!1;return e.jsx(e.Fragment,{children:r&&r.some(a=>a!==!1)?e.jsxs("tr",{className:`${s} sticky top-0 z-[6]`,children:[p?e.jsx("th",{className:`${b}  sticky -left-[1px] w-16  bg-accentLight dark:bg-dark-accentLight text-dark-baseColor dark:text-baseColor`,children:x(p)}):!1,r]}):!1})}function K(){return d.useContext(q)}function ce({record:t,translate:n,calendarId:s,date:b,time:p}){const{user:x}=X(),{socket:c,updateRecord:f}=K(),[r,a]=d.useState(t.data),o=t.id,[h,u]=d.useState(!1),g=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],k=new Date(b),l=g[k.getUTCDay()],i=()=>{const N=k.getUTCDate().toString().padStart(2,"0"),C=(k.getUTCMonth()+1).toString().padStart(2,"0"),v=k.getUTCFullYear();return`${N}-${C}-${v}`},m=N=>{N.recordId===o&&a(N.data)};d.useEffect(()=>{c&&c.on("sign",N=>m(N))},[]);const j=()=>{u(n(r===""?"sign":"sign_out"))},w=()=>{u(!1)},M=()=>{f({recordId:o,calendarId:s,data:r===""?x.name:"",userId:x._id,date:{fullDate:i(),dayName:l,time:p}}),r===""?u(!1):j()};return e.jsx(e.Fragment,{children:e.jsx("button",{className:`${r===""?"dark:bg-dark-accentLight bg-accentLight ":"bg-accentMedium dark:bg-dark-accentMedium"}
         hover:bg-accentMedium dark:hover:bg-dark-accentStrongHover  w-24 h-14 hover:shadow-lg transition-all active:bg-accentStrong dark:active:bg-dark-accentStrong active:text-baseColor duration-200 grow rounded-sm border-[1px] border-slate-700 m-1 overflow-hidden`,onMouseEnter:j,onMouseLeave:w,onClick:M,children:h||r})})}function A({message:t,hide:n,...s}){if(n)return!1;const b=t.data,p=t.date,x=t.time;function c(r){const a=new Date("2023-08-31T22:00:00.000Z"),o=new Date(r);if(x){const[h,u]=x.split(":");o.inputDateTime.setUTCHours(h,u,0,0)}return o<a}return b==""||p&&c(p)?!1:e.jsx("div",{className:`${s.className?s.className:""} z-[1] inset-0 absolute flex justify-center items-center bg-accentMedium dark:bg-dark-accentMedium dark:text-baseColor rounded-md border-2 border-accentStrong dark:border-dark-accentStrong`,children:e.jsx("p",{className:`${s.className?"":"sticky top-1/4 bottom-1/2 left-1/4 right-1/4 "} text-center`,children:b})})}function de({days:t,bannedDays:n,rowClassName:s,cellClassName:b,time:p,translate:x,index:c,calendarId:f,weekMessage:r,isPastDate:a}){const o=(l,i)=>l.map(m=>e.jsx(ce,{record:m,translate:x,calendarId:f,date:i,time:p},m.id)),h=(l,i)=>{const m=l.map((j,w)=>{if(w===c)return e.jsx("div",{className:"flex flex-col items-center justify-center relative grow ",children:o(j.records,i)},j.id)});return e.jsx(e.Fragment,{children:m})},u=(l,i)=>l.map(m=>e.jsxs("div",{className:"flex relative grow",children:[m.messages.length>0&&e.jsx(A,{className:"flex z-[2]",message:m.messages[0],isVisible:r}),h(m.slots,i)]},m.id)),g=t.filter(l=>!n.includes(l.name.toUpperCase())),k=g.length>0?g.map(l=>l.erase||a(l.date)?!1:e.jsxs("td",{className:`${b} flex flex-row grow relative`,children:[l.messages.length>0&&e.jsx(A,{className:"flex z-[3]",message:l.messages[0],hide:r}),u(l.columns,l.date)]},l.id)):!1;return e.jsx(e.Fragment,{children:k&&k.some(l=>l!==!1)?e.jsxs("tr",{className:`${s} relative`,children:[e.jsx("td",{className:`${b}border-l-0 border-r-2 sticky z-[5] -left-[1px] w-16 bg-accentLight dark:bg-dark-accentLight text-dark-baseColor dark:text-baseColor justify-center flex items-center`,children:e.jsx("span",{className:"sticky top-28",children:p})}),k]}):!1})}function ie({week:t,calendarId:n}){const{days:s,bannedDays:b,time:p,messages:x,erase:c}=t,f=r=>{const a=new Date;return new Date(r)<a};return c?!1:e.jsxs("table",{className:"relative",children:[x.length>0&&e.jsx(A,{message:x[0]}),e.jsxs("tbody",{children:[e.jsx(le,{rowClassName:"flex flex-row",cellClassName:"bg-accentLight dark:bg-accentLight border-2 border-slate-700",days:s,bannedData:b,additionalFirstCol:"time",translate:E,isPastDate:f}),p.map((r,a)=>e.jsx(de,{index:a,rowClassName:"flex flex-row",cellClassName:"bg-accentLight dark:bg-dark-accentLight border-2 border-slate-700 text-dark-baseColor dark:text-baseColor",days:s,bannedDays:b,time:r,translate:E,calendarId:n,weekMessage:x.length>0,isPastDate:f},r))]})]})}function ue({month:t,swipe:n,setSwipe:s,maxIndex:b,calendarId:p}){const[x,c]=t.name.split(".").map(h=>h.toLowerCase()),f=t.messages.map((h,u)=>e.jsx(A,{message:h},u)),r=()=>{s(n-1)},a=()=>{s(n+1)},o=t.weeks.map((h,u)=>e.jsx(ie,{week:h,calendarId:p},u));return e.jsxs("div",{className:"overflow-hidden w-full h-full border-2 border-slate-700",children:[f,e.jsxs("div",{className:"relative text-lg w-full md:h-[4%] h-[10%] text-center bg-accentStrongHover dark:bg-dark-accentStrongHover text-baseColor dark:text-baseColor",children:[e.jsx("h3",{className:"w-full",children:E(c)}),e.jsx("button",{onClick:r,className:`absolute text-sm left-1 bottom-1 md:top-1 transition-all duration-200 ${n===0?" opacity-50 pointer-events-none":""}`,children:E("previousMonth")}),e.jsx("button",{onClick:a,className:`absolute text-sm right-1 bottom-1 md:top-1 transition-all duration-200 ${n===b?"opacity-50 pointer-events-none":""}`,children:E("nextMonth")})]}),e.jsx("div",{className:"flex flex-wrap flex-col md:h-[96%] h-[95%] w-full overflow-auto touch-auto",children:o})]})}function me({children:t,...n}){var a,o;const s=d.useRef(null),b=(a=s==null?void 0:s.current)!=null&&a.clientHeight?s.current.clientHeight:0,p=(o=s==null?void 0:s.current)!=null&&o.clientWidth?s.current.clientWidth:0,[x,c]=d.useState(!1),f=h=>{s.current.style.width=`${(x||p)-h}px`},r=()=>{c(s.current.clientWidth)};return e.jsxs(J.div,{ref:s,className:n.className,drag:"x",dragConstraints:{top:0,left:0,right:0,bottom:window.innerHeight-b},dragMomentum:!1,dragElastic:.05,children:[t,e.jsx(be,{className:"absolute bottom-1/2 top-1/2 -left-2 py-10 px-4 ",handleDragEnd:r,handleResize:f})]})}function be({handleResize:t,handleDragEnd:n,...s}){let b;return e.jsx(J.div,{className:s.className,drag:"x",dragConstraints:{left:0,right:0,top:0,bottom:0},dragMomentum:!1,onDragEnd:()=>n(),dragElastic:1e-4,onDrag:(p,x)=>{const c=()=>{const r=x.offset.x;return b===r?!1:r};(()=>{const r=c();r&&(b=r,t(r,"x"))})()},children:e.jsx(Q,{className:" rotate-90 cursor-ew-resize"})})}function $({messages:t,setMessages:n,boundaryArray:s,maxMessages:b,translate:p,...x}){const c=(a,o)=>{const h=t.map((u,g)=>g!==o?u:a);n(h)},f=()=>{const a={data:"",expires:{date:"",time:""},from:s?0:!1,to:s?s.length-1:!1};t.length===0?n([a]):n([...t,a])},r=a=>{n(t.filter((o,h)=>h!==a))};return e.jsxs("div",{className:`${x.className}`,children:[t.length>0&&t.map((a,o)=>{const h=i=>{const m={...a,data:i};c(m,o)},u=i=>{const m={...a,expires:{...a.expires,date:i}};c(m,o)},g=i=>{const m={...a,expires:{...a.expires,time:i}};c(m,o)},k=i=>{const m=s.indexOf(i),j={...a,from:m};c(j,o)},l=i=>{const m=s.indexOf(i),j={...a,to:m};c(j,o)};return e.jsxs("div",{className:"flex w-full flex-row",children:[e.jsxs("div",{className:"relative w-2/3  mr-2 mb-2",children:[e.jsx(T,{inputType:"textarea",inputContainerClassName:"w-full h-full relative min-w-[full]",inputClassName:"h-full",value:a.data,setValue:h,placeHolder:p("monthMessagePlaceholder")}),e.jsx("button",{onClick:()=>r(o),className:"flex justify-center absolute right-1 top-3 button-form-reject w-6 h-6 rounded-sm text:dark-baseColor dark:text-baseColor",children:"-"})]}),e.jsxs("div",{className:"flex flex-col w-1/3",children:[e.jsx(T,{inputType:"date",inputClassName:"w-full",value:a.expires.date,setValue:u}),e.jsx(T,{inputType:"time",inputClassName:"w-full",value:a.expires.time,setValue:g}),s?e.jsxs("div",{className:"flex w-full h-10",children:[e.jsx(T,{inputType:"list",inputContainerClassName:"mr-1",valueList:s,value:0,setValue:k}),e.jsx(T,{inputType:"list",inputContainerClassName:"ml-1",valueList:s,value:s.length-1,setValue:l})]}):!1]})]},o)}),b===t.length?!1:e.jsx("button",{onClick:f,className:"mt-1 option-on w-6 h-6 rounded-sm text:dark-baseColor dark:text-baseColor",children:"+"})]})}function fe({month:t,monthIndex:n,translate:s,children:b,calendar:p,setCalendar:x}){const c=d.useRef(!1),[f,r]=d.useState(t.erase||!1),[a,o]=d.useState(t.messages);d.useEffect(()=>{if(!c.current){c.current=!0;return}h()},[f,a]);const h=()=>{const u=p.months.map((k,l)=>l===n?{...k,erase:f,messages:a}:k),g={...p,months:u};x(g)};return e.jsxs(y,{label:E(t.name.split(".")[1].toLowerCase()),labelClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm p-2 text-lg underline cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium",contentClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm p-4 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  ",initial:!0,children:[e.jsx(T,{labelText:s("removeMonth"),value:f,setValue:r,inputType:"checkbox",inputClassName:"w-4 !m-1 !w-fit !h-fit",inputContainerClassName:" border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(y,{label:s("monthMessages"),labelClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm",initial:!0,children:e.jsx($,{messages:a,setMessages:o,maxMessages:1,translate:s})}),e.jsx(y,{label:s("weeksLabel"),accordionClassName:`text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium w-full  mt-1  ${f?"cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ":"pointer-events-auto cursor-pointer"}`,labelClassName:"ml-2",contentClassName:"rounded-sm text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium border-2 border-accentMedium dark:border-dark-accentMedium",initial:!0,children:b})]})}function pe({week:t,weekIndex:n,monthIndex:s,children:b,calendar:p,setCalendar:x,translate:c,fixDate:f,days:r}){const[a,o]=d.useState(t.erase),[h,u]=d.useState(t.messages),[g,k]=d.useState(t.bannedDays),l=d.useRef(!1),i=f(t.days[0].date),m=t.days.length>1?f(t.days[t.days.length-1].date):!1,j=m?i+" : "+m:i;d.useEffect(()=>{if(!l.current){l.current=!0;return}w()},[a,h,g]);const w=()=>{const M=v=>v.map((S,L)=>n!==L?S:{...S,messages:h,erase:a,bannedDays:g}),N=p.months.map((v,S)=>{if(s!==S)return v;const L=M(v.weeks);return{...v,weeks:L}}),C={...p,months:N};x(C)};return t.days.map(M=>E(M.name)),e.jsxs(y,{label:c("weekLabel")+" "+j,labelClassName:" p-2 bg-accentLight dark:bg-dark-accentLight  w-full text-dark-baseColor border-b-2 border-accentMedium dark:border-dark-accentMedium",contentClassName:" p-2 text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium  w-full text-dark-baseColor border-2 border-accentLight dark:border-dark-accentLight",children:[e.jsx(T,{labelText:c("removeWeek"),value:a,setValue:o,inputType:"checkbox",inputClassName:"w-4 !m-1 !w-fit !h-fit",inputContainerClassName:" border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(y,{label:c("weekBannedDays"),labelClassName:" rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"rounded-sm",initial:!0,children:e.jsx(I,{selectedOptions:g,setSelectedOptions:k,optionsArr:r,translateOption:E})}),e.jsx(y,{label:c("weekMessages"),labelClassName:" rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"rounded-sm mb-2",initial:!0,children:e.jsx($,{messages:h,setMessages:u,translate:c,maxMessages:1})}),e.jsx(y,{label:c("daysLabel"),initial:!0,accordionClassName:` text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight w-full  ${a?"cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ":"pointer-events-auto cursor-pointer"}`,contentClassName:"rounded-sm text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium border-2 border-accentLight dark:border-dark-accentLight",children:b},n)]},n)}function xe({day:t,dayIndex:n,weekIndex:s,monthIndex:b,children:p,calendar:x,setCalendar:c,date:f,translate:r,time:a}){const[o,h]=d.useState(t.erase),[u,g]=d.useState(t.messages),k=d.useRef(!1);d.useEffect(()=>{if(!k.current){k.current=!0;return}l()},[o,u]);const l=()=>{const i=w=>w.map((M,N)=>n!==N?M:{...M,erase:o,messages:u}),m=x.months.map((w,M)=>{if(b!==M)return w;const N=w.weeks.map((C,v)=>{if(s!==v)return C;const S=i(C.days);return{...C,days:S}});return{...w,weeks:N}}),j={...x,months:m};c(j)};return e.jsxs(y,{label:`${E(t.name)}: ${f}`,labelClassName:" p-2 bg-accentMedium dark:bg-dark-accentMedium  w-full text-dark-baseColor border-b-2 ",contentClassName:" p-2  text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight  w-full text-dark-baseColor border-2 border-accentMedium dark:border-dark-accentMedium",children:[e.jsx(T,{labelText:r("removeDay"),value:o,setValue:h,inputType:"checkbox",inputClassName:"w-4 !m-1 !w-fit !h-fit",inputContainerClassName:" border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(y,{label:r("dayMessages"),labelClassName:" rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"rounded-sm mb-2",initial:!0,children:e.jsx($,{messages:u,setMessages:g,translate:r,maxMessages:1})}),e.jsx(y,{label:r("columnLabel"),accordionClassName:`${o?"cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ":"pointer-events-auto cursor-pointer"}`,labelClassName:" p-2 bg-accentMedium dark:bg-dark-accentMedium  w-full text-dark-baseColor border-b-2 ",contentClassName:" p-2  text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight  w-full text-dark-baseColor border-2 border-accentMedium dark:border-dark-accentMedium ",children:p})]},n)}function he({column:t,columnIndex:n,dayIndex:s,weekIndex:b,monthIndex:p,children:x,calendar:c,setCalendar:f,translate:r,columns:a}){const[o,h]=d.useState(t.erase),[u,g]=d.useState(t.messages),k=d.useRef(!1);d.useEffect(()=>{if(!k.current){k.current=!0;return}l()},[o,u]);const l=()=>{const i=w=>w.map((M,N)=>n!==N?M:{...M,messages:u,erase:o}),m=c.months.map((w,M)=>{if(p!==M)return w;const N=w.weeks.map((C,v)=>{if(b!==v)return C;const S=C.days.map((L,O)=>{if(s!==O)return L;const D=i(L.columns);return{...L,columns:D}});return{...C,days:S}});return{...w,weeks:N}}),j={...c,months:m};f(j)};return e.jsxs(e.Fragment,{children:[e.jsx(T,{labelText:r("removeColumn"),value:o,setValue:h,inputType:"checkbox",inputClassName:"w-4 !m-1 !w-fit !h-fit",inputContainerClassName:" border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(y,{label:r("columnMessages"),labelClassName:" rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"rounded-sm mb-2",initial:!0,children:e.jsx($,{messages:u,setMessages:g,translate:r,maxMessages:1})}),e.jsx(y,{label:r("slotsLabel"),accordionClassName:`${o?"cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ":"pointer-events-auto cursor-pointer"}`,labelClassName:" p-2 bg-accentMedium dark:bg-dark-accentMedium  w-full text-dark-baseColor border-b-2 ",contentClassName:" p-2  text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight  w-full text-dark-baseColor border-2 border-accentMedium dark:border-dark-accentMedium ",children:x})]})}function ge({slot:t,slotIndex:n,columnIndex:s,dayIndex:b,weekIndex:p,monthIndex:x,children:c,calendar:f,setCalendar:r,translate:a}){const[o,h]=d.useState(t.erase),[u,g]=d.useState(t.messages),k=d.useRef(!1);d.useEffect(()=>{if(!k.current){k.current=!0;return}l()},[o,u]);const l=()=>{const i=w=>w.map((M,N)=>n!==N?M:{...M,messages:u,erase:o}),m=f.months.map((w,M)=>{if(x!==M)return w;const N=w.weeks.map((C,v)=>{if(p!==v)return C;const S=C.days.map((L,O)=>{if(b!==O)return L;const D=L.columns.map((V,H)=>{if(s!==H)return V;const F=i(V.slots);return{...V,slots:F}});return{...L,columns:D}});return{...C,days:S}});return{...w,weeks:N}}),j={...f,months:m};r(j)};return e.jsxs(e.Fragment,{children:[e.jsx(T,{labelText:a("removeSlot"),value:o,setValue:h,inputType:"checkbox",inputClassName:"w-4 !m-1 !w-fit !h-fit",inputContainerClassName:" border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(y,{label:a("slotMessage"),labelClassName:" rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"rounded-sm mb-2",initial:!0,children:e.jsx($,{messages:u,setMessages:g,translate:a,maxMessages:1})}),e.jsx(y,{label:a("recordsLabel"),accordionClassName:`${o?"cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ":"pointer-events-auto cursor-pointer"}`,labelClassName:" p-2 bg-accentMedium dark:bg-dark-accentMedium  w-full text-dark-baseColor border-b-2 ",contentClassName:" p-2  text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight  w-full text-dark-baseColor border-2 border-accentMedium dark:border-dark-accentMedium ",children:c})]})}function ke({record:t,recordIndex:n,slotIndex:s,columnIndex:b,dayIndex:p,weekIndex:x,monthIndex:c,calendar:f,setCalendar:r,translate:a}){const[o,h]=d.useState(t.erase),[u,g]=d.useState(t.messages),[k,l]=d.useState(t.data),i=d.useRef(!1);console.log(t),d.useEffect(()=>{if(!i.current){i.current=!0;return}m()},[o,u]);const m=()=>{const j=N=>N.map((C,v)=>n!==v?C:{...C,messages:u,erase:o}),w=f.months.map((N,C)=>{if(c!==C)return N;const v=N.weeks.map((S,L)=>{if(x!==L)return S;const O=S.days.map((D,V)=>{if(p!==V)return D;const H=D.columns.map((F,R)=>{if(b!==R)return F;const P=F.slots.map((U,z)=>{if(s!==z)return U;const Y=j(U.records);return{...U,records:Y}});return{...F,slots:P}});return{...D,columns:H}});return{...S,days:O}});return{...N,weeks:v}}),M={...f,months:w};r(M)};return e.jsxs("div",{className:"dark:text-baseColor rounded-sm border-accentMedium dark:border-dark-accentMedium border-2 m-2 p-2",children:[e.jsx(T,{labelText:a("userRecord"),value:k,setValue:l,inputType:"text",inputClassName:"w-4 !m-1 !w-full !h-fit",inputContainerClassName:" border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(T,{labelText:a("removeRecord"),value:o,setValue:h,inputType:"checkbox",inputClassName:"w-4 !m-1 !w-fit !h-fit",inputContainerClassName:" border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer"}),e.jsx(y,{label:a("recordMessage"),labelClassName:" rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"rounded-sm mb-2",initial:!0,children:e.jsx($,{messages:u,setMessages:g,maxMessages:1,translate:a})})]})}function Ce({translate:t,calendar:n,setCalendar:s}){const b=d.useRef(!1),[p,x]=d.useState(n.messages),[c,f]=d.useState(n.name),[r,a]=d.useState(n.description);d.useEffect(()=>{if(!b.current){b.current=!0;return}o()},[p,c,r]);const o=()=>{s({...n,messages:p,name:c,description:r})};return e.jsxs(y,{label:t("mainSettings"),labelClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm p-2 text-lg underline cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium",contentClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm p-4 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  ",children:[e.jsx(T,{labelText:t("nameLabel"),value:c,setValue:f,inputType:"text"}),e.jsx(T,{labelText:t("descriptionLabel"),value:r,setValue:a,inputType:"textarea",inputContainerClassName:"mt-2"}),e.jsx(y,{label:t("messagesLabel"),labelClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer",contentClassName:"bg-accentLight dark:bg-dark-accentLight rounded-sm",initial:!0,children:e.jsx($,{messages:p,setMessages:x,translate:t,inputContainerClassName:"w-full h-full relative min-w-[full]",inputClassName:"h-full"})})]})}function je({calendar:t,setCalendar:n,turnOffConservation:s}){const[b,p]=d.useState(t),[x,c]=d.useState(!1),[f,r]=d.useState(!1),[a,o]=d.useState(!1),[h,u]=d.useState(!1),[g,k]=d.useState(!1),l=C=>E("AdminTools."+C),i=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"],m=C=>C.split("T")[0].split("-").reverse().join("-"),j=()=>{n(b),s()},w=()=>{c(!0),ee(t._id,t).then(C=>{c(!1),C?u(!0):k(!0)})},M=()=>{r(!0)},N=()=>{o(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(W,{modalText:l("modalLeave"),buttonText:l("modalButtonLeave"),onClick:j,isOpen:f,setIsOpen:r,onlyButton:!1}),e.jsx(W,{modalText:l("modalSave"),buttonText:l("modalButtonSave"),onClick:w,isOpen:a,setIsOpen:o,onlyButton:!1}),e.jsx(W,{modalText:l("modalApiTrue"),buttonText:l("modalButtonApiTrue"),onClick:s,isOpen:h,setIsOpen:u}),e.jsx(W,{modalText:l("modalApiFalse"),buttonText:l("modalButtonApiFalse"),isOpen:g,setIsOpen:k,onlyButton:!1}),x&&e.jsx(B,{className:"backdrop-blur-sm z-50 flex justify-center items-center",animation:"opacityVariant",children:e.jsx(G,{message:l("loadingApi"),theme:"text-accentStrong dark:text-dark-accentStrong",className:"w-fit h-fit"})}),e.jsx(B,{className:"fixed inset-0 z-20 overflow-auto",animation:"xSwipeVariant",children:e.jsx(me,{className:"bg-accentMedium dark:bg-dark-accentMedium p-2 z-50 w-10/12 md:w-[400px] overflow-x-hidden h-full max-w-full right-0 absolute top-0 min-w-[30px]  flex-wrap items-start flex-col",children:e.jsxs("div",{className:"md:min-w-[400px] min-w-[300px]",children:[e.jsxs("div",{className:"flex",children:[e.jsx("button",{className:"option-off p-2 rounded-sm border-2 border-accentLight dark:border-dark-accentLight my-2",onClick:N,children:l("buttonSave")}),e.jsx("button",{className:"button-form-reject ml-1 !text-black p-2 rounded-sm border-2 border-accentLight dark:border-dark-accentLight my-2",onClick:M,children:l("buttonLeave")})]}),e.jsxs("div",{className:" w-full flex-row flex-wrap ",children:[e.jsx(Ce,{translate:l,calendar:t,setCalendar:n}),t.months.map((C,v)=>e.jsx(fe,{month:C,translate:l,days:i,monthIndex:v,calendar:t,setCalendar:n,children:C.weeks.map((S,L)=>e.jsx(pe,{week:S,weekIndex:L,monthIndex:v,calendar:t,setCalendar:n,translate:l,fixDate:m,days:i,children:S.days.map((O,D)=>{const V=m(O.date);return e.jsx(xe,{day:O,monthIndex:v,weekIndex:L,dayIndex:D,calendar:t,setCalendar:n,translate:l,date:V,time:S.time,children:O.columns.map((H,F)=>e.jsx(he,{column:H,columnIndex:F,monthIndex:v,weekIndex:L,dayIndex:D,calendar:t,setCalendar:n,translate:l,columns:O.columns.map(R=>R.name),children:H.slots.map((R,P)=>e.jsx(ge,{slot:R,slotIndex:P,columnIndex:F,monthIndex:v,weekIndex:L,dayIndex:D,calendar:t,setCalendar:n,translate:l,children:R.records.map((U,z)=>e.jsx(ke,{record:U,recordIndex:z,slotIndex:P,columnIndex:F,monthIndex:v,weekIndex:L,dayIndex:D,calendar:t,setCalendar:n,translate:l},z))},P))},F))},D)})},L))},v))]})]})})})]})}function we(){const t=te(),n=ae(),{isAdmin:s}=X(),{socket:b,setConservation:p,compareSocketId:x}=K(),c=t.pathname.split("/").pop(),[f,r]=d.useState(0),[a,o]=d.useState(!1),h=i=>{const m=j=>JSON.parse(JSON.stringify(j.replaceAll(" ","_").normalize("NFD").replace(/[\u0300-\u036f]/g,"")));for(let j=0;j<i.length;j++)if(m(i[j].name)===m(c))return i[j];return!1},u=d.useMemo(()=>{const i=t.state;if(i){const m=h([i]);return m||!1}else return!1},[]),[g,k]=d.useState(u);d.useEffect(()=>(g||se().then(i=>{const m=h(i);if(m){k(m);return}else setTimeout(()=>{n("/brak_strony",{state:t.pathname})},500)}),()=>{window.history.replaceState({},document.title)}),[]);const l=()=>{p(g._id,!g.conservation),k({...g,conservation:!g.conservation})};return d.useEffect(()=>{b&&b.on("conservation",i=>{i.calendarId===g._id&&!x(i.senderId)&&o(!0)})},[]),e.jsx(e.Fragment,{children:e.jsx(B,{className:" background flex justify-center items-start overflow-hidden flex-wrap",animation:"opacityVariant",children:e.jsxs(_,{mode:"wait",children:[s&&g.conservation?e.jsx(je,{turnOffConservation:l,calendar:g,setCalendar:k}):e.jsx("button",{className:"absolute right-0 z-[100]",onClick:l,children:e.jsx(re,{className:"text-accentStrong dark:text-dark-accentStrong text-xl mt-2 mr-2"})}),e.jsx(W,{isOpen:g.conservation&&!s?!0:a,modalText:E("modalTextConservation"),buttonText:E("modalButtonText"),setIsOpen:o,onClick:()=>n("/")}),e.jsx(ne,{}),g?e.jsx(e.Fragment,{children:e.jsxs(B,{className:"w-full h-full flex justify-center flex-wrap",animation:"opacityVariant",children:[e.jsx("h3",{className:"custom-text-accentStrong text-center text-xl w-full underline font-bold md:pt-4 pt-4 pointer-events-none",children:g.name}),e.jsx(oe,{className:"w-11/12 max-w-fit md:w-3/4 h-5/6 md:h-3/4 md:-mt-28 -mt-4 rounded-sm relative",containerClassName:"w-full h-full bg-accentMedium dark:bg-dark-accentMedium flex justify-stretch",startPosition:0,pages:g.months.map((i,m)=>e.jsx(ue,{month:i,calendarId:g._id,swipe:f,maxIndex:g.months.length-1,setSwipe:r},i._id)),swipeToIndex:f},"carosuel")]},"calendarPage")}):e.jsx(G,{message:E("loading"),theme:"text-accentStrong dark:text-dark-accentStrong ",className:" self-center"})]})},"calendarPageContainer")})}export{we as default};
