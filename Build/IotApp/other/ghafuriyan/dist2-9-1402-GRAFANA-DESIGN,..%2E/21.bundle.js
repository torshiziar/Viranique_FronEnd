(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{726:function(t,n,e){"use strict";e.r(n);var o=e(307),a=e.n(o),c=e(1),u=e.n(c),l=e(17),r=e(596),i=e(4),s=e(309);n.default=function(){var t=Object(c.useState)(null),n=a()(t,2),e=n[0],o=n[1],d=Object(c.useState)(null),f=a()(d,2),v=f[0],b=f[1],h=Object(i.h)(),j=Object(i.g)(),m=h.state,O=m.actuators,w=m.sensors,p=Object(i.i)().id;Object(c.useEffect)((function(){p&&Object(s.X)(p).then((function(t){o(t)})).catch((function(t){return console.log(t)}))}),[]);return u.a.createElement("div",{className:"row ".concat((l.isMobile,""))},u.a.createElement("div",{className:"col-12 overflow-auto height-automation-form-custom"},u.a.createElement(r.a,{onCancel:function(){return j.goBack()},handler:function(t){b(null),e?Object(s.eb)(t,e.id).then((function(){j.goBack(),o(null)})).catch((function(t){var n;return b(null==t||null===(n=t.response)||void 0===n||null===(n=n.data)||void 0===n||null===(n=n.error)||void 0===n?void 0:n.details)})):Object(s.d)(t).then((function(){j.goBack()})).catch((function(t){var n;return b(null==t||null===(n=t.response)||void 0===n||null===(n=n.data)||void 0===n||null===(n=n.error)||void 0===n?void 0:n.details)}))},automationData:e,sensors:w,actuators:O,errors:v})))}}}]);