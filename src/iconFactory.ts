import { createLucideIcon } from './createLucideTaroIcon'
import { iconsMap } from './icons-map'

// 图标组件缓存
const iconComponents = new Map<string, ReturnType<typeof createLucideIcon>>()

/**
 * 从本地 icons 映射加载 SVG 并创建组件
 */
export function createIconFromLocal(iconName: string): ReturnType<typeof createLucideIcon> {
  if (iconComponents.has(iconName)) {
    return iconComponents.get(iconName)!
  }

  let iconSvg: string
  
  // 从生成的映射中获取 SVG 内容
  if (iconsMap[iconName]) {
    iconSvg = iconsMap[iconName]
  } else {
    console.warn(`Icon "${iconName}" not found in icons map`)
    // 返回占位组件
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
  }

  const IconComponent = createLucideIcon(iconSvg, iconName)
  iconComponents.set(iconName, IconComponent)
  
  return IconComponent
}

