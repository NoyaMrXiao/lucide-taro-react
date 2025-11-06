// 从 lucide-static 导入图标并重新导出为 Taro 组件
import { createLucideIcon } from './createLucideTaroIcon'

// 导出工具函数
export { createLucideIcon, createLucideIcons, toDataUri } from './createLucideTaroIcon'
export type { LucideIconProps } from './createLucideTaroIcon'

// 图标组件缓存
const iconComponents = new Map<string, ReturnType<typeof createLucideIcon>>()

/**
 * 从 lucide-static 获取图标 SVG 并创建组件
 */
function createIconFromLucideStatic(iconName: string): ReturnType<typeof createLucideIcon> {
  if (iconComponents.has(iconName)) {
    return iconComponents.get(iconName)!
  }

  // 动态导入单个图标（支持 tree-shaking）
  let iconSvg: string
  
  try {
    // 尝试从 lucide-static 导入
    // 注意：这里需要在构建时确保 lucide-static 可用
    const lucideStatic = require('lucide-static')
    const iconData = lucideStatic[iconName]
    
    if (!iconData) {
      throw new Error(`Icon "${iconName}" not found`)
    }

    // 获取 SVG 字符串
    iconSvg = typeof iconData === 'string' ? iconData : iconData.svg || iconData
  } catch (error) {
    console.warn(`Failed to load icon "${iconName}":`, error)
    // 返回占位组件
    iconSvg = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>'
  }

  const IconComponent = createLucideIcon(iconSvg, iconName)
  iconComponents.set(iconName, IconComponent)
  
  return IconComponent
}

// 导出常用图标（直接导入，支持 tree-shaking）
// 这些图标会被明确导出，用户可以直接 import { Search } from 'lucide-taro-react'
export const Search = createIconFromLucideStatic('Search')
export const Heart = createIconFromLucideStatic('Heart')
export const User = createIconFromLucideStatic('User')
export const Home = createIconFromLucideStatic('Home')
export const Settings = createIconFromLucideStatic('Settings')
export const Menu = createIconFromLucideStatic('Menu')
export const X = createIconFromLucideStatic('X')
export const Check = createIconFromLucideStatic('Check')
export const ArrowLeft = createIconFromLucideStatic('ArrowLeft')
export const ArrowRight = createIconFromLucideStatic('ArrowRight')
export const ArrowUp = createIconFromLucideStatic('ArrowUp')
export const ArrowDown = createIconFromLucideStatic('ArrowDown')
export const Star = createIconFromLucideStatic('Star')
export const Bell = createIconFromLucideStatic('Bell')
export const Mail = createIconFromLucideStatic('Mail')
export const Phone = createIconFromLucideStatic('Phone')
export const Camera = createIconFromLucideStatic('Camera')
export const Image = createIconFromLucideStatic('Image')
export const File = createIconFromLucideStatic('File')
export const Folder = createIconFromLucideStatic('Folder')

// 动态访问所有图标的 Proxy（支持未列出的图标）
export const Icons = new Proxy({} as Record<string, ReturnType<typeof createLucideIcon>>, {
  get(_target, prop: string) {
    if (typeof prop !== 'string') {
      return undefined
    }
    return createIconFromLucideStatic(prop)
  }
})
