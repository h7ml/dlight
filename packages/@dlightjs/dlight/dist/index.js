function b(i){for(let e of i){if(Array.isArray(e)){b(e);continue}e._$init()}}function g(i,e){for(let t of i){if(Array.isArray(t)){g(t,e);continue}t._$parentNode=e}}function p(i,e){for(let t of i)e(t)&&p(t._$nodes,e)}function f(i,e,t=!0){for(let o of i)[0,1].includes(o._$nodeType)?(e(o._$el,o),t&&f(o._$nodes,e)):f(o._$nodes,e,t)}function F(i){let e=[];return f(i,(t,o)=>{o._$nodeType===0&&e.push(t)},!1),e}var c=(r=>(r[r.HTML=0]="HTML",r[r.Text=1]="Text",r[r.Custom=2]="Custom",r[r.For=3]="For",r[r.If=4]="If",r[r.Env=5]="Env",r[r.Expression=6]="Expression",r))(c||{}),h=class{_$nodeType;__$el;get _$el(){return this.__$el??F(this._$nodes)}set _$el(e){this.__$el=e}_$parentNode;_$nodes=[];_$depObjectIds=[];_$beforeInitSubNodes(){}_$addBeforeInitSubNodes(e){let t=this._$beforeInitSubNodes;this._$beforeInitSubNodes=function(){t.call(this),e.call(this)}}_$bindNodes(){g(this._$nodes,this),this._$beforeInitSubNodes(),b(this._$nodes)}constructor(e){this._$nodeType=e}_$init(){}};function H(i,e,t,o,s,n,d){if(t in i){if(!n){i[t]=o;return}if(!(i[`_$$${t}`]!==`_$${e}`&&!(`_$$${t}`in i))){if(i[`_$$${t}`]===`_$${e}`){V(s,i,t,o,n);return}if(d&&`_$$${n[0]}`in s){k(s,i,t,o,n);return}B(s,i,t,o,n)}}}function V(i,e,t,o,s){let n={};e._$depObjectIds.push(n),e[t]=o(),i._$addDeps(s,n,()=>{e[t]=o(),e._$runDeps(t)})}function k(i,e,t,o,s){let n={};e._$depObjectIds.push(n);for(let d of s){let r=()=>i[d]=e[t];e._$addDeps([t],n,r),e[t]=o(),i._$addDeps(s,n,()=>{e._$deleteDep(t,n),e[t]=o(),e._$addDeps([t],n,r)})}}function B(i,e,t,o,s){let n={};e._$depObjectIds.push(n),e[`_$${t}`]=o(),i._$addDeps(s,n,()=>{e[`_$${t}`]=o(),e._$runDeps(t)})}var w=class extends h{_$deps={};_$envNodes;_$derivedPairs;_$tag="";Body=()=>[];constructor(){super(2)}_$addAfterset(e){let t=this.Preset;this.Preset=()=>{t(),e()}}_$runDeps(e){if(this._$deps[e]===void 0){console.warn(`${e} is not a dependency in ${this.constructor.name}`);return}for(let t of this._$deps[e].values())t.call(this)}_$childrenFunc;_$_children;get _$children(){return this._$childrenFunc?(this._$_children||(this._$_children=this._$childrenFunc.map(e=>e())),this._$_children):[]}_$addChildren(e){this._$childrenFunc=e}_$initDecorators(){if(this._$derivedPairs)for(let[e,t]of Object.entries(this._$derivedPairs)){let o=this[e];if(typeof o!="function")return;this[e]=this[e]();let s=this[e];this._$addDeps(t,{},()=>{let n=o();n!==s&&(this[e]=n,s=n,this._$runDeps(e))})}}_$addDeps(e,t,o){for(let s of e)this._$deps[s].set(t,o)}_$deleteDep(e,t){this._$deps[e].delete(t)}_$deleteDeps(e){for(let t in this._$deps)this._$deleteDep(t,e)}AfterConstruct(){}Preset(){}Afterset(){}_$init(){this.AfterConstruct(),this._$initDecorators(),this.Preset(),this._$nodes=this.Body(),this.Afterset(),this._$bindNodes()}_$addProp(e,t,o,s,n){H(this,"prop",e,t,o,s,n)}willMount(e,t){}didMount(e,t){}willUnmount(e,t){}didUnmount(e,t){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s,n){e.call(this,this._$el,this),o.call(this,this._$el,this)}}render(e){let t=new M("div");t._$addNodes([this]),t._$addProp("id",typeof e=="string"?e:e.id),t._$init(),this.willMount(this._$el,this),p(this._$nodes,o=>{switch(o._$nodeType){case 0:o.willAppear(o._$el,o);break;case 2:o.willMount(o._$el,o);break}return!0}),typeof e=="string"&&(e=document.getElementById(e)),e.replaceWith(t._$el),p(this._$nodes,o=>{switch(o._$nodeType){case 0:o.didAppear(o._$el,o);break;case 2:o.didMount(o._$el,o);break}return!0}),this.didMount(this._$el,this)}};function P(i,e){p(e,t=>{switch(t._$nodeType){case 1:case 0:i._$el.appendChild(t._$el);break;default:P(i,t._$nodes);break}return!1})}function $(i){G(i),f(i,(e,t)=>{!document.body.contains(e)||(t._$nodeType===0&&t.willDisappear(e,t),e.remove(),t._$nodeType===0&&t.didDisappear(e,t))}),J(i)}function m(i,e){p(i,t=>{for(let o of t._$depObjectIds)e._$deleteDeps(o);return!0})}function y(i,e,t,o){let s=o??t.childNodes.length;return q(i),f(i,(n,d)=>{let r=document.body.contains(n);[0].includes(d._$nodeType)&&!r&&d.willAppear(n,d),e===s?t.appendChild(n):t.insertBefore(n,t.childNodes[e]),[0].includes(d._$nodeType)&&!r&&d.didAppear(n,d),e++,s++},!1),z(i),[e,s]}function x(i,e){return A(i._$nodes,e)}function C(i){return A(i,void 0)}function A(i,e){let t=0,o=!1;return p(i,s=>o?!1:s===e?(o=!0,!1):[1,0].includes(s._$nodeType)?(t++,!1):!0),t}function I(i,e){p(i,t=>([2].includes(t._$nodeType)&&t[e](t),!0))}function q(i){I(i,"willMount")}function z(i){I(i,"didMount")}function G(i){I(i,"willUnmount")}function J(i){I(i,"didUnmount")}var M=class extends h{_$envNodes=[];constructor(e){super(0),this._$el=document.createElement(e)}_$init(){this._$bindNodes(),P(this,this._$nodes)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,o,s){let n;if(e[0]==="_"?n=a=>this._$el.style[e.slice(1)]=a:e==="innerText"?n=a=>this._$el.innerText=a:e==="innerHTML"?n=a=>this._$el.innerHTML=a:n=a=>this._$el[e]=a,!s){n(t);return}let d=t();n(d);let r=()=>{let a=t();d!==a&&(n(a),d=a)},u={};this._$depObjectIds.push(u),o._$addDeps(s,u,r)}willAppear(e,t){}didAppear(e,t){}willDisappear(e,t){}didDisappear(e,t){}_$addLifeCycle(e,t){let o=this[t];this[t]=function(s,n,...d){return o.call(this,s,n),e.call(this,s,n)}}};var L=class extends h{afterUpdateNewNodes(e){}addAfterUpdateNewNodesFunc(e){let t=this.afterUpdateNewNodes;this.afterUpdateNewNodes=function(o){e.call(this,o),t.call(this,o)}}onUpdateNodes(e,t){}addOnUpdateNodesFunc(e){let t=this.onUpdateNodes;this.onUpdateNodes=function(o,s){e.call(this,o,s),t.call(this,o,s)}}_$bindNewNodes(e){g(e,this),this._$beforeInitSubNodes(),b(e),this.afterUpdateNewNodes(e)}};var j=class extends L{keys=[];array=[];_$nodess=[];nodeFunc;keyFunc;arrayFunc;dlScope;listenDeps;_$envNodes=[];constructor(){super(3)}duplicatedOrNoKey=!1;_$getItem(e,t){let o=this.duplicatedOrNoKey?t:this.keys.indexOf(e);return this.array[o]}_$addNodeFunc(e){this.nodeFunc=e}_$addKeyFunc(e){this.keyFunc=e}_$addArrayFunc(e,t,o){this.dlScope=e,this.arrayFunc=t,this.listenDeps=o}_$addNodess(e){this._$nodess=e,this._$nodes=this._$nodess.flat(1)}setArray(){this.array=[...this.arrayFunc()]}setKeys(){if(!this.keyFunc){this.duplicatedOrNoKey=!0;return}let e=[...this.keyFunc()];if(e.length===[...new Set(e)].length){this.keys=e;return}this.keys=[...Array(this.array.length).keys()],console.warn("\u91CD\u590Dkey\u4E86"),this.duplicatedOrNoKey=!0}_$init(){if(!this.listenDeps){this._$bindNodes();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t=this.keyFunc?()=>this.updateWithKey(e):()=>this.updateWithOutKey(e),o={};if(this._$depObjectIds.push(o),this.dlScope._$addDeps(this.listenDeps,o,t),this.setArray(),this.setKeys(),this.duplicatedOrNoKey)for(let s of this.array.keys())this._$nodess.push(this.nodeFunc(null,s,this));else for(let[s,n]of this.keys.entries())this._$nodess.push(this.nodeFunc(n,s,this));this._$nodes=this._$nodess.flat(1),this._$bindNodes()}getNewNodes(e,t){let o=this.nodeFunc(e,t,this);return this._$bindNewNodes(o),o}updateWithOutKey(e){let t=e._$el,o=this.array.length;this.setArray();let s=this.array.length;if(o!==s){if(o<s){let n=x(e,this),d=t.childNodes.length;for(let r=0;r<s;r++){if(r<o){n+=C(this._$nodess[r]);continue}let u=this.getNewNodes(null,r);[n,d]=y(u,n,t,d),this._$nodess.push(u)}this._$nodes=this._$nodess.flat(1);return}for(let n=s;n<o;n++)m(this._$nodess[n],this.dlScope),$(this._$nodess[n]);this._$nodess=this._$nodess.slice(0,s),this._$nodes=this._$nodess.flat(1)}}async updateWithKey(e){let t=e._$el,o=x(e,this),s=this.keys,n=[...this.array],d=[...this._$nodess],r=[...this._$nodes];this.setArray(),this.setKeys(),this.duplicatedOrNoKey&&(s=[...Array(n.length).keys()]);let u=[],a=[],K=[];for(let[l,_]of s.entries()){if(this.keys.includes(_)){u.push(_),a.push(d[l]);continue}m(d[l],this.dlScope),$(d[l]),K.push(l)}s=u;let D=o,T=t.childNodes.length;for(let[l,_]of this.keys.entries()){if(s.includes(_)){D+=C(a[s.indexOf(_)]);continue}let N=this.getNewNodes(_,l);[D,T]=y(N,D,t,T),a.splice(l,0,N),s.splice(l,0,_)}D=o;for(let[l,_]of this.keys.entries()){let N=s.indexOf(_);if(N===l){D+=C(a[l]);continue}let v=a[N],W=s[N];[D,T]=y(v,D,t,T),a.splice(N,1),s.splice(N,1),a.splice(l+1,0,v),s.splice(l+1,0,W)}this._$nodess=a,this._$nodes=this._$nodess.flat(1),this.onUpdateNodes(r,this._$nodes)}_$listen(e,t,o,s){let n={};e._$depObjectIds.push(n),e._$addDeps(o,n,()=>{let d=t();if(d===void 0){e._$deleteDeps(n);return}s(d)})}};var O=class extends L{conditionPairs=[];condition;listenDeps=[];dlScope;_$envNodes=[];constructor(){super(4)}_$addCond(e,t,o,s){this.conditionPairs.push({condition:e,node:t}),s&&(this.dlScope||(this.dlScope=o),this.listenDeps.push(...s));let n=[];for(let d of this.conditionPairs)if(d.condition()){this.condition=d.condition.toString(),n=d.node();break}this._$nodes=n}_$init(){let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(e){let t={};this._$depObjectIds.push(t),this.dlScope?._$addDeps(this.listenDeps,t,()=>this.update(e))}this._$bindNodes()}update(e){let t=this._$nodes,o=this.condition;this._$nodes=[];for(let d of this.conditionPairs)if(d.condition()){this.condition!==d.condition.toString()?(m(t,this.dlScope),$(t),this.condition=d.condition.toString(),this._$nodes=d.node(),this._$bindNewNodes(this._$nodes)):this._$nodes=t;break}if(t.length!==0&&this._$nodes.length===0&&(this.condition="[none]",m(t,this.dlScope),$(t)),o===this.condition)return;let s=x(e,this),n=e._$el;y(this._$nodes,s,n,n.childNodes.length),this.onUpdateNodes(t,this._$nodes)}};var E=class extends h{constructor(e,t,o){if(super(1),!o){this._$el=document.createTextNode(e);return}e=e;let s=e();this._$el=document.createTextNode(s);let n=()=>{let r=e();s!==r&&(this._$el.nodeValue=r,s=r)},d={};this._$depObjectIds.push(d),t._$addDeps(o,d,n)}};var U=class extends h{addPropFuncs=[];constructor(){super(5)}_$addNodes(e){this._$nodes=e}_$addProp(e,t,o,s){this.addPropFuncs.push(n=>H(n,"env",e,t,o,s))}addProps(e){for(let t of this.addPropFuncs)t(e)}addPropsToNodes(e){p(e._$nodes,t=>(t._$addBeforeInitSubNodes(()=>{this.addPropsToNodes(t)}),t._$nodeType===2&&this.addProps(t),!1))}_$init(){this.addPropsToNodes(this),this._$bindNodes()}};var S=class extends L{nodeOrFunc;listenDeps;dlScope;propFuncs=[];constructor(e,t,o){if(super(6),!o){this._$nodes=this.formatNodes(e);return}this.nodeOrFunc=e,this.listenDeps=o,this.dlScope=t,this._$nodes=this.formatNodes(this.nodeOrFunc())}_$onUpdateNodes(e){p(this._$nodes,t=>([4,3,6].includes(t._$nodeType)&&t.addOnUpdateNodesFunc(e),!0))}_$addProp(e,t,o,s){let n=d=>{if(["willAppear","didAppear","willDisappear","didDisappear"].includes(e)){d._$addLifeCycle(t,e);return}e[0]==="_"&&(d._$el.style[e.slice(1)]??"").trim()!==""||e[0]!=="_"&&d._$el[e]!==void 0||d._$addProp(e,t,o,s)};this.propFuncs.push(()=>{for(let d of this._$nodes)switch(d._$nodeType){case 0:n(d);break;case 3:case 4:case 6:d.addAfterUpdateNewNodesFunc(r=>{f(r,(u,a)=>{a._$nodeType===0&&n(a)},!1)});default:f(d._$nodes,(r,u)=>{u._$nodeType===0&&n(u)},!1)}})}formatNodes(e){return Array.isArray(e)||(e=[e]),e=e.flat(1),e=e.filter(t=>t!=null).map(t=>t._$nodeType!==void 0?t:new E(t)),e}_$init(){if(this.listenDeps===void 0){this._$bindNodes();for(let o of this.propFuncs)o();return}let e=this._$parentNode;for(;e&&e._$nodeType!==0;)e=e._$parentNode;if(!e)return;let t={};this._$depObjectIds.push(t),this.dlScope._$addDeps(this.listenDeps,t,()=>this.update(e)),this._$bindNodes();for(let o of this.propFuncs){o();let s={};this._$depObjectIds.push(s),this.dlScope._$addDeps(this.listenDeps,s,o)}}update(e){let t=this._$nodes;m(this._$nodes,this.dlScope),$(this._$nodes),this._$nodes=this.formatNodes(this.nodeOrFunc()),this._$bindNewNodes(this._$nodes);let o=e._$el,s=x(e,this);y(this._$nodes,s,o,o.childNodes.length),this.onUpdateNodes(t,this._$nodes)}};var Re=w,Xe=void 0;function Ye(i,e){new e().render(i)}var Ze=null,et=null,tt=null,ot=null,st=null,nt=null,it=null,dt=null,rt=null,at=null;export{w as CustomNode,h as DLNode,c as DLNodeType,ot as Else,tt as ElseIf,st as Env,U as EnvNode,at as EnvState,nt as Exp,S as ExpressionNode,Ze as For,j as ForNode,M as HtmlNode,et as If,O as IfNode,dt as Prop,rt as PropState,it as State,E as TextNode,Re as View,g as bindParentNode,b as initNodes,f as loopEls,p as loopNodes,Ye as render,Xe as required,F as toEls};
