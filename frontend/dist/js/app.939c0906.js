(function(t){function e(e){for(var s,i,c=e[0],r=e[1],l=e[2],d=0,p=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&p.push(n[i][0]),n[i]=0;for(s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,c=1;c<a.length;c++){var r=a[c];0!==n[r]&&(s=!1)}s&&(o.splice(e--,1),t=i(i.s=a[0]))}return t}var s={},n={app:0},o=[];function i(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=s,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=r;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"034f":function(t,e,a){"use strict";var s=a("85ec"),n=a.n(s);n.a},"060c":function(t,e,a){},"1a36":function(t,e,a){},3950:function(t,e,a){},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=o(t);return a(e)}function o(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=o,t.exports=n,n.id="4678"},"48f1":function(t,e,a){"use strict";var s=a("060c"),n=a.n(s);n.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container-fluid",attrs:{id:"app"}},[a("vue-headful",{attrs:{title:t.t("COVID-19 PANDEMIC"),description:t.t("View and compare covid-19 cases and deaths in the world in an easy and practical way"),keywords:"covid 19 covid-19 coronavirus last updates últimas noticias ultimas cases deaths day casos mortes dia casos muertes diurnas",lang:t.lang,url:"covidlast.com"}}),a("loading",{attrs:{active:t.isLoading,"can-cancel":!0,"is-full-page":t.fullPage,opacity:.7,"z-index":9,loader:"bars"},on:{"update:active":function(e){t.isLoading=e}}}),t.showModalLang?a("modal-language",{attrs:{lang:t.lang,modal:t.showModalLang,update:t.update},on:{close:function(e){t.showModalLang=!1},"update:lang":function(e){t.lang=e},"update:modal":function(e){t.showModalLang=e},"update:update":function(e){t.update=e}}}):t._e(),a("header",[a("h1",{staticClass:"title-page-text"},[t._v(t._s(t.t("COVID-19 PANDEMIC")))]),a("div",{staticClass:"d-sm-block d-md-none"},[a("button",{staticClass:"btn btn-light choose-lang-mobile",on:{click:function(e){t.showModalLang=!0}}},[a("b-icon-arrow-up-down"),a("span")],1)])]),a("section",{directives:[{name:"show",rawName:"v-show",value:!t.showModalLang,expression:"!showModalLang"}]},[a("div",{staticClass:"row"},[t.meta?a("div",{staticClass:"col"},[a("ChartsFilter",{attrs:{countriesList:t.countriesList,options:t.countriesList,countriesSelected:t.countriesSelected,date:t.meta.date,forceUpdate:!t.showModalLang,lang:t.lang,modal:t.showModalLang},on:{"update:countriesSelected":function(e){t.countriesSelected=e},"update:countries-selected":function(e){t.countriesSelected=e},"update:modal":function(e){t.showModalLang=e}}})],1):t._e()]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-12 col-sm-12 col-md-6"},[a("ChartCasesPopulation",{attrs:{countriesSelected:t.countriesDataChart,forceUpdate:!t.showModalLang}})],1),a("div",{staticClass:"col-12 col-sm-12 col-md-6"},[a("ChartCasesPopulationPercentage",{attrs:{countriesSelected:t.countriesDataChart,forceUpdate:!t.showModalLang}})],1),a("div",{staticClass:"col-12 col-sm-12 col-md-6"},[a("ChartDeathsPopulation",{attrs:{countriesSelected:t.countriesDataChart,forceUpdate:!t.showModalLang}})],1),a("div",{staticClass:"col-12 col-sm-12 col-md-6"},[a("ChartDeathsPopulationPercentage",{attrs:{countriesSelected:t.countriesDataChart,forceUpdate:!t.showModalLang}})],1)])]),a("footer",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 left"},[a("p",[t._v(t._s(t.t("This is a open source project")))]),a("p",[t._v(t._s(t.t("Data source"))+": "),a("a",{attrs:{href:"https://www.worldometers.info/coronavirus/?from=covidlast.com",target:"_blank"}},[t._v("worldometers.info/coronavirus")])]),a("p",[t._v(t._s(t.t("Source code"))+": "),a("a",{attrs:{href:"https://github.com/00F100/covid-chart",target:"_blank"}},[t._v("github.com/00F100/covid-chart")])])]),a("div",{staticClass:"col-md-6 right"},[a("p",[t._v("covidlast.com"),a("br"),t._v(t._s(t.currentYear))])])])])],1)},o=[],i=(a("99af"),a("7db0"),a("d81d"),a("a434"),a("b0c0"),a("b680"),a("9062")),c=a.n(i),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"select-to-compare-text"},[a("label",[t._v(t._s(t.t("Select the countries to compare")))])])]),a("div",{staticClass:"col-md-10"},[a("multiselect",{attrs:{options:t.countriesList,label:"name","track-by":"id",multiple:!0,searchable:!0,placeholder:""},scopedSlots:t._u([{key:"selection",fn:function(e){return[a("div",{directives:[{name:"show",rawName:"v-show",value:e.values.length>0,expression:"props.values.length > 0"}],staticClass:"multiselect__tags-wrap"},[t._l(e.values,(function(s,n){return[t._t("tag",[a("span",{key:n,staticClass:"multiselect__tag"},[a("span",{staticClass:"multiselect__tag_custom",style:"background-color:"+t.torgb(s.color,"0.25")+"; color: "+s.font,domProps:{textContent:t._s(s.name)}}),a("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keypress:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:(a.preventDefault(),e.remove(s))},mousedown:function(t){return t.preventDefault(),e.remove(s)}}})])],{option:s,search:e.search,remove:e.remove})]}))],2)]}}],null,!0),model:{value:t.selected,callback:function(e){t.selected=e},expression:"selected"}})],1),a("div",{staticClass:"col-md-2 d-none d-md-block"},[a("button",{staticClass:"btn btn-light choose-lang",on:{click:t.openModal}},[a("b-icon-arrow-up-down"),a("span",[t._v(t._s(t.t(t.lang)))])],1)]),a("div",{staticClass:"col-md-12"},[a("small",{staticClass:"last-update-text"},[t._v(t._s(t.t("Last update"))+", "+t._s(t.currentDate))])])])},l=[],u=(a("a9e3"),a("d3b7"),a("ac1f"),a("25f0"),a("466d"),a("5319"),a("8e5f")),d=a.n(u),p=a("c1df"),h=a.n(p),f=a("ab14"),m=a.n(f),g={name:"ChartsFilter",props:{countriesList:Array,countriesSelected:Array,forceUpdate:Boolean,date:Number,lang:String,modal:Boolean},mounted:function(){this.selected=this.countriesSelected,this.lastUpdated=h()(1e3*this.date).utc().format(this.$translate.text("MM/DD/YYYY HH:mm:ss Z")),this.currentDate=this.getDateClient(1e3*this.date),this.currentDateTimezoneLabel=this.getLabelTimezone()},methods:{torgb:function(t,e){return m()(t,e)},getLabelTimezone:function(){var t=this.getTimezone().match(/(\(.*\))/g);return t[0].replace(/\(|\)/g,"")},getDateClient:function(t){var e=this.getTimezone().match(/([+|-][0-9]{4})/g);return h()(t).utcOffset(e[0]).format(this.$translate.text("MM/DD/YYYY HH:mm:ss Z"))},getTimezone:function(){return(new Date).toString().match(/([A-Z]+[\\+-][0-9]+.*)/)[1]},openModal:function(){this.$emit("update:modal",!0)}},watch:{selected:function(){var t=[];this.selected.map((function(e){t.push({id:e.id,name:e.name})})),this.$emit("update:countriesSelected",t)},forceUpdate:function(){var t=this;if(this.forceUpdate){var e=[];this.selected.length>0&&this.selected.map((function(a){e.push(t.countriesList.find((function(t){return t.id===a.id})))})),this.selected=e}}},data:function(){return{selected:[],lastUpdated:null,currentDate:null,currentDateTimezoneLabel:null}},components:{Multiselect:d.a},locales:{en:{"Select the countries to compare":"Select the countries to compare","Last update":"Last update","MM/DD/YYYY HH:mm:ss Z":"MM/DD/YYYY HH:mm:ss Z",en:"English"},pt:{"Select the countries to compare":"Selecione os países para comparar","Last update":"Última atualização","MM/DD/YYYY HH:mm:ss Z":"DD/MM/YYYY HH:mm:ss Z",pt:"Português"},es:{"Select the countries to compare":"Seleccione los países para comparar","Last update":"Última actualización","MM/DD/YYYY HH:mm:ss Z":"DD/MM/YYYY HH:mm:ss Z",es:"Español"}}},b=g,j=(a("60bc"),a("b3df"),a("2877")),v=Object(j["a"])(b,r,l,!1,null,null,null),C=v.exports,D=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},y=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{attrs:{id:"chart-population"}})])])}],P={name:"ChartCasesPopulation",props:{countriesSelected:Object,forceUpdate:Boolean},mounted:function(){this.update()},watch:{"countriesSelected.populationCases":function(){this.update()},forceUpdate:function(){this.forceUpdate&&this.update()}},methods:{update:function(){this.$chart.generate("chart-population",this.countriesSelected.populationCases,this.$translate.text("Total cases by day"),this.$translate.text("Number of cases"))}},locales:{en:{"Total cases by day":"Total cases by day","Number of cases":"Number of cases"},pt:{"Total cases by day":"Total de casos por dia","Number of cases":"Número de casos"},es:{"Total cases by day":"Total de casos por día","Number of cases":"Numero de casos"}}},_=P,w=Object(j["a"])(_,D,y,!1,null,null,null),S=w.exports,M=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},k=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{attrs:{id:"chart-deaths-population"}})])])}],Y={name:"ChartDeathsPopulation",props:{countriesSelected:Object,forceUpdate:Boolean},mounted:function(){this.update()},watch:{"countriesSelected.populationDeaths":function(){this.update()},forceUpdate:function(){this.forceUpdate&&this.update()}},methods:{update:function(){this.$chart.generate("chart-deaths-population",this.countriesSelected.populationDeaths,this.$translate.text("Total deaths by day"),this.$translate.text("Number of deaths"))}},locales:{en:{"Total deaths by day":"Total deaths by day","Number of deaths":"Number of deaths"},pt:{"Total deaths by day":"Total de mortes por dia","Number of deaths":"Número de mortes"},es:{"Total deaths by day":"Total de muertes por día","Number of deaths":"Número de muertes"}}},A=Y,T=Object(j["a"])(A,M,k,!1,null,null,null),I=T.exports,E=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},O=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{attrs:{id:"chart-deaths-population-percentage"}})])])}],x={name:"ChartDeathsPopulationPercentage",props:{countriesSelected:Object,forceUpdate:Boolean},mounted:function(){this.update()},watch:{"countriesSelected.populationPercentageDeaths":function(){this.update()},forceUpdate:function(){this.forceUpdate&&this.update()}},methods:{update:function(){this.$chart.generate("chart-deaths-population-percentage",this.countriesSelected.populationPercentageDeaths,this.$translate.text("Total deaths by percentage population"),this.$translate.text("Percentage of population"))}},locales:{en:{"Total deaths by percentage population":"Total deaths by percentage population","Percentage of population":"Percentage of population"},pt:{"Total deaths by percentage population":"Total de mortes por porcentagem da população","Percentage of population":"Porcentagem da população"},es:{"Total deaths by percentage population":"Total de muertes por porcentaje de población","Percentage of deaths":"Porcentaje de poblacion"}}},L=x,$=Object(j["a"])(L,E,O,!1,null,null,null),U=$.exports,N=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},z=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{attrs:{id:"chart-population-percentage"}})])])}],B={name:"ChartCasesPopulationPercentage",props:{countriesSelected:Object,forceUpdate:Boolean},mounted:function(){this.update()},watch:{"countriesSelected.populationPercentageCases":function(){this.update()},forceUpdate:function(){this.forceUpdate&&this.update()}},methods:{update:function(){this.$chart.generate("chart-population-percentage",this.countriesSelected.populationPercentageCases,this.$translate.text("Total cases by percentage population"),this.$translate.text("Percentage of population"))}},locales:{en:{"Total cases by percentage population":"Total cases by percentage population","Percentage of population":"Percentage of population"},pt:{"Total cases by percentage population":"Total de casos por porcentagem da população","Percentage of population":"Percentagem da população"},es:{"Total cases by percentage population":"Total de casos por porcentaje de población","Percentage of population":"Porcentaje de poblacion"}}},V=B,H=Object(j["a"])(V,N,z,!1,null,null,null),F=H.exports,R=(a("e40d"),a("bc3a")),Z=a.n(R),G=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("transition",{attrs:{name:"modal"}},[a("div",{staticClass:"modal-mask"},[a("div",{staticClass:"modal-wrapper"},[a("div",{staticClass:"modal-container"},[a("div",[t._t("header",[a("h5",[t._v(t._s(t.t("COVID-19 PANDEMIC")))]),a("small",[t._v(t._s(t.t("Select your language")))])]),t._t("body",[a("button",{staticClass:"btn btn-light language",attrs:{type:"button"},on:{click:function(e){return t.change("en")}}},[t._v("English")]),a("button",{staticClass:"btn btn-light language",attrs:{type:"button"},on:{click:function(e){return t.change("pt")}}},[t._v("Português")]),a("button",{staticClass:"btn btn-light language",attrs:{type:"button"},on:{click:function(e){return t.change("es")}}},[t._v("Español")])])],2)])])])])},K=[],q={name:"ModalLanguage",props:{lang:String,modal:Boolean,update:Boolean},methods:{change:function(t){this.$emit("update:lang",t),this.$emit("update:modal",null),this.$emit("update:update",!0)}},locales:{en:{"COVID-19 PANDEMIC":"COVID-19 PANDEMIC","Select your language":"Select your language"},pt:{"COVID-19 PANDEMIC":"COVID-19 PANDEMIA","Select your language":"Selecione seu idioma"},es:{"COVID-19 PANDEMIC":"COVID-19 PANDEMIA","Select your language":"Elige tu idioma"}}},Q=q,J=(a("48f1"),Object(j["a"])(Q,G,K,!1,null,null,null)),W=J.exports,X=Object({NODE_ENV:"production",VUE_APP_API_HOST:"covidlast.com",VUE_APP_API_PORT:"3000",VUE_APP_API_SCHEMA:"http",VUE_APP_FRONTEND_GOOGLE_ANALYTICS_TAG:"UA-166792858-1",BASE_URL:"/"}),tt=X.VUE_APP_API_SCHEMA,et=X.VUE_APP_API_HOST,at=X.VUE_APP_API_PORT,st={name:"App",watch:{update:function(){!0===this.update&&(this.update=!1,this.getDataApi())},countriesSelected:function(){this.updateCases(),this.$ga.event("selectedCountries","change","countries",this.countriesSelected)},lang:function(){this.$translate.setLang(this.lang),this.$cookie.set("lang",this.lang),this.$ga.event("language","change","lang",this.lang),this.updateDataCountry()}},updated:function(){this.processLanguage()},methods:{getDataApi:function(){var t=this;Z.a.get("".concat(tt,"://").concat(et,":").concat(at,"/cases")).then((function(e){e.data.data&&e.data.data?(t.countriesData=e.data.data,t.meta=e.data.meta,t.updateDataCountry()):t.$popup.error("Response has empty")})).catch((function(e){t.$popup.error(e.message)}))},processLanguage:function(){this.haveCookie=!0,this.lang=this.$cookie.get("lang"),this.lang||(this.haveCookie=!1,this.lang="en",this.$cookie.set("lang",this.lang)),this.haveCookie||(this.showModalLang=!0),this.$translate.setLang(this.lang)},updateCases:function(){this.mountData("populationCases"),this.mountData("populationDeaths"),this.mountData("populationActive"),this.mountData("populationPercentageCases"),this.mountData("populationPercentageDeaths"),this.mountData("populationPercentageActive")},mountData:function(t){var e=this,a=[];this.countriesData.map((function(s){e.countriesSelected.map((function(n){if(s.countryId===n.id){var o=e.getSerie(a,n.name,s.countryColor);s.data.map((function(a,n){o.data.push(["".concat(h()(1e3*a.timestamp).utc().format(e.$translate.text("MM/DD/YYYY")),"<br>").concat(e.$translate.text("day")," ").concat(n+1),e.getData(t,a,s.countryPopulation)])}))}}))})),this.updateData(t,a)},getSerie:function(t,e,a){return t.find((function(t){return t.name==e}))||t.push({name:e,color:a,data:[]}),t.find((function(t){return t.name==e}))},getData:function(t,e,a){return"populationCases"===t?e.cases:"populationDeaths"===t?e.deaths:"populationActive"===t?e.active:"populationPercentageCases"===t?+(100*e.cases/a).toFixed(5):"populationPercentageDeaths"===t?+(100*e.deaths/a).toFixed(5):"populationPercentageActive"===t?+(100*e.active/a).toFixed(5):void 0},updateData:function(t,e){"populationCases"===t&&(this.countriesDataChart.populationCases=e),"populationDeaths"===t&&(this.countriesDataChart.populationDeaths=e),"populationActive"===t&&(this.countriesDataChart.populationActive=e),"populationPercentageCases"===t&&(this.countriesDataChart.populationPercentageCases=e),"populationPercentageDeaths"===t&&(this.countriesDataChart.populationPercentageDeaths=e),"populationPercentageActive"===t&&(this.countriesDataChart.populationPercentageActive=e)},updateDataCountry:function(){var t=this;this.countriesList=[],this.countriesData.map((function(e){t.countriesList.push({id:e.countryId,cases:e.data[e.data.length-1].cases,name:t.$translate.text(e.countryName),color:e.countryColor,font:"#FFF"})})),this.isLoading=!1,this.updateCases(),this.setDefaultValues()},setDefaultValues:function(){var t=[];this.countriesList.map((function(e){t.push(e)})),t.sort((function(t,e){return t.cases<e.cases?1:-1})),t.splice(5,t.length),this.countriesSelected=t}},mounted:function(){this.$ga.page("/")},data:function(){return{currentYear:h()().format("YYYY"),meta:null,isLoading:!0,fullPage:!0,showModalLang:null,lang:null,haveCookie:null,waitUpdate:!1,update:!1,countriesSelected:[],countriesList:[],countriesData:[],countriesDataChart:{populationCases:[],populationDeaths:[],populationActive:[],populationPercentageCases:[],populationPercentageDeaths:[],populationPercentageActive:[]}}},components:{Loading:c.a,ChartsFilter:C,ChartCasesPopulation:S,ChartCasesPopulationPercentage:F,ChartDeathsPopulation:I,ChartDeathsPopulationPercentage:U,ModalLanguage:W},locales:{en:{"COVID-19 PANDEMIC":"COVID-19 PANDEMIC",day:"day","MM/DD/YYYY":"MM/DD/YYYY","This is a open source project":"This is a open source project","Data source":"Data source","Source code":"Source code",Belgium:"Belgium",Brazil:"Brazil",Canada:"Canada",China:"China",France:"France",Germany:"Germany",Iran:"Iran",Italy:"Italy",Netherlands:"Netherlands",Portugal:"Portugal",Russia:"Russia",Spain:"Spain",Switzerland:"Switzerland","United Kingdom":"United Kingdom","United States":"United States",Peru:"Peru",India:"India",Chile:"Chile",Mexico:"Mexico","Saudi Arabia":"Saudi Arabia",Turkey:"Turkey",Pakistan:"Pakistan",Bangladesh:"Bangladesh",Qatar:"Qatar"},pt:{"COVID-19 PANDEMIC":"COVID-19 PANDEMIA",day:"dia","MM/DD/YYYY":"DD/MM/YYYY","This is a open source project":"Este é um projeto de código aberto","Data source":"Fonte de dados","Source code":"Código fonte",Belgium:"Bélgica",Brazil:"Brasil",Canada:"Canadá",China:"China",France:"França",Germany:"Alemanha",Iran:"Irã",Italy:"Itália",Netherlands:"Holanda",Portugal:"Portugal",Russia:"Rússia",Spain:"Espanha",Switzerland:"Suíça","United Kingdom":"Reino Unido","United States":"Estados Unidos",Peru:"Peru",India:"Índia",Chile:"Chile",Mexico:"México","Saudi Arabia":"Arábia Saudita",Turkey:"Turquia",Pakistan:"Paquistão",Bangladesh:"Bangladesh",Qatar:"Catar"},es:{"COVID-19 PANDEMIC":"COVID-19 PANDEMIA",day:"día","MM/DD/YYYY":"DD/MM/YYYY","This is a open source project":"Este es un proyecto de código abierto","Data source":"Fuente de datos","Source code":"Código fuente",Belgium:"Bélgica",Brazil:"Brasil",Canada:"Canadá",China:"China",France:"Francia",Germany:"Alemania",Iran:"Irán",Italy:"Italia",Netherlands:"Holanda",Portugal:"Portugal",Russia:"Rusia",Spain:"España",Switzerland:"Suiza","United Kingdom":"Reino Unido","United States":"Estados Unidos",Peru:"Perú",India:"India",Chile:"Chile",Mexico:"Mexico","Saudi Arabia":"Arabia Saudita",Turkey:"Turkey",Pakistan:"Pakistán",Bangladesh:"Bangladesh",Qatar:"Katar"}}},nt=st,ot=(a("034f"),Object(j["a"])(nt,n,o,!1,null,null,null)),it=ot.exports,ct=a("ed18"),rt=a("5f5b"),lt=a("b1e0"),ut=(a("f9e3"),a("2dd8"),a("1a36"),a("b079")),dt=a.n(ut),pt=(a("4238"),{vue:null,install:function(t){t.use(dt.a),pt.vue=t,t.prototype.$popup={clear:function(){pt.clear()},success:function(t){pt.show(t,"success")},error:function(t){pt.show(t,"error")},info:function(t){pt.show(t,"info")},warning:function(t){pt.show(t,"warning")}}},show:function(t,e){pt.vue.$toast.open({message:t,position:"top-right",duration:4500,type:e})},clear:function(){pt.vue.$toast.clear()}}),ht=pt,ft=a("ea7f"),mt=a.n(ft),gt={install:function(t){t.prototype.$chart={generate:function(t,e,a,s){mt.a.chart(t,{series:e,title:{text:a},yAxis:{title:{text:s}},credits:{text:"covidlast.com",href:"http://covidlast.com"}})}}}},bt=gt,jt=a("00e7"),vt=a.n(jt),Ct=a("a04f"),Dt=a.n(Ct),yt=a("0284"),Pt=a.n(yt),_t=a("ec02"),wt=a.n(_t);Object(ct["config"])({debug:!1}),s["default"].config.productionTip=!1,s["default"].use(Pt.a,{id:"UA-166792858-1"}),s["default"].use(vt.a),s["default"].use(Dt.a),s["default"].use(rt["a"]),s["default"].use(lt["a"]),s["default"].use(ht),s["default"].use(bt),s["default"].component("vue-headful",wt.a),new s["default"]({render:function(t){return t(it)}}).$mount("#app")},"85ec":function(t,e,a){},b3df:function(t,e,a){"use strict";var s=a("3950"),n=a.n(s);n.a}});
//# sourceMappingURL=app.939c0906.js.map