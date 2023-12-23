import { type ViewUnit } from "@dlightjs/view-parser"
import { ReactivityParser } from "./parser"
import { type ViewParticle, type ReactivityParserConfig, type ReactivityParserOption } from "./types"

/**
 * @brief Parse view units to get used properties and view particles with reactivity
 * @param viewUnits
 * @param config
 * @param options
 * @returns [viewParticles, usedProperties]
 */
export function parseReactivity(
  viewUnits: ViewUnit[],
  config: ReactivityParserConfig,
  options?: ReactivityParserOption
): [ViewParticle[], Set<string>] {
  const usedProperties = new Set<string>()
  const dlParticles = viewUnits.map(viewUnit => {
    const parser = new ReactivityParser(viewUnit, config, options)
    const dlParticle = parser.parse()
    parser.usedProperties.forEach(usedProperties.add.bind(usedProperties))
    return dlParticle
  })
  return [dlParticles, usedProperties]
}

export type * from "./types"
