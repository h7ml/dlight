import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class UploadTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M9.83 8H11v6h2V8h1.17L12 5.83z\" opacity=\".3\"/><path d=\"m12 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2V8H9.83L12 5.83 14.17 8H13zM5 18h14v2H5z\"/>")
      .name("UploadTwoTone")
  }
}

export default UploadTwoTone as any as Typed<DLightIconType>