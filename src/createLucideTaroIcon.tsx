import React, { forwardRef } from 'react'
import { Image } from '@tarojs/components'
import type { ImageProps } from '@tarojs/components'

/**
 * 将 SVG 字符串转换为 data URI
 * @param svg SVG 字符串
 * @returns data URI 字符串
 */
export function toDataUri(svg: string): string {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}

/**
 * Tailwind 颜色映射表
 * 基于 Tailwind CSS 默认调色板
 */
const TAILWIND_COLORS: Record<string, Record<number, string>> = {
  // 基础颜色
  slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
  gray: { 50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db', 400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151', 800: '#1f2937', 900: '#111827', 950: '#030712' },
  zinc: { 50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa', 500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b' },
  neutral: { 50: '#fafafa', 100: '#f5f5f5', 200: '#e5e5e5', 300: '#d4d4d4', 400: '#a3a3a3', 500: '#737373', 600: '#525252', 700: '#404040', 800: '#262626', 900: '#171717', 950: '#0a0a0a' },
  stone: { 50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1', 400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c', 800: '#292524', 900: '#1c1917', 950: '#0c0a09' },
  red: { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c', 800: '#991b1b', 900: '#7f1d1d', 950: '#450a0a' },
  orange: { 50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c', 800: '#9a3412', 900: '#7c2d12', 950: '#431407' },
  amber: { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309', 800: '#92400e', 900: '#78350f', 950: '#451a03' },
  yellow: { 50: '#fefce8', 100: '#fef9c3', 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04', 700: '#a16207', 800: '#854d0e', 900: '#713f12', 950: '#422006' },
  lime: { 50: '#f7fee7', 100: '#ecfccb', 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d', 700: '#4d7c0f', 800: '#365314', 900: '#1a2e05', 950: '#0f2002' },
  green: { 50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d', 800: '#166534', 900: '#14532d', 950: '#052e16' },
  emerald: { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669', 700: '#047857', 800: '#065f46', 900: '#064e3b', 950: '#022c22' },
  teal: { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e', 800: '#115e59', 900: '#134e4a', 950: '#042f2e' },
  cyan: { 50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490', 800: '#155e75', 900: '#164e63', 950: '#083344' },
  sky: { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e', 950: '#082f49' },
  blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
  indigo: { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5', 700: '#4338ca', 800: '#3730a3', 900: '#312e81', 950: '#1e1b4b' },
  violet: { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9', 800: '#5b21b6', 900: '#4c1d95', 950: '#2e1065' },
  purple: { 50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8', 900: '#581c87', 950: '#3b0764' },
  fuchsia: { 50: '#fdf4ff', 100: '#fae8ff', 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3', 700: '#a21caf', 800: '#86198f', 900: '#701a75', 950: '#4a044e' },
  pink: { 50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777', 700: '#be185d', 800: '#9f1239', 900: '#831843', 950: '#500724' },
  rose: { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48', 700: '#be123c', 800: '#9f1239', 900: '#881337', 950: '#4c0519' },
}

/**
 * 项目自定义颜色映射
 */
const CUSTOM_COLORS: Record<string, string> = {
  'primary-500': '#06B6D4', 'primary-600': '#0891B2', 'primary-700': '#0E7490',
  'secondary-500': '#EC4899', 'secondary-600': '#DB2777',
  'info-500': '#0EA5E9',
  'success-500': '#22C55E', 'success-600': '#16A34A',
  'warning-500': '#F97316',
  'error-500': '#EF4444', 'error-600': '#DC2626',
}

/**
 * 从 Tailwind 类名中提取颜色值
 * 支持完整的 Tailwind CSS 颜色系统
 */
function getColorFromClassName(className?: string): string | null {
  if (!className) return null

  const textColorMatch = className.match(/\btext-([a-z]+(?:-\d+)?|current|black|white)\b/)
  if (!textColorMatch) return null

  const colorClass = textColorMatch[1]
  
  // 特殊颜色
  if (colorClass === 'current') return 'currentColor'
  if (colorClass === 'black') return '#000000'
  if (colorClass === 'white') return '#FFFFFF'

  // 检查自定义颜色
  if (CUSTOM_COLORS[colorClass]) {
    return CUSTOM_COLORS[colorClass]
  }

  // 解析 Tailwind 颜色格式: color-shade (如 red-500)
  const colorMatch = colorClass.match(/^([a-z]+)-(\d+)$/)
  if (colorMatch) {
    const [, colorName, shade] = colorMatch
    const shadeNum = parseInt(shade, 10)
    const colorPalette = TAILWIND_COLORS[colorName]
    
    if (colorPalette && colorPalette[shadeNum as keyof typeof colorPalette]) {
      return colorPalette[shadeNum as keyof typeof colorPalette]
    }
  }

  return null
}

/**
 * 从 className 中提取尺寸和颜色，并返回剩余的类名
 */
function extractPropsFromClassName(className?: string): { 
  size: string | null
  color: string | null
  remainingClassName: string 
} {
  if (!className) {
    return { size: null, color: null, remainingClassName: '' }
  }

  const classes = className.split(/\s+/).filter(Boolean)
  let extractedSize: string | null = null
  let extractedColor: string | null = null
  const remainingClasses: string[] = []

  // Tailwind 尺寸映射
  const sizeMap: Record<string, string> = {
    'w-4': '16px', 'h-4': '16px',
    'w-5': '20px', 'h-5': '20px',
    'w-6': '24px', 'h-6': '24px',
    'w-8': '32px', 'h-8': '32px',
    'w-10': '40px', 'h-10': '40px',
    'w-12': '48px', 'h-12': '48px',
    'w-16': '64px', 'h-16': '64px',
  }

  for (const cls of classes) {
    // 检查是否是尺寸类名
    if (cls.startsWith('w-') && sizeMap[cls]) {
      extractedSize = sizeMap[cls]
      continue
    }
    if (cls.startsWith('h-') && sizeMap[cls]) {
      if (!extractedSize) {
        extractedSize = sizeMap[cls]
      }
      continue
    }
    // 检查是否是颜色类名
    if (cls.startsWith('text-')) {
      const color = getColorFromClassName(cls)
      if (color) {
        extractedColor = color
        continue
      }
    }
    // 保留其他类名
    remainingClasses.push(cls)
  }

  return {
    size: extractedSize,
    color: extractedColor,
    remainingClassName: remainingClasses.join(' '),
  }
}

/**
 * Lucide 图标组件属性
 */
export interface LucideIconProps extends Omit<ImageProps, 'src'> {
  /** 图标尺寸 */
  size?: number | string
  /** 图标颜色 */
  color?: string
}

/**
 * 将 SVG 字符串转换为小程序可用的图标组件
 * 
 * @param iconSvg SVG 字符串
 * @param displayName 组件显示名称（用于调试）
 * @returns 小程序可用的图标组件
 * 
 * @example
 * ```tsx
 * import { createLucideIcon } from 'lucide-taro-react'
 * 
 * const svgString = '<svg>...</svg>'
 * const SearchIcon = createLucideIcon(svgString, 'Search')
 * 
 * // 使用
 * <SearchIcon size={24} color="#000" />
 * ```
 */
export function createLucideIcon(
  iconSvg: string,
  displayName?: string
) {
  const IconComponent = forwardRef<any, LucideIconProps>(
    ({ size = 24, color = 'currentColor', style, className, ...props }, ref) => {
      // 从 className 中提取尺寸和颜色
      const { size: classNameSize, color: classNameColor, remainingClassName: finalClassName } = 
        extractPropsFromClassName(className)

      // 优先使用 className 中的值，然后是 props
      const finalSize = classNameSize || (typeof size === 'number' ? `${size}px` : size)
      const finalColor = classNameColor || color || 'currentColor'

      // 处理 SVG 颜色：将 currentColor 替换为实际颜色值
      let svgContent = iconSvg
      
      if (finalColor && finalColor !== 'currentColor') {
        // 替换所有 stroke="currentColor" 为实际颜色
        svgContent = svgContent.replace(
          /stroke="currentColor"/g,
          `stroke="${finalColor}"`
        )
        // 也处理 stroke='currentColor' (单引号)
        svgContent = svgContent.replace(
          /stroke='currentColor'/g,
          `stroke='${finalColor}'`
        )
        // 如果 SVG 中没有 stroke 属性，添加一个
        if (!svgContent.includes('stroke=')) {
          svgContent = svgContent.replace(
            /<svg([^>]*)>/,
            `<svg$1 stroke="${finalColor}">`
          )
        }
      }

      const dataUri = toDataUri(svgContent)

      const imageStyle: Record<string, any> = {
        width: finalSize,
        height: finalSize,
      }

      if (style && typeof style === 'object') {
        Object.assign(imageStyle, style)
      }

      return (
        <Image
          ref={ref}
          src={dataUri}
          style={imageStyle}
          className={finalClassName || undefined}
          mode="aspectFit"
          {...props}
        />
      )
    }
  )

  if (displayName) {
    IconComponent.displayName = displayName
  }

  return IconComponent
}

/**
 * 批量创建多个图标组件
 * 
 * @param icons 图标对象，key 为图标名称，value 为 SVG 字符串
 * @returns 图标组件对象
 * 
 * @example
 * ```tsx
 * import { createLucideIcons } from 'lucide-taro-react'
 * 
 * const Icons = createLucideIcons({
 *   Search: '<svg>...</svg>',
 *   Home: '<svg>...</svg>',
 *   User: '<svg>...</svg>',
 * })
 * 
 * // 使用
 * <Icons.Search size={24} />
 * <Icons.Home size={32} color="#ff0000" />
 * ```
 */
export function createLucideIcons<T extends Record<string, string>>(
  icons: T
) {
  const result: Record<string, ReturnType<typeof createLucideIcon>> = {}
  
  for (const key in icons) {
    result[key] = createLucideIcon(icons[key], key as string)
  }
  
  return result as { [K in keyof T]: ReturnType<typeof createLucideIcon> }
}
