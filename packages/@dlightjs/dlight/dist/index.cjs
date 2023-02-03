"use strict";var P=Object.defineProperty;var k=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var q=Object.prototype.hasOwnProperty;var z=(n,e)=>{for(var t in e)P(n,t,{get:e[t],enumerable:!0})},G=(n,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of B(e))!q.call(n,s)&&s!==t&&P(n,s,{get:()=>e[s],enumerable:!(o=k(e,s))||o.enumerable});return n};var J=n=>G(P({},"__esModule",{value:!0}),n);var fe={};z(fe,{CustomNode:()=>T,DLNode:()=>u,DLNodeType:()=>c,Else:()=>ae,ElseIf:()=>re,Env:()=>le,EnvNode:()=>O,EnvState:()=>_e,Exp:()=>pe,ExpressionNode:()=>U,For:()=>ie,ForNode:()=>A,HtmlNode:()=>H,If:()=>de,IfNode:()=>j,Prop:()=>he,PropState:()=>ce,State:()=>ue,TextNode:()=>w,View:()=>oe,bindParentNode:()=>g,initNodes:()=>b,loopEls:()=>_,loopNodes:()=>l,render:()=>ne,required:()=>se,toEls:()=>v});module.exports=J(fe);function b(n){for(let e of n){if(Array.isArray(e)){b(e);continue}e._$init()}}function g(n,e){for(let t of n){if(Array.isArray(t)){g(t,e);continue}t._$parentNode=e}}function l(n,e){for(let t of n)e(t)&&l(t._$nodes,e)}function _(n,e,t=!0){for(let o of n)[0,1].includes(o._$nodeType)?(e(o._$el,o),t&&_(o._$nodes,e)):_(o._$nodes,e,t)}function v(n){let e=[];return _(n,(t,o)=>{o._$nodeType===0&&e.push(t)},!1),e}var c=(r=>(r[r.HTML=0]="HTML",r[r.Text=1]="Text",r[r.Custom=2]="Custom",r[r.For=3]="For",r[r.If=4]="If",r[r.Env=5]="Env",r[r.Expression=6]="Expression",r))(c||{}),u=class{_$nodeType;__$el;get _$el(){return this.__$el??v(this._$nodes)}set _$el(e){this.__$el=e}_$parentNode;_$nodes=[];_$depObjectIds=[];_$beforeInitSubNodes(){}_$addBeforeInitSubNodes(e){let t=this._$beforeInitSubNodes;this._$beforeInitSubNodes=function(){t.call(this),e.call(this)}}_$bindNodes(){g(this._$nodes,this),this._$beforeInitSubNodes(),b(this._$nodes)}constructor(e){this._$nodeType=e}_$init(){}};function C(n,e,t,o,s,i,d){if(t in n){if(!i){n[t]=o;return}if(!(n[`_$$${t}`]!==`_$${e}`&&!(`_$$${t}`in n))){if(n[`_$$${t}`]===`_$${e}`){Q(s,n,t,o,i);return}if(d&&`_$$${i[0]}`in s){R(s,n,t,o,i);return}X(s,n,t,o,i)}}}function Q(n,e,t,o,s){let i={};e._$depObjectIds.push(i),e[t]=o(),n._$addDeps(s,i,()=>{e[t]=o(),e._$runDeps(t)})}function R(n,e,t,o,s){let i={};e._$depObjectIds.push(i);for(let d of s){let r=()=>n[d]=e[t];e._$addDeps([t],i,r),e[t]=o(),n._$addDeps(s,i,()=>{e._$deleteDep(t,i),e[t]=o(),e._$addDeps([t],i,r)})}}function X(n,e,t,o,s){let i={};e._$depObjectIds.push(i),e[`_$${t}`]=o(),n._$addDeps(s,i,()=>{e[`_$${t}`]=o(),e._$runDeps(t)})}var T=class extends u{_$deps={};_$envNodes;_$derivedPairs;_$tag="";Body=()=>[];constructor(){super(2)}_$addAfterset(e){let t=this.Preset;this.Preset=()=>{t(),e()}}_$runDeps(e){if(this._$deps[e]===void 0){console.warn(`${e} is not a dependency in ${this.constructor.name}`);return}for(let t of this._$deps[e].values())t.call(this)}_$childrenFunc;_$_children;get _$children(){return this._$childrenFunc?(this._$_children||(this._$_children=this._$childrenFunc.map(e=>e())),this._$_children):[]}_$addChildren(e){this._$childrenFunc=e}_$initDecorators(){if(this._$derivedPairs)for(let[e,t]of Object.entries(this._$derivedPairs)){let o=this[e];if(typeof o!="function")return;this[e]=this[e]();let s=this[e];this._$addDeps(t,{},()=>{let i=o();i!==s&&(this[e]=i,s=i,this._$runDeps(e))})}}_$addDeps(e,t,o){for(let s of e)this._$deps[s].set(t,o)}_$deleteDep(e,t){this._$deps[e].delete(t)}_$deleteDeps(e){for(let t in this._$deps)this._$deleteDep(t,e)}AfterConstruct(){}Preset(){}Afterset(){}_$init(){this.AfterConstruct(),this._$initDecorators(),this.Preset(),this._$nodes=this.Body(),this.Afterset(),this._$bindNodes()}_$addProp(e,t,o,s,i){C(this,"prop",e,t,o,s,i)}willMount(e,t){}didMount(e,t){}willUnmount(e,t){}didUnmount(e,t){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s,i){e.call(this,this._$el,this),o.call(this,this._$el,this)}}render(e){let t=new H("div");t._$addNodes([this]),t._$addProp("id",typeof e=="string"?e:e.id),t._$init(),this.willMount(this._$el,this),l(this._$nodes,o=>{switch(o._$nodeType){case 0:o.willAppear(o._$el,o);break;case 2:o.willMount(o._$el,o);break}return!0}),typeof e=="string"&&(e=document.getElementById(e)),e.replaceWith(t._$el),l(this._$nodes,o=>{switch(o._$nodeType){case 0:o.didAppear(o._$el,o);break;case 2:o.didMount(o._$el,o);break}return!0}),this.didMount(this._$el,this)}};function F(n,e){l(e,t=>{switch(t._$nodeType){case 1:case 0:n._$el.appendChild(t._$el);break;default:F(n,t._$nodes);break}return!1})}function $(n){ee(n),_(n,(e,t)=>{!document.body.contains(e)||(t._$nodeType===0&&t.willDisappear(e,t),e.remove(),t._$nodeType===0&&t.didDisappear(e,t))}),te(n)}function m(n,e){l(n,t=>{for(let o of t._$depObjectIds)e._$deleteDeps(o);return!0})}function y(n,e,t,o){let s=o??t.childNodes.length;return Y(n),_(n,(i,d)=>{let r=document.body.contains(i);[0].includes(d._$nodeType)&&!r&&d.willAppear(i,d),e===s?t.appendChild(i):t.insertBefore(i,t.childNodes[e]),[0].includes(d._$nodeType)&&!r&&d.didAppear(i,d),e++,s++},!1),Z(n),[e,s]}function x(n,e){return K(n._$nodes,e)}function I(n){return K(n,void 0)}function K(n,e){let t=0,o=!1;return l(n,s=>o?!1:s===e?(o=!0,!1):[1,0].includes(s._$nodeType)?(t++,!1):!0),t}function E(n,e){l(n,t=>([2].includes(t._$nodeType)&&t[e](t),!0))}function Y(n){E(n,"willMount")}function Z(n){E(n,"didMount")}function ee(n){E(n,"willUnmount")}function te(n){E(n,"didUnmount")}var H=class extends u{_$envNodes=[];constructor(e){super(0),this._$el=document.createElement(e)}_$init(){this._$bindNodes(),F(this,this._$nodes)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,o,s){let i;if(e[0]==="_"?i=a=>this._$el.style[e.slice(1)]=a:e==="innerText"?i=a=>this._$el.innerText=a:e==="innerHTML"?i=a=>this._$el.innerHTML=a:i=a=>this._$el[e]=a,!s){i(t);return}let d=t();i(d);let r=()=>{let a=t();d!==a&&(i(a),d=a)},h={};this._$depObjectIds.push(h),o._$addDeps(s,h,r)}willAppear(e,t){}didAppear(e,t){}willDisappear(e,t){}didDisappear(e,t){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s,i,...d){return o.call(this,s,i),e.call(this,s,i)}}};var L=class extends u{afterUpdateNewNodes(e){}addAfterUpdateNewNodesFunc(e){let t=this.afterUpdateNewNodes;this.afterUpdateNewNodes=function(o){e.call(this,o),t.call(this,o)}}onUpdateNodes(e,t){}addOnUpdateNodesFunc(e){let t=this.onUpdateNodes;this.onUpdateNodes=function(o,s){e.call(this,o,s),t.call(this,o,s)}}_$bindNewNodes(e){g(e,this),this._$beforeInitSubNodes(),b(e),this.afterUpdateNewNodes(e)}};var A=class extends L{keys=[];array=[];_$nodess=[];nodeFunc;keyFunc;arrayFunc;dlScope;listenDeps;_$envNodes=[];constructor(){super(3)}duplicatedOrNoKey=!1;_$getItem(e,t){let o=this.duplicatedOrNoKey?t:this.keys.indexOf(e);return this.array[o]}_$addNodeFunc(e){this.nodeFunc=e}_$addKeyFunc(e){this.keyFunc=e}_$addArrayFunc(e,t,o){this.dlScope=e,this.arrayFunc=t,this.listenDeps=o}_$addNodess(e){this._$nodess=e,this._$nodes=this._$nodess.flat(1)}setArray(){this.array=[...this.arrayFunc()]}setKeys(){if(!this.keyFunc){this.duplicatedOrNoKey=!0;return}let e=[...this.keyFunc()];if(e.length===[...new Set(e)].length){this.keys=e;return}this.keys=[...Array(this.array.length).keys()],console.warn("\u91CD\u590Dkey\u4E86"),this.duplicatedOrNoKey=!0}_$init(){if(!this.listenDeps){this._$bindNodes();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t=this.keyFunc?()=>this.updateWithKey(e):()=>this.updateWithOutKey(e),o={};if(this._$depObjectIds.push(o),this.dlScope._$addDeps(this.listenDeps,o,t),this.setArray(),this.setKeys(),this.duplicatedOrNoKey)for(let s of this.array.keys())this._$nodess.push(this.nodeFunc(null,s,this));else for(let[s,i]of this.keys.entries())this._$nodess.push(this.nodeFunc(i,s,this));this._$nodes=this._$nodess.flat(1),this._$bindNodes()}getNewNodes(e,t){let o=this.nodeFunc(e,t,this);return this._$bindNewNodes(o),o}updateWithOutKey(e){let t=e._$el,o=this.array.length;this.setArray();let s=this.array.length;if(o!==s){if(o<s){let i=x(e,this),d=t.childNodes.length;for(let r=0;r<s;r++){if(r<o){i+=I(this._$nodess[r]);continue}let h=this.getNewNodes(null,r);[i,d]=y(h,i,t,d),this._$nodess.push(h)}this._$nodes=this._$nodess.flat(1);return}for(let i=s;i<o;i++)m(this._$nodess[i],this.dlScope),$(this._$nodess[i]);this._$nodess=this._$nodess.slice(0,s),this._$nodes=this._$nodess.flat(1)}}async updateWithKey(e){let t=e._$el,o=x(e,this),s=this.keys,i=[...this.array],d=[...this._$nodess],r=[...this._$nodes];this.setArray(),this.setKeys(),this.duplicatedOrNoKey&&(s=[...Array(i.length).keys()]);let h=[],a=[],W=[];for(let[p,f]of s.entries()){if(this.keys.includes(f)){h.push(f),a.push(d[p]);continue}m(d[p],this.dlScope),$(d[p]),W.push(p)}s=h;let D=o,M=t.childNodes.length;for(let[p,f]of this.keys.entries()){if(s.includes(f)){D+=I(a[s.indexOf(f)]);continue}let N=this.getNewNodes(f,p);[D,M]=y(N,D,t,M),a.splice(p,0,N),s.splice(p,0,f)}D=o;for(let[p,f]of this.keys.entries()){let N=s.indexOf(f);if(N===p){D+=I(a[p]);continue}let S=a[N],V=s[N];[D,M]=y(S,D,t,M),a.splice(N,1),s.splice(N,1),a.splice(p+1,0,S),s.splice(p+1,0,V)}this._$nodess=a,this._$nodes=this._$nodess.flat(1),this.onUpdateNodes(r,this._$nodes)}_$listen(e,t,o,s){let i={};e._$depObjectIds.push(i),e._$addDeps(o,i,()=>{let d=t();if(d===void 0){e._$deleteDeps(i);return}s(d)})}};var j=class extends L{conditionPairs=[];condition;listenDeps=[];dlScope;_$envNodes=[];constructor(){super(4)}_$addCond(e,t,o,s){this.conditionPairs.push({condition:e,node:t}),s&&(this.dlScope||(this.dlScope=o),this.listenDeps.push(...s));let i=[];for(let d of this.conditionPairs)if(d.condition()){this.condition=d.condition.toString(),i=d.node();break}this._$nodes=i}_$init(){let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(e){let t={};this._$depObjectIds.push(t),this.dlScope?._$addDeps(this.listenDeps,t,()=>this.update(e))}this._$bindNodes()}update(e){let t=this._$nodes,o=this.condition;this._$nodes=[];for(let d of this.conditionPairs)if(d.condition()){this.condition!==d.condition.toString()?(m(t,this.dlScope),$(t),this.condition=d.condition.toString(),this._$nodes=d.node(),this._$bindNewNodes(this._$nodes)):this._$nodes=t;break}if(t.length!==0&&this._$nodes.length===0&&(this.condition="[none]",m(t,this.dlScope),$(t)),o===this.condition)return;let s=x(e,this),i=e._$el;y(this._$nodes,s,i,i.childNodes.length),this.onUpdateNodes(t,this._$nodes)}};var w=class extends u{constructor(e,t,o){if(super(1),!o){this._$el=document.createTextNode(e);return}e=e;let s=e();this._$el=document.createTextNode(s);let i=()=>{let r=e();s!==r&&(this._$el.nodeValue=r,s=r)},d={};this._$depObjectIds.push(d),t._$addDeps(o,d,i)}};var O=class extends u{addPropFuncs=[];constructor(){super(5)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,o,s){this.addPropFuncs.push(i=>C(i,"env",e,t,o,s))}addProps(e){for(let t of this.addPropFuncs)t(e)}addPropsToNodes(e){l(e._$nodes,t=>(t._$addBeforeInitSubNodes(()=>{this.addPropsToNodes(t)}),t._$nodeType===2&&this.addProps(t),!1))}_$init(){this.addPropsToNodes(this),this._$bindNodes()}};var U=class extends L{nodeOrFunc;listenDeps;dlScope;propFuncs=[];constructor(e,t,o){if(super(6),!o){this._$nodes=this.formatNodes(e);return}this.nodeOrFunc=e,this.listenDeps=o,this.dlScope=t,this._$nodes=this.formatNodes(this.nodeOrFunc())}_$onUpdateNodes(e){l(this._$nodes,t=>([4,3,6].includes(t._$nodeType)&&t.addOnUpdateNodesFunc(e),!0))}_$addProp(e,t,o,s){let i=d=>{if(["willAppear","didAppear","willDisappear","didDisappear"].includes(e)){d._$addLifeCycle(t,e);return}e[0]==="_"&&(d._$el.style[e.slice(1)]??"").trim()!==""||e[0]!=="_"&&d._$el[e]!==void 0||d._$addProp(e,t,o,s)};this.propFuncs.push(()=>{for(let d of this._$nodes)switch(d._$nodeType){case 0:i(d);break;case 3:case 4:case 6:d.addAfterUpdateNewNodesFunc(r=>{_(r,(h,a)=>{a._$nodeType===0&&i(a)},!1)});default:_(d._$nodes,(r,h)=>{h._$nodeType===0&&i(h)},!1)}})}formatNodes(e){return Array.isArray(e)||(e=[e]),e=e.flat(1),e=e.filter(t=>t!=null).map(t=>t._$nodeType!==void 0?t:new w(t)),e}_$init(){if(this.listenDeps===void 0){this._$bindNodes();for(let o of this.propFuncs)o();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t={};this._$depObjectIds.push(t),this.dlScope._$addDeps(this.listenDeps,t,()=>this.update(e)),this._$bindNodes();for(let o of this.propFuncs){o();let s={};this._$depObjectIds.push(s),this.dlScope._$addDeps(this.listenDeps,s,o)}}update(e){let t=this._$nodes;m(this._$nodes,this.dlScope),$(this._$nodes),this._$nodes=this.formatNodes(this.nodeOrFunc()),this._$bindNewNodes(this._$nodes);let o=e._$el,s=x(e,this);y(this._$nodes,s,o,o.childNodes.length),this.onUpdateNodes(t,this._$nodes)}};var oe=T,se=void 0;function ne(n,e){new e().render(n)}var ie=null,de=null,re=null,ae=null,le=null,pe=null,ue=null,he=null,ce=null,_e=null;0&&(module.exports={CustomNode,DLNode,DLNodeType,Else,ElseIf,Env,EnvNode,EnvState,Exp,ExpressionNode,For,ForNode,HtmlNode,If,IfNode,Prop,PropState,State,TextNode,View,bindParentNode,initNodes,loopEls,loopNodes,render,required,toEls});
