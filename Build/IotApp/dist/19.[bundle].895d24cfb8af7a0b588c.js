(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{400:function(e,t,a){"use strict";var l=a(11),n=a.n(l),r=a(325),c=a.n(r),o=a(1),i=a.n(o),s=a(332),m=a(21),u=a(403),d=a(404),p=a(14);function b(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function f(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?b(Object(a),!0).forEach((function(t){n()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):b(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}t.a=function(e){var t,a,l,r,b,v,h,x,E,g,O,y,j,N,w,_,P,k,M,F,D,S=e.closeHandler,C=e.data,H=e.submitHandler,q=e.errors,B=Object(p.b)().t,J=Object(o.useState)({name:"",last_name:"",username:"",email:"",phone:"",can_monitor:!0,can_control:!1}),T=c()(J,2),z=T[0],Q=T[1],R=Object(o.useState)({}),Y=c()(R,2),A=Y[0],G=Y[1],I=Object(o.useState)(!1),K=c()(I,2),L=K[0],U=K[1],V=Object(o.useRef)(null),W=function(e){Q(f(f({},z),{},n()({},e.target.name,e.target.value)))};Object(o.useEffect)((function(){""===z.username||!Object(u.a)(z.email)&&""!==z.email&&null!=z&&z.email||!Object(d.b)(z.phone)?U(!1):U(!0)}),[z]),Object(o.useEffect)((function(){C&&Q(C)}),[C]),Object(o.useEffect)((function(){V.current.focus()}),[]);return i.a.createElement(i.a.Fragment,null,!m.isMobile&&i.a.createElement("div",{className:"row justify-content-center modal-header"},i.a.createElement("p",{className:"col-5 text-center bold text-dark"},"".concat(B(C?"text.Edituser":"text.newuser")))),i.a.createElement("div",{className:"row ".concat(m.isMobile?"card pb-4 px-3":"align-items-center")},i.a.createElement("div",{className:"col-lg-6 col-sm-12 ".concat(m.isMobile?"px-0 pb-2 mt-3":"mt-4 pt-2")},i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"name"},B("text.firstname")),i.a.createElement("input",{name:"name",value:z.name,onChange:W,type:"text",id:"name",ref:V,className:"form-control ".concat(q&&null!=q&&null!==(t=q.details)&&void 0!==t&&t.name?"border-error":""),placeholder:B("text.Enteryourname")}),i.a.createElement("i",{className:"icon-22 icon-user d-flex"}),q&&null!=q&&null!==(a=q.details)&&void 0!==a&&a.name?i.a.createElement("p",{className:"error-field"},"max_length"==(null==q||null===(l=q.code)||void 0===l?void 0:l.name[0])?B("text.maximumfieldlengthis24characters"):null==q||null===(r=q.details)||void 0===r?void 0:r.name[0]):null)),i.a.createElement("div",{className:"col-lg-6 col-sm-12  ".concat(m.isMobile?"px-0 pb-2 border-bottom":"mt-4 pt-2")},i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"lastName"},B("text.lastname")),i.a.createElement("input",{name:"last_name",value:z.last_name,onChange:W,type:"text",id:"lastName",className:"form-control ".concat(q&&null!=q&&null!==(b=q.details)&&void 0!==b&&b.last_name?"border-error":""),placeholder:B("text.Enteryourlastname")}),i.a.createElement("i",{className:"icon-22 icon-user d-flex"}),q&&null!=q&&null!==(v=q.details)&&void 0!==v&&v.last_name?i.a.createElement("p",{className:"error-field"},"max_length"==(null==q||null===(h=q.code)||void 0===h?void 0:h.last_name[0])?B("text.maximumfieldlengthis24characters"):null==q||null===(x=q.details)||void 0===x?void 0:x.last_name[0]):null)),i.a.createElement("div",{className:"col-lg-6 col-sm-12 mt-3 ".concat(m.isMobile?"px-0 pb-2":"")},i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"username",className:"required"},B("text.username")),i.a.createElement("input",{name:"username",value:z.username,onChange:W,type:"text",id:"username",className:"form-control ".concat(q&&null!=q&&null!==(E=q.details)&&void 0!==E&&E.username?"border-error":""),placeholder:B("text.EnterEnglish")}),i.a.createElement("i",{className:"icon-22 icon-user d-flex"}),q&&null!=q&&null!==(g=q.details)&&void 0!==g&&g.username?i.a.createElement("p",{className:"error-field"},"null_username"==(null==q||null===(O=q.code)||void 0===O?void 0:O.username[0])?B("text.Thisvaluemustnotbeempty"):"username_exists"==(null==q||null===(y=q.code)||void 0===y?void 0:y.username[0])?B("text.Thisusernamealreadyregistered"):null==q||null===(j=q.details)||void 0===j?void 0:j.username[0]):null)),i.a.createElement("div",{className:"col-lg-6 col-sm-12 ".concat(m.isMobile?"px-0 pb-2":"mt-3")},i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"phone",className:"required"},B("text.mobilenumber")),i.a.createElement("input",{name:"phone",value:z.phone,onBlur:function(){G(f(f({},A),{},{phone:!Object(d.b)(z.phone)}))},onChange:W,type:"tell",id:"phone",className:"form-control ".concat(q&&null!=q&&null!==(N=q.details)&&void 0!==N&&N.phone?"border-error":""," ").concat(null!=A&&A.phone?"border-error":""),placeholder:B("text.Forexample0901")}),i.a.createElement("i",{className:"icon-22 icon-phone d-flex"}),q&&null!=q&&null!==(w=q.details)&&void 0!==w&&w.phone?i.a.createElement("p",{className:"error-field"},"existing_phone_number"==(null==q||null===(_=q.code)||void 0===_?void 0:_.phone[0])?B("text.phonenumberalreadyregisteredthisservice"):null==q||null===(P=q.details)||void 0===P?void 0:P.phone[0]):null)),i.a.createElement("div",{className:"col-lg-6 col-sm-12 ".concat(m.isMobile?"px-0 pb-2":"mt-3")},i.a.createElement("div",{className:"form-group"},i.a.createElement("label",{htmlFor:"email"},B("text.email")),i.a.createElement("input",{name:"email",value:z.email,onBlur:function(){G(f(f({},A),{},{email:""!==z.email&&!Object(u.a)(z.email)}))},onChange:W,type:"email",id:"email",className:"form-control ".concat(q&&null!=q&&null!==(k=q.details)&&void 0!==k&&k.email?"border-error":""," ").concat(null!=A&&A.email?"border-error":""),placeholder:B("text.Forexampleemail")}),i.a.createElement("i",{className:"icon-22 icon-email d-flex"}),q&&null!=q&&null!==(M=q.details)&&void 0!==M&&M.email?i.a.createElement("p",{className:"error-field"},"email_exists"==(null==q||null===(F=q.code)||void 0===F?void 0:F.email[0])?B("text.accountalreadybeenregisteredemailaddress"):null==q||null===(D=q.details)||void 0===D?void 0:D.email[0]):null)),i.a.createElement("div",{className:"col-lg-6 col-sm-12 ".concat(m.isMobile?"px-0 pb-2 mt-2":"mt-4 d-flex align-items-center")},i.a.createElement("label",{htmlFor:"canControl",className:"container-checkbox m-0"},i.a.createElement("input",{type:"checkbox",id:"canControl",checked:z.can_control,name:"can_control",onChange:function(e){return Q(f(f({},z),{},n()({},e.target.name,e.target.checked)))}}),B("text.Doesuserhavepermissionchangeautomation"),i.a.createElement("span",{className:"checkmark"}))),q&&"permission_denied"==(null==q?void 0:q.code)&&i.a.createElement("div",{className:"col-lg-6 col-sm-12 ".concat(m.isMobile?"px-0 pb-2 mt-2":"mt-4 d-flex align-items-center")},i.a.createElement("p",{className:"error-field"},B("text.Youarenotauthorizedexecutecommand")))),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-12 d-flex justify-content-end mt-3 pt-2 ".concat(m.isMobile?"px-0":"")},i.a.createElement(s.a,{className:"mx-3 button btn-primary-fill d-flex align-items-center justify-content-center py-2 px-5 ".concat(m.isMobile?"width-65":""," ").concat(L?"":"disabled"),handler:function(){return H(z)}},i.a.createElement("span",null,B("text.confirm"))),i.a.createElement(s.a,{className:"button btn-primary-outline d-flex align-items-center justify-content-center py-2 px-5 ".concat(m.isMobile?"width-35":""),handler:S},i.a.createElement("span",null,B("text.cancel"))))))}},641:function(e,a,l){"use strict";l.r(a);var n=l(11),r=l.n(n),c=l(325),o=l.n(c),i=l(1),s=l.n(i),m=l(4),u=l(328),d=l(400);function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){r()(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.default=function(){var e=Object(i.useState)(null),a=o()(e,2),l=a[0],n=a[1],r=Object(i.useState)(null),c=o()(r,2),p=c[0],f=c[1],v=Object(m.i)().id;Object(i.useEffect)((function(){v&&Object(u.Q)(v).then((function(e){n(b(b({},e),{},{id:v}))})).catch((function(e){console.log(e,"err")}))}),[]);return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"border border-danger overflow-auto height-user-custom mx--15px px-30px mt--15px pt-15px"},s.a.createElement(d.a,{closeHandler:function(){history.back(),n(null)},submitHandler:function(e){f(null),l?Object(u.pb)(e,l.id).then((function(e){alert.show("".concat(t("text.Editedsuccessfully")),{type:"success"}),n(null),history.back()})).catch((function(e){var t;f(null===(t=e.response)||void 0===t||null===(t=t.data)||void 0===t?void 0:t.error)})):Object(u.cb)(e).then((function(e){alert.show("".concat(t("text.Newuseraddedsuccessfully")),{type:"success"}),history.back()})).catch((function(e){var t;f(null===(t=e.response)||void 0===t||null===(t=t.data)||void 0===t?void 0:t.error)}))},data:l,errors:p})))}}}]);