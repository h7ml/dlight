import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class MergeTypeTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8H11v5.59zm11.407 1.41-3.408-3.407 1.4-1.407 3.41 3.408z\"/>")
      .name("MergeTypeTwoTone")
  }
}

export default MergeTypeTwoTone as any as Typed<DLightIconType>