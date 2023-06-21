import { type EnvNode } from "./EnvNode"
import { DLNode, DLNodeType } from "./DLNode"
import { addDLProp } from "../utils/prop"
import { HtmlNode } from "../Nodes"
import { detachNodes } from "./utils"
import { type ObjectId } from "./types"

export class CustomNode extends DLNode {
  _$deps: Record<string, Map<ObjectId, () => any>> = {}
  _$envNodes?: EnvNode[]
  _$derivedPairs?: Record<string, string[]>

  constructor() {
    super(DLNodeType.Custom)
  }

  // 如果该变量被其他变量derived，变量改变时应该callback相应的derived改变函数
  _$runDeps(depName: string) {
    if (this._$deps[depName] === undefined) {
      console.warn(`${depName} is not a dependency in ${this.constructor.name}`)
      return
    }
    for (const func of this._$deps[depName].values()) {
      func.call(this)
    }
  }

  _$$children: DLNode[] = []
  get _$children(): DLNode[] {
    return this._$childrenFuncs()
  }

  _$childrenFuncs: () => DLNode[] = () => []

  _$addChildren(dlNodeFuncs: () => DLNode[]) {
    this._$childrenFuncs = dlNodeFuncs
  }

  // ---- dep
  _$initDecorators() {
    if (this._$derivedPairs) {
      // 遍历_$derivedPairs，将derived变量监听的变量的change函数挂载到被监听变量上
      for (let [propertyKey, listenDeps] of Object.entries(this._$derivedPairs)) {
        const key = `_$$${propertyKey}` in this ? `_$$${propertyKey}` : propertyKey
        const func = (this as any)[key]
        if (typeof func !== "function") {
          (this as any)[key] = func
          continue
        }
        (this as any)[key] = func()

        if (listenDeps.length === 0) continue
        let prevValue = (this as any)[propertyKey]
        listenDeps = listenDeps.filter(dep => dep in this._$deps)
        // ---- 不需要push到depObjectIds，因为是自己的
        this._$addDeps(listenDeps, {}, () => {
          const newValue = func()
          if (newValue === prevValue) return;
          (this as any)[propertyKey] = newValue
          prevValue = newValue
        })
      }
    }
  }

  _$updateProperty(key: string, value: any) {
    if ((this as any)[`_$$${key}`] === value) return
    (this as any)[`_$$${key}`] = value
    this._$runDeps(key)
  }

  // 将改变函数挂载在_$deps里的依赖对象上
  _$addDeps(deps: string[], objectId: ObjectId, func: (newValue?: any) => any) {
    for (const dep of deps) {
      if (!(dep in this._$deps)) {
        console.warn(`no dep called [${dep}]`)
        continue
      }
      this._$deps[dep].set(objectId, func)
    }
  }

  _$resetDeps() {
    for (const dep of Object.keys(this._$deps)) {
      this._$deps[dep] = new Map()
    }
  }

  _$deleteDeps(objectId: ObjectId) {
    for (const depName in this._$deps) {
      this._$deps[depName].delete(objectId)
    }
  }

  beforeInit() { }
  _$init() {
    this.beforeInit()
    this._$initDecorators()
    this.willMount(this._$el, this)
    this._$nodes = ((this as any).Body.bind(this) ?? (() => []))()
    this._$bindNodes()
    this.didMount(this._$el, this)
  }

  _$addProp(key: string, propFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    addDLProp(this, "prop", key, propFunc, dlScope, listenDeps)
  }

  // ---- lifecycles
  willMount(_els: HTMLElement[], _node: CustomNode) { }
  didMount(_els: HTMLElement[], _node: CustomNode) { }
  willUnmount(_els: HTMLElement[], _node: CustomNode) { }
  didUnmount(_els: HTMLElement[], _node: CustomNode) { }

  _$addLifeCycle(func: (_els: HTMLElement[], _node: CustomNode) => any, lifeCycleName: "willMount" | "didMount" | "willUnmount" | "didUnmount") {
    const preLifeCycle = this[lifeCycleName]
    if (["willMount", "willUnmount"].includes(lifeCycleName)) {
      // ---- 从外向内
      this[lifeCycleName] = function(_els: HTMLElement[], _node: CustomNode) {
        func.call(this, this._$el, this)
        preLifeCycle.call(this, this._$el, this)
      }
    } else {
      this[lifeCycleName] = function(_els: HTMLElement[], _node: CustomNode) {
        // ---- 从内向外
        preLifeCycle.call(this, this._$el, this)
        func.call(this, this._$el, this)
      }
    }
  }

  render(idOrEl: string | HTMLElement) {
    // ----
    if (typeof idOrEl === "string") {
      idOrEl = document.getElementById(idOrEl)!
    }
    idOrEl.innerHTML = ""
    const appNode = new HtmlNode(idOrEl)
    appNode._$addNodes([this])
    appNode._$init()
  }

  _$detach() {
    super._$detach()
    for (const depKey of Object.keys(this._$deps)) {
      this._$deps[depKey] = new Map()
    }
    detachNodes(this._$children)
  }

  _$forwardProps = false
  forwardProps(dlNode: CustomNode | HtmlNode) {
    const members = [...new Set(
      Object.getOwnPropertyNames(this)
        .filter(m => (this as any)[m] === "prop")
        .map(m => m.replace(/^_\$\$\$*/, ""))
    )]
    for (const member of members) {
      if (dlNode._$nodeType === DLNodeType.HTML) {
        if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(member)) {
          (dlNode as HtmlNode)._$addLifeCycle((this as any)[member], member as any)
          continue
        }
        if (member === "_$content") {
          dlNode._$addProp("innerText", () => (this as any)._$content, this, ["_$content"])
          continue
        }
      }
      dlNode._$addProp(member, () => (this as any)[member], this, [member])
    }

    if (dlNode._$nodeType === DLNodeType.Custom) {
      (dlNode as CustomNode)._$childrenFuncs = this._$childrenFuncs
    } else {
      (dlNode as HtmlNode)._$nodes = this._$children
    }
  }
}