import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class OtherHousesOutlined extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M12 3 1 11.4l1.21 1.59L4 11.62V21h16v-9.38l1.79 1.36L23 11.4 12 3zm6 16H6v-8.9l6-4.58 6 4.58V19zm-9-5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm3-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3 1c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1z\"/>")
      .name("OtherHousesOutlined")
  }
}

export default OtherHousesOutlined as any as Typed<DLightIconType>