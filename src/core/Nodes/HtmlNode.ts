import { DLightNode } from './DlightNode';
import {DLNode, DLNodeType} from './DLNode';

import { EnvNode } from './EnvNode';
import { addDeps } from '../utils/dep';


export class HtmlNode extends DLNode {
    _$envNodes?: EnvNode[] = []

    constructor(tag: string, id?: string) {
        super(DLNodeType.HTML, id)
        this._$el = document.createElement(tag)
    }
    _$init(): void {
        this._$bindNodes(this._$nodes)
        for (let node of this._$nodes) {
            node.render(this._$el)
        }
    }
    _$addNode(dlNode: DLNode) {
        this._$nodes.push(dlNode)
    }

    _$addProp(key: string, valueOrFunc: any | (() => any), dlScope?: DLightNode, listenDeps?: string[]) {
        let func: (newValue: any) => any

        if (key[0] === "_") {
            func = (newValue: any) => this._$el.style[key.slice(1) as any] = newValue
        } else if (key === "innerText") {
            func = (newValue: any) => this._$el.innerText = newValue
        } else {
            func = (newValue: any) => (this._$el as any)[key] = newValue
        }

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
        this._$depIds.push(`${this._$id}_${key}`)
        addDeps(dlScope!, listenDeps!, `${this._$id}_${key}`, depFunc)
    }

    // ---- lifecycles
    willAppear(el?: HTMLElement, props?: HTMLLifeCycleProp): any {}
    didAppear(el?: HTMLElement, props?: HTMLLifeCycleProp): any {}
    willDisappear(el?: HTMLElement, props?: HTMLLifeCycleProp): any {}
    didDisappear(el?: HTMLElement, props?: HTMLLifeCycleProp): any {}
    _$addLifeCycle(func: (el?: HTMLElement, props?: HTMLLifeCycleProp) => any, lifeCycleName: "willAppear" | "didAppear" | "willDisappear" | "didDisappear") {
        const preLifeCycle = this[lifeCycleName]
        this[lifeCycleName] = function(el?: HTMLElement, props?: HTMLLifeCycleProp) {
            preLifeCycle.call(this, el, props)
            return func.call(this, el, props)
        }
    }
    render(parentEl: HTMLElement) {
        this.willAppear(this._$el, {})
        parentEl.appendChild(this._$el)
        this.didAppear(this._$el, {})
    }
}

export interface HTMLLifeCycleProp {
    [key: string]: any
}