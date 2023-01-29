"use strict";var v=Object.defineProperty;var V=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var B=Object.prototype.hasOwnProperty;var q=(n,e)=>{for(var t in e)v(n,t,{get:e[t],enumerable:!0})},z=(n,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of k(e))!B.call(n,s)&&s!==t&&v(n,s,{get:()=>e[s],enumerable:!(o=V(e,s))||o.enumerable});return n};var G=n=>z(v({},"__esModule",{value:!0}),n);var ne={};q(ne,{CustomNode:()=>w,DLNode:()=>h,DLNodeType:()=>c,EnvNode:()=>j,ExpressionNode:()=>S,ForNode:()=>A,HtmlNode:()=>H,IfNode:()=>U,TextNode:()=>M,View:()=>te,bindParentNode:()=>T,initNodes:()=>b,loopEls:()=>u,loopNodes:()=>N,render:()=>se,required:()=>oe,toEls:()=>F});module.exports=G(ne);function b(n){for(let e of n){if(Array.isArray(e)){b(e);continue}e._$init()}}function T(n,e){for(let t of n){if(Array.isArray(t)){T(t,e);continue}t._$parentNode=e}}function N(n,e){for(let t of n)e(t)&&N(t._$nodes,e)}function u(n,e,t=!0){for(let o of n)[0,1].includes(o._$nodeType)?(e(o._$el,o),t&&u(o._$nodes,e)):u(o._$nodes,e,t)}function F(n){let e=[];return u(n,(t,o)=>{o._$nodeType===0&&e.push(t)},!1),e}var c=(r=>(r[r.HTML=0]="HTML",r[r.Text=1]="Text",r[r.Custom=2]="Custom",r[r.For=3]="For",r[r.If=4]="If",r[r.Env=5]="Env",r[r.Expression=6]="Expression",r))(c||{}),h=class{_$nodeType;__$el;get _$el(){return this.__$el??F(this._$nodes)}set _$el(e){this.__$el=e}_$parentNode;_$nodes=[];_$depObjectIds=[];_$beforeInitSubNodes(){}_$addBeforeInitSubNodes(e){let t=this._$beforeInitSubNodes;this._$beforeInitSubNodes=function(){t.call(this),e.call(this)}}_$bindNodes(){T(this._$nodes,this),this._$beforeInitSubNodes(),b(this._$nodes)}constructor(e){this._$nodeType=e}_$init(){}render(e){}};function C(n,e,t,o,s,d,i){if(t in n){if(!d){n[t]=o;return}if(n[`_$$${t}`]===`_$${e}`){J(s,n,t,o,d);return}if(i&&`_$$${d[0]}`in n){Q(s,n,t,o,d);return}R(s,n,t,o,d)}}function J(n,e,t,o,s){let d={};e._$depObjectIds.push(d),e[t]=o(),n._$addDeps(s,d,()=>{e[t]=o(),e._$runDeps(t)})}function Q(n,e,t,o,s){let d={};e._$depObjectIds.push(d);for(let i of s){let r=()=>n[i]=e[t];e._$addDeps([t],d,r),e[t]=o(),n._$addDeps(s,d,()=>{e._$deleteDep(t,d),e[t]=o(),e._$addDeps([t],d,r)})}}function R(n,e,t,o,s){let d={};e._$depObjectIds.push(d),e[`_$${t}`]=o(),n._$addDeps(s,d,()=>{e[`_$${t}`]=o(),e._$runDeps(t)})}var w=class extends h{_$deps={};_$envNodes;_$derivedPairs;_$children;_$tag="";Body=()=>[];constructor(){super(2)}_$addAfterset(e){let t=this.Preset;this.Preset=()=>{t(),e()}}_$runDeps(e){if(this._$deps[e]===void 0){console.warn(`${e} is not a dependency in ${this.constructor.name}`);return}for(let t of this._$deps[e].values())t.call(this)}_$addChildren(e){this._$children=e}_$initDecorators(){if(this._$derivedPairs)for(let[e,t]of Object.entries(this._$derivedPairs)){let o=this[e];if(typeof o!="function")return;this[e]=this[e]();let s=this[e];this._$addDeps(t,{},()=>{let d=o();d!==s&&(this[e]=d,s=d,this._$runDeps(e))})}}_$addDeps(e,t,o){for(let s of e)this._$deps[s].set(t,o)}_$deleteDep(e,t){this._$deps[e].delete(t)}_$deleteDeps(e){for(let t in this._$deps)this._$deleteDep(t,e)}AfterConstruct(){}Preset(){}Afterset(){}_$init(){this.AfterConstruct(),this._$initDecorators(),this.Preset(),this._$nodes=this.Body(),this.Afterset(),this._$bindNodes()}_$addProp(e,t,o,s,d){C(this,"prop",e,t,o,s,d)}render(e){this.willMount(this);for(let t of this._$nodes)t.render(e);this.didMount(this)}willMount(e){}didMount(e){}willUnmount(e){}didUnmount(e){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s){e.call(this,this),o.call(this,this)}}};var H=class extends h{_$envNodes=[];constructor(e){super(0),this._$el=document.createElement(e)}_$init(){this._$bindNodes();for(let e of this._$nodes)e.render(this._$el)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,o,s){let d;if(e[0]==="_"?d=a=>this._$el.style[e.slice(1)]=a:e==="innerText"?d=a=>this._$el.innerText=a:d=a=>this._$el[e]=a,!s){d(t);return}let i=t();d(i);let r=()=>{let a=t();i!==a&&(d(a),i=a)},p={};this._$depObjectIds.push(p),o._$addDeps(s,p,r)}willAppear(e){}didAppear(e){}willDisappear(e){}didDisappear(e){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s){return o.call(this,s),e.call(this,s)}}render(e){this.willAppear(this._$el),e.appendChild(this._$el),this.didAppear(this._$el)}};function y(n){Z(n),u(n,(e,t)=>{t._$nodeType===0&&t.willDisappear(e),e.remove(),t._$nodeType===0&&t.didDisappear(e)}),ee(n)}function L(n,e){N(n,t=>{for(let o of t._$depObjectIds)e._$deleteDeps(o);return!0})}function D(n,e,t,o){let s=o??t.childNodes.length;return X(n),u(n,(d,i)=>{let r=t.childNodes[e];[0].includes(i._$nodeType)&&i.willAppear(d),e===s?t.appendChild(d):t.insertBefore(d,r),[0].includes(i._$nodeType)&&i.didAppear(d),e++,s++},!1),Y(n),[e,s]}function g(n,e){return K(n._$nodes,e)}function I(n){return K(n,void 0)}function K(n,e){let t=0,o=!1;return N(n,s=>o?!1:s===e?(o=!0,!1):[1,0].includes(s._$nodeType)?(t++,!1):!0),t}function P(n,e){N(n,t=>([2,6].includes(t._$nodeType)&&t[e](t),!0))}function X(n){P(n,"willMount")}function Y(n){P(n,"didMount")}function Z(n){P(n,"willUnmount")}function ee(n){P(n,"didUnmount")}var x=class extends h{afterUpdateNewNodes(e){}addAfterUpdateNewNodesFunc(e){let t=this.afterUpdateNewNodes;this.afterUpdateNewNodes=function(o){e.call(this,o),t.call(this,o)}}onUpdateNodes(e,t){}addOnUpdateNodesFunc(e){let t=this.onUpdateNodes;this.onUpdateNodes=function(o,s){e.call(this,o,s),t.call(this,o,s)}}_$bindNewNodes(e){this.afterUpdateNewNodes(e),T(e,this),this._$beforeInitSubNodes(),b(e)}};var A=class extends x{keys=[];array=[];_$nodess=[];nodeFunc;keyFunc;arrayFunc;dlScope;listenDeps;_$envNodes=[];constructor(){super(3)}duplicatedOrNoKey=!1;_$getItem(e,t){let o=this.duplicatedOrNoKey?t:this.keys.indexOf(e);return this.array[o]}_$addNodeFunc(e){this.nodeFunc=e}_$addKeyFunc(e){this.keyFunc=e}_$addArrayFunc(e,t,o){this.dlScope=e,this.arrayFunc=t,this.listenDeps=o}_$addNodess(e){this._$nodess=e,this._$nodes=this._$nodess.flat(1)}setArray(){this.array=[...this.arrayFunc()]}setKeys(){if(!this.keyFunc){this.duplicatedOrNoKey=!0;return}let e=[...this.keyFunc()];if(e.length===[...new Set(e)].length){this.keys=e;return}this.keys=[...Array(this.array.length).keys()],console.warn("\u91CD\u590Dkey\u4E86"),this.duplicatedOrNoKey=!0}_$init(){if(!this.listenDeps){this._$bindNodes();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t=this.keyFunc?()=>this.updateWithKey(e):()=>this.updateWithOutKey(e),o={};if(this._$depObjectIds.push(o),this.dlScope._$addDeps(this.listenDeps,o,t),this.setArray(),this.setKeys(),this.duplicatedOrNoKey)for(let s of this.array.keys())this._$nodess.push(this.nodeFunc(null,s,this));else for(let[s,d]of this.keys.entries())this._$nodess.push(this.nodeFunc(d,s,this));this._$nodes=this._$nodess.flat(1),this._$bindNodes()}render(e){for(let t of this._$nodes)t.render(e)}getNewNodes(e,t){let o=this.nodeFunc(e,t,this);return this._$bindNewNodes(o),o}updateWithOutKey(e){let t=e._$el,o=this.array.length;this.setArray();let s=this.array.length;if(o!==s){if(o<s){let d=g(e,this),i=t.childNodes.length;for(let r=0;r<s;r++){if(r<o){d+=I(this._$nodess[r]);continue}let p=this.getNewNodes(null,r);[d,i]=D(p,d,t,i),this._$nodess.push(p)}this._$nodes=this._$nodess.flat(1);return}for(let d=s;d<o;d++)L(this._$nodess[d],this.dlScope),y(this._$nodess[d]);this._$nodess=this._$nodess.slice(0,s),this._$nodes=this._$nodess.flat(1)}}async updateWithKey(e){let t=e._$el,o=g(e,this),s=this.keys,d=[...this.array],i=[...this._$nodess],r=[...this._$nodes];this.setArray(),this.setKeys(),this.duplicatedOrNoKey&&(s=[...Array(d.length).keys()]);let p=[],a=[],m=[];for(let[l,_]of s.entries()){if(this.keys.includes(_)){p.push(_),a.push(i[l]);continue}L(i[l],this.dlScope),y(i[l]),m.push(l)}s=p;let f=o,E=t.childNodes.length;for(let[l,_]of this.keys.entries()){if(s.includes(_)){f+=I(a[s.indexOf(_)]);continue}let $=this.getNewNodes(_,l);[f,E]=D($,f,t,E),a.splice(l,0,$),s.splice(l,0,_)}f=o;for(let[l,_]of this.keys.entries()){let $=s.indexOf(_);if($===l){f+=I(a[l]);continue}let O=a[$],W=s[$];[f,E]=D(O,f,t,E),a.splice($,1),s.splice($,1),a.splice(l+1,0,O),s.splice(l+1,0,W)}this._$nodess=a,this._$nodes=this._$nodess.flat(1),this.onUpdateNodes(r,this._$nodes)}_$listen(e,t,o,s){let d={};e._$depObjectIds.push(d),e._$addDeps(o,d,()=>{let i=t();if(i===void 0){e._$deleteDeps(d);return}s(i)})}};var U=class extends x{conditionPairs=[];condition;listenDeps=[];dlScope;_$envNodes=[];constructor(){super(4)}_$addCond(e,t,o,s){this.conditionPairs.push({condition:e,node:t}),s&&(this.dlScope||(this.dlScope=o),this.listenDeps.push(...s));let d=[];for(let i of this.conditionPairs)if(i.condition()){this.condition=i.condition.toString(),d=i.node();break}this._$nodes=d}_$init(){let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(e){let t={};this._$depObjectIds.push(t),this.dlScope?._$addDeps(this.listenDeps,t,()=>this.update(e))}this._$bindNodes()}update(e){let t=this._$nodes,o=this.condition;this._$nodes=[];for(let i of this.conditionPairs)if(i.condition()){this.condition!==i.condition.toString()?(L(t,this.dlScope),y(t),this.condition=i.condition.toString(),this._$nodes=i.node(),this._$bindNewNodes(this._$nodes)):this._$nodes=t;break}if(t.length!==0&&this._$nodes.length===0&&(this.condition="[none]",L(t,this.dlScope),y(t)),o===this.condition)return;let s=g(e,this),d=e._$el;D(this._$nodes,s,d,d.childNodes.length),this.onUpdateNodes(t,this._$nodes)}render(e){for(let t of this._$nodes)t.render(e)}};var M=class extends h{constructor(e,t,o){if(super(1),!o){this._$el=document.createTextNode(e);return}e=e;let s=e();this._$el=document.createTextNode(s);let d=()=>{let r=e();s!==r&&(this._$el.nodeValue=r,s=r)},i={};this._$depObjectIds.push(i),t._$addDeps(o,i,d)}render(e){e.appendChild(this._$el)}};var j=class extends h{addPropFuncs=[];constructor(){super(5)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,o,s){this.addPropFuncs.push(d=>C(d,"env",e,t,o,s))}addProps(e){for(let t of this.addPropFuncs)t(e)}addPropsToNodes(e){N(e._$nodes,t=>(t._$addBeforeInitSubNodes(()=>{this.addPropsToNodes(t)}),t._$nodeType===2&&this.addProps(t),!1))}_$init(){this.addPropsToNodes(this),this._$bindNodes()}render(e){for(let t of this._$nodes)t.render(e)}};var S=class extends x{nodeOrFunc;listenDeps;dlScope;propFuncs=[];propScope=()=>!0;deepLoopEl=!1;constructor(e,t,o){if(super(6),!o){this._$nodes=this.formatNodes(e);return}this.nodeOrFunc=e,this.listenDeps=o,this.dlScope=t,this._$nodes=this.formatNodes(this.nodeOrFunc())}_$onUpdateNodes(e){N(this._$nodes,t=>([4,3,6].includes(t._$nodeType)&&t.addOnUpdateNodesFunc(e),!0))}_$addProp(e,t,o,s){let d=this.propScope,i=this.deepLoopEl,r=p=>{let a=p._$el;!d(a,p)||e[0]==="_"&&(p._$el.style[e.slice(1)]??"").trim()!==""||e[0]!=="_"&&p._$el[e]!==void 0||p._$addProp(e,t,o,s)};this.propFuncs.push(()=>{for(let p of this._$nodes)switch(p._$nodeType){case 0:r(p),i&&u(p._$nodes,(a,m)=>{m._$nodeType===0&&r(m)},!0);break;case 3:case 4:case 6:p.addAfterUpdateNewNodesFunc(a=>{u(a,(m,f)=>{f._$nodeType===0&&r(f)},i)});default:u(p._$nodes,(a,m)=>{m._$nodeType===0&&r(m)},i)}})}formatNodes(e){return Array.isArray(e)||(e=[e]),e=e.flat(1),e=e.filter(t=>t!=null).map(t=>t._$nodeType!==void 0?t:new M(t)),e}_$init(){if(this.listenDeps===void 0){this._$bindNodes();for(let o of this.propFuncs)o();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t={};this._$depObjectIds.push(t),this.dlScope._$addDeps(this.listenDeps,t,()=>this.update(e)),this._$bindNodes();for(let o of this.propFuncs){o();let s={};this._$depObjectIds.push(s),this.dlScope._$addDeps(this.listenDeps,s,o)}}render(e){this.willMount(this);for(let t of this._$nodes)t.render(e);this.didMount(this)}update(e){let t=this._$nodes;L(this._$nodes,this.dlScope),y(this._$nodes),this._$nodes=this.formatNodes(this.nodeOrFunc()),this._$bindNewNodes(this._$nodes);let o=e._$el,s=g(e,this);D(this._$nodes,s,o,o.childNodes.length),this.onUpdateNodes(t,this._$nodes)}willMount(e){}didMount(e){}willUnmount(e){}didUnmount(e){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s){e.call(this,this),o.call(this,this)}}};var te=w,oe=void 0;function se(n,e){let t=new H("div");t._$addNodes([e]),t._$addProp("id",typeof n=="string"?n:n.id),t._$init(),typeof n=="string"&&(n=document.getElementById(n)),n.replaceWith(t._$el)}0&&(module.exports={CustomNode,DLNode,DLNodeType,EnvNode,ExpressionNode,ForNode,HtmlNode,IfNode,TextNode,View,bindParentNode,initNodes,loopEls,loopNodes,render,required,toEls});
