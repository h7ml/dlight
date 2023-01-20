import {BodyStringBuilder, geneChildNodesArray, isCustomEl, geneId} from './bodyBuilder';
import {ParserNode} from "../parserNode";
import {geneDeps, geneDepsStr, geneIsTwoWayConnected, resolveForBody, geneIdDeps, getIdentifiers} from './utils';


/**
 * idAppendixNum: 
 * -1 => 不返回id => ""
 * 0 => 不加后缀，直接生成uid() => TOGE23FibQ
 * n => 加后缀，加载生成的uid()后面 => TOGE23FibQ_idx0_..._idx_n-1
 */ 
export class Generator {
    depChain: string[]
    idDepsArr: {ids: string[], propNames: string[]}[] = []

    constructor(depChain: string[]) {
        this.depChain = depChain
    }
    generate(parserNode: ParserNode) {

        const body = new BodyStringBuilder()
        for (let [idx, child] of parserNode.children.entries()) {
            body.addBody(this.resolveParserNode(child, idx))
        }
        body.add(`return ${geneChildNodesArray(parserNode)}`)

        return body.value
    }

    geneDeps(valueStr: string) {
        return [...new Set([...geneDeps(valueStr, this.depChain), ...geneIdDeps(valueStr, this.idDepsArr)])]
    }

    resolveParserNode(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        if (parserNode.tag === "Node") return this.resolveNode(parserNode, idx, idAppendixNum, appendix)
        if (parserNode.tag === "If") return this.resolveIf(parserNode, idx, idAppendixNum, appendix)
        if (parserNode.tag === "For") return this.resolveFor(parserNode, idx, idAppendixNum, appendix)
        if (parserNode.tag === "TextNode") return this.resolveText(parserNode, idx, idAppendixNum, appendix)
        if (parserNode.tag === "Environment") return this.resolveEnv(parserNode, idx, idAppendixNum, appendix)
        if (isCustomEl(parserNode)) return this.resolveCustom(parserNode, idx, idAppendixNum, appendix)
        return this.resolveHTML(parserNode, idx, idAppendixNum, appendix)
    }


