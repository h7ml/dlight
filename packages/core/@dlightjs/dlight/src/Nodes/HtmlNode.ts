import { type CustomNode } from "./CustomNode"
import { DLNode, DLNodeType } from "./DLNode"
import { type EnvNode } from "./EnvNode"
import { appendEls } from "./utils"

export class HtmlNode extends DLNode {
  _$envNodes?: EnvNode[] = []

  constructor(tagOrEl: string | HTMLElement) {
    super(DLNodeType.HTML)
    this._$el = typeof tagOrEl === "string" ? document.createElement(tagOrEl) : tagOrEl
  }

  _$init(): void {
    this._$bindNodes()
    appendEls(this, this._$nodes)
  }

  _$addNodes(nodes: DLNode[]) {
    this._$nodes = nodes
  }

  _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: CustomNode, listenDeps?: string[]) {
    const func: (newValue: any) => any = (newValue: any) => { this._$el[key] = newValue }

    if (!listenDeps) {
      func(valueOrFunc)
      return
    }
    let prevValue: any = valueOrFunc()
    func(prevValue)
    const depFunc = () => {
      const newValue = valueOrFunc()
      if (prevValue !== newValue) {
        func(newValue)
        prevValue = newValue
      }
    }
    const objectId = {}
    this._$depObjectIds.push(objectId)
    dlScope!._$addDeps(listenDeps, objectId, depFunc)
  }

  // ---- lifecycles
  willAppear(_el: HTMLElement, _node: HtmlNode): any { }
  didAppear(_el: HTMLElement, _node: HtmlNode): any { }
  willDisappear(_el: HTMLElement, _node: HtmlNode): any { }
  didDisappear(_el: HTMLElement, _node: HtmlNode): any { }
  _$addLifeCycle(func: (_el: HTMLElement, _node: HtmlNode) => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
    const preLifeCycle = this[lifeCycleName]
    this[lifeCycleName] = function(_el: HTMLElement, _node: HtmlNode) {
      preLifeCycle.call(this, _el, _node)
      func.call(this, _el, _node)
    }
  }
}