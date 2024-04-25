(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{412:function(e,t,a){"use strict";var n=a(305),l=a.n(n),c=a(1),r=a.n(c),i=a(307),o=a(17),s=a(311),m=function(e){var t=e.data,a=e.handler,n=(e.isOpenDevice,e.onClose),i=e.onChange,m=e.errorDevice,u=e.errors,d=Object(c.useState)(""),v=l()(d,2),p=v[0],f=v[1],b=Object(c.useState)(""),E=l()(b,2),N=E[0],x=E[1],h=Object(c.useState)(!1),g=l()(h,2),y=g[0],j=g[1];Object(c.useEffect)((function(){t&&(f(t.title),x(t.part_number))}),[t]),Object(c.useEffect)((function(){j(!((""===p||!t)&&t||""===N||"exist"===m))}),[p,N,m]);var k=function(){a(t?{title:p,part_number:N}:{part_number:N})},w=function(){f(""),x(""),n()};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"modal-header"},r.a.createElement("h5",{className:"bold text-dark text-nowrap ".concat(o.isMobile?"text-right":"text-center")},t?"ویرایش اطلاعات دستگاه":"افزودن دستگاه جدید"),o.isMobile&&r.a.createElement("i",{className:"icon icon-24 icon-close",onClick:w})),t&&r.a.createElement("div",{className:"col-lg-12 col-sm-12 ".concat(o.isMobile?"px-0 mt-3":"mt-4 pt-2")},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name",className:"required"},"نام دستگاه"),r.a.createElement("input",{type:"text",id:"title",value:p,onChange:function(e){return f(e.target.value)},className:"form-control pr-3 ".concat(u&&null!=u&&u.title?"border-error":""),placeholder:"نام دستگاه را وارد نمایید."}),u&&null!=u&&u.title?r.a.createElement("p",{className:"error-field"},null==u?void 0:u.title[0]):null)),r.a.createElement("div",{className:"col-lg-12 col-sm-12 pt-2 ".concat(o.isMobile?"px-0 mt-3 pb-3":"mt-4")},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",{htmlFor:"name",className:"required"},"شماره سریال دستگاه"),r.a.createElement("input",{type:"text",id:"name",value:N,onChange:function(e){i(e.target.value),x(e.target.value)},className:"form-control pr-3 ".concat(t?"disabled":""," ").concat(u&&null!=u&&u.part_number?"border-error":""),placeholder:"بعنوان مثال VT#341"}),u&&null!=u&&u.non_field_errors?r.a.createElement("p",{className:"error-field"},null==u?void 0:u.non_field_errors[0]):null,"exist"===m?r.a.createElement("p",{className:"error-field danger-text"},"این شماره سریال قبلا ثبت شده است."):"notFound"===m?r.a.createElement("p",{className:"error-field danger-text"},"شماره سریال وارد شده وجود ندارد."):null)),r.a.createElement("div",{className:"col-12 d-flex justify-content-end ".concat(o.isMobile?"px-0":"mt-5")},r.a.createElement(s.a,{className:"d-flex align-items-center button justify-content-center btn-primary-fill ml-2 px-4 ".concat(o.isMobile?"width-65":""," ").concat(y?"":"disabled"),handler:function(){k()}},r.a.createElement("span",{className:"px-2"},"تایید")),r.a.createElement(s.a,{className:"d-flex align-items-center button justify-content-center btn-primary-outline mr-2 px-4 ".concat(o.isMobile?"width-35":"btn-primary-border"),handler:w},r.a.createElement("span",{className:"px-2"},"لغو"))))},u=a(36),d=a(37),v=a(331),p=a(318),f=a.n(p),b={content:{top:"50%",left:"50%",right:"unset",bottom:"unset"}};f.a.setAppElement("#root");t.a=function(e){var t=e.collapse,a=Object(c.useState)(null),n=l()(a,2),p=n[0],E=n[1],N=Object(c.useState)([]),x=l()(N,2),h=x[0],g=(x[1],Object(c.useState)([])),y=l()(g,2),j=y[0],k=y[1],w=Object(c.useState)([]),O=l()(w,2),C=O[0],M=O[1],_=Object(c.useState)(""),S=l()(_,2),F=S[0],q=S[1],D=Object(c.useState)(""),A=l()(D,2),R=A[0],z=A[1],J=Object(c.useRef)(null),B=Object(c.useState)(!1),G=l()(B,2),I=G[0],L=G[1],T=Object(c.useState)(null),U=l()(T,2),V=U[0],H=U[1],K=Object(c.useState)(""),P=l()(K,2),Q=P[0],W=P[1];Object(c.useEffect)((function(){var e;t&&!o.isMobile?z((null===(e=J.current)||void 0===e?void 0:e.getBoundingClientRect().height)+16):z(0)}),[t]);var X=function(e,t){"sensor"===t?$(e):ee(e)},Y=function(e){console.log(e),Object(v.confirmAlert)({customUI:function(t){var a=t.onClose;return r.a.createElement("div",{className:"card card-box"},r.a.createElement("p",{className:"text-dark text-center ".concat(o.isMobile?"mt-3":"")},"با حذف دستگاه ",null==e?void 0:e.title," اتوماسیون ها، سنسورها، و هشدار های",r.a.createElement("br",null)," مرتبط با این دستگاه نیز حذف خواهند شد، آیا مطمئن هستید؟"),r.a.createElement("div",{className:"d-flex mt-4 justify-content-center"},r.a.createElement("button",{className:"button btn-primary-fill-outline py-2 px-3 col-6 ml-2 btn-primary-border text-primary bold",onClick:function(){var t;t={part_number:e.part_number},Object(i.i)(t).then((function(e){Z()})).catch((function(e){return console.log(e)})),a()}},r.a.createElement("span",{className:"py-1 px-3"},"مطمئنم")),r.a.createElement("button",{className:"button btn-primary-fill py-2 px-4 col-6 mr-2 bold",onClick:a},r.a.createElement("span",{className:"py-1 px-3"},"لغو"))))},overlayClassName:"overlay-custom-confirm-modal"})},Z=function(){Object(i.A)().then((function(e){k(null==e?void 0:e.sensors),M(null==e?void 0:e.actuators)})).catch((function(e){return console.log(e)}))},$=function(e){Object(i.G)(e).then((function(e){E(e),q("sensor"),L(!0)})).catch((function(e){return console.log(e)}))},ee=function(e){Object(i.q)(e).then((function(e){E(e),q("actuator"),L(!0)})).catch((function(e){return console.log(e)}))};Object(c.useEffect)((function(){Z()}),[]);var te=function(){E(null),L(!1),H(null)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mx--15px px-30px mt--15px pt-15px ".concat(o.isMobile?"height-user-custom overflow-auto":"custom-collapse overflow-hidden"),style:o.isMobile?{height:"calc(100vh - 129px)"}:{height:R}},r.a.createElement("section",{className:"".concat(o.isMobile?"row":"px-2"),ref:J},r.a.createElement("div",{className:"device-management-table ".concat(o.isMobile?"col-12":"")},!o.isMobile&&r.a.createElement("div",{className:"row mx-0"},r.a.createElement("div",{className:"col-4 px-2 device-management-table-header"},"نام دستگاه"),r.a.createElement("div",{className:"col px-2 device-management-table-header"},"پارامتر"),r.a.createElement("div",{className:"col px-2 device-management-table-header"},"شماره سریال"),r.a.createElement("div",{className:"col px-2 device-management-table-header"})),!o.isMobile&&(null==j?void 0:j.map((function(e){var t;return r.a.createElement("div",{key:(null==e?void 0:e.id)+204,className:"row font-500 font-size-14 mx-0 device-management-table-body align-items-center"},r.a.createElement("div",{className:"col-4 px-2 text-dark"},null==e?void 0:e.title),r.a.createElement("div",{className:"col px-2"},null==e||null===(t=e.type)||void 0===t?void 0:t.title),r.a.createElement("div",{className:"col px-2"},null==e?void 0:e.part_number),r.a.createElement("div",{className:"col px-2 d-flex align-items-center justify-content-center"},r.a.createElement("i",{className:"icon icon-24 icon-delete ml-2 cursor-pointer",onClick:function(){return Y(e)}}),r.a.createElement("i",{className:"icon icon-24 icon-edit mr-2 cursor-pointer",onClick:function(){return X(e.id,"sensor")}})))}))),!o.isMobile&&(null==C?void 0:C.map((function(e){var t;return r.a.createElement("div",{key:(null==e?void 0:e.id)+105,className:"row font-500 font-size-14 mx-0 device-management-table-body align-items-center"},r.a.createElement("div",{className:"col-4 px-2 text-dark"},null==e?void 0:e.title),r.a.createElement("div",{className:"col px-2"},null==e||null===(t=e.type)||void 0===t?void 0:t.title),r.a.createElement("div",{className:"col px-2"},null==e?void 0:e.part_number),r.a.createElement("div",{className:"col px-2 d-flex align-items-center justify-content-center"},r.a.createElement("i",{className:"icon icon-24 icon-delete ml-2 cursor-pointer",onClick:function(){return Y(e)}}),r.a.createElement("i",{className:"icon icon-24 icon-edit mr-2 cursor-pointer",onClick:function(){return X(e.id,"actuator")}})))}))),o.isMobile&&(null==j?void 0:j.map((function(e){var t;return r.a.createElement("div",{className:"row card mb-12px py-3",key:(null==e?void 0:e.id)+305},r.a.createElement("div",{className:"col-12 d-flex flex-column"},r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("div",{className:"bold"},"نام دستگاه: ",r.a.createElement("span",{className:"text-dark"},e.title)),r.a.createElement("div",{className:"bold"},"پارامتر: ",r.a.createElement("span",{className:"text-dark"},null==e||null===(t=e.type)||void 0===t?void 0:t.title))),r.a.createElement("div",{className:"d-flex justify-content-between mt-3"},r.a.createElement("div",{className:"bold"},"شماره سریال: ",r.a.createElement("span",{className:"text-dark"},e.part_number)),r.a.createElement("div",{className:"d-flex"},r.a.createElement("div",{className:"ml-3 cursor-pointer",key:e.id+101,onClick:function(){return X(e.id,"sensor")},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:u.a,width:20,title:"ویرایش"}))),r.a.createElement("div",{className:"cursor-pointer",key:e.id+102,onClick:function(){return Y(e)},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:d.a,width:20,title:"حذف"})))))))}))),o.isMobile&&(null==C?void 0:C.map((function(e){var t;return r.a.createElement("div",{className:"row card mb-12px py-3",key:(null==e?void 0:e.id)+405},r.a.createElement("div",{className:"col-12 d-flex flex-column"},r.a.createElement("div",{className:"d-flex justify-content-between"},r.a.createElement("div",{className:"bold"},"نام دستگاه: ",r.a.createElement("span",{className:"text-dark"},e.title)),r.a.createElement("div",{className:"bold"},"پارامتر: ",r.a.createElement("span",{className:"text-dark"},null==e||null===(t=e.type)||void 0===t?void 0:t.title))),r.a.createElement("div",{className:"d-flex justify-content-between mt-3"},r.a.createElement("div",{className:"bold"},"شماره سریال: ",r.a.createElement("span",{className:"text-dark"},e.part_number)),r.a.createElement("div",{className:"d-flex"},r.a.createElement("div",{className:"ml-3 cursor-pointer",key:e.id+101,onClick:function(){return X(e.id,"actuator")},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:u.a,width:20,title:"ویرایش"}))),r.a.createElement("div",{className:"cursor-pointer",key:e.id+102,onClick:function(){return Y(e)},target:"_new"},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:d.a,width:20,title:"حذف"})))))))})))),r.a.createElement("div",{className:"".concat(o.isMobile?"":"mt-3")},r.a.createElement(s.a,{className:"button btn-primary-fill p-2 height-auto",handler:function(){return L((function(e){return!e}))}},r.a.createElement("i",{className:"icon icon-24 icon-plus"}))))),r.a.createElement(f.a,{isOpen:I,onRequestClose:te,style:b,contentLabel:"Example Modal",className:"p-3 bg-white"},r.a.createElement(m,{data:p,onChange:function(e){W(h.some((function(t){return t.part_number===e}))?"exist":"")},errorDevice:Q,handler:function(e){p?"sensor"===F?Object(i.kb)(null==p?void 0:p.id,e).then((function(e){Z(),te()})).catch((function(e){var t;return H(null==e||null===(t=e.response)||void 0===t||null===(t=t.data)||void 0===t||null===(t=t.error)||void 0===t?void 0:t.details)})):Object(i.fb)(null==p?void 0:p.id,e).then((function(e){Z(),te()})).catch((function(e){var t;return H(null==e||null===(t=e.response)||void 0===t||null===(t=t.data)||void 0===t||null===(t=t.error)||void 0===t?void 0:t.details)})):e&&Object(i.a)(e).then((function(e){Z(),te()})).catch((function(e){var t,a,n;console.log(null==e||null===(t=e.response)||void 0===t||null===(t=t.data)||void 0===t||null===(t=t.error)||void 0===t?void 0:t.details),H(null==e||null===(a=e.response)||void 0===a||null===(a=a.data)||void 0===a||null===(a=a.error)||void 0===a?void 0:a.details),"یافت نشد."===(null==e||null===(n=e.response)||void 0===n||null===(n=n.data)||void 0===n||null===(n=n.error)||void 0===n||null===(n=n.details)||void 0===n?void 0:n.detail)&&W("notFound")}))},isOpenDevice:I,onClose:te,errors:V})))}},725:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),c=a(412);t.default=function(){return l.a.createElement(c.a,{collapse:!0})}}}]);