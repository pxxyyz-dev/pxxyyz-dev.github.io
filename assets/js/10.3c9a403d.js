(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{737:function(t,n,e){},781:function(t,n,e){"use strict";e(737)},789:function(t,n,e){"use strict";e.r(n);var s={data:function(){return{current:0,steps:[{title:"First",content:"First-content"},{title:"Second",content:"Second-content"},{title:"Last",content:"Last-content"}]}},methods:{next:function(){this.current++},prev:function(){this.current--}}},c=(e(781),e(71)),r=Object(c.a)(s,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("a-steps",{attrs:{current:t.current}},t._l(t.steps,(function(t){return e("a-step",{key:t.title,attrs:{title:t.title}})})),1),t._v(" "),e("div",{staticClass:"steps-content"},[t._v("\n    "+t._s(t.steps[t.current].content)+"\n  ")]),t._v(" "),e("div",{staticClass:"steps-action"},[t.current<t.steps.length-1?e("a-button",{attrs:{type:"primary"},on:{click:t.next}},[t._v("\n      Next\n    ")]):t._e(),t._v(" "),t.current==t.steps.length-1?e("a-button",{attrs:{type:"primary"},on:{click:function(n){return t.$message.success("Processing complete!")}}},[t._v("\n      Done\n    ")]):t._e(),t._v(" "),t.current>0?e("a-button",{staticStyle:{"margin-left":"8px"},on:{click:t.prev}},[t._v("\n      Previous\n    ")]):t._e()],1)],1)}),[],!1,null,"4e4a7b40",null);n.default=r.exports}}]);