    resolveIf(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        const body = new BodyStringBuilder()
        const id = geneId(idAppendixNum, appendix)
        const nodeName = `node${idx}`

        body.add(`const ${nodeName} = new _$.IfNode(${id})`)
        for (let idx in parserNode.kv.condition) {
            const condition = parserNode.kv.condition[idx]
            body.add(`${nodeName}._$addCond(() => ${condition.condition}, () => {`)
            const conditionEl = condition.parserNode
            for (let [idx, childEl] of conditionEl.children.entries()) {
                body.addBody(this.resolveParserNode(childEl, idx, idAppendixNum, appendix))
            }
            body.add((`return ${geneChildNodesArray(conditionEl)}`))

            const listenDeps = this.geneDeps(condition.condition)
            if (listenDeps.length > 0) {
                body.add(`}, this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`})`)

        }

        return body
    }


    resolveFor(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        const body = new BodyStringBuilder()
        const key = parserNode.kv.key
        let forValueReg = /^(?:(?:let)|(?:var))\s+?(.+?)\s+?(?:of)\s+?(.+?)$/

        const id = geneId(idAppendixNum, appendix)
        const item = parserNode.kv.forValue.replace(forValueReg, "$1")
        const array = parserNode.kv.forValue.replace(forValueReg, "$2")

        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.ForNode(${id})`)

        const listenDeps = this.geneDeps(array)
        if (listenDeps.length > 0) {
            // ---- 如果有dependencies
            body.add(`${nodeName}._$addNodeFunc((key, _$idx${idAppendixNum}, forNode, updateIdx) => {`)
            // ---- 前面的listen函数很复杂，主旨就是把 let {idx, item} of array
            //      变成 let {idx.value, item.value} of array
            const idArr = item.match(/[_$a-zA-Z][_$a-zA-Z0-9]*/g) ?? []
            body.add(`const ${item} = forNode._$getItem(key, _$idx${idAppendixNum})`)
            body.add(`const valuedItem = {}`)
            for (let i of idArr) {
                body.add(`valuedItem.${i} = ${i}`)
            }
            body.add(`forNode._$listen(this, ()=>forNode._$getItem(key, _$idx${idAppendixNum}), \
            ${geneDepsStr(listenDeps)}, (item) => {`)
            body.add(`const ${item} = item`)
            for (let i of idArr) {
                body.add(`valuedItem.${i} = ${i}`)
            }
            body.add(`}, ${geneId(idAppendixNum+1, "${updateIdx}")})`)

            // ---- 下面才是子body
            const newGenerator = new Generator(this.depChain)
            newGenerator.idDepsArr = [{ids: getIdentifiers(item), propNames: listenDeps}]
            for (let [idx, cEl] of parserNode.children.entries()) {
                const childBody = newGenerator.resolveParserNode(cEl, idx, idAppendixNum+1, "${updateIdx}")
                resolveForBody(childBody, item)
                body.addBody(childBody)
            }
            body.add(`return ${geneChildNodesArray(parserNode)}`)
            body.add(`})`)
            // ---- 第二个参数，keyFunc
            if (key) {
                body.add(`${nodeName}._$addKeyFunc(() => {`)
                body.add(`const keys = []`)
                body.add(`for (${parserNode.kv.forValue}) {`)
                body.add(`keys.push(${key})`)
                body.add(("}"))
                body.add(`return keys`)
                body.add(`})`)
            }
            body.add(`${nodeName}._$addArrayFunc(this, () => (${array}), ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`${nodeName}._$addNodesArr((() => {`)
            body.add(`const nodesArr = []`)
            // ---- Array.from() 防止里面是个iterator
            body.add(`for (let [_$idx${idAppendixNum}, ${item}] of Array.from(${array}).entries()) {`)
            for (let [idx, cEl] of parserNode.children.entries()) {
                body.addBody(this.resolveParserNode(cEl, idx, idAppendixNum+1, appendix))
            }
            body.add(`nodesArr.push(${geneChildNodesArray(parserNode)})`)
            body.add("}")
            body.add("return nodesArr")
            body.add("})())")
        }

        return body
    }


    resolveText(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        const value = parserNode.kv.value
        const strSymbol = parserNode.kv.strSymbol
        const listenDeps = this.geneDeps(`${strSymbol}${value}${strSymbol}`)


        if (listenDeps.length > 0) {
            body.add(`const node${idx} = new _$.TextNode(() => ${strSymbol}${value}${strSymbol}, ${id}, this, ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`const node${idx} = new _$.TextNode(${strSymbol}${value}${strSymbol}, ${id})`)
        }

        return body
    }

    resolveHTML(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.HtmlNode("${parserNode.tag}", ${id})`)

        // ---- properties
        for (let {key, value} of parserNode.kv.props) {
            if (key === "element") {
                body.add(`${value} = ${nodeName}._$el`)
                continue
            }
            if (["willAppear", "didAppear", "willDisappear", "didDisappear"].includes(key)) {
                body.add(`${nodeName}._$addLifeCycle(${value}, "${key}")`)
                continue
            }
            if (key === "_$content") {
                key = "innerText"
            }
            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)
        }

        // ---- children
        for (let childEl of parserNode.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserNode(childEl, 0, idAppendixNum, appendix))
            body.add(`return node0`)
            body.add("})())")
        }

        return body
    }


    resolveCustom(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix=""){
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        const nodeName = `node${idx}`

        body.add(`const ${nodeName} = new ${parserNode.tag}("${parserNode.tag}", ${id})`)

        // ---- props
        for (let {key, value} of parserNode.kv.props) {
            if (key === "element") {
                body.add(`${nodeName}._$addAfterset(() => ${value} = ${nodeName}._$el)`)
                continue
            }
            if (["willMount", "didMount", "willUnmount", "didUnmount"].includes(key)) {
                body.add(`${nodeName}._$addLifeCycle(${value}, "${key}")`)
                continue
            }

            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)

        }


        // ---- child
        for (let childEl of parserNode.children) {
            body.add(`${nodeName}._$addChild((() => {`)
            body.addBody(this.resolveParserNode(childEl, 0, idAppendixNum, appendix))
            body.add(`return node0`)
            body.add("})())")
        }



        return body
    }


    resolveEnv(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()

        const nodeName = `node${idx}`
        body.add(`const ${nodeName} = new _$.EnvNode(${id})`)
        // ---- child 要先加children
        for (let childEl of parserNode.children) {
            body.add(`${nodeName}._$addNode((() => {`)
            body.addBody(this.resolveParserNode(childEl, 0, idAppendixNum, appendix))
            body.add(`return node0`)
            body.add("})())")
        }

        // ---- props
        for (let {key, value} of parserNode.kv.props) {
            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)

        }

        return body
    }

    resolveNode(parserNode: ParserNode, idx: number, idAppendixNum: number=0, appendix="") {
        const id = geneId(idAppendixNum, appendix)
        const body = new BodyStringBuilder()
        let content = parserNode.kv.content
        const nodes = parserNode.kv.nodes

        const nodeName = `node${idx}`
        for (let [i, subParserNode] of Object.entries(nodes) as any) {
            const subBody = new BodyStringBuilder()
            subBody.add("(function(){")
            subBody.add(this.generate(subParserNode))
            subBody.add("}.call(this))")
            content = content.replace(i, subBody.value)
        }

        const listenDeps = this.geneDeps(content)
        if (listenDeps.length > 0) {
            body.add(`const ${nodeName} = new _$.NodeNode(() => ${content}, ${id}, this, ${geneDepsStr(listenDeps)})`)
        } else {
            body.add(`const ${nodeName} = new _$.NodeNode(${content}, ${id})`)
        }

        // ---- forward props
        for (let {key, value} of parserNode.kv.props) {
            const listenDeps = this.geneDeps(value as string)
            if (listenDeps.length > 0) {
                body.add(`${nodeName}._$addProp("${key}", () => (${value}), this, ${geneDepsStr(listenDeps)}, ${geneIsTwoWayConnected(value)})`)
                continue
            }
            body.add(`${nodeName}._$addProp("${key}", ${value})`)

        }

        return body
    }

}
