export interface Transform3DOptions {
  spacingX?: number
  spacingY?: number
  spacingZ?: number
  rotateX?: number
  rotateY?: number
  rotateZ?: number
  scale?: number
}

export interface Transform3DResult extends React.CSSProperties {
  transform: string
  opacity?: number
  zIndex?: number
}

export interface TransformReplacement {
  [key: string]: string
}

export function calculate3DTransform(
  index: number,
  options: Transform3DOptions = {}
): Transform3DResult {
  const {
    spacingX = -20,
    spacingY = 20,
    spacingZ = -10,
    rotateX = 20,
    rotateY = 30,
    rotateZ = 0,
    scale = 1,
  } = options

  const translateX = spacingX * index
  const translateY = spacingY * index
  const translateZ = spacingZ * index

  const finalRotateX = rotateX
  const finalRotateY = rotateY
  const finalRotateZ = rotateZ

  const scaleChange = Math.abs(index) * 0.02
  const finalScale = index >= 0 
    ? Math.max(0.1, scale - scaleChange)
    : Math.min(2.0, scale + scaleChange)

  const distance = Math.abs(index)
  const sigma = 2 // 透明度衰减参数，参数越小曲线越陡峭，中心线两边透明度越小
  const opacity = Math.max(0, Math.exp(-(distance * distance) / (2 * sigma * sigma)))

  const zIndex = 1000 - index

  const transforms = [
    `translateX(${translateX}px)`,
    `translateY(${translateY}px)`,
    `translateZ(${translateZ}px)`,
    `rotateX(${finalRotateX}deg)`,
    `rotateY(${finalRotateY}deg)`,
    rotateZ !== 0 ? `rotateZ(${finalRotateZ}deg)` : '',
    finalScale !== 1 ? `scale(${finalScale})` : '',
  ].filter(Boolean)

  return {
    transform: transforms.join(' '),
    opacity,
    zIndex,
  }
}


export function replaceTransforms(
  transformString: string,
  replacements: TransformReplacement[]
): string {
  let result = transformString
  
  replacements.forEach(replacement => {
    Object.entries(replacement).forEach(([transformType, newValue]) => {
      const regex = new RegExp(`${transformType}\\(([^)]*)\\)`, 'g')
      result = result.replace(regex, (_match, capturedValue) => {
        return newValue.replace(/\$1/g, capturedValue)
      })
    })
  })
  
  return result
}
