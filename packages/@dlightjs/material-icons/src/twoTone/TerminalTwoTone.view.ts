import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class TerminalTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M4 18h16V8H4v10zm8-3h6v2h-6v-2zm-5.91-4.59L7.5 9l4 4-4 4-1.41-1.41L8.67 13l-2.58-2.59z\" opacity=\".3\"/><path d=\"M12 15h6v2h-6z\"/><path d=\"M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16c1.1 0 2-.9 2-2V6a2 2 0 0 0-2-2zm0 14H4V8h16v10z\"/><path d=\"m7.5 17 4-4-4-4-1.41 1.41L8.67 13l-2.58 2.59z\"/>")
      .name("TerminalTwoTone")
  }
}

export default TerminalTwoTone as any as Typed<DLightIconType>