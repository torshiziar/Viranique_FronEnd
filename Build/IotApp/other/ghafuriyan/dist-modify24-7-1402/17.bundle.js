(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{403:function(e,t,a){"use strict";var n=a(297),l=a.n(n),c=a(1),r=a.n(c),i=a(302),o=a(17),s=a(303),m=a(310),u=a.n(m),d={content:{top:"50%",left:"50%",right:"unset",bottom:"unset"}};u.a.setAppElement("#root");var p=function(e){var t=e.data,a=e.handler,n=e.isOpenDevice,i=e.onClose,m=e.onChange,p=e.errorDevice,f=e.errors,v=Object(c.useState)(""),b=l()(v,2),E=b[0],N=b[1],x=Object(c.useState)(""),h=l()(x,2),g=h[0],y=h[1],j=Object(c.useState)(!1),k=l()(j,2),w=k[0],O=k[1];Object(c.useEffect)((function(){t&&(N(t.title),y(t.part_number))}),[t]),Object(c.useEffect)((function(){O(""!==E&&""!==g&&"exist"!==p)}),[E,g,p]);var C=function(){a({title:E,part_number:g})},M=function(){N(""),y(""),i()};return r.a.createElement(u.a,{isOpen:n,onRequestClose:i,style:d,contentLabel:"Example Modal",className:"p-3 bg-white"},r.a.createElement("div",{className:"modal-header"},r.a.createElement("h5",{className:"bold text-dark text-nowrap ".concat(o.isMobile?"text-right":"text-center")},t?"ویرایش اطلاعات دستگاه":"افزودن دستگاه جدید"),o.isMobile&&r.a.createElement("i",{className:"icon icon-24 icon-close",onClick:M})),r.a.createElement("div",{className:"col-lg-12 col-sm-12 ".concat(o.isMobile?"px-0 mt-3":"mt-4 pt-2")},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name",className:"required"},"نام دستگاه"),r.a.createElement("input",{type:"text",id:"title",value:E,onChange:function(e){return N(e.target.value)},className:"form-control pr-3 ".concat(f&&null!=f&&f.title?"border-error":""),placeholder:"نام دستگاه را وارد نمایید."}),f&&null!=f&&f.title?r.a.createElement("p",{className:"error-field"},null==f?void 0:f.title[0]):null)),r.a.createElement("div",{className:"col-lg-12 col-sm-12 pt-2 ".concat(o.isMobile?"px-0 mt-3 pb-3":"mt-4")},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name",className:"required"},"شماره سریال دستگاه"),r.a.createElement("input",{type:"text",id:"name",value:g,onChange:function(e){m(e.target.value),y(e.target.value)},className:"form-control pr-3 ".concat(t?"disabled":""," ").concat(f&&null!=f&&f.part_number?"border-error":""),placeholder:"بعنوان مثال VT#341"}),f&&null!=f&&f.part_number?r.a.createElement("p",{className:"error-field"},null==f?void 0:f.part_number[0]):null,"exist"===p?r.a.createElement("p",{className:"danger-text"},"این شماره سریال قبلا ثبت شده است."):"notFound"===p?r.a.createElement("p",{className:"danger-text"},"شماره سریال وارد شده وجود ندارد."):null)),r.a.createElement("div",{className:"col-12 d-flex justify-content-end ".concat(o.isMobile?"px-0":"mt-5")},r.a.createElement(s.a,{className:"d-flex align-items-center button justify-content-center btn-primary-fill ml-2 px-4 ".concat(o.isMobile?"width-65":""," ").concat(w?"":"disabled"),handler:function(){C()}},r.a.createElement("span",{className:"px-2"},"تایید")),r.a.createElement(s.a,{className:"d-flex align-items-center button justify-content-center btn-primary-outline mr-2 px-4 ".concat(o.isMobile?"width-35":"btn-primary-border"),handler:M},r.a.createElement("span",{className:"px-2"},"لغو"))))},f=a(35),v=a(36),b=a(320);t.a=function(e){var t=e.collapse,a=Object(c.useState)(null),n=l()(a,2),m=n[0],u=n[1],d=Object(c.useState)([]),E=l()(d,2),N=E[0],x=(E[1],Object(c.useState)([])),h=l()(x,2),g=h[0],y=h[1],j=Object(c.useState)([]),k=l()(j,2),w=k[0],O=k[1],C=Object(c.useState)(""),M=l()(C,2),_=M[0],S=M[1],q=Object(c.useState)(""),D=l()(q,2),F=D[0],A=D[1],R=Object(c.useRef)(null),z=Object(c.useState)(!1),J=l()(z,2),B=J[0],G=J[1],I=Object(c.useState)(null),L=l()(I,2),T=L[0],U=L[1],V=Object(c.useState)(""),H=l()(V,2),K=H[0],P=H[1];Object(c.useEffect)((function(){var e;t&&!o.isMobile?A((null===(e=R.current)||void 0===e?void 0:e.getBoundingClientRect().height)+16):A(0)}),[t]);var Q=function(e,t){"sensor"===t?Y(e):Z(e)},W=function(e){Object(b.confirmAlert)({customUI:function(t){var a=t.onClose;return r.a.createElement("div",{className:"card card-box"},r.a.createElement("p",{className:"text-dark text-center ".concat(o.isMobile?"mt-3":"")},"آیا از حذف دستگاه مطمئن هستید؟"),r.a.createElement("div",{className:"d-flex mt-4 justify-content-center"},r.a.createElement("button",{className:"button btn-primary-fill-outline py-2 px-3 col-6 ml-2 btn-primary-border text-primary bold",onClick:function(){var t;t={part_number:e.part_number},Object(i.i)(t).then((function(e){X()})).catch((function(e){return console.log(e)})),a()}},r.a.createElement("span",{className:"py-1 px-3"},"مطمئنم")),r.a.createElement("button",{className:"button btn-primary-fill py-2 px-4 col-6 mr-2 bold",onClick:a},r.a.createElement("span",{className:"py-1 px-3"},"لغو"))))},overlayClassName:"overlay-custom-confirm-modal"})},X=function(){Object(i.A)().then((function(e){y(null==e?void 0:e.sensors),O(null==e?void 0:e.actuators)})).catch((function(e){return console.log(e)}))},Y=function(e){Object(i.G)(e).then((function(e){u(e),S("sensor"),G(!0)})).catch((function(e){return console.log(e)}))},Z=function(e){Object(i.q)(e).then((function(e){u(e),S("actuator"),G(!0)})).catch((function(e){return console.log(e)}))};Object(c.useEffect)((function(){X()}),[]);return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mx--15px px-30px mt--15px pt-15px ".concat(o.isMobile?"height-user-custom overflow-auto":"custom-collapse overflow-hidden"),style:o.isMobile?{height:"calc(100vh - 129px)"}:{height:F}},r.a.createElement("section",{className:"".concat(o.isMobile?"row":"px-2"),ref:R},r.a.createElement("div",{className:"device-management-table ".concat(o.isMobile?"col-12":"")},!o.isMobile&&r.a.createElement("div",{className:"row mx-0"},r.a.createElement("div",{className:"col-6 px-2 device-management-table-header"},"نام دستگاه"),r.a.createElement("div",{className:"col px-2 device-management-table-header"},"شماره سریال"),r.a.createElement("div",{className:"col px-2 device-management-table-header"})),!o.isMobile&&(null==g?void 0:g.map((function(e){return r.a.createElement("div",{key:(null==e?void 0:e.id)+204,className:"row font-500 font-size-14 mx-0 device-management-table-body align-items-center"},r.a.createElement("div",{className:"col-6 px-2 text-dark"},null==e?void 0:e.title),r.a.createElement("div",{className:"col px-2"},null==e?void 0:e.part_number),r.a.createElement("div",{className:"col px-2 d-flex align-items-center justify-content-center"},r.a.createElement("i",{className:"icon icon-24 icon-delete ml-2 cursor-pointer",onClick:function(){return W(e)}}),r.a.createElement("i",{className:"icon icon-24 icon-edit mr-2 cursor-pointer",onClick:function(){return Q(e.id,"sensor")}})))}))),!o.isMobile&&(null==w?void 0:w.map((function(e){return r.a.createElement("div",{key:(null==e?void 0:e.id)+105,className:"row font-500 font-size-14 mx-0 device-management-table-body align-items-center"},r.a.createElement("div",{className:"col-6 px-2 text-dark"},null==e?void 0:e.title),r.a.createElement("div",{className:"col px-2"},null==e?void 0:e.part_number),r.a.createElement("div",{className:"col px-2 d-flex align-items-center justify-content-center"},r.a.createElement("i",{className:"icon icon-24 icon-delete ml-2 cursor-pointer",onClick:function(){return W(e)}}),r.a.createElement("i",{className:"icon icon-24 icon-edit mr-2 cursor-pointer",onClick:function(){return Q(e.id,"actuator")}})))}))),o.isMobile&&(null==g?void 0:g.map((function(e){return r.a.createElement("div",{className:"row card mb-12px py-3",key:(null==e?void 0:e.id)+305},r.a.createElement("div",{className:"col-12 d-flex flex-column"},r.a.createElement("div",{className:"bold"},"نام دستگاه: ",r.a.createElement("span",{className:"text-dark"},e.title)),r.a.createElement("div",{className:"d-flex justify-content-between mt-3"},r.a.createElement("div",{className:"bold"},"شماره سریال: ",r.a.createElement("span",{className:"text-dark"},e.part_number)),r.a.createElement("div",{className:"d-flex"},r.a.createElement("div",{className:"ml-3 cursor-pointer",key:e.id+101,onClick:function(){return Q(e.id,"sensor")},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:f.a,width:20,title:"ویرایش"}))),r.a.createElement("div",{className:"cursor-pointer",key:e.id+102,onClick:function(){return W(e)},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:v.a,width:20,title:"حذف"})))))))}))),o.isMobile&&(null==w?void 0:w.map((function(e){return r.a.createElement("div",{className:"row card mb-12px py-3",key:(null==e?void 0:e.id)+405},r.a.createElement("div",{className:"col-12 d-flex flex-column"},r.a.createElement("div",{className:"bold"},"نام دستگاه: ",r.a.createElement("span",{className:"text-dark"},e.title)),r.a.createElement("div",{className:"d-flex justify-content-between mt-3"},r.a.createElement("div",{className:"bold"},"شماره سریال: ",r.a.createElement("span",{className:"text-dark"},e.part_number)),r.a.createElement("div",{className:"d-flex"},r.a.createElement("div",{className:"ml-3 cursor-pointer",key:e.id+101,onClick:function(){return Q(e.id,"actuator")},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:f.a,width:20,title:"ویرایش"}))),r.a.createElement("div",{className:"cursor-pointer",key:e.id+102,onClick:function(){return W(e)},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:v.a,width:20,title:"حذف"})))))))})))),r.a.createElement("div",{className:"".concat(o.isMobile?"":"mt-3")},r.a.createElement(s.a,{className:"button btn-primary-fill p-2 height-auto",handler:function(){return G((function(e){return!e}))}},r.a.createElement("i",{className:"icon icon-24 icon-plus"}))))),r.a.createElement(p,{data:m,onChange:function(e){P(N.some((function(t){return t.part_number===e}))?"exist":"")},errorDevice:K,handler:function(e){m?"sensor"===_?Object(i.kb)(null==m?void 0:m.id,e).then((function(e){X(),u(null),G(!1)})).catch((function(e){var t,a,n;return U(null==e||null===(t=e.response)||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.error)||void 0===n?void 0:n.details)})):Object(i.fb)(null==m?void 0:m.id,e).then((function(e){X(),u(null),G(!1)})).catch((function(e){var t,a,n;return U(null==e||null===(t=e.response)||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.error)||void 0===n?void 0:n.details)})):e&&Object(i.a)(e).then((function(e){X(),u(null),G(!1)})).catch((function(e){var t,a,n,l,c,r;console.log(null==e||null===(t=e.response)||void 0===t||null===(a=t.data)||void 0===a||null===(n=a.error)||void 0===n?void 0:n.details),U(null==e||null===(l=e.response)||void 0===l||null===(c=l.data)||void 0===c||null===(r=c.error)||void 0===r?void 0:r.details)}))},isOpenDevice:B,onClose:function(){u(null),G(!1),U(null)},errors:T}))}},710:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),c=a(403);t.default=function(){return l.a.createElement(c.a,{collapse:!0})}}}]);