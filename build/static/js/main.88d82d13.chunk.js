(this["webpackJsonpcloud-doc"]=this["webpackJsonpcloud-doc"]||[]).push([[0],{23:function(e,t,n){e.exports=n(56)},28:function(e,t,n){},29:function(e,t,n){},38:function(e,t,n){},50:function(e,t){},55:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),c=n(19),o=n.n(c),r=(n(28),n(14)),l=n(13),u=n(12),s=n(8),d=n(3),f=n(2),m=(n(29),n(30),n(5)),b=n(6),p=function(e){var t=Object(a.useState)(!1),n=Object(f.a)(t,2),i=n[0],c=n[1],o=function(t){t.keyCode===e&&c(!1)},r=function(t){t.keyCode===e&&c(!0)};return Object(a.useEffect)((function(){return document.addEventListener("keyup",o),document.addEventListener("keydown",r),function(){document.removeEventListener("keyup",o),document.removeEventListener("keydown",r)}}),[]),i},v=window.require("electron").ipcRenderer,E=function(e){Object(a.useEffect)((function(){return Object.keys(e).forEach((function(t){v.on(t,e[t])})),function(){Object.keys(e).forEach((function(t){v.removeListener(t,e[t])}))}}))},g=function(e){var t=e.title,n=e.onFileSearch,c=Object(a.useState)(!1),o=Object(f.a)(c,2),r=o[0],l=o[1],u=Object(a.useState)(""),s=Object(f.a)(u,2),d=s[0],v=s[1],g=p(13),w=p(27),j=Object(a.useRef)(null),O=function(){l(!1),v(""),n("")};return Object(a.useEffect)((function(){g&&r&&n(d),w&&r&&O()})),Object(a.useEffect)((function(){r&&j.current.focus()}),[r]),E({"search-file":l}),i.a.createElement("div",{className:"alert alert-primary d-flex justify-content-between align-items-center mb-0"},!r&&i.a.createElement(i.a.Fragment,null,i.a.createElement("span",null,t),i.a.createElement("button",{type:"button",className:"icon-button",onClick:function(){l(!0)}},i.a.createElement(m.a,{title:"\u641c\u7d22",size:"lg",icon:b.d}))),r&&i.a.createElement(i.a.Fragment,null,i.a.createElement("input",{className:"form-control",value:d,ref:j,onChange:function(e){v(e.target.value)}}),i.a.createElement("button",{type:"button",className:"icon-button",onClick:O},i.a.createElement(m.a,{title:"\u5173\u95ed",size:"lg",icon:b.e}))))};g.defaultProps={title:"\u6211\u7684\u6587\u6863"};var w=g,j=n(20),O=n(7),y=n.n(O),h=window.require("electron").remote,k=h.Menu,N=h.MenuItem,C=function(e,t,n){var i=Object(a.useRef)(null);return Object(a.useEffect)((function(){var n=new k;e.forEach((function(e){n.append(new N(e))}));var a=function(e){document.querySelector(t).contains(e.target)&&(i.current=e.target,n.popup({window:h.getCurrentWindow()}))};return window.addEventListener("contextmenu",a),function(){window.removeEventListener("contextmenu",a)}}),[n]),i},S=function(e){return e.reduce((function(e,t){return e[t.id]=t,e}),{})},F=function(e){return Object.keys(e).map((function(t){return e[t]}))},x=function(e,t){for(var n=e;null!==n;){if(n.classList.contains(t))return n;n=n.parentNode}return!1},L=function(e){var t=new Date(e);return t.toLocaleDateString()+" "+t.toLocaleTimeString()},A=function(e){var t=e.files,n=e.onFileClick,c=e.onSaveEdit,o=e.onFileDelete,r=Object(a.useState)(!1),l=Object(f.a)(r,2),u=l[0],s=l[1],d=Object(a.useState)(""),v=Object(f.a)(d,2),E=v[0],g=v[1],w=p(13),O=p(27),y=function(e){s(!1),g(""),e.isNew&&o(e.id)},h=C([{label:"\u6253\u5f00",click:function(){var e=x(h.current,"file-item");e&&n(e.dataset.id)}},{label:"\u91cd\u547d\u540d",click:function(){var e=x(h.current,"file-item");e&&n(e.dataset.id)}},{label:"\u5220\u9664",click:function(){var e=x(h.current,"file-item");e&&n(e.dataset.id)}}],".file-list",[t]);return Object(a.useEffect)((function(){var e=t.find((function(e){return e.isNew}));e&&(s(e.id),g(e.title))}),[t]),Object(a.useEffect)((function(){var e=t.find((function(e){return e.id===u}));w&&u&&""!==E.trim()&&(c(e.id,E,e.isNew),s(!1),g("")),O&&u&&y(e)})),i.a.createElement("ul",{className:"list-group list-group-flush file-list"},t.map((function(e){return i.a.createElement("li",{className:"list-group-item bg-light row d-flex align-items-center file-item mx-0",key:e.id,"data-id":e.id,"data-title":e.title},(e.id===u||e.isNew)&&i.a.createElement(i.a.Fragment,null,i.a.createElement("input",{className:"form-control col-10",value:E,placeholder:"\u8bf7\u8f93\u5165\u6587\u4ef6\u540d\u79f0",onChange:function(e){g(e.target.value)}}),i.a.createElement("button",{type:"button",className:"icon-button col-2",onClick:function(){y(e)}},i.a.createElement(m.a,{title:"\u5173\u95ed",size:"lg",icon:b.e}))),e.id!==u&&!e.isNew&&i.a.createElement(i.a.Fragment,null,i.a.createElement("span",{className:"col-2"},i.a.createElement(m.a,{size:"lg",icon:j.a})),i.a.createElement("span",{className:"col-6 c-link",onClick:function(){n(e.id)}},e.title),i.a.createElement("button",{type:"button",className:"btn btn-primary col-2",onClick:function(){s(e.id),g(e.title)}},i.a.createElement(m.a,{title:"\u7f16\u8f91",size:"lg",icon:b.a})),i.a.createElement("button",{type:"button",className:"btn btn-primary col-2",onClick:function(){o(e.id)}},i.a.createElement(m.a,{title:"\u5220\u9664",size:"lg",icon:b.f}))))})))};A.prototypes={files:y.a.array,onFileClick:y.a.func,onFileDelete:y.a.func,onSaveEdit:y.a.func};var D=A,T=function(e){var t=e.text,n=e.colorClass,a=e.icon,c=e.onBtnClick;return i.a.createElement("button",{type:"button",className:"btn btn-block no-border ".concat(n),onClick:c},i.a.createElement(m.a,{className:"mr-2",size:"lg",icon:a}),t)};T.protoTypes={text:y.a.string,colorClass:y.a.string,icon:y.a.element.isRequired,onBtnClick:y.a.func},T.protoTypes={test:"\u65b0\u5efa"};var q=T,z=n(21),B=n.n(z),I=(n(38),function(e){var t=e.files,n=e.activeId,a=e.unsaveIds,c=e.onTabClick,o=e.onCloseTab;return i.a.createElement("ul",{className:"nav nav-pills tablist-component"},t.map((function(e){var t=a.includes(e.id),r=B()({"nav-link":!0,active:e.id===n,withUnsaved:t});return i.a.createElement("li",{className:"nav-item",key:e.id},i.a.createElement("a",{href:"#",className:r,onClick:function(t){t.preventDefault(),c(e.id)}},e.title,i.a.createElement("span",{className:"ml-2 close-icon",onClick:function(t){t.stopPropagation(),o(e.id)}},i.a.createElement(m.a,{icon:b.e})),t&&i.a.createElement("span",{className:"rounded-circle ml-2 unsaved-icon"})))})))});I.defaultProps={unsaveIds:[]};var R=I,M=n(22),P=n.n(M),W=(n(52),n(11)),J=n.n(W),K=window.require("fs").promises,H={readFile:function(e){return K.readFile(e,{encoding:"utf8"})},writeFile:function(e,t){return K.writeFile(e,t)},renameFile:function(e,t){return K.rename(e,t)},deleteFile:function(e){return K.unlink(e)}},U=(n(55),function(e){var t=e.text,n=void 0===t?"\u5904\u7406\u4e2d":t;return i.a.createElement("div",{className:"loading-component text-center"},i.a.createElement("div",{className:"spinner-grow text-primary",role:"status"},i.a.createElement("span",{className:"sr-only"},n)),i.a.createElement("h5",{className:"text-primary"},n))}),$=window.require("path"),G=$.join,Q=$.basename,V=$.extname,X=$.dirname,Y=window.require("electron"),Z=Y.remote,_=Y.ipcRenderer,ee=window.require("electron-store"),te=new ee({name:"Files Data"}),ne=new ee({name:"Settings"}),ae=function(){return["accessKey","secretKey","bucketName","enableAutoSync"].every((function(e){return!!ne.get(e)}))},ie=function(e){var t=F(e).reduce((function(e,t){var n=t.id,a=t.path,i=t.title,c=t.createdAt,o=t.isSynced,r=t.updateAt;return e[n]={id:n,path:a,title:i,createdAt:c,isSynced:o,updateAt:r},e}),{});te.set("files",t)};var ce=function(){var e=Object(a.useState)(te.get("files")||{}),t=Object(f.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),m=Object(f.a)(o,2),p=m[0],v=m[1],g=Object(a.useState)([]),j=Object(f.a)(g,2),O=j[0],y=j[1],h=Object(a.useState)([]),k=Object(f.a)(h,2),N=k[0],C=k[1],x=Object(a.useState)([]),A=Object(f.a)(x,2),T=A[0],z=A[1],B=Object(a.useState)(!1),I=Object(f.a)(B,2),M=I[0],W=I[1],K=F(n),$=ne.get("fileLocation")||Z.app.getPath("documents"),Y=O.map((function(e){return n[e]})),ee=T.length>0?T:K,ce=n[p],oe=function(e){var t=O.filter((function(t){return t!==e}));y(t),t.length>0?v(t[0]):v("")},re=function(){var e=J()(),t={id:e,title:"",body:"##\u8bf7\u8f93\u5165\u5185\u5bb9",createAt:(new Date).getTime(),isNew:!0};c(Object(d.a)({},n,Object(s.a)({},e,t)))},le=function(){Z.dialog.showOpenDialog({title:"\u9009\u62e9\u5bfc\u5165\u7684\u6587\u4ef6",properties:["openFile","multiSelections"],filters:[{name:"Markdown files",extensions:["md"]}]},(function(e){if(Array.isArray(e)){var t=e.filter((function(e){return!Object.values(n).find((function(t){return t.path===e}))})).map((function(e){return{id:J()(),title:Q(e,V(e)),path:e}})),a=Object(d.a)({},n,{},S(t));c(a),ie(a),t.length>0&&Z.dialog.showMessageBox({type:"info",title:"\u6210\u529f\u5bfc\u5165\u4e86".concat(t.length,"\u4e2a\u6587\u4ef6"),message:"\u6210\u529f\u5bfc\u5165\u4e86".concat(t.length,"\u4e2a\u6587\u4ef6")})}}))};return E({"create-new-file":re,"import-file":le,"save-edit-file":function(){if(ce){var e=ce.path,t=ce.body,n=ce.title;H.writeFile(e,t).then((function(){C(N.filter((function(e){return e!==ce.id}))),ae()&&_.send("upload-file",{key:"".concat(n,".md"),path:e})}))}},"active-file-uploaded":function(){var e=ce.id,t=Object(d.a)({},n[e],{isSynced:!0,updateAt:(new Date).getTime()}),a=Object(d.a)({},n,Object(s.a)({},e,t));c(a),ie(a)},"file-downloaded":function(e,t){var a=n[t.id],i=a.id,o=a.path;H.readFile(o).then((function(e){var a;a="download-success"===t.status?Object(d.a)({},n[i],{body:e,isLoaded:!0,isSynced:!0,updateAt:(new Date).getTime()}):Object(d.a)({},n[i],{body:e,isLoaded:!0});var o=Object(d.a)({},n,Object(s.a)({},i,a));c(o),ie(o)}))},"files-uploaded":function(){var e=F(n).reduce((function(e,t){var a=(new Date).getTime();return e[t.id]=Object(d.a)({},n[t.id],{isSynced:!0,updateAt:a}),e}),{});c(e),ie(e)},"loading-status":function(e,t){W(t)}}),i.a.createElement("div",{className:"App container-fluid px-0"},M&&i.a.createElement(U,null),i.a.createElement("div",{className:"row no-gutters"},i.a.createElement("div",{className:"col-3 bg-light left-panel"},i.a.createElement(w,{onFileSearch:function(e){var t=K.filter((function(t){return t.title.includes(e)}));z(t)}}),i.a.createElement(D,{files:ee,onFileClick:function(e){v(e);var t=n[e],a=t.id,i=t.title,o=t.path;t.isLoaded;t.isLoaded||(ae()?_.send("download-file",{key:"".concat(i,".md"),path:o,id:a}):H.readFile(t.path).then((function(t){var a=Object(d.a)({},n[e],{body:t,isLoaded:!0});c(Object(d.a)({},n,Object(s.a)({},e,a)))}))),O.includes(e)||y([].concat(Object(u.a)(O),[e]))},onFileDelete:function(e){if(n[e].isNew){n[e];var t=Object(r.a)(n,[e].map(l.a));c(t)}else H.deleteFile(n[e].path).then((function(){n[e];var t=Object(r.a)(n,[e].map(l.a));c(t),ie(t),oe(e)}))},onSaveEdit:function(e,t,a){var i=G(a?$:X(n[e].path),"".concat(t,".md")),o=Object(d.a)({},n[e],{title:t,isNew:!1,path:i}),r=Object(d.a)({},n,Object(s.a)({},e,o));if(a)H.writeFile(i,n[e].body).then((function(){c(r),ie(r)}));else{var l=n[e].path;H.renameFile(l,i).then((function(){c(r),ie(r)}))}}}),i.a.createElement("div",{className:"row no-gutters button-group"},i.a.createElement("div",{className:"col"},i.a.createElement(q,{text:"\u65b0\u5efa",colorClass:"btn-primary",icon:b.c,onBtnClick:re})),i.a.createElement("div",{className:"col"},i.a.createElement(q,{text:"\u5bfc\u5165",colorClass:"btn-success",icon:b.b,onBtnClick:le})))),i.a.createElement("div",{className:"col-9 right-panel"},!ce&&i.a.createElement("div",{className:"start-page"},"\u9009\u62e9\u6216\u521b\u5efa\u65b0\u6587\u6863"),ce&&i.a.createElement(i.a.Fragment,null,i.a.createElement(R,{files:Y,activeId:p,unsaveIds:N,onTabClick:function(e){v(e)},onCloseTab:oe}),i.a.createElement(P.a,{key:ce&&ce.id,value:ce&&ce.body,onChange:function(e){!function(e,t){if(t!==n[e].body){var a=Object(d.a)({},n[e],{body:t});c(Object(d.a)({},n,Object(s.a)({},e,a))),N.includes(e)||C([].concat(Object(u.a)(N),[e]))}}(ce.id,e)},options:{minHeight:"515px"}}),ce.isSynced&&i.a.createElement("span",{className:"sync-status"},"\u5df2\u540c\u6b65\uff0c\u4e0a\u6b21\u540c\u6b65",L(ce.updateAt))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(ce,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.88d82d13.chunk.js.map