import { type DLNode, View } from "@dlightjs/dlight"
import { Navigator } from "./Navigator"
import { getHashLocation, getHistoryLocation } from "./utils"
import { type Typed, _, env, Prop, Static } from "@dlightjs/types"

const rawHistoryPushState = history.pushState
let historyPushStateFuncs: Array<() => any> = []

class RouterSpace extends View {
  @Prop mode: Prop<"hash" | "history"> = "history" as any
  @Prop getNavigator: Prop<(nav: Navigator) => void> = (() => {}) as any
  currUrl = this.mode === "hash" ? getHashLocation() : getHistoryLocation()

  @Static baseUrl = ""
  @Static prevPathCondition = ""
  @Static prevRoutes: DLNode[] = []
  navigator = new Navigator()

  showedRoute = (function() {
    const prevPathCondition = this.prevPathCondition
    this.prevPathCondition = ""
    const currUrl = this.currUrl.replace(new RegExp(`^${this.baseUrl}`), "")
    const targetNodes: any[] = []

    for (const child of this._$children) {
      if (!child.isRoute) continue
      let targetUrl = child._$content
      let isMatch = false
      if (typeof child._$content === "string") {
        targetUrl = targetUrl.replace(/^(\.\/)+/, "")
        const isRootRoute = (targetUrl === "." && currUrl === "")
        const isPathMatch = ((currUrl + "/").startsWith(targetUrl + "/"))
        const isOther = (targetUrl === " none")
        isMatch = isRootRoute || isPathMatch || isOther
      } else if (targetUrl instanceof RegExp) {
        // ---- 匹配正则
        isMatch = targetUrl.test(currUrl)
      }

      if (isMatch) {
        if (targetUrl === prevPathCondition) {
          // ---- 发现condition没有改变，直接return原来的
          this.prevPathCondition = prevPathCondition
          return this.prevRoutes
        }
        targetNodes.push(child)
        this.prevPathCondition = targetUrl
        break
      }
    }
    this.prevRoutes = targetNodes
    return targetNodes
  }.call(this))

  historyChangeListen = () => {
    this.currUrl = getHistoryLocation()
  }

  hashChangeListen = () => {
    this.currUrl = getHashLocation()
  }

  willMount() {
    this.navigator.mode = this.mode
    this.getNavigator(this.navigator)
    let parent: any = this._$parentNode
    while (parent) {
      if (parent.isRoute) {
        this.baseUrl = parent._$content + "/" + this.baseUrl
      }
      parent = parent._$parentNode
    }
  }

  didMount() {
    if (this.mode === "hash") {
      addEventListener("load", this.hashChangeListen)
      addEventListener("hashchange", this.hashChangeListen)
      return
    }
    addEventListener("load", this.historyChangeListen)
    addEventListener("popstate", this.historyChangeListen)

    // ---- 监听pushState
    historyPushStateFuncs.push(this.historyChangeListen)
    history.pushState = new Proxy(rawHistoryPushState, {
      apply: (target, thisArg, argArray) => {
        const res = target.apply(thisArg, argArray as any)
        for (const func of historyPushStateFuncs) {
          func()
        }
        return res
      }
    })
  }

  willUnmount() {
    if (this.mode === "hash") {
      removeEventListener("load", this.hashChangeListen)
      removeEventListener("hashchange", this.hashChangeListen)
      return
    }
    removeEventListener("load", this.historyChangeListen)
    removeEventListener("popstate", this.historyChangeListen)
    historyPushStateFuncs = historyPushStateFuncs.filter(func => func !== this.historyChangeListen)
    if (historyPushStateFuncs.length > 0) {
      history.pushState = new Proxy(rawHistoryPushState, {
        apply: (target, thisArg, argArray) => {
          const res = target.apply(thisArg, argArray as any)
          for (const func of historyPushStateFuncs) {
            func()
          }
          return res
        }
      })
    } else {
      history.pushState = rawHistoryPushState
    }
  }

  Body() {
    env()
      .navigator(this.navigator)
      .path(this.currUrl)
    {
      _(this.showedRoute)
    }
  }
}

export default RouterSpace as any as Typed<RouterSpace>
