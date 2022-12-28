import {ParserEl} from "./parserEl";

export class DlightParser {
    code: string
    token = ""
    c = ""
    idx = -1
    appendix = ''

    constructor(code: string, appendix?: string) {
        this.code = code
        this.appendix = appendix ? `_${appendix}` : ""
    }

    stopCharacters = ["(", ")", "{", "}", " ", "\n"]

    ok() {
        return this.idx < this.code.length - 1
    }

    look() {
        return this.code[this.idx+1]
    }

    eat() {
        this.idx ++
        this.c = this.code[this.idx]
    }

    add() {
        this.token += this.c
    }

    erase() {
        this.token = ""
    }

    eatSpace() {
        while (this.ok() && this.look().trim() === "") {
            this.eat()
        }
        // this.eat()
    }

    parserEl = new ParserEl('null', -1, '-1')
    el = this.parserEl
    elId = 0
    depth = 0

    addElChild() {
        while (this.el.depth >= this.depth) this.el = this.el.parent!
        this.el.addChild(new ParserEl(this.token, this.el.depth + 1, `${this.elId}${this.appendix}`))
        this.elId++
        while (this.el.depth < this.depth) this.el = this.el.lastChild!
        this.erase()
    }

    addElKey() {
        this.el.currKey = this.token.slice(1)
        this.erase()
    }


    // ---- ("value") 情况
    eatValue() {
        // ---- 解决左右小括号
        let valueDepth = 1
        while (this.ok()) {
            this.eat()
            if (this.c === "(") {
                valueDepth++
            } else if (this.c === ")") {
                valueDepth--
                if (valueDepth === 0) break
            }
            this.add()
        }
    }

    addElValue() {
        // ---- 添加到kv里面
        let isValueEmpty = false
        if (this.token.trim().length === 0) {
            this.token = "true"
            isValueEmpty = true
        }
        let key: string
        if (this.el.currKey.length === 0) {
            key = "_$content"
        } else {
            key = this.el.currKey
            this.el.currKey = ""
        }
        if (!isValueEmpty || key !== "_$content") {
            // ---- 如果是content且是空的，就不添加，不然空的默认添加true
            this.el.kv[key] = this.token
        }
        this.erase()
    }

    eatSubBlock() {
        let depth = 1
        while (this.ok()) {
            this.eat()
            if (this.c === "{") {
                depth++
            } else if (this.c === "}") {
                depth--
                if (depth === 0) break
            }
            this.add()
        }
    }



    parse() {
        while (this.ok()) {
            // ---- 只要不碰到stopCharacter，就一直加到token里面
            while (this.ok() && !this.stopCharacters.includes(this.look())) {
                this.eat()
                this.add()
            }
            if (this.token.trim() !== "") {
                if (["If", "ElseIf", "Else"].includes(this.token)) {
                    this.resolveIf(this.token)
                    continue
                }
                if (["For"].includes(this.token)) {
                    this.resolveFor()
                    continue
                }
                if (!this.token.startsWith(".")) {
                    // ---- 代表是tag 名称
                    this.addElChild()
                } else {
                    // ---- 代表是key
                    this.addElKey()
                }
            }
            // ---- eat掉stopCharacter并做判断
            this.eat()
            if (this.c.trim() !== "") {
                // ---- 是stopCharacters里面非空的
                if (this.c === "(") {
                    this.eatValue()
                    this.addElValue()
                } else if (this.c === "{") {
                    this.depth++
                } else if (this.c === "}") {
                    this.depth--
                }
            }

        }
    }

    // ---- if
    handleIfish(condition: string) {
        this.erase()
        this.eatSpace()
        this.eat()  // eat {
        this.eatSubBlock()  // eat内部
        // ---- 解析内部
        const id = `${this.elId}${this.appendix}_${this.el.kv["condition"].length}`
        const newParser = new DlightParser(this.token, id)
        newParser.parse()
        this.el.kv["condition"].push({
            condition: condition,
            parserEl: newParser.parserEl.lastChild!
        })
        this.erase()
    }

    handleIf() {
        this.addElChild()
        this.eatSpace()
        this.eat() // eat (
        this.eatValue()
        this.el.kv["condition"] = []
        this.handleIfish(this.token)
    }

    handleElseIf() {
        this.erase()
        this.eatSpace()
        this.eat()  // eat (
        this.eatValue()
        this.handleIfish(this.token)
    }

    handleElse() {
        this.handleIfish("true")
    }

    resolveIf(token: string) {
        if (token === "If") {
            this.handleIf()
        } else if (token === "ElseIf") {
            this.handleElseIf()
        } else if (token === "Else") {
            this.handleElse()
        }
    }

     resolveFor() {
        this.addElChild()
        this.eatSpace()
        this.eat()  // eat (
        this.eatValue()
        const forValue = this.token
        this.erase()
        this.eatSpace()
        this.eat()  // eat {
        this.eatSubBlock()  // eat内部
        // ---- 解析内部
        const newParser = new DlightParser(this.token, 'for')
        newParser.parse()
        this.el.kv["forValue"] = forValue
        this.el.kv["parserEl"] = newParser.parserEl.lastChild!
        this.erase()
    }

}