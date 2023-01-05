import {DLBase} from "../DLBase";

import {
    appendEls,
    deleteSubDeps, newIndicator, parseIndicator,
    removeEls,
    resolveNestCustomEls,
} from "./utils";


export interface Indicator {
    index: number
    customEls: SpecialEl[]
}


export abstract class SpecialEl {
    dl?: DLBase
    parentEl?: HTMLElement
    _$id: string
    els: any
    _$specialEl = true
    indicator: Indicator = {
        index: 0,
        customEls: []
    }

    constructor(id: string) {
        this._$id = id
    }

    preset(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.dl = dl
        this.indicator = newIndicator(indicator)
        this.parentEl = parentEl
    }

    abstract init(dl: DLBase, parentEl: HTMLElement, indicator: Indicator): any

    mount(dl: DLBase, parentEl: HTMLElement, indicator: Indicator) {
        this.init(dl, parentEl, indicator)
        this.appendEls(this.els, parseIndicator(this.indicator), this.parentEl!.childNodes.length)
    }

    resolveNestCustomEls(els: any[], indicator: Indicator) {
        resolveNestCustomEls(els, this.dl!, this.parentEl!, indicator)
    }

    removeEls(els: any[]) {
        removeEls(els, this.dl!)
    }

    deleteSubDeps(els: any[]) {
        deleteSubDeps(els, this.dl!)
    }

    appendEls(els: any[], index: number, length: number) {
        return appendEls(els, index, this.parentEl!, length)
    }
}
