import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class LteMobiledataTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M6 14h3v2H4V8h2v6zm3-4h2v6h2v-6h2V8H9v2zm12 0V8h-5v8h5v-2h-3v-1h3v-2h-3v-1h3z\"/>")
      .name("LteMobiledataTwoTone")
  }
}

export default LteMobiledataTwoTone as any as Typed<DLightIconType>