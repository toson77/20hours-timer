(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{397:function(t,e,n){"use strict";n(16),n(18),n(25),n(26);var r=n(3),o=(n(6),n(71),n(88),n(30),n(14),n(23),n(57),n(253),n(50),n(254),n(255),n(256),n(257),n(258),n(259),n(260),n(261),n(262),n(263),n(264),n(265),n(266),n(51),n(15),n(182),n(0)),c=n(90),l=n(1);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h=["sm","md","lg","xl"],v=["start","end","center"];function m(t,e){return h.reduce((function(n,r){return n[t+Object(l.q)(r)]=e(),n}),{})}var y=function(t){return[].concat(v,["baseline","stretch"]).includes(t)},O=m("align",(function(){return{type:String,default:null,validator:y}})),w=function(t){return[].concat(v,["space-between","space-around"]).includes(t)},j=m("justify",(function(){return{type:String,default:null,validator:w}})),k=function(t){return[].concat(v,["space-between","space-around","stretch"]).includes(t)},_=m("alignContent",(function(){return{type:String,default:null,validator:k}})),$={align:Object.keys(O),justify:Object.keys(j),alignContent:Object.keys(_)},x={align:"align",justify:"justify",alignContent:"align-content"};function B(t,e,n){var r=x[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var P=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},O),{},{justify:{type:String,default:null,validator:w}},j),{},{alignContent:{type:String,default:null,validator:k}},_),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var d in n)l+=String(n[d]);var f=P.get(l);return f||function(){var t,e;for(e in f=[],$)$[e].forEach((function(t){var r=n[t],o=B(e,t,r);o&&f.push(o)}));f.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),P.set(l,f)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:f}),o)}})},421:function(t,e,n){"use strict";var r=n(3),o=(n(71),n(88),n(186),n(18),n(6),n(15),n(63),n(268),n(14),n(16),n(25),n(26),n(34)),c=n(183),l=n(187);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},n={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=input.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(input._uid)||(n.valid=e(input)))})):n.valid=e(input),n},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:f({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},449:function(t,e,n){"use strict";n.r(e);var r=n(21),o=(n(87),n(14),n(36),n(192)),footer=n(188),c=n(55),l=n.n(c),d={components:{myHeader:o.a,myFooter:footer.a},data:function(){return{appName:"20時間タイマー",email:"",password:""}},computed:{idToken:function(){return this.$store.getters.idToken},uid:function(){return this.$store.getters.uid}},methods:{login:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("login",{email:t.email,password:t.password});case 2:return e.next=4,l.a.get("https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users/".concat(t.uid,"/skills"),{headers:{Authorization:"Bearer ".concat(t.idToken)}}).then((function(e){console.log(e),Object.keys(e.data).length?t.$store.dispatch("actionSetSkills",e.data.documents):t.$store.commit("initSkills"),console.log(t.$store.getters.skills)}));case 4:if(n=t.$store.getters.skills,!Object.keys(n).length){e.next=8;break}return e.next=8,l.a.get("https://firestore.googleapis.com/v1/".concat(n[0].name,"/tasks"),{headers:{Authorization:"Bearer ".concat(t.idToken)}}).then((function(e){console.log(e),Object.keys(e.data).length?t.$store.dispatch("actionSetTasks",e.data.documents):t.$store.commit("initTasks"),console.log(t.$store.getters.tasks)}));case 8:t.$router.push({name:"index"});case 9:case"end":return e.stop()}}),e)})))()}}},f=n(52),h=n(58),v=n.n(h),m=n(384),y=n(388),O=n(403),w=n(386),j=n(385),k=n(421),_=n(397),$=n(448),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[n("my-header"),t._v(" "),n("v-container",{attrs:{fluid:""}},[n("v-row",{attrs:{align:"center",justify:"center"}},[n("v-col",{staticClass:"my-8 text-center",attrs:{cols:"12"}},[n("h1",{staticClass:"text-h5 font-weight-bold"},[t._v("\n          "+t._s(t.appName)+"にログイン\n        ")])]),t._v(" "),n("v-card",{attrs:{flat:"",width:"80%","max-width":"320",color:"transparent"}},[n("v-form",{ref:"form"},[n("v-text-field",{attrs:{label:"メールアドレスを入力",placeholder:"your@email.com",outlined:""},model:{value:t.email,callback:function(e){t.email="string"==typeof e?e.trim():e},expression:"email"}}),t._v(" "),n("v-text-field",{attrs:{label:"パスワードを入力",placeholder:"8文字以上",type:"password",outlined:""},model:{value:t.password,callback:function(e){t.password="string"==typeof e?e.trim():e},expression:"password"}}),t._v(" "),n("v-btn",{staticClass:"white--text",attrs:{block:"",color:"blue"},on:{click:function(e){return t.login()}}},[t._v("\n            ログインする\n          ")]),t._v(" "),n("br")],1)],1)],1)],1),t._v(" "),n("my-footer")],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{VApp:m.a,VBtn:y.a,VCard:O.a,VCol:w.a,VContainer:j.a,VForm:k.a,VRow:_.a,VTextField:$.a})}}]);