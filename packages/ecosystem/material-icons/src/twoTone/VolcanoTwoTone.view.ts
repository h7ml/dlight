import DLight, { View } from "@dlightjs/dlight"
import { type Typed } from "@dlightjs/types"
import DLightIcon, { type DLightIconType } from "../DLightIcon.view"

class VolcanoTwoTone extends View {
  _$forwardProps = true
  Body() {
    DLightIcon()
      .forwardProps(true)
      .content("<path d=\"M16.49 10h-4.14l-1.49 3.74-.51 1.26H7.3l-2.22 5h14.27z\" opacity=\".3\"/><path d=\"M18 8h-7l-2 5H6l-4 9h20L18 8zM7.3 15h3.05l.5-1.26 1.5-3.74h4.14l2.86 10H5.08l2.22-5zM13 1h2v4h-2zm3.121 4.468L18.95 2.64l1.414 1.414-2.829 2.828zM7.64 4.05l1.414-1.414 2.828 2.829-1.414 1.414z\"/>")
      .name("VolcanoTwoTone")
  }
}

export default VolcanoTwoTone as any as Typed<DLightIconType>