// 从本地 icons 文件夹导入图标并重新导出为 Taro 组件

// 导出工具函数
export { createLucideIcon, createLucideIcons, toDataUri } from './createLucideTaroIcon'
export type { LucideIconProps } from './createLucideTaroIcon'

// 导出图标名称列表（供用户查询可用图标）
export { iconNames, iconFileNames } from './icons-map'

// 导出图标工厂函数
export { createIconFromLocal } from './iconFactory'

// 导出所有图标组件（由 scripts/generate-icons.ts 自动生成）
export * from './icons-exports'
