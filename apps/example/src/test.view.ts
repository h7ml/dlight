import { View, renderToString } from "@dlightjs/dlight"
import { css, div } from "@dlightjs/easy-css"
import { button, Env, htmlTag, Prop, required, SubView } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { MarkitView, addBlockRule } from "@dlightjs/markit"

class NNN extends View {
  @Env path: any
  Body() {
    div(this.path)
  }
}

class TestView extends View {
  count = 5

  Body() {
    "jjj"
    RouterSpace()
    {
      Route("hello")
      {
        div("hello")
        NNN()
      }
    }
  }
}

export class TestMarkit extends View {
  testMDString = `
Search 🌟 in doc for important concepts and performance results.

# Quick start

DLight uses [vite](https://vitejs.dev/) to construct its apps. We mainly use [this vite plugin](https://www.npmjs.com/package/vite-plugin-dlight-transpiler) to transpile jsx/jsd file into pure js code.

Three ways to try DLight.js out.

* Use CLI to build a dlight app. (**This feature is still in development.**)

\`\`\`shell
npm install -g @dlightjs/cli
create-dlight-app my-first-dlight-app
\`\`\`

* Clone this repo https://github.com/dlight-js/dlight-vite-template for a quick start.
* 🌟 Play around in [codesandbox](https://codesandbox.io/p/sandbox/dlight-vite-quickstart-4tgogd)
  `

  getAst = (ast: any) => {
    console.log(ast)
  }

  Body() {
    MarkitView(this.testMDString)
      .getAst(this.getAst)
  }
}

console.log(renderToString(TestView))

export default TestView